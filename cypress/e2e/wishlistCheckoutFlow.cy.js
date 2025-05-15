import AccountPage from '../support/pageObjects/accountPage';
import LoginPage from '../support/pageObjects/LoginPage';
import ProductPage from '../support/pageObjects/productPage';
import CartPage from '../support/pageObjects/CartPage';
import CheckoutPage from '../support/pageObjects/CheckoutPage';
import WishlistPage from '../support/pageObjects/wishlistPage';

describe('Wishlist products and checkout flow', () => {
  const customerAccountPage = new AccountPage();
  const loginPage = new LoginPage();
  const productPage = new ProductPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  const wishlistPage = new WishlistPage();

  let accountData;
  let orderData;

  //Load fixture files before
  before(() => {
    cy.fixture('accountData').then((data) => {
      accountData = data;
    });

    cy.fixture('orderData').then((data) => {
      orderData = data;
    });
  });

  it('Login with existing user then add products to wishlist, move to checkout and place order', () => {
    const validUser = accountData.validUser;
    const wishlistOrder = orderData.multiProductOrder;

    // Login by existing user
    cy.log('Login using valid user credentails');
    loginPage.visit();
    loginPage.login(validUser.email, validUser.password);

    // Add products to wishlist
    wishlistOrder.products.forEach(product => {
      cy.log('Searching product by product name ' + product.name);
      productPage.searchProduct(product.name);
      cy.log('Adding to wishlist');
      productPage.addProductToWishlist();
    });

    // Go to wishlist and move items to cart
    wishlistPage.visitWishlist();
    cy.log('Clicking add all products to cart');
    wishlistPage.moveAllToCart();

    // Go to cart
    productPage.goToCart(); // Make sure this exists in productPage.js

    // Verify cart and proceed
    const productNames = wishlistOrder.products.map(p => p.name);
    cartPage.verifyCartItems(productNames);
    cy.log('Proceed to checkout page');
    cartPage.proceedToCheckout();

    // Shipping & Checkout
    checkoutPage.proceedWithSavedAddress();
    checkoutPage.selectShippingMethod();
    checkoutPage.continueToPayment();
    cy.log('Place order');
    checkoutPage.placeOrder();
    checkoutPage.verifyOrderSuccess();
  });
});
