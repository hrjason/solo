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
casper.thenOpen('http://www.yelp.com/biz/spicy-garden-restaurant-san-francisco');
casper.waitForSelector(".war-button", function() {
  this.capture('3.png');
  this.click('.war-button');
});
casper.waitFor(function check(){
    return this.evaluate(function() {
      return document.querySelectorAll('#rating-5');
    });
  }, function then() {
    this.click('#rating-4');
    this.sendKeys('.form400', "This place is a bit dirty, and not in the most ideal location.  But I guess it's true what they say when a health grade rating of C stands for good Chinese.  Highly would recommend the Sweet and Sour Pork and Kung Pao Chicken, probably their two best dishes.  Also for the best bang for your buck, come around lunch time.  $7-8 lunch specials for a modest size will probably be the best deal in town!");
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