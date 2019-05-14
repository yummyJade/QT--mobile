"use strict";

// $(document).ready(function(){
//要改的bug
//两个按钮切换的状态
var ip = "http://47.100.178.113:8082";
var page = 1;
var zoneIndex = 0;
var labelIndex = "";
var nowClickIndex = -1; //记录当前在哪个功能板块展开

var picId; //其实如果用键值对可能更好
// var zoneArray = {
//  1:"市南区",
//  2:"市北区",
//  3:"黄岛区",
//  4:"李沧区",
//  5:"城阳区"
// }
// var zoneArray = [1,2,10,4,11,5,6,8,7,12,3];
//精华系列

!(function(doc, win) {
  var docEle = doc.documentElement,
    //获取html元素
    event = "onorientationchange" in window ? "orientationchange" : "resize",
    //判断是屏幕旋转还是resize;
    fn = function fn() {
      var width = docEle.clientWidth;
      width && (docEle.style.fontSize = 100 * (width / 750) + "px"); //设置html的fontSize，随着event的改变而改变。
    };

  win.addEventListener(event, fn, false);
  doc.addEventListener("DOMContentLoaded", fn, false);
})(document, window); //兼容性太差了还是var比较保险

var ip = "http://47.100.178.113:8082";
var api = "";
var W, H;
var blockHeight;
W = document.documentElement.clientWidth; //获得窗口宽度

H = document.documentElement.clientHeight; //获得窗口高度

$(window).resize(function() {
  W = document.documentElement.clientWidth; //获得窗口宽度

  H = document.documentElement.clientHeight; //获得窗口高度

  $(".blackcover").height(H - 0 - blockHeight);
});
/**
 *这是区域和分类的点击函数
 */

var clickIndex = 0;
var nextFlag = 1; //是否能再一次操作的flag

$(".topBar>div").click(function() {
  if (!nextFlag) {
    return false;
  }

  clickIndex++;
  var index = $(this).index(); //当遮罩层还在展开状态，要先关掉再切换到另一个选项

  if (nowClickIndex != -1 && nowClickIndex != index) {
    $(".districts-items,.classify-items").css({
      "margin-top": "-100rem"
    });
    $(".black-cover").css({
      height: 0
    }); //恢复

    clickIndex = 1;
    nowClickIndex = -1; //未选中任何状态

    $(".topBar img").addClass("hide");
    $(".topBar>div")
      .eq(0)
      .find("img")
      .eq(0)
      .removeClass("hide");
    $(".topBar>div")
      .eq(1)
      .find("img")
      .eq(0)
      .removeClass("hide");
    $(".topBar > div .show").removeClass("chooseOnNav"); // $(".topBar > div").find("img").removeClass("hide");
  }

  blockHeight =
    $(".barItems>div")
      .eq(index)
      .height() - 0; //给黑色遮罩层定位

  $(".black-cover").css({
    top: blockHeight + "px"
  }); //如果是展开

  if (clickIndex % 2 == 1 && nowClickIndex == -1) {
    //先都藏到最上面
    $(".barItems > div")
      .eq(index)
      .animate(
        {
          "margin-top": -blockHeight + "px"
        },
        0,
        function() {
          $(this).animate(
            {
              "margin-top": 0
            },
            200,
            function() {
              $(".black-cover").animate(
                {
                  height: H - 0 - blockHeight + "px"
                },
                200
              );
            }
          );
        }
      );
    nowClickIndex = index;
    $(this)
      .find(".show")
      .addClass("chooseOnNav");
    $(this)
      .find("img")
      .addClass("hide");
    $(this)
      .find("img")
      .eq(1)
      .removeClass("hide");
  } else if (nowClickIndex == index && clickIndex % 2 == 0) {
    $(".black-cover").animate(
      {
        height: 0
      },
      200,
      function() {
        $(".barItems > div")
          .eq(index)
          .animate(
            {
              "margin-top": -blockHeight + "px"
            },
            200,
            function() {
              $(".barItems > div")
                .eq(index)
                .css({
                  "margin-top": "-100rem"
                });
            }
          );
      }
    ); //恢复

    clickIndex = 0;
    nowClickIndex = -1; //未选中任何状态

    $(".topBar > div .show").removeClass("chooseOnNav");
    $(this)
      .find("img")
      .addClass("hide");
    $(this)
      .find("img")
      .eq(0)
      .removeClass("hide");
  }

  nextFlag = 0;
  setTimeout(function() {
    nextFlag = 1;
  }, 500);
}); // })
//下拉刷新

$(window).scroll(function() {
  //已经滚动到上面的页面高度
  var scrollTop = $(this).scrollTop(); //页面高度

  var scrollHeight = $(document).height(); //浏览器窗口高度

  var windowHeight = $(this).height(); //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作

  if (scrollTop + windowHeight + 10 > scrollHeight) {
    page = page + 1;
    var obj = {
      zone: zoneIndex,
      label: labelIndex,
      page: page
    };
    getActivityList(obj);
  }
});

