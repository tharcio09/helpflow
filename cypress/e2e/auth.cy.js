describe("Autenticação", () => {
    it("deve criar uma nova conta", () => {
        const email = `usuario-${Date.now()}@teste.com`;

        cy.visit("/register");

        cy.get("[data-cy='register-name']").type("Tharcio teste");
        cy.get("[data-cy='register-email']").type(email);
        cy.get("[data-cy='register-password']").type("123456");
        cy.get("[data-cy='register-confirm-password']").type("123456");
        cy.get("[data-cy='register-submit']").click();

        cy.url().should("include", "/dashboard");
        cy.contains("Olá").should("be.visible");
    });
});