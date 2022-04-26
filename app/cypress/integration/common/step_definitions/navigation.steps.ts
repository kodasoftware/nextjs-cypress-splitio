import { And, Given } from 'cypress-cucumber-preprocessor/steps';
import '../parameters';

And('I navigate to the homepage', () => {
  cy.visit('/');
});
