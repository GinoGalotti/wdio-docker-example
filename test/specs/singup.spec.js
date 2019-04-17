const SignupPersonal = require('../pages/signupPersonal')
const SignupCompany = require('../pages/signupCompany')
// This can be moved to a Utils library dealing with random numbers / names
const uuidv4 = require('uuid/v4')

const validEmail = "valid@email.me"
const validPassword = "validpassword"
const validName = "Name Is Valid"

const defaultUser = "martinjosephbakewell+"
const defaultName = "Test Please Ignore"


describe('Sign up fail if', () => {

  // I decided to make this one test instead of 4 for
  // the sake of speed
   it('fields are empty', () => {
    SignupPersonal.navigateTo()   

    SignupPersonal.clickNext()
  
    SignupPersonal.invalidEmail.waitForDisplayed()
    expect(SignupPersonal.invalidEmail.isDisplayed()).to.be.true
    expect(SignupPersonal.invalidEmail.getText()).to.contain('is required')
    expect(SignupPersonal.invalidFullname.isDisplayed()).to.be.true
    expect(SignupPersonal.invalidFullname.getText()).to.contain('is required')
    expect(SignupPersonal.invalidPassword.isDisplayed()).to.be.true
    expect(SignupPersonal.invalidPassword.getText()).to.contain('is required')
    expect(SignupPersonal.invalidConsent.isDisplayed()).to.be.true
    expect(SignupPersonal.invalidConsent.getText()).to.contain('is required')
  })

  it('email dont have a @', () => {
    SignupPersonal.navigateTo()

    SignupPersonal.fillEmail("invalidemail")
    SignupPersonal.fillPassword(validPassword)
    SignupPersonal.fillName(validName)
    SignupPersonal.clickConsent()

    SignupPersonal.clickNext()
    
    expect(SignupPersonal.invalidEmail.isDisplayed(), "email error message is not displayed").to.be.true
    // This could be done inside a method in Signup
    SignupPersonal.waitElementToChangeText(SignupPersonal.invalidEmail, 'valid email')
    expect(SignupPersonal.invalidEmail.getText(), "email error message doesnt contain valid email").to.contain('valid email')
  })  

  it('consent not checked', () => {
    // We will test that if only consent is missing, it fails 
    SignupPersonal.navigateTo()    

    SignupPersonal.fillEmail(validEmail)
    SignupPersonal.fillPassword(validPassword)
    SignupPersonal.fillName(validName)
    SignupPersonal.unclickConsent()
    SignupPersonal.clickNext()

    SignupPersonal.invalidConsent.waitForDisplayed()
    expect(SignupPersonal.invalidConsent.isDisplayed(), "consent error message is not displayed").to.be.true
    SignupPersonal.waitElementToChangeText(SignupPersonal.invalidConsent, 'is required')
    expect(SignupPersonal.invalidConsent.getText(), "consent error message doesnt contain is required").to.contain('is required')
  })

  it('name cant contain special characters', () => {
    SignupPersonal.navigateTo()

    SignupPersonal.fillEmail(validEmail)
    SignupPersonal.fillPassword(validPassword)
    SignupPersonal.fillName("m! cooL N4M³")
    SignupPersonal.clickConsent()
    SignupPersonal.clickNext()

    SignupPersonal.invalidFullname.waitForDisplayed()
    expect(SignupPersonal.invalidFullname.isDisplayed(), "name error message not displayed").to.be.true
    expect(SignupPersonal.invalidFullname.getText(), "name error message doesnt contain special characters").to.contain('No special characters')
  })

  it('pasword needs to be at least 8 characters', () => {
    SignupPersonal.navigateTo()

    SignupPersonal.fillEmail(validEmail)
    SignupPersonal.fillPassword("no8")
    SignupPersonal.fillName(validEmail)
    SignupPersonal.clickConsent()
    SignupPersonal.clickNext()

    SignupPersonal.invalidPassword.waitForDisplayed()
    expect(SignupPersonal.invalidPassword.isDisplayed(), "password error message not displayed").to.be.true
    expect(SignupPersonal.invalidPassword.getText(), "password error message doesnt contain too short").to.contain('too short')
  })

})

describe('Sign up works', () => {
  
  it('with valid data', () => {
    SignupPersonal.navigateTo()

    var email = defaultUser + uuidv4().substring(0,8) + "@gmail.com"
    var password = uuidv4().substring(0,8)
    SignupPersonal.singUp(email, defaultName, password)

    console.log('Username used is ' + email + ':' + password)
    SignupCompany.waitForUrl()
    expect(browser.getUrl(), "url doesn't contain company").to.contain('signup/signup/#/company')
  })

  // This should be better covered on a UnitTest, not End 2 End
  it('and company fields are present', () => {
    SignupCompany.company.waitForDisplayed()

    expect(SignupCompany.company.isDisplayed(), "company should be visible").to.be.true
    expect(SignupCompany.industry.isDisplayed(), "industry should be visible").to.be.true
    expect(SignupCompany.employees.isDisplayed(), "number of employees should be visible").to.be.true
    expect(SignupCompany.phone.isDisplayed(), "phone should be visible").to.be.true
  })

  it('should fail when capturing a made up field', () => {
    SignupCompany.company.waitForDisplayed()

    expect($('#MadeUpID').isDisplayed(), "A field with #MadeUpID id is not displayed. Which makes sense").to.be.true
  })

  it('number of employees dropdown is correct', () => {
    SignupCompany.employees.waitForDisplayed()

    // This can be a method from the page that, getting an array of values, checks the order
    // expect(SignupCompany.employees.getValue(), "number of employees default value is Select").to.contain('Select')

    SignupCompany.employees.selectByIndex(1)
    expect(SignupCompany.employees.getValue(), "number of employees first value is 1 - 9 ").to.contain('1 - 9')
    SignupCompany.employees.selectByIndex(2)
    expect(SignupCompany.employees.getValue(), "number of employees first value is 10 - 20").to.contain('10 - 20')
    SignupCompany.employees.selectByIndex(3)
    expect(SignupCompany.employees.getValue(), "number of employees first value is 21 - 40").to.contain('21 - 40')
    SignupCompany.employees.selectByIndex(4)
    expect(SignupCompany.employees.getValue(), "number of employees first value is 41 - 100").to.contain('41 - 100')
    SignupCompany.employees.selectByIndex(5)
    expect(SignupCompany.employees.getValue(), "number of employees first value is +101").to.contain('101+')
  })
  
})

