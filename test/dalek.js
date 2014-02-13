module.exports = {
	'signup exsisting username error': function ( test ) {
		test
		    .open('http://127.0.0.1:3030')
		    .waitForElement('#password')
		    .type('#email', 'jacoblowe2.0@gmail.com')
		   	.type('#password', '123456')
		   	.click('[type="submit"]')
		   	.waitForElement('.error_message')
		   	.assert.text('.error_message')
		   		.is('username jacoblowe2.0@gmail.com already taken')
		   	.done();	
	},
	'signup flow works': function ( test ) {

		// good for now but there also should
		// be a cleanup script
		// and also test for errors in between
		test
		    .open('http://127.0.0.1:3030')
		    .waitForElement('#password')
		    .type('#email', 'temp' + ( Math.random() * 100000 ) + '@gmail.com')
		   	.type('#password', '123456')
		   	.click('[type="submit"]')
		   	.waitForElement('.pure-button.alert.submit-plan')
		   	.click('.plan-list > li >input[type="radio"]')
		   	.click('.submit-plan')
		   	.waitForElement('input[type="submit"]')
		   	.type('#card_number', '4242424242424242')
		   	.type('#cvc', '123')
		   	.type('#card_exp_month', '02')
		   	.type('#card_exp_year', '20')
		   	.click('input[type="submit"]')
		   	.waitForElement('.message')
		   	.assert.text('.message').is('Thanks for joining!')
		    .done();
	},
	'dashboard is working': function ( test ) {

		test
			.open('http://127.0.0.1:3030')
			.waitForElement('#password')
			// login
			.click('.login-switch')
			.type('#email', 'jacoblowe2.0@gmail.com')
		   	.type('#password', '123456')
		   	.click('[type="submit"]')
		   	.waitForElement('#io-dashboard')
		   	.assert.numberOfElements('.main ul > li', 5)
		   	.assert.text('.main h2').is('Hello.')
		   	// donate
		   	.click('[data-view="donate"]')
		   	.waitForElement('#amount')
		   	.type('#amount', '1.00')
		   	.type('#card_number', '4242424242424242')
		   	.type('#cvc', '123')
		   	.type('#card_exp_month', '02')
		   	.type('#card_exp_year', '20')
		   	.click('[type="submit"]')
		   	.waitForElement('#io-dashboard')
		   	.assert.numberOfElements('.main ul > li', 5)
		   	.assert.text('.message')
		   		.is('Thanks! You have been charged $1.00')
		   	// make a payment
		   	.click('[data-view="payment"]')
		   	.waitForElement('#amount')
		   	.type('#amount', '1.00')
		   	.type('#card_number', '4242424242424242')
		   	.type('#cvc', '123')
		   	.type('#card_exp_month', '02')
		   	.type('#card_exp_year', '20')
		   	.click('[type="submit"]')
		   	.waitForElement('#io-dashboard')
		   	.assert.numberOfElements('.main ul > li', 5)
		   	.assert.text('.message')
		   		.is('Thanks! You have been charged $1.00')
		   	// update plan
		   	.click('[data-view="updateplan"]')
		   	.waitForElement('.pure-button.alert.submit-plan')
		   	.click('.plan-list > li >input[type="radio"]')
		   	.click('.submit-plan')
		   	.waitForElement('#io-dashboard')
		   	.assert.text('.message')
		   		.is('Your plan has been updated.')
		   	// update card
		   	.click('[data-view="updatepayment"]')
		   	.waitForElement('#card_number')
		   	.type('#card_number', '4242424242424242')
		   	.type('#cvc', '123')
		   	.type('#card_exp_month', '02')
		   	.type('#card_exp_year', '20')
		   	.click('[type="submit"]')
		   	.waitForElement('#io-dashboard')
		   	.assert.numberOfElements('.main ul > li', 5)
		   	.assert.text('.message')
		   		.is('Payment Successfully Updated')
		   	//cancel plan
		   	.click('[data-view="cancelplan"]')
		   	.waitForElement('.yes-plan')
		   	.click('.yes-plan')
		   	.waitForElement('#io-dashboard', 10000)
		   	.assert.numberOfElements('.main ul > li', 5)
		   	.assert.text('.message')
		   		.is('Sorry to see you go')
		   	.done();
	}
};