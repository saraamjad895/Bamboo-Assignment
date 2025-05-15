
class CartPage {

  /**
  * Function to get all cart items 
  */
  get cartItems() {
    return cy.get('.cart.item .product-item-name');
  }

  /**
  * Function to get grand total price of products 
  */
  get grandTotal() {
    return cy.get('.grand.totals .price');
  }

  /**
  * Function to get checkout button 
  */
  get checkoutButton() {
    cy.wait(2000);
    return cy.get('button[data-role="proceed-to-checkout"]');
  }

  /**
  * Function to verify the cart items
  * @Param expectedProductNames
  */
  verifyCartItems(expectedProductNames) {
    expectedProductNames.forEach((name) => {
      this.cartItems.should('contain', name);
    });
  }

  /**
  * Function to verify the cart items total price
  * @Param expectedTotal
  */
  verifyCartTotals(expectedTotal) {
    this.grandTotal.should('contain', expectedTotal);
  }

  /**
  * Function to click on proceed to checkout button
  */
  proceedToCheckout() {
    this.checkoutButton.click();
  }
}

export default CartPage;
