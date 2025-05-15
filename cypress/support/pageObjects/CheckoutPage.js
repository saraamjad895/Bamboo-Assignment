
class CheckoutPage {

  /**
  * Function to fill teh shipping detail form with data
  * @Param shipping detail data
  */
  fillShippingForm(shipping) {
    cy.wait(5000);
    cy.get('input[name="firstname"]').clear().type(shipping.firstName);
    cy.get('input[name="lastname"]').clear().type(shipping.lastName);
    cy.get('input[name="street[0]"]').clear().type(shipping.address);
    cy.get('input[name="city"]').clear().type(shipping.city);
    cy.get('select[name="region_id"]').select('1');
    cy.get('input[name="postcode"]').clear().type(shipping.postalCode);
    cy.get('input[name="telephone"]').type(shipping.phone);
  }

  /**
  * Function to select the shipping method on checkout
  */
  selectShippingMethod() {
    cy.get('input[type="radio"][name="ko_unique_1"]').first().check({ force: true });
  }

  /**
  * Function to click payment button 
  */
  continueToPayment() {
    cy.get('.continue').click();
  }

  /**
  * Function to click place order button
  */
  placeOrder() {
    cy.wait(2000);
    cy.get('button[title="Place Order"]').first().click();
  }

  /**
  * Function to verify the successful order creation message 
  */
  verifyOrderSuccess() {
    cy.contains('Thank you for your purchase!').should('be.visible');
  }

  /**
  * Function to click on proceed button when address is already saved
  */
  proceedWithSavedAddress() {
    cy.wait(4000);
    cy.get('button[data-role="opc-continue"]').should('be.visible').click();
  }
}

export default CheckoutPage;
