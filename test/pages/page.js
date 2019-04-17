class Page {

  get defaultTimeout() {
    return 3000
  }

	open(path) {
		if (!path) {
		  browser.url("/")
		} else {
		  browser.url(path)
		}
  }
  
  waitForUrl(url, timeout=10000){
    browser.waitUntil(() => {
      return browser.getUrl().includes(url)
      }, timeout, 'url should contain '+url);
  }
  
	reviveFlyout(elem) {
    browser.execute((selector) => {
      const flyout = document.querySelector(selector)
      flyout.setAttribute("style", "display: block; opacity: 1")
    }, elem.selector)
  }

  destroyFlyout(elem) {
    browser.execute((selector) => {
      const flyout = document.querySelector(selector)
      flyout.setAttribute("style", "display: none")
    }, elem.selector)
  }
  
  waitElementToChangeText(element, text, timeout=this.defaultTimeout){
    browser.waitUntil(() => {
      return element.getText().includes(text)
      }, 5000, 'element should containt '+text);
  }
	
}

export default Page
