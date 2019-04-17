# Feedback / Questions

 * The failure cases of Singup are maybe covering too much for being an end to end tests. Most of this coverage should be done on an lower level, so instead of checking all the permutations (that the error messages happen all at the same time, etc.). 

 * Inside company page, Industry id is not camelCase (Industry vs industry), and number of employees is "#Number of employees". That tells me we are getting the ID from database, which means it might be localized.

 * Phone field has no ID 
 <input required="" tabindex="4" type="tel" autocomplete="off" class="form-control" name="phone" id="" placeholder="20 12 34 56" value="" xpath="1" style="">

 * Number of employees value +101 gets changed to 101+

# Pending to do

* The user name/password come from a variable in the CI/Local environment. That way it would be more secure (instead of having it in plain text), and it can change depending on the environment (between production/integration). For the sake of speed, I decided to just add them on the Specs.

* Create a BasePage that will contain common code among the pages. Things like: navigateTo, url, etc.