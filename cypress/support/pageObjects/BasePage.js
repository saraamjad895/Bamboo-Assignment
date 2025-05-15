export class BasePage {

    /**
      * Function to open the url
      * @Param url
      */
    navigateTo(url) {
        cy.visit(url);
    }

    /**
      * Function to find element by selector
      * @Param selector
      */
    getElement(selector) {
        return cy.get(selector);
    }
}