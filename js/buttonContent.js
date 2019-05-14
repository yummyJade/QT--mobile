var ip = 'http://47.100.178.113:8082';
var isLike = false;
var likeNum ; 
var visitNum;
var id ;
var picId;
var data = [
	{
		id:1,
		title:'“科学引领 问道深蓝”海洋大科学装置展示',
		time:'9:00-17:00',
		address:'中国科学院海洋研究所活动场地B区',
		describe:'展示我国海洋科研实力，让市民和青少年零距离接触“科学”号海洋综合科考船及“发现”号深海机器人、深海可视化取样系统等先进的海洋科考设备模型及讲解，了解最新海洋探测及研究进展，增强市民对海洋科学研究的直观感受和理解。',
		img:3

	},{
		id:2,
		title:'海洋人工智能与大数据中心展厅',
		time:'9:00-17:00',
		address:'中国科学院海洋研究所海洋人工智能与大数据中心展厅',
		describe:'展厅融合了海洋大数据、人工智能、多维可视化以及新一代通信网络等技术，通过交互式触控屏、三维实体球、LED大屏等多媒体形式集成展示海洋大科学研究中心的数据资源、数据产品和专题数据应用，包括海洋科学考察船队调查航迹、高分辨率海底地形、近海观测浮标和西太平洋深海潜标实时数据，以及基于高分辨率数值模式研发的全球海洋热量变化、海洋灾害预警、溢油扩散路径预测、浒苔生态灾害运动路径等专题数据应用。',
		img:1

	},
	{
		id:3,
		title:'VR蛟龙号深海探索体验和VR青少年足球培训系统展示',
		time:'10:00-17:00',
		address:'中国科学院海洋研究所活动场地B区',
		describe:'活动参与人员通过亲身体验VR设备，体验身临其境探索深海，学习海洋探索科技的知识。体验中国首款面向青少年足球培训的集足球训练、生理心理数据分析于一体的VR训练系统。',
		img:3

	},
	{
		id:4,
		title:'水下机器人教学演示',
		time:'9:00-17:00',
		address:'中国科学院海洋研究所活动场地B区',
		describe:'机器人互动表演。通过现场观看、参与水下机器人表演，和机器人互动交流，进而普及科学知识、弘扬科学精神，提高科普效果。',
		img:1

	},
	{
		id:5,
		title:'海信云脑助力构建AI+城市',
		time:'9:00-17:00',
		address:'中国科学院海洋研究所活动场地B区',
		describe:'海信从各专业智慧应用中广泛汇聚城市大数据，借助AI、大数据等前沿技术，构建城市治理和政务服务领域内覆盖面最广的智慧城市知识图谱，打造最贴近大数据局实战需要的城市大数据综合管控和智能决策系统，为用户提供全新的“AI+城市管理”体验。',
		img:1

	},{
		id:6,
		title:'中国科学院海洋生物标本馆',
		time:'暂无相关信息',
		address:'暂无相关信息',
		describe:'该馆收藏了自1889年至今的各类海洋生物标本82万号，是目前我国规模最大、亚洲馆藏量最丰富，集海洋生物标本收藏、海洋生物分类与多样性研究、海洋生物知识科普于一体的大型多功能现代化标本馆。',
		img:1

	},
	{
		id:7,
		title:'中国科学院海洋研究所“公众科学日”系列活动',
		time:'9:00-17:00',
		address:'中国科学院海洋研究所所内实验室和展馆',
		describe:"互动实验："+"</br>"+
			"（1）仿生超疏水表面在海洋腐蚀防护中的应用"+"</br>"+
			"（2）原电池的好与坏——从水果电池到海洋环境电偶腐蚀"+"</br>"+
			"（3）“赤潮灭火器”模拟实验"+"</br>"+
			"（4）养殖水域生态学与生物资源修复实验"+"</br>"+
			"（5）海洋动物转基因与基因编辑平台展示"+"</br>"+
			"（6）海洋微藻及线虫的显微观察实验"+"</br>"+
			"（7）荧光显微镜下细菌形态观察"+"</br>"+
			"（8）“大海里的小巨人”——海洋有孔虫的微观世界"+""
			,
		img:1

	},
	{
		id:8,
		title:'海洋科普大讲堂',
		time:'9:00-16:00',
		address:'中国科学院海洋研究所活动主会场',
		describe:"与全国优秀科普工作者、“科学”号航次首席科学家等海洋专家面对面，普及海洋科学知识，启迪海洋探索梦想。"+"</br>"+
			"（1）走进神奇的海洋生物世界"+"</br>"+
			"（2）海洋的“前世今生”"+"</br>"+
			"（3）美丽的海藻"+"</br>"+
			"（4）吃金属的“海老虎”"+""
			,
		img:0

	},{
		id:9,
		title:'无人机展示、骑行平台展示',
		time:'9:00-17:00',
		address:'中国科学院海洋研究所活动场地B区',
		describe:'展现市南区民营科技企业的研发实力，向公众展示青岛欧森系统技术有限公司自主研发的多款无人机产品，青岛迈金智能科技有限公司的基于互联网应用的智能动感单车。',
		img:1

	},
	{
		id:10,
		title:'青少年STEAM教育集市',
		time:'9:00-17:00',
		address:'中国科学院海洋研究所活动场地B区',
		describe:"STEAM代表科学（Science），技术（Technology），工程（Engineering），艺术（Arts），数学（Mathematics）。STEAM教育就是集科学，技术，工程，艺术，数学多学科融合的综合教育。组织开展科技文化创意系列体验活动，帮助青少年深入领略科技魅力，发现科技奥妙，体验前沿技术与传统文化，并培养逻辑、数学、动手、创造、专注等能力。"+"</br>"+
		"现场将演示：无人机竞技比赛实操体验；无人机航空拍摄应用技术演示和科技周开幕式现场实际拍摄服务；无人机空中抛洒彩花和彩烟飞行；无人机编队花式特技飞行表演等内容。"+"</br>"+
		"（1）智能机器人科技体验活动"+"</br>"+
		"（2）航空模型和智能无人机体验活动"+"</br>"+
		"（3）传统绘画与新型科技相结合的沙画体验活动"+"</br>"+
		"（4）青少年木艺创客体验活动"+""

		,
		img:3

	},
	{
		id:11,
		title:'第十一届青岛市中小学生“我心目中的海洋”主题绘画活动',
		time:'5月19日8：30——10：30',
		address:'青岛银海大世界',
		describe:'来自全市多所中小学校的100名学生代表，在百米画布长卷上挥毫泼墨，用五彩缤纷的画笔描绘出自己心目中的海洋世界，激发青少年热爱海洋、保护海洋的情感。',
		img:1

	},
	{
		id:12,
		title:'科技引领、筑梦未来”主题科技成果展',
		time:'10:00-17:00',
		address:'中国科学院海洋研究所活动场地C区',
		describe:'选取国家、省和市科技奖励代表性成果、中科院海洋所代表性成果等，搭建科技成果展示区，制作科技成果展板，并根据展板内容配备相应的讲解人员，与活动现场人员进行互动交流。',
		img:0

	}

	

]
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

	  		
		var str = '';
		var str2 = '';
		console.log(data)
	  		for(var i = 0; i < data.length; i++){
	  			str2 = "";
	  			for(var j = 0; j < data[i].img; j++){
	  				str2+=`

						<img src="../static/image/introImg-item${i+1}-${j+1}.jpg" alt="">
	  				`
	  			}
	  			
	  			
	  		str = 

	  		`
	  				<div class="goodlist-item">
				
						
						<div class="description">
								
							<div class="listName"><span>${data[i].id}.</span>${data[i].title}</div>
							
							<div class="listTime">
								<img src="../static/images/timeIcon.png" alt="">
								<div>${data[i].time}</div>
								
							</div>
							<div class="listAddress">
								<img src="../static/images/addressIcon.png" alt="">
								<div>${data[i].address}</div>
							</div>

						</div>
						<div class="activityContent">
							<div class="top">
								<div class="line"></div>
								<div class="word">活动内容</div>
								<div class="line"></div>
							</div>
							<div class="content">
								${data[i].describe}
							</div>
							<div class="introImg clearfix">
								`+str2+`
							</div>
						</div>
						<div class="line2"></div>
					</div>



	  		`
	
	  		$(".goodlist-menu").append(str);
	  	}

	  }



//返回上一页
$(".title img").click(function(){
	window.location.href="../listpage"
})


init();