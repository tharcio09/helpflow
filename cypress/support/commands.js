Cypress.Commands.add("createTestUser", (overrides = {}) => {
  const uniqueId = `${Date.now()}-${Cypress._.random(1000, 9999)}`;
  const user = {
    name: "Usuário Teste",
    email: `usuario-${uniqueId}@teste.com`,
    password: "123456",
    ...overrides,
  };

  return cy
    .request("POST", "/api/register", {
      name: user.name,
      email: user.email,
      password: user.password,
    })
    .then(() => user);
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get("[data-cy='login-email']").type(email);
  cy.get("[data-cy='login-password']").type(password);
  cy.get("[data-cy='login-submit']").click();
  cy.url().should("include", "/dashboard");
});
