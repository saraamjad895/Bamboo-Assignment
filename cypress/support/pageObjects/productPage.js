
class ProductPage {

  /**
  * Function to search the product
  */
  searchProduct(productName) {
    cy.get('#search').clear().type(`${productName}{enter}`);
  }

  /**
  * Function to select the first product from multiple 
  */
  selectFirstProduct() {
    cy.get('.product-item:first .product-item-link').click();
    cy.wait(1000);
  }

  /**
  * Function to set the product quantity on product page
  */
  setProductQuantity(quantity) {
    cy.get('input.qty').clear().type(quantity);
  }

  /**
  * Function to click add to cart button on product page
  */
  clickAddToCart() {
    cy.wait(1000);
    cy.get('#product-addtocart-button').click();
  }

  /**
  * Function to click add to wishlist button on product page
  */
  addProductToWishlist() {
    this.selectFirstProduct();
    cy.get('a[data-action="add-to-wishlist"], a.action.towishlist', { timeout: 5000 }).first()
      .should('be.visible')
      .click({ force: true });
    cy.wait(2000);
  }

  /**
  * Function to click cart panel button on product page
  */
  goToCart() {
    cy.get('.showcart').first().click();
    cy.get('a.viewcart').first().click();
    cy.wait(500);
  }

  /**
  * Function to select product and set the required quantity
  * @Param quantity
  */
  addProductToCart(quantity = 1) {
    this.selectFirstProduct();
    this.setProductQuantity(quantity);
    this.clickAddToCart();
    //Validate the message
    cy.get('.message-success')
      .should('be.visible')
      .and('contain', 'You added');
  }

  /**
  * Function to validate the search results of the products
  * @Param productName
  */
  validateSearchResults(productName) {
    cy.get('.product-item .product-item-link').should('exist');

    // Assert at least one item contains the search string
    cy.get('.product-item .product-item-link').then($items => {
      const matches = [...$items].filter(el =>
        el.textContent.trim().toLowerCase().includes(productName.toLowerCase())
      );
      expect(matches.length, `At least one result should match "${productName}"`).to.be.greaterThan(0);
    });
  }

  /**
   * Function to get product price for the first product
   * @returns {number} Price of the first product
   */
  getProductPrice() {
    return cy.get('.price') // adjust selector as needed
      .first()
      .invoke('text')
      .then((text) => {
        const price = parseFloat(text.replace('$', '').trim());
        return price;
      });
  }

  /**
  * Function to get get subtotal from the cart page
  * @returns {number} Cart subtotal value
  */
  getCartSubtotal() {
    return cy.get('[data-th="Subtotal"].price', { timeout: 10000 }).should('be.visible').invoke('text').then((text) => {
      return parseFloat(text.replace('$', '').trim());
    });
  }
}

export default ProductPage;
