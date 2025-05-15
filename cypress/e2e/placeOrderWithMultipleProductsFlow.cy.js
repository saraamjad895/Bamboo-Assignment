import AccountPage from '../support/pageObjects/accountPage';
import LoginPage from '../support/pageObjects/LoginPage';
import ProductPage from '../support/pageObjects/productPage';
import CartPage from '../support/pageObjects/CartPage';
import CheckoutPage from '../support/pageObjects/CheckoutPage';

describe('Add to Cart and Place Order - Price Calculation Flow', () => {
  const customerAccountPage = new AccountPage();
  const loginPage = new LoginPage();
  const productPage = new ProductPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();

  let accountData;
  let orderData;
  let calculatedTotal = 0;

  //Load fixture files before
  before(() => {
    cy.fixture('accountData').then((data) => {
      accountData = data;
    });

    cy.fixture('orderData').then((data) => {
      orderData = data;
    });
  });

  it('User should register, add products to cart, and verify price calculations during checkouts', () => {
    const user = accountData.validUser1;
    const order = orderData.multiProductOrder;
    let itemTotal = 0;

    //Register new user
    cy.log('Registering a new account');
    customerAccountPage.visit();
    const uniqueEmail = `${user.emailPrefix}${Date.now()}@example.com`;
    customerAccountPage.fillInForm(user.firstName, user.lastName, uniqueEmail, user.password, user.password);
    customerAccountPage.submitForm();
    cy.get('.message-success').should('be.visible').and('contain', 'Thank you for registering with');
    cy.wait(3000);

    cy.wrap(order.products).each((product) => {
      cy.log('Search product by Product name');
      productPage.searchProduct(product.name);

      // Capture price before adding to cart
      cy.log('Calculate product price');
      productPage.getProductPrice().then((price) => {
        itemTotal = price * product.quantity;
        calculatedTotal += itemTotal;
      });
      cy.log('Adding product to cart');
      productPage.addProductToCart(product.quantity);
    });

    cy.log('Go to cart page');
    productPage.goToCart();

    // Wait for cart to fully load and subtotal to be visible
    productPage.getCartSubtotal().then((cartSubtotal) => {
      expect(cartSubtotal.toFixed(2)).to.equal(calculatedTotal.toFixed(2));
    });

    //Verify the cart and proceed to checkout
    cy.log('Verifying added products in cart');
    const productNames = order.products.map(p => p.name);
    cartPage.verifyCartItems(productNames);
    cartPage.proceedToCheckout();

    //Fill out checkout form and place order
    cy.log('Filling put Checkout form');
    checkoutPage.fillShippingForm(order.shipping);
    checkoutPage.selectShippingMethod();
    checkoutPage.continueToPayment();

    cy.log('Placing Order and validate message');
    checkoutPage.placeOrder();
    checkoutPage.verifyOrderSuccess();
  });
});

