import AccountPage from '../support/pageObjects/accountPage';
import LoginPage from '../support/pageObjects/LoginPage';
import ProductPage from '../support/pageObjects/productPage';
import CartPage from '../support/pageObjects/CartPage';
import CheckoutPage from '../support/pageObjects/CheckoutPage';

describe('Search Products and validate the results', () => {
  const customerAccountPage = new AccountPage();
  const loginPage = new LoginPage();
  const productPage = new ProductPage();
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();

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

  it('Search by product name and validate results', () => {
    const validUser = accountData.validUser;
    const order = orderData.multiProductOrder;

    // Login by existing user
    cy.log('Login using valid user credentails');
    loginPage.visit();
    loginPage.login(validUser.email, validUser.password);
    cy.wait(2000);

    // Search and validate the first product only
    const firstProduct = order.products[0];
    cy.log('Searching product by product name ' + firstProduct.name);
    productPage.searchProduct(firstProduct.name);
    //Validate the results is having the required product 
    productPage.validateSearchResults(firstProduct.name);
  });
});