function getLabelList() {
  $.ajax({
    url: ip + "/labels",
    dataType: "json",
    success: function success(data) {
      var array = [];
      $(".classify-items ul").empty();
      var str = "<li>\u5168\u90E8</li>";

      if (data.statu == 1) {
        array = data.data;

        for (var i = 0, m = data.data.length; i < m; i++) {
          str += "\n\t  \t\t\t\t<li>".concat(
            data.data[i],
            "</li>\n\n\t  \t\t\t"
          );
        }

        $(".classify-items ul").append(str);
        var label =
          getUrlQueryString("label") == null
            ? labelIndex
            : getUrlQueryString("label");
        var tempindex = 0;

        if (label != "") {
          labelIndex = hugeIf(label - 0);

          for (var j = 0; j < array.length; j++) {
            if (labelIndex == array[j]) {
              tempindex = j;
              break;
            }
          }

          $(".classify-menu span").text(labelIndex);
        }else{
          tempindex = -1;
        }

        $(".classify-items ul li").removeClass("chooseOnItem");
        $(".classify-items ul li")
          .eq(tempindex + 1)
          .addClass("chooseOnItem"); //先获取参数

        setTimeout(function() {
          var obj = {
            zone: zoneIndex,
            label: labelIndex,
            page: page
          };
          getActivityList(obj);
        }, 0); //先获取参数
        // let obj = {
        //  zone:zoneIndex,
        //  label:labelIndex,
        //  page:page
        // };
        // getActivityList(obj);
        //给分类加上颜色
        //       var i = -1;
        //    $(".classify-items ul li").each(function(){
        //    if(labelIndex == $(this).text()){
        //    i = $(this).index;
        //    return;
        //  }
        // })
        // //不为1说明参数是有的
        // if(i != -1){
        // $(".classify-items ul li").eq(i).addClass("chooseOnItem");
        // }else{
        //  $(".classify-items ul li").eq(0).addClass("chooseOnItem");
        // }
      }
    }
  });
}

function getActivityList(_ref) {
  var zone = _ref.zone,
    label = _ref.label,
    page = _ref.page;

  if (label == "全部") {
    label = "";
  }

  if (page == 1) {
    $(".goodlist-menu").empty();
  }

  $.ajax({
    url: ip + "/list?zone=" + zone + "&label=" + label + "&page=" + page,
    dataType: "json",
    success: function success(data) {
      if (data.statu == 1) {
        if (data.data.length == 0) {
          $(".toHead").show();
          return;
        } else {
          $(".toHead").hide();
        }

        var str = "";
        var str2 = "";

        for (var i = 0, m = data.data.length; i < m; i++) {
          str2 = "";

          for (var j = 0, n = data.data[i].label.length; j < n; j++) {
            picId = bigIf(data.data[i].label[0]);
            str2 += "\n\t\t\t\t\t<li>".concat(
              data.data[i].label[j],
              "</li>\n\t  \t\t\t"
            );
          }

          str +=
            '\n\n\t\t\t\t<div class="goodlist-item">\n\t\t\t\t\n\t\t\t\t\t<img src="../static/images/'
              .concat(
                picId,
                '.png" alt="" class="goodlist-item-introImg">\n\t\t\t\t\t<div class="description">\n\t\t\t\t\t\t<div class="id" style="display:none;" >'
              )
              .concat(
                data.data[i].id,
                '</div>\n\t\t\t\t\t\t<div class="listName">'
              )
              .concat(
                data.data[i].title,
                '</div>\n\t\t\t\t\t\t<div class="listTime">\n\t\t\t\t\t\t\t<img src="../static/images/timeIcon.png" alt="">\n\t\t\t\t\t\t\t<div>'
              )
              .concat(
                data.data[i].time,
                '</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="listAddress">\n\t\t\t\t\t\t\t<img src="../static/images/addressIcon.png" alt="">\n\t\t\t\t\t\t\t<div>\u9752\u5C9B\u5E02 '
              )
              .concat(
                data.data[i].zone,
                '</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="listLabels clearfix">\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t'
              ) +
            str2 +
            "\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t  \t\t";
        }

        $(".goodlist-menu").append(str);
      } else if (data.msg == "该页为空") {
        $(".toHead").show();
      }
    }
  });
}
/**
 *获取传过来参数的函数
 */

function getUrlQueryString(names, urls) {
  urls = urls || window.location.href;
  urls && urls.indexOf("?") > -1
    ? (urls = urls.substring(urls.indexOf("?") + 1))
    : "";
  var reg = new RegExp("(^|&)" + names + "=([^&]*)(&|$)", "i");
  var r = urls ? urls.match(reg) : window.location.search.substr(1).match(reg);
  if (r != null && r[2] != "") return unescape(r[2]);
  return null;
}

/**
 *初始化函数
 */

