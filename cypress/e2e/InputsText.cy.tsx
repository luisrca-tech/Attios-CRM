import InputText from "~/common/ui/Input/InputText";

describe("InputsText Te", () => {
  it("Should render the input text", () => {
    cy.mount(<InputText name="campoTexto" />);
    cy.get('input[name="campoTexto"]').should("exist"); 
  });
});
