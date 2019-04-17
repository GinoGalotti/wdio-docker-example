import Page from './page'

class Signup extends Page{
  get company() {
    return $('#company')
  }
  get invalidCompany() {
    return $('#companyInvalid')
  }
  get industry() {
    return $('#Industry')
  }
  get invalidPassword() {
    return $('#industryInvalid')
  }
  // Ideally this should use an ID instead of a 'name'
  get next_button() {
    return $("//button[@name='step_2_button']")
  }
  get employees() {
    return $("//select[@name='employees']")
  }
  get invalidEmployees() {
    return $('#employeesHelp')
  }
  get phone() {
    return $("//input[@name='phone']")
  }
  get phoneInvalid(){
    return $('#phoneHelp')
  }

  navigateTo(){
    super.open('/signup/signup/#/company')
  }

  waitForUrl(){
    super.waitForUrl('/signup/signup/#/company')
  }

  fillCompany(company, timeout=this.defaultTimeout) {
    this.company.waitForExist(company)
    this.company.setValue(company)
    return this
  }

  selectIndustry(industry, timeout=this.defaultTimeout) {
    this.company.waitForExist(company)
    this.company.setValue(company)
    return this
  }

  selectNumberEmployees(number, timeout=this.defaultTimeout) {
    this.company.waitForExist(company)
    this.company.setValue(company)
    return this
  }

  selectPhoneCountry(country, timeout=this.defaultTimeout){

  }

  fillPhoneNumber(number, timeout=this.defaultTimeout) {
    this.phone.waitForExist(number)
    this.phone.setValue(number)
    return this
  }

  clickNext(timeout=this.defaultTimeout) {
    this.next.waitForExist(timeout)
    this.next.click()
    return this
  }

  singUp(company, industry, numberEmployees, phoneCountry, phoneNumber, timeout=this.defaultTimeout){
    this.fillCompany(email)

    this.clickNext()
    //Wait for something
    return this
  }

}

module.exports = new Signup()
