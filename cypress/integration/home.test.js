describe("Home Page", () => {
  // E2E test for home page
  beforeEach(() => {
    // cy.fixture() method is used to read the data from json file
    cy.fixture("courses.json").as("coursesJSON");
    // cy.server() method is used to enable the server
    cy.server();
    // cy.route() method is used to handle the request and response
    cy.route("/api/courses", "@coursesJSON").as("courses");
    // cy.visit() method is used to navigate to the url
    cy.visit("/");
  });

  it("should display a list of courses", () => {
    // cy.contains() method is used to check the text
    cy.contains("All Courses");
    // cy.wait() method is used to wait for the response
    cy.wait("@courses");
    // cy.get() method is used to get the element
    cy.get("mat-card").should("have.length", 9);
  });

  it("should display the advanced courses", () => {
    // cy.get() method is used to get the element
    cy.get(".mat-tab-label").should("have.length", 2);
    // click() method is used to click on the element
    cy.get(".mat-tab-label").last().click();

    cy.get(".mat-tab-body-active .mat-card-title")
      .its("length") // its() method is used to get the length of the element
      .should("be.gt", 1);
    -(
      // should() method is used to check the condition

      cy
        .get(".mat-tab-body-active .mat-card-title")
        .first() // first() method is used to get the first element
        .should("contain", "Angular Security Course")
    ); // should() method is used to check the condition
  });
});
