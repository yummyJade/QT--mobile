
var ip = 'http://47.100.178.113:8082';
function init(){
	$.ajax({
	  url: ip + '/select',
	  dataType: 'json',
	  success: function(data){
	  	console.log(data)
	  }
	});
}

init();