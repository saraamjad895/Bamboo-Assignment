class AccountPage {
  get firstNameInput() { return cy.get('#firstname'); }
  get lastNameInput() { return cy.get('#lastname'); }
  get emailInput() { return cy.get('#email_address'); }
  get passwordInput() { return cy.get('#password'); }
  get confirmPasswordInput() { return cy.get('#password-confirmation'); }
  get createAccountButton() { return cy.get('.action.submit.primary'); }
  get successMessage() { return cy.get('.message-success'); }

  /**
  * Function to fill the registration form with data
  * @Param firstName, lastName, email, password, confirmPassword
  */
  fillInForm(firstName, lastName, email, password, confirmPassword) {
    this.firstNameInput.type(firstName);
    this.lastNameInput.type(lastName);
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.confirmPasswordInput.type(confirmPassword);
  }

  /**
  * Function to open the url
  */
  visit() {
    cy.visit('/customer/account/create/');
  }

  /**
  * Function to submit the create account form
  */
  submitForm() {
    this.createAccountButton.click();
  }

  /**
  * Function to get Empty first name Error Message
  */
  getFirstNameErrorMessage() {
    return cy.get('#firstname-error');
  }

  /**
  * Function to get Empty last name Error Message
  */
  getLastNameErrorMessage() {
    return cy.get('#lastname-error');
  }

  /**
  * Function to get email Error Message
  */
  getEmailErrorMessage() {
    return cy.get('#email_address-error');
  }

  /**
  * Function to get password Error Message
  */
  getPasswordErrorMessage() {
    return cy.get('#password-error');
  }

  /**
  * Function to get confirm email mismatch password Error Message
  */
  getPasswordConfirmationErrorMessage() {
    return cy.get('#password-confirmation-error', { timeout: 10000 });
  }

  /**
  * Function to get general Error Message
  */
  getGeneralErrorMessage() {
    return cy.get('.message-error div[data-bind]');
  }

}

export default AccountPage;
