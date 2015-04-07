var casper = require('casper').create();
var url = "https://netplanning.telelangue.com/portal1/pages/login.jsp";
var login = "123456";
var password = "424242";

casper.start(url, function() {
	console.log("Getting homepage ...")
	casper.waitForSelector('form#formLogin', function() {
		console.log("Filling login form ...")
	    casper.fill('form#formLogin', {
        	'password': credentials.password,
        	'login':  credentials.login
    	}, true);
	});
});

casper.then(function() {
	self = this;
	nxturl = self.getElementAttribute('frame#nav', 'src');
		if (this.fetchText('.alertLogin') === "Incorrect identification") {
			console.log("Error: invalid login or password")
			self.exit(1);
		}
	console.log("Getting sidebar ...")
	self.start('https://netplanning.telelangue.com/' + nxturl, function() {
		nxturl = this.getElementAttribute('#dd0_li19', 'href');
		if (typeof nxturl === "undefined" || nxturl === null) {
			console.log("Error while starting session")
			self.exit(1);
		}
		console.log("Starting session ...")
		self.start('https://netplanning.telelangue.com/' + nxturl);
		console.log("Session is started, program will shutdown in 10 minutes")
	});
});

casper.run(function() {
	window.setTimeout(function() {
		casper.exit(0)
	}, 10 * 60 * 1000);
});