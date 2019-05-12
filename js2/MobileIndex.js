"use strict";

var ip = "http://47.100.178.113:8082"; //精华系列

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

function init() {
  getActivityList();
}

init();

function getActivityList() {
  $(".goodlist-menu").empty();
  $.ajax({
    url: ip + "/select?",
    dataType: "json",
    success: function success(data) {
      if (data.statu == 1) {
        var str = "";
        var str2 = "";

        for (var i = 0, m = data.data.length; i < m; i++) {
          str2 = "";

          for (var j = 0, n = data.data[i].label.length; j < n; j++) {
            str2 += "\n\t\t\t\t\t<li>".concat(
              data.data[i].label[j],
              "</li>\n\t  \t\t\t"
            );
          }

          str +=
            '\n\n\t\t\t\t<div class="goodlist-item">\n\t\t\t\t\t<div class="decoration">\n\t\t\t\t\t\t<div class="tri">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<img src="../static/images/star.png" alt="" class="star">\n\t\t\t\t\t</div>\n\t\t\t\t\t<img src="../static/images/'
              .concat(
                data.data[i].label[0],
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

        $(".toHead").show();
        $(".goodlist-menu").append(str);
      }
    }
  });
}
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
}); // $(".hot-labels-item").click(function(){
//  // var index =
//  var searchText = $(this).text() ;
//  searchText.trim(searchText)
//     var searchUrl = encodeURI("list.html?label=" + searchText.trim(searchText) ); //使用encodeURI编码
//     window.location.href = searchUrl;
// })
