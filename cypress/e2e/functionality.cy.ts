describe("Register Page", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("/register");
  });

  it("should display the register form", () => {
    // Check if the heading and form elements are present
    cy.contains("Register a new account").should("exist");
    cy.get("form").should("exist");
  });

  it("should allow users to register", () => {
    // Simulate entering credentials and submitting the form
    cy.get('input[name="username"').type("john");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get('input[name="confirmPassword"]').type("password");
    cy.get('button[type="submit"]').click();

    // Ensure the user is redirected to the homepage after register
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("should show an error for existing emails", () => {
    // Simulate entering invalid credentials
    cy.get('input[name="username"').type("john");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get('input[name="confirmPassword"]').type("password");
    cy.get('button[type="submit"]').click();

    // Check for error message
    cy.contains("User already exists with the given email!").should("exist");
  });

  it("should show an error for different passwords", () => {
    // Simulate entering invalid credentials
    cy.get('input[name="username"').type("john");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get('input[name="confirmPassword"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // Check for error message
    cy.contains("Passwords do not match").should("exist");
  });
});

describe("Login Page", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("/login");
  });

  it("should display the login form", () => {
    // Check if the heading and form elements are present
    cy.contains("Log in to your account").should("exist");
    cy.get("form").should("exist");
  });

  it("should allow users to log in", () => {
    // Simulate entering credentials and submitting the form
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();

    // Ensure the user is redirected to the homepage after login
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });

  it("should show an error for incorrect credentials", () => {
    // Simulate entering invalid credentials
    cy.get('input[name="email"]').type("wronguser@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    // Check for error message
    cy.contains("Incorrect email or Password!").should("exist");
  });
});

describe("Post Creation Form", () => {
  beforeEach(() => {
    // Authenticate first before each test

    cy.visit("/login");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
  });

  it("should be able to create new post", () => {
    cy.get("#open-create-post-btn").click();
    cy.get('textarea[name="content"]').type(
      "Hello, this is a test from cypress!"
    );
    cy.get('button[type="submit"]').contains("Post").click();

    // Check if the new post appear
    cy.contains("Hello, this is a test from cypress!").should("exist");
  });
});

describe("Post Edit Form", () => {
  beforeEach(() => {
    // Authenticate first before each test
    cy.visit("/login");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
  });

  it("should be able to edit existing post", () => {
    cy.get('button[aria-label="Edit Post"]').first().click();

    cy.contains("Edit Post").should("exist");

    cy.get('textarea[name="content"]')
      .clear()
      .type("Hello, this is a test from cypress! edited");
    cy.get('button[type="submit"]').contains("Edit").click();

    // Check if the edited post appear
    cy.contains("Hello, this is a test from cypress! edited").should("exist");
  });
});

describe("Post Delete", () => {
  beforeEach(() => {
    // Authenticate first before each test
    cy.visit("/login");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
  });

  it("should be able to delete existing post", () => {
    cy.get('button[aria-label="Delete Post"]').first().click();

    // Check if the post is removed
    cy.contains("Hello, this is a test from cypress! edited").should(
      "not.exist"
    );
  });
});
