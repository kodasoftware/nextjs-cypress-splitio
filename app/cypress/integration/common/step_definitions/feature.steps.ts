import { Then } from 'cypress-cucumber-preprocessor/steps';
import '../parameters';

Then('I can see', async () => {
  cy.getCookie('device_id')
    .its('value')
    .then((key) => {
      cy.task('getTreatments', key)
        .then(treatment => {
          if (treatment === 'on') {
            cy.get('h1')
              .should('exist')
              .should('be.visible');
          }

          if (treatment === 'off') {
            cy.get('h1')
              .should('not.exist');
          }
        });
    });
});
