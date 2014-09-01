
var path = './MultiSearch/urls.json';

function uploadJsonFunction(parent,child,callback){
	var urls = null;
	$.getJSON( "urljson", function( data ) {		
		 urls = data[parent][child];
		 callback(urls)
	 });
	 return urls;
}

$( document ).ready(function() {
	var urls = null
	$('ul#sub-menu li').click(function(e) 
	   { 
		if(this.id){
			var res = this.id.split("-");				
			var query = document.getElementById('q').value;
			search(query,res[0], res[1]);			
		}
	 });

	$( "#go" ).click(function() {
		var query = $( "#q" ).val();
		search(query,'Google', 'Web');		
	});

	function search(query, parent, child){
		if(query.trim().length == 0){
			alert("No empty query!");
			return false;
		}
		var url = uploadJsonFunction(parent,child, function(res){
				if(!res){
							alert("Avoid using this engine...");
							return;
				}
			setFrame(res+query);
			return ;
		});	
	}

	$('a').each(function() {
   var a = new RegExp('/' + window.location.host + '/');
   if(!a.test(this.href)) {
       $(this).click(function(event) {
           event.preventDefault();
           event.stopPropagation();
           window.open(this.href, '_blank');
       });
   }
});
	
});

function setFrame(url){
	document.getElementById('resultsframe').src = url;
}