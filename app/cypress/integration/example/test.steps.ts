import { When } from 'cypress-cucumber-preprocessor/steps';

When('the feature is toggled {string}', (toggle: string) => {
  if (toggle === 'on') {
    cy.get('h1')
      .should('exist')
      .should('be.visible');
  }

  if (toggle === 'off') {
    cy.get('h1')
      .should('not.exist');
  }
});
