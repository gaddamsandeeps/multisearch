
/*
 * GET search listing.
 */
var request = require('request');
var google = require('google');
var urls = require('../urls.json');

exports.retrieve = function(req, res){
	var query = req.param('q');
	var parent = req.param('parent');
	var child = req.param('child');
	getData(parent, child, query, function(results){
			res.send(results);
			res.end();
	});
};

function getData(parent, child, query, callback){
	var url = urls[parent][child];
	if(url.length == 0){		
		global[parent](query, function(results){
			var start = "<div>";
			var end = "</div>";
			var  body = start;
			for (var i = 0; i < results.length; ++i) {
				body +="<div><div><a href="+results[i].link+" target='_blank' >"+results[i].title+" </a></div><div>"+ results[i].description+"</div></div>";
			}
			callback(body);			
		});
	}
	else
	{
		readUrl(url+query, callback);
	}
}

google.resultsPerPage = 10;
global.Google = function (query, callback){
	var results = new Array();
	google(query, function(err, next, links){
	  if (err) callback(err);
	  for (var i = 0; i < links.length; ++i) {
		  var result = new Object();
			result.title = links[i].title;
			result.link = links[i].link;
			result.description = links[i].description;	
			results[i] = result;
	  }
	  callback(results)
	});
}

function readUrl(url,callback){
	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		callback(body) // Print the google web page.
	  }
	});
}

