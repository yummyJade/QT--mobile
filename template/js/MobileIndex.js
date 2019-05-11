var ip = 'http://47.100.178.113:8082';

//精华系列
!(function(doc, win) {
    var docEle = doc.documentElement, //获取html元素
        event = "onorientationchange" in window ? "orientationchange" : "resize", //判断是屏幕旋转还是resize;
        fn = function() {
            var width = docEle.clientWidth;
            width && (docEle.style.fontSize = 100 * (width / 750) + "px"); //设置html的fontSize，随着event的改变而改变。

        };

    win.addEventListener(event, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);
}(document, window));


function init(){
	getActivityList();
}

init();


function getActivityList(){

		$(".goodlist-menu").empty();

	$.ajax({
	  url: ip + '/select?',
	  dataType: 'json',
	  success: function(data){
	  	if(data.statu == 1){

	  		
	  		var str = '';
	  	var str2 = '';
	  	for(var i = 0, m = data.data.length; i < m; i++){
	  		str2 = '';
	  		for(var j = 0, n = data.data[i].label.length; j < n; j++){
	  			str2+=
	  			`
					<li>${data.data[i].label[j]}</li>
	  			`
	  		}


	  		str += `

				<div class="goodlist-item">
					<div class="decoration">
						<div class="tri">
						</div>
							<img src="../images/star.png" alt="" class="star">
					</div>
					<img src="../images/banner.png" alt="" class="goodlist-item-introImg">
					<div class="description">
						<div class="id" style="display:none;" >${data.data[i].id}</div>
						<div class="listName">${data.data[i].title}</div>
						<div class="listTime">
							<img src="../images/timeIcon.png" alt="">
							<div>${data.data[i].time}</div>
							
						</div>
						<div class="listAddress">
							<img src="../images/addressIcon.png" alt="">
							<div>青岛市 ${data.data[i].zone}</div>
						</div>
						<div class="listLabels clearfix">
							<ul>
							
								`+str2+`
							</ul>
						</div>
					</div>
				</div>

	  		`
	  	}

	  	$(".goodlist-menu").append(str);
	  	}
	  	


	  	
	  }
	});
}