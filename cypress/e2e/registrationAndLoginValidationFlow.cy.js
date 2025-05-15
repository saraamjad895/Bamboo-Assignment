import AccountPage from '../support/pageObjects/accountPage';

describe('Customer Account Creation - All Scenarios', () => {
  const customerAccountPage = new AccountPage();
  let testData;

  //Load fixture files before
  before(() => {
    cy.fixture('accountData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit('/customer/account/create/');
  });

  // ------------------ Positive Test Case ------------------

  it('Verify that user create a new customer account with valid data is successfully login', () => {
    const user = testData.validUser1;
    cy.log('Registering a new account with Valid data');
    const uniqueEmail = `${user.emailPrefix}${Date.now()}@example.com`;
    customerAccountPage.fillInForm(user.firstName, user.lastName, uniqueEmail, user.password, user.password);
    customerAccountPage.submitForm();
    cy.get('.message-success').should('be.visible').and('contain', 'Thank you for registering with');
  });

  // ------------------ Negative Test Case ------------------

  it('Verify that when user attempt to submit the form with all fields blank then application is throwing error', () => {
    cy.log('Registering a new account with blank data');
    customerAccountPage.submitForm();
    customerAccountPage.getFirstNameErrorMessage().should('be.visible').and('contain', 'This is a required field.');
  });

  it('Verify that when user enters an invalid email format then application is throwing validation error', () => {
    const user = testData.invalidEmail;
    cy.log('Registering a new account with invalid email data');
    customerAccountPage.fillInForm(user.firstName, user.lastName, user.email, user.password, user.confirmPassword);
    customerAccountPage.submitForm();
    customerAccountPage.getEmailErrorMessage().should('be.visible').and('contain', 'Please enter a valid email address');
  });

  it('Verify that when user enters password shorter than required then its trhowing error message', () => {
    const user = testData.shortPassword;
    cy.log('Registering a new account with short password data');
    customerAccountPage.fillInForm(user.firstName, user.lastName, user.email, user.password, user.confirmPassword);
    customerAccountPage.submitForm();
    customerAccountPage.getPasswordErrorMessage().should('be.visible').and('contain', 'Minimum length of this field must be equal or greater than 8 symbols');
  });

  it('Verify that when user enters mismatched password and confirm password then user can see the error message', () => {
    const user = testData.mismatchedPasswords;
    cy.log('Registering a new account with mismatched confirm password');
    const uniqueEmail = `${user.emailPrefix}${Date.now()}@example.com`;
    customerAccountPage.fillInForm(user.firstName, user.lastName, uniqueEmail, user.password, user.confirmPassword);
    customerAccountPage.submitForm();
    customerAccountPage.getPasswordConfirmationErrorMessage().should('be.visible').and('contain', 'Please enter the same value again');
  });

  it('Verify that when user registers with an already registered email', () => {
    const user = testData.existingUser;
    cy.log('Registering a new account with already existing email');
    customerAccountPage.fillInForm(user.firstName, user.lastName, user.email, user.password, user.confirmPassword);
    customerAccountPage.submitForm();
    customerAccountPage.getGeneralErrorMessage().should('be.visible').and('contain', 'There is already an account with this email address. If you are sure that it is your email address, ');
  });
});
