// $(document).ready(function(){

	//兼容性太差了还是var比较保险
	var ip = 'http://47.100.178.113:8082';
	var api = '';
	var W,H;
	var blockHeight;
	W = document.documentElement.clientWidth; //获得窗口宽度
	H = document.documentElement.clientHeight; //获得窗口高度
	$(window).resize(function() {
	    W = document.documentElement.clientWidth; //获得窗口宽度
	    H = document.documentElement.clientHeight; //获得窗口高度  
	    $(".blackcover").height((H-0) - blockHeight);
	    console.log("更改")
	})
	var clickIndex = 0;
	$(".topBar>div").click(function(){
		clickIndex++;
		var index = $(this).index();
		blockHeight = $(".barItems>div").eq(index).height() - 0;
		//给黑色遮罩层定位
		$(".black-cover").css({
			'top':blockHeight +'px'
		})
		//如果是展开
		if(clickIndex % 2 == 1){
			
			//先都藏到最上面
			$(".barItems > div").eq(index).animate({
				'margin-top':-blockHeight + 'px'
			},0,function(){
				$(this).animate({
					'margin-top': 0
				},200,function(){
					$(".black-cover").animate({
						'height':(H-0) - blockHeight +'px'
					},200)
				})
			})

			

		}else{


			$(".black-cover").animate({
				'height':0
			},200,function(){
				$(".barItems > div").eq(index).animate({

					'margin-top':-blockHeight + 'px'
				},200,function(){
					$(".barItems > div").eq(index).css({
					'margin-top':'-100rem'
				})
				})
			})
			
			//恢复
			clickIndex = 0;
		}
		
	})
// })


//下拉刷新
$(window).scroll(function () {
     //已经滚动到上面的页面高度
    var scrollTop = $(this).scrollTop();
     //页面高度
    var scrollHeight = $(document).height();
      //浏览器窗口高度
    var windowHeight = $(this).height();
     //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作

     if (scrollTop + windowHeight + 10 > scrollHeight) {
         
 	
      var src ='';

      str = `<div class="goodlist-item"></div>
      <div class="goodlist-item"></div>
      <div class="goodlist-item"></div>
      <div class="goodlist-item"></div>
      <div class="goodlist-item"></div>
      <div class="goodlist-item"></div>

      `;
      $(".goodlist-menu").append(str);

      }
     
});