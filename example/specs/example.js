describe('Search for Chimp BDD', function() {
  before(function() {
    browser.url('http://www.google.com');
    browser.setValue('*[name="q"]', 'Chimp BDD')
    browser.click('button[type="submit"]')
  });
  it('should reflect the current page title', function() {
    expect(browser.waitForExist('a[href*="http://xolv.io"]', 3000))
  });
});
