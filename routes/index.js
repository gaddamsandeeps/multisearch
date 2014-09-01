
/*
 * GET home page.
 */
var urls = require('../urls.json');

exports.home = function(req, res){
  res.render('home', {title: 'Multi Search' , searchLabel: 'Query' ,json: JSON.stringify(urls) });
};

//third party
exports.urlJson = function(req, res){
	res.json(urls); 
};