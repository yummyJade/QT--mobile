var ip = 'http://47.100.178.113:8082';
var isLike = false;
var likeNum ; 
var visitNum;
var id ;
var picId;
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


function getUrlQueryString(names, urls) {
	urls = urls || window.location.href;
	urls && urls.indexOf("?") > -1 ? urls = urls
			.substring(urls.indexOf("?") + 1) : "";
	var reg = new RegExp("(^|&)" + names + "=([^&]*)(&|$)", "i");
	var r = urls ? urls.match(reg) : window.location.search.substr(1)
			.match(reg);
	if (r != null && r[2] != "")
		return unescape(r[2]);
	return null;
};

function getThumbUp({
	id:id
}){
	$.ajax({
	  url: ip + '/infolike?id='+id,
	  dataType: 'json',
	  success: function(data){
	  	if(data.statu == 1){
	  		isLike = data.is_liked;
	  		likeNum = data.like;
	  		visitNum = data.visitor_name;
	  		
	  		getActivityContent({
				id:id
			});
	  	}

	  }
	})
}


function getActivityContent({
	id:id
}){
	$.ajax({
	  url: ip + '/detail?id='+id,
	  dataType: 'json',
	  success: function(data){

	  	var str = '';
	  	var str2 = '';
	  	var str3 = '';
	  	if(data.statu == 1){
	  		//先确认是否点过赞
	  		if(isLike){
	  			str3 = `
					<img src="../static/images/thumbUp.png" alt="">
	  			`
	  		}else{
	  			str3 = `
	  				<img src="../static/images/thumbUp.png" alt="" class="hide">
					<img src="../static/images/thumbIcon.png" alt="">
	  			`
	  		}

	  		

	  		for(var i = 0; i < data.data.label.length; i++){
	  			
	  			str2+=
	  			`
	  				<li>${data.data.label[i]}</li>
	  			`
	  		}
	  		picId = bigIf(data.data.label[0]);
	  		str = 

	  		`
	  			<div class="goodlist-item">
				
						<img src="../static/images/${picId}.png" alt="" class="goodlist-item-introImg">
						<div class="description">
							<div class="id" style="display:none;" >${data.data.id}</div>	
							<div class="listName">${data.data.title}</div>
							<div class="bottom">
								<div class="listLabels clearfix">
									<ul>
										
										`+str2+`
									</ul>
								</div>
								<div class="others">
									<div class="thumbUp">
									`+str3+`
										
										
										<span>${data.data.like}</span>
									</div>
									<div class="see">
										<img src="../static/images/seeIcon.png" alt="">
										<span>${visitNum}</span>
									</div>

								</div>
							</div>
							
							<div class="listTime">
								<img src="../static/images/timeIcon.png" alt="">
								<div>${data.data.time}</div>
								
							</div>
							<div class="listAddress">
								<img src="../static/images/addressIcon.png" alt="">
								<div>青岛市 ${data.data.zone} ${data.data.address}</div>
							</div>
							<div class="listSponsor">
								<img src="../static/images/sponsorIcon.png" alt="">
								<div>主办单位：${data.data.host}</div>
							</div>
								<div class="listContactor">
								<img src="../static/images/contactorIcon.png" alt="">
								<div>联系人：${data.data.person}</div>
							</div>
								<div class="listPhone">
								<img src="../static/images/phoneIcon.png" alt="">
								<div>预约电话：<a href="tel:${data.data.telephone}" style="color: #b3b3b3;">${data.data.telephone}</div>
							</div>
							
						</div>
					</div>



	  		`
	  		$(".content").html(data.data.describe)
	  		$(".goodlist-menu").append(str);
	  	}

	  }

	})
}
$(".goodlist-menu").on("click",".thumbUp",function(){
	if(!isLike){
		var that = this;
		$.ajax({
		  url: ip + '/like?id='+id,
		  dataType: 'json',
		  success: function(data){
		  	if(data.status == 1){

		  		$(that).find("img").eq(0).removeClass("hide");
				$(that).find("img").eq(1).addClass("hide");
				
				$(that).find("span").html(data.like);
			
				$.ajax({
					  url: ip + '/infolike?id='+id,
					  dataType: 'json',
					  success: function(data){
					  	if(data.statu == 1){
					  		isLike = data.is_liked;
					  		likeNum = data.like;
					  		visitNum = data.visitor_name;
					  		
					  		
	  					}

					  }
					})
		  	}
		  }
		});
	}

})

//返回上一页
$(".title img").click(function(){
	window.location.href="../listpage"
})
// function thumbUp(){
// 	$.ajax({
// 	  url: ip + '/like?id='+id,
// 	  dataType: 'json',
// 	  success: function(data){
// 	  	if(data.statu == 1){

// 	  	}
// 	  }
// 	});
// }
function init(){
	$(".goodlist-menu").empty();
	$(".content").html();
	id = getUrlQueryString("id");
	picId = getUrlQueryString("picId");
	getThumbUp({
		id:id
	});

}
function bigIf(str){
	var strback ;
	switch(str){
		case "创新要素路演": strback = "cxysly";break;
		case "观摩科技产业": strback = "gmkjcy";break;
		case "科技惠农扶贫": strback = "kjhnfp";break;
		case "科技政策宣讲": strback = "kjzcxj";break;
		case "科技走进生活": strback = "kjzjsh";break;
		case "科普游园会" : strback = "kpyyh";break;
		case "蓝色海洋" : strback = "lshy";break;
		case "少年爱科学" : strback = "snakx";break;
		case "探秘实验室" : strback = "tmsys";break;
		default : strback = 'lshy';
	}
	
	
	return strback;
}

init();