function init() {
  //先获取所有的标签
  getLabelList(); // var searchUrl = window.location.href;
  // var searchData = searchUrl.split("="); //截取 url中的“=”,获得“=”后面的参数
  //  var searchData = getUrlQueryString('label');
  //  console.log(searchData)
  //    var searchText = decodeURI(searchData); //decodeURI解码
  // console.log(searchText)
  // var label = getUrlQueryString('label') == null ? labelIndex: getUrlQueryString('label');

  var zone =
    getUrlQueryString("zone") == null ? zoneIndex : getUrlQueryString("zone"); // labelIndex = label;

  zoneIndex = zone; //对应切换选中的颜色

  if (zoneIndex != 0) {
    $(".districts-menu span").text(
      $(".districts-items ul li")
        .eq(zoneIndex)
        .text()
    );
  }

  $(".districts-items ul li").removeClass("chooseOnItem");
  $(".districts-items ul li")
    .eq(zoneIndex)
    .addClass("chooseOnItem"); // if(labelIndex != ""){
  //    $(".classify-menu span").text($(".classify-items ul li").eq(labelIndex).text());
  //  }
  //  $(".classify-items ul li").removeClass("chooseOnItem");
  //  $(".classify-items ul li").eq(labelIndex).addClass("chooseOnItem");
}

init();
/**
 *每一个活动项的点击事件
 */

$(".goodlist-menu").on("click", ".goodlist-item", function() {
  var index = $(this).index();
  var id = $(this)
    .find(".id")
    .text(); //获取对应的id项并拼接传值

  window.location.href = "../content?id=" + id;
  return false;
});
/**
 *选中区域或者区域触发选项
 **/

$(".districts-items ul li").click(function() {
  $(".districts-items ul li").removeClass("chooseOnItem");
  var index = $(this).index();
  zoneIndex = index; // labelIndex = "";

  $(this).addClass("chooseOnItem");
  $(".districts-menu span").text($(this).text()); //如果选中的是全部

  if (index == 0) {
    $(".districts-menu span").text("区域");
  } //获取相关活动

  page = 1;
  var obj = {
    zone: zoneIndex,
    label: labelIndex,
    page: page
  };
  getActivityList(obj); //关闭窗口

  $(".districts-items,.classify-items").css({
    "margin-top": "-100rem"
  });
  $(".black-cover").css({
    height: 0
  }); //恢复

  clickIndex = 0;
  nowClickIndex = -1; //未选中任何状态

  $(".topBar img").addClass("hide");
  $(".topBar>div")
    .eq(0)
    .find("img")
    .eq(0)
    .removeClass("hide");
  $(".topBar>div")
    .eq(1)
    .find("img")
    .eq(0)
    .removeClass("hide");
  $(".topBar > div .show").removeClass("chooseOnNav");
});
$(".classify-items").on("click", "ul li", function() {
  $(".classify-items ul li").removeClass("chooseOnItem");
  var text = $(this).text();
  $(this).addClass("chooseOnItem");
  $(".classify-menu span").text($(this).text()); //如果选中的是全部

  if (text == "全部") {
    $(".classify-menu span").text("分类");
  } //获取相关活动

  page = 1;
  labelIndex = text;
  var obj = {
    zone: zoneIndex,
    label: labelIndex,
    page: page
  };
  getActivityList(obj); //关闭窗口

  $(".districts-items,.classify-items").css({
    "margin-top": "-100rem"
  });
  $(".black-cover").css({
    height: 0
  }); //恢复

  clickIndex = 0;
  nowClickIndex = -1; //未选中任何状态

  $(".topBar img").addClass("hide");
  $(".topBar>div")
    .eq(0)
    .find("img")
    .eq(0)
    .removeClass("hide");
  $(".topBar>div")
    .eq(1)
    .find("img")
    .eq(0)
    .removeClass("hide");
  $(".topBar > div .show").removeClass("chooseOnNav");
});

function getRandNum(m, n) {
  var num = Math.floor(Math.random() * (n - m) + m);
  return num;
}

function bigIf(str) {
  var strback;

  switch (str) {
    case "创新要素路演":
      strback = "cxysly";
      break;

    case "观摩科技产业":
      strback = "gmkjcy";
      break;

    case "科技惠农扶贫":
      strback = "kjhnfp";
      break;

    case "科技政策宣讲":
      strback = "kjzcxj";
      break;

    case "科技走进生活":
      strback = "kjzjsh";
      break;

    case "科普游园会":
      strback = "kpyyh";
      break;

    case "蓝色海洋":
      strback = "lshy";
      break;

    case "少年爱科学":
      strback = "snakx";
      break;

    case "探秘实验室":
      strback = "tmsys";
      break;

    default:
      strback = "lshy";
  }

  return strback;
}

function hugeIf(str) {
  var strback;

  switch (str) {
    case 1:
      strback = "探秘实验室";
      break;

    case 3:
      strback = "少年爱科学";
      break;

    case 5:
      strback = "观摩科技产业";
      break;

    case 6:
      strback = "科技走进生活";
      break;
  }

  return strback;
}
