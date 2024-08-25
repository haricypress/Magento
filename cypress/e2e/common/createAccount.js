import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import homaPage from "../../pages/homePage.po"
import createAccount from "../../pages/createAccount.po"
import accountPage from "../../pages/accountPage.po"

Given("Open Magento Webpage", () => {

    cy.visit("/")

})

When("Click on create Account link", () => {

    cy.contains(homaPage.createAccountLink()).click()
})

And("Enter {string} and {string}", (username,password) => {

    cy.get(createAccount.firstName()).type("username")
    cy.get(createAccount.lastName()).type("password")
})

And("Enter Email and {string} and retype {string}", (password) => {
    const r = (Math.random()+1).toString(36).substring(7)
    const emailaddress = "example"+r+"@gmail.com"
    
    cy.writeFile("cypress/fixtures/credentials.json", {"Email" : emailaddress, "password": password})
    
    cy.get(createAccount.EmailAddress()).type(emailaddress)
    cy.get(createAccount.password()).type(password)
    cy.get(createAccount.confirmPassword()).type(password)

})
Then("click on Submit button", () => {

    cy.xpath(createAccount.submitButton()).click()
})
And("Assert login success page", ()=>{
cy.url().should("eq",accountPage.assertAccountPage())
})