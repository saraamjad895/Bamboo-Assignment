class WishlistPage {

  /**
  * Function to open the wishlist url
  */
  visitWishlist() {
    cy.visit('/wishlist/');
  }

  /**
  * Function get the wishlist items
  */
  get wishlistItems() {
    return cy.get('.product-item');
  }

  /**
   * Function to click the wishlist link
   */
  goToWishlist() {
    cy.get('a[href*="wishlist"]').first().click();
  }

  /**
  * Function click on add item to cart button from wishlist
  */
  moveToCartFromWishlist() {
    cy.get('button[title="Add to Cart"]').click();
  }

  /**
  * Function click on add all items to cart button from wishlist
  */
  moveAllToCart() {
    // Click each "Add to Cart" button in the wishlist
    cy.wait(2000);
    cy.get('button[title="Add All to Cart"]').first().each(($btn) => {
      cy.wrap($btn).click();
      cy.wait(3000);
    });
  }

  /**
  * Function click on proceed to checkout button
  */
  proceedToCheckout() {
    cy.get('a.checkout').click();
  }
}

export default WishlistPage;
