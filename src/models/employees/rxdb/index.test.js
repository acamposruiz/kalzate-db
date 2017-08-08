// /* eslint-disable */
// "use strict";
//
// const expect = require('chai').expect
// const lib = require('./index')
// const data = require('./data.json')
//
// describe('starwars-names', function() {
//
// 	it('should have a list of all available names', function() {
// 		expect(isArrayOfString(lib.all())).to.be.true;
// 	})
//
// 	it('should allow me to get a random name from the list', function() {
// 		expect(lib.random()).to.satisfy( isIncludedIn(data) )
// 		//expect( isIncludedIn(data)(lib.random()) ).to.be.true
// 	})
//
// })
//
// function isArrayOfString(array) {
// 	return array.every(function(item) {
// 		return typeof item === 'string'
// 	})
// }
//
// function isIncludedIn(array) {
// 	return function(item) {
// 		return array.indexOf(item) >= 0
// 	}
// }
