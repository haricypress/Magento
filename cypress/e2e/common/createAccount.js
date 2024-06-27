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

And("Enter Firstname and Lastname", () => {

    cy.get(createAccount.firstName()).type("fkdhkjh")
    cy.get(createAccount.lastName()).type("dsdsd")
})

And("Enter Email and Password and retype password", () => {
    const r = (Math.random()+1).toString(36).substring(7)
    const emailaddress = "aaaaaaa"+r+"@gmail.com"
    const pass = "Modem2000@"
    
    cy.writeFile("cypress/fixtures/credentials.json", {"Email" : emailaddress, "password": pass})
    
    cy.get(createAccount.EmailAddress()).type(emailaddress)
    cy.get(createAccount.password()).type(pass)
    cy.get(createAccount.confirmPassword()).type(pass)

})
Then("click on Submit button", () => {

    cy.xpath(createAccount.submitButton()).click()
})
And("Assert login success page", ()=>{
accountPage.assertAccountPage()
})