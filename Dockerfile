#
# Build arguments used for base image
#
ARG BASE_IMAGE=node
ARG NODE_VERSION=14.16

FROM ${BASE_IMAGE}:${NODE_VERSION}-alpine as dependencies

ARG NPM_TOKEN

WORKDIR /opt/app/build
COPY  app/.npmrc \
      app/package-lock.json \
      app/package.json ./
RUN npm ci --ignore-scripts && \
    rm -rf .npmrc

WORKDIR /opt/app/runtime
COPY  app/.npmrc \
      app/package-lock.json \
      app/package.json ./
RUN npm ci --production && \
    rm -rf .npmrc

#
# Build stage
#
FROM ${BASE_IMAGE}:${NODE_VERSION} AS build

#
# Build arguments for application build
#
ARG NPM_TOKEN
ARG ASSET_PREFIX

WORKDIR /opt/app

# Add all build dependencies from dependencies image
COPY  --from=dependencies \
      /opt/app/build/node_modules \
      ./node_modules
COPY  --from=dependencies \
      /opt/app/build/package.json \
      /opt/app/build/package-lock.json \
      ./

# Add all build files/directories from project source
COPY app/src ./src
COPY app/tsconfig.json ./

RUN npm run compile


#
# Runtime stage (alpine image)
#
FROM ${BASE_IMAGE}:${NODE_VERSION}-alpine

# Set any minimal runtime environment variables
ENV VERSION=development

# Add labels which appear in the image inspection
LABEL org.opencontainers.image.authors="What3Words <support@what3words.com>" \
      com.what3words.vendor="what3words" \
      com.what3words.application="api" \
      version="${VERSION}" \
      description="The what3words api Application"

# Add any dependencies first so we can make use of Docker layer caching
RUN apk add dumb-init

WORKDIR /opt/app

# Copy over runtime distributables from build stage
# All runtimes are owned by the node user and group. For security we do not run or own as root
# COPY --from=dependencies \
#      --chown=node:node \
#      /opt/app/runtime/node_modules ./node_modules
COPY --from=build \
     --chown=node:node \
     /opt/app/dist ./

ENV NODE_ENV=production
# Datadog env variables.
# See: https://docs.datadoghq.com/tracing/setup_overview/setup/nodejs/?tab=containers#configuration
ENV DD_SERVICE=what3words-api
ENV DD_TRACE_ENABLED=false
ENV DD_LOGS_INJECTION=true
ENV DD_TRACE_LOG_LEVEL=error

EXPOSE 3000
USER node

CMD [ "dumb-init", "node", "-r", "dd-trace/init", "index.js", "start" ]
