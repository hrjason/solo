var casper = require('casper').create();

casper.start('https://www.yelp.com/login');
casper.waitForSelector("form#login-form", function() {
  // this.capture('screenshots.png');
  this.fillSelectors('form#login-form', {
    'input[ name = email ]': 'jasonjchang@me.com',
    'input[ name = password ]': 'graphic123'
  });
  this.capture('1.png');
  this.click('button.ybtn-small');
});
casper.waitForSelector("#loc-bar", function() {
  this.capture('2.png');
});
casper.thenOpen('http://www.yelp.com/biz/chipotle-mexican-grill-san-francisco-3');
casper.waitForSelector(".war-button", function() {
  this.capture('3.png');
  this.click('.war-button');
});
casper.waitFor(function check(){
    return this.evaluate(function() {
      return document.querySelectorAll('#rating-4');
    });
  }, function then() {
    this.click('#rating-3');
    this.sendKeys('.form400', "They ran out of chicken and it was terrible! Three stars mainly because I seem to always keep coming back.  However I wish chipotle really had a better standard across all their restaurants.  Recommend the carnitas with sofrita.");
    this.capture('4.png');
    this.echo("Review left");
});
casper.then(function () {
  this.click('#review-submit-button');
});
casper.waitForSelector(".alert-success", function() {
  this.capture('5.png');
});
casper.then(function() {
  this.exit();
});

casper.run();