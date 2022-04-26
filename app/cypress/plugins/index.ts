/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const { default: cucumber } = require('cypress-cucumber-preprocessor');
import { SplitFactory } from '@splitsoftware/splitio';
import { serverRuntimeConfig } from '../../next-env.config';

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
export default async (on: any, config: any) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', cucumber({
    typescript: require.resolve('typescript'),
  }));

  const factory = SplitFactory({
    core: {
      authorizationKey: serverRuntimeConfig.SPLIT_SERVER_SIDE_KEY,
    },
  });
  const client = factory.client();

  await new Promise<any>((res) => {
    client.on(client.Event.SDK_READY, function() {
      on('task', {
        getTreatments(key: string) {
          return client.getTreatment(key, 'W3W_WEB_COMPONENTS');
        },
        teardown() {
          client.destroy();
        }
      });
      res(null);
    });
  });
}
