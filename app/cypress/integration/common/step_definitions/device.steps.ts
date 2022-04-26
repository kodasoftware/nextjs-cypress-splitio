import { Given } from 'cypress-cucumber-preprocessor/steps';
import '../parameters';

Given('I have a device ID of {string}', (device_id: string) => {
  cy.setCookie('device_id', device_id, { path: '/' });
});

Given('I do not have a device ID', () => {});
