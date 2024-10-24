import { Input } from "~/common/ui/Input";

describe("InputsText Te", () => {
  it("Should render the input text", () => {
    cy.visit("http://localhost:3000");
    cy.get('h1').should("have.text", "Text"); 
  });
});
