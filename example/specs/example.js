describe('Chimp Mocha', () => {
  describe('Page title', () => {
    it('should reflect the current page title', () => {
      browser.url('http://www.google.com');
      expect(browser.getTitle()).to.equal('Google');
    });
  });
});
