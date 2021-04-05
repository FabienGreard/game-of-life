import '@testing-library/cypress';

describe('Homepage', () => {
  it('Should visit (en)', () => {
    cy.visit('/');
  });

  it('Should visit (fr)', () => {
    cy.visit('/fr');
  });
});
