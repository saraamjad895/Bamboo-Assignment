
class LoginPage {
  /**
  * Function to open the url
  */
  visit() {
    cy.visit('customer/account/login');
  }

  /**
  * Function to get email field locator 
  */
  get emailInput() {
    return cy.get('input[name="login[username]"]');
  }

  /**
  * Function to get password field locator 
  */
  get passwordInput() {
    return cy.get('input[name="login[password]"]');
  }

  /**
  * Function to get login button field locator 
  */
  get loginButton() {
    return cy.get('button[class="action login primary"]');
  }

  /**
  * Function to get error message 
  */
  get errorMessage() {
    return cy.get('.message-error');
  }

  /**
  * Function to get successful login message 
  */
  get successMessage() {
    return cy.get('.page-title').should('contain', 'My Account');
  }

  /**
  * Function to login with email and password
  * @Param email, password
  */
  login(email, password) {
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.loginButton.first().click();
    cy.wait(1000);
  }
}

export default LoginPage;
