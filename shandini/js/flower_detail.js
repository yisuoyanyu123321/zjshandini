/**
 * Created by chenxiao on 2016/10/24.
 */
//异步请求头尾
$(function(){$("header").load("../../data/header2.php")});
$(function(){$("footer").load("../../data/footer2.php")});
$(function() {
  var pid = sessionStorage['pid'];
  $.ajax({
    type: 'GET',
    url: '../../data/flower_detail.php',
    data: {pid: pid},
    success: function (obj) {
      sessionStorage['prev_id'] = obj.prev_id;
      sessionStorage['next_id'] = obj.next_id;
      var html = "<img src='../../" + obj.pic + "' title='" + obj.pname + "'>";
      $("div.img>a").html(html);
      $("#detail>p:first-child>span").html(obj.pname);
      if (obj.prev) {
        $(".link>p.prev>a,.foot>p.prev>a").html(obj.prev)
      } else {
        $(".link>p.prev>a,.foot>p.prev>a").html("没有了").css('color', '#333');
      }
      if (obj.next) {
        $(".link>p.next>a,.foot>p.next>a").html(obj.next)
      } else {
        $(".link>p.next>a,.foot>p.next>a").html("没有了").css('color', '#333');
      }
      $("span.count").html(obj.count);
    }
  });
});
//点击上一条
$(".link>p.prev>a,.foot>p.prev>a").click(function(){
  var pid=sessionStorage['prev_id'];
  $.ajax({
    type: 'GET',
    url: '../../data/flower_detail.php',
    data: {pid: pid},
    success: function (obj) {
      sessionStorage['prev_id'] = obj.prev_id;
      sessionStorage['next_id'] = obj.next_id;
      var html = "<img src='../../" + obj.pic + "' title='" + obj.pname + "'>";
      $("div.img>a").html(html);
      $("#detail>p:first-child>span").html(obj.pname);
      if (obj.prev) {
        $(".link>p.prev>a,.foot>p.prev>a").html(obj.prev)
      } else {
        $(".link>p.prev>a,.foot>p.prev>a").html("没有了").css('color', '#333');
      }
      if (obj.next) {
        $(".link>p.next>a,.foot>p.next>a").html(obj.next)
      } else {
        $(".link>p.next>a,.foot>p.next>a").html("没有了").css('color', '#333');
      }
      $("span.count").html(obj.count);
    }
  });
});
//点击下一条
$(".link>p.next>a,.foot>p.next>a").click(function(){
  var pid=sessionStorage['next_id'];
  $.ajax({
    type: 'GET',
    url: '../../data/flower_detail.php',
    data: {pid: pid},
    success: function (obj) {
      sessionStorage['prev_id'] = obj.prev_id;
      sessionStorage['next_id'] = obj.next_id;
      var html = "<img src='../../" + obj.pic + "' title='" + obj.pname + "'>";
      $("div.img>a").html(html);
      $("#detail>p:first-child>span").html(obj.pname);
      if (obj.prev) {
        $(".link>p.prev>a,.foot>p.prev>a").html(obj.prev)
      } else {
        $(".link>p.prev>a,.foot>p.prev>a").html("没有了").css('color', '#333');
      }
      if (obj.next) {
        $(".link>p.next>a,.foot>p.next>a").html(obj.next)
      } else {
        $(".link>p.next>a,.foot>p.next>a").html("没有了").css('color', '#333');
      }
      $("span.count").html(obj.count);
    }
  });
});
//搜索
//搜索
$("#kw").focus(function(){$(this).val("")});
$("#kw").keyup(function(){
  var k=this.value;
  if(!k){return;}
  $.ajax({
    url:"../../data/search_result.php",
    data:{kw:k},
    success:function(result){
      $("#kw").autocomplete({source:result});
    }
  })
});
//搜索跳转
$("#search").click(function(){
  var k=$("#kw").val();
  if(!k){return;}
  sessionStorage.setItem('kw',k);
  location.href="search-result.html";
});
//放大镜
var zoom={
  MSIZE:200,//保存mask的大小
  MAXLEFT:205,MAXTOP:205,//保存mask可用的最大坐标
  init:function(){
    //为id为superMask的div添加hover事件,切换mask的显示和隐藏,再绑定鼠标移动事件为moveMask
    $("#superMask").hover(this.toggle,this.toggle)
      .mousemove(
      this.moveMask.bind(this));
  },
  moveMask:function(e){
    var x=e.offsetX;//获得鼠标相对于父元素的x
    var y=e.offsetY;//获得鼠标相对于父元素的y
    //计算mask的left: x-MSIZE/2
    var left=x-this.MSIZE/2;
    //计算mask的top: y-MSIZE/2
    var top=y-this.MSIZE/2;
    //如果left越界，要改回边界值
    left=left<10?10:
      left>this.MAXLEFT?this.MAXLEFT:
        left;
    //如果top越界，要改回边界值
    top=top<10?10:
      top>this.MAXTOP?this.MAXTOP:
        top;
    //设置id为mask的元素的left为left,top为top
    $("#mask").css({left:left,top:top});
    //设置id为largeDiv的背景图片位置:
    $("#largeDiv").css(
      "backgroundPosition",
      -left*16/7+"px "+-top*16/7+"px");
  },
  toggle:function(){//切换mask的显示和隐藏
    $("#mask").toggle();
    $("#largeDiv").toggle();
    //如果largeDiv的display为block
    if($("#largeDiv").css("display")=="block"){
      //获得mImg的src
      var src=$("div.img>a>img").attr("src");
      $("#largeDiv").css(
        "backgroundImage","url("+src+")");
    }
  }
};
zoom.init();
//分享到公众平台
window._bd_share_config = {
  "common": {
    "bdSnsKey": {
      "tsina": "sina",
      "tqq": "qq",
      "t163": "wangyi",
      "tsohu": "souhu"
    },
    "bdText": "浙江珊蒂妮园艺科技公司",
    "bdMini": "2",
    "bdMiniList": false,
    "bdPic": "",
    "bdStyle": "0",
    "bdSize": "16"
  },
  "share": {},
  "image": {
    "viewList": [
      "qzone", "tsina", "tqq", "renren", "weixin"],
    "viewText": "分享到：", "viewSize": "16"
  },
  "selectShare": {
    "bdContainerClass": null,
    "bdSelectMiniList": [
      "qzone", "tsina", "tqq", "renren", "weixin"]
  }
};
with (document)0[
  (getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src =
    'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)]