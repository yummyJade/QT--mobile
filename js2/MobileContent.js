"use strict";

var ip = "http://47.100.178.113:8082";
var isLike = false;
var likeNum;
var visitNum;
var id;
var picId; //精华系列

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
})(document, window);

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

function getThumbUp(_ref) {
  var id = _ref.id;
  $.ajax({
    url: ip + "/infolike?id=" + id,
    dataType: "json",
    success: function success(data) {
      if (data.statu == 1) {
        isLike = data.is_liked;
        likeNum = data.like;
        visitNum = data.visitor_name;
        getActivityContent({
          id: id
        });
      }
    }
  });
}

function getActivityContent(_ref2) {
  var id = _ref2.id;
  $.ajax({
    url: ip + "/detail?id=" + id,
    dataType: "json",
    success: function success(data) {
      var str = "";
      var str2 = "";
      var str3 = "";

      if (data.statu == 1) {
        //先确认是否点过赞
        if (isLike) {
          str3 =
            '\n\t\t\t\t\t<img src="../static/images/thumbUp.png" alt="">\n\t  \t\t\t';
        } else {
          str3 =
            '\n\t  \t\t\t\t<img src="../static/images/thumbUp.png" alt="" class="hide">\n\t\t\t\t\t<img src="../static/images/thumbIcon.png" alt="">\n\t  \t\t\t';
        }

        for (var i = 0; i < data.data.label.length; i++) {
          str2 += "\n\t  \t\t\t\t<li>".concat(
            data.data.label[i],
            "</li>\n\t  \t\t\t"
          );
        }

        picId = bigIf(data.data.label[0]);
        str =
          '\n\t  \t\t\t<div class="goodlist-item">\n\t\t\t\t\n\t\t\t\t\t\t<img src="../static/images/'
            .concat(
              picId,
              '.png" alt="" class="goodlist-item-introImg">\n\t\t\t\t\t\t<div class="description">\n\t\t\t\t\t\t\t<div class="id" style="display:none;" >'
            )
            .concat(
              data.data.id,
              '</div>\t\n\t\t\t\t\t\t\t<div class="listName">'
            )
            .concat(
              data.data.title,
              '</div>\n\t\t\t\t\t\t\t<div class="bottom">\n\t\t\t\t\t\t\t\t<div class="listLabels clearfix">\n\t\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t'
            ) +
          str2 +
          '\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="others">\n\t\t\t\t\t\t\t\t\t<div class="thumbUp">\n\t\t\t\t\t\t\t\t\t' +
          str3 +
          "\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<span>"
            .concat(
              data.data.like,
              '</span>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="see">\n\t\t\t\t\t\t\t\t\t\t<img src="../static/images/seeIcon.png" alt="">\n\t\t\t\t\t\t\t\t\t\t<span>'
            )
            .concat(
              visitNum,
              '</span>\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class="listTime">\n\t\t\t\t\t\t\t\t<img src="../static/images/timeIcon.png" alt="">\n\t\t\t\t\t\t\t\t<div>'
            )
            .concat(
              data.data.time,
              '</div>\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="listAddress">\n\t\t\t\t\t\t\t\t<img src="../static/images/addressIcon.png" alt="">\n\t\t\t\t\t\t\t\t<div>\u9752\u5C9B\u5E02 '
            )
            .concat(data.data.zone, " ")
            .concat(
              data.data.address,
              '</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="listSponsor">\n\t\t\t\t\t\t\t\t<img src="../static/images/sponsorIcon.png" alt="">\n\t\t\t\t\t\t\t\t<div>\u4E3B\u529E\u5355\u4F4D\uFF1A'
            )
            .concat(
              data.data.host,
              '</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="listContactor">\n\t\t\t\t\t\t\t\t<img src="../static/images/contactorIcon.png" alt="">\n\t\t\t\t\t\t\t\t<div>\u8054\u7CFB\u4EBA\uFF1A'
            )
            .concat(
              data.data.person,
              '</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="listPhone">\n\t\t\t\t\t\t\t\t<img src="../static/images/phoneIcon.png" alt="">\n\t\t\t\t\t\t\t\t<div>\u9884\u7EA6\u7535\u8BDD\uFF1A<a href="tel:'
            )
            .concat(data.data.telephone, '" style="color: #b3b3b3;">')
            .concat(
              data.data.telephone,
              "</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\n\n\t  \t\t"
            );
        $(".content").html(data.data.describe);
        $(".goodlist-menu").append(str);
      }
    }
  });
}

$(".goodlist-menu").on("click", ".thumbUp", function() {
  if (!isLike) {
    var that = this;
    $.ajax({
      url: ip + "/like?id=" + id,
      dataType: "json",
      success: function success(data) {
        if (data.status == 1) {
          $(that)
            .find("img")
            .eq(0)
            .removeClass("hide");
          $(that)
            .find("img")
            .eq(1)
            .addClass("hide");
          $(that)
            .find("span")
            .html(data.like);
          $.ajax({
            url: ip + "/infolike?id=" + id,
            dataType: "json",
            success: function success(data) {
              if (data.statu == 1) {
                isLike = data.is_liked;
                likeNum = data.like;
                visitNum = data.visitor_name;
              }
            }
          });
        }
      }
    });
  }
}); //返回上一页

$(".title img").click(function() {
  window.location.href = "../listpage";
}); // function thumbUp(){
//  $.ajax({
//    url: ip + '/like?id='+id,
//    dataType: 'json',
//    success: function(data){
//      if(data.statu == 1){
//      }
//    }
//  });
// }

function init() {
  $(".goodlist-menu").empty();
  $(".content").html();
  id = getUrlQueryString("id");
  picId = getUrlQueryString("picId");
  getThumbUp({
    id: id
  });
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

init();
