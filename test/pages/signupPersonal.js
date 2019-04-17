import Page from './page'

class Signup extends Page{
  get email() {
    return $('#email')
  }
  get invalidEmail() {
    return $('#emailInvalid')
  }
  get password() {
    return $('#password')
  }
  get invalidPassword() {
    return $('#passwordInvalid')
  }
  // Ideally this should use an ID instead of a 'name'
  get step_1_button() {
    return $("//button[@name='step_1_button']")
  }
  get fullname() {
    return $('#fullname')
  }
  get invalidFullname() {
    return $('#fullnameInvalid')
  }
  // Consent ID is hidden, so we have to rely on clicking the text, which changes sizes when an error message is displayed
  get consent() {
    return $('#consentFormGroup')
  }
  get consentBox(){
    return $('#consent')
  }
  get invalidConsent() {
    return $('#consentInvalid')
  }

  navigateTo(){
    super.open('/signup/signup/#/personal')
  }

  waitForUrl(){
    super.waitForUrl('/signup/signup/#/personal')
  }

  fillEmail(email, timeout=this.defaultTimeout) {
    this.email.waitForExist(timeout)
    this.email.setValue(email)
    return this
  }

  fillName(name, timeout=this.defaultTimeout) {
    this.fullname.waitForExist(timeout)
    this.fullname.setValue(name)
    return this
  }

  fillPassword(password, timeout=this.defaultTimeout) {
    this.password.waitForExist(timeout)
    this.password.setValue(password)
    return this
  }

  clickConsent(timeout=this.defaultTimeout) {
    this.consent.waitForExist(timeout)
    if (!this.consentBox.isSelected()){ 
      this.consent.click()
    }
    return this
  }

  unclickConsent(timeout=this.defaultTimeout) {
    this.consent.waitForExist(timeout)
    if (this.consentBox.isSelected()){ 
      this.consent.click()
    }
    return this
  }

  clickNext(timeout=this.defaultTimeout) {
    this.step_1_button.waitForExist(timeout)
    this.step_1_button.click()
    return this
  }

  singUp(email, name, password, timeout=this.defaultTimeout){
    this.fillEmail(email)
    this.fillName(name)
    this.fillPassword(password)
    this.clickConsent()
    this.clickNext()
    //Wait for something
    return this
  }

}

module.exports = new Signup()
