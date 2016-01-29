module.exports = function() {

  this.Given("I am on Google", function() {
    client.url('http://google.com')
  });

  this.When('I search for "$query"', function(query) {
    client.setValue('*[name="q"]', query)
    client.click('button[type="submit"]')
  });

  this.Then('I see a link to "$url"', function(url) {
    return client.waitForExist('a[href*="' + url + '"]', 3000)
  });

};
