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
casper.thenOpen('http://www.yelp.com/biz/kushido-yakitori-oakland');
casper.waitForSelector(".war-button", function() {
  this.capture('3.png');
  this.click('.war-button');
});
casper.waitFor(function check(){
    return this.evaluate(function() {
      return document.querySelectorAll('#rating-5');
    });
  }, function then() {
    this.click('#rating-5');
    this.sendKeys('.form400', "Beautiful intimate room with great food.  Highly would recommend the Octupus Balls, seriously (not joking). Ambiance is perfect for intimate dates and gatherings.  Would highly recommend coming back!");
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