/** @type {import('next').NextConfig} */
const { serverRuntimeConfig } = require('./next-env.config');

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig
}

module.exports = nextConfig
