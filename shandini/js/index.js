//异步请求头尾
$(function(){$("header").load("../data/header.php")});
$(function(){$("footer").load("../data/footer.php")});
/*广告图片数组*/
var imgs=[
  {"i":0,"img":"http://www.shandini.com/upload/201207/01.jpg"},
  {"i":1,"img":"http://www.shandini.com/upload/201207/02.jpg"},
  {"i":2,"img":"http://www.shandini.com/upload/201207/03.jpg"},
  {"i":3,"img":"http://www.shandini.com/upload/201207/04.jpg"}
];
var slider={
  LIWIDTH:0,//保存每个li的宽度,其实就是#slider的初始宽
  DURATTION:1000,//动画的总时间
  WAIT:3000,//自动轮播之间的等待时间
  timer:null,//保存一次性定时器序号
  canAuto:true,//保存是否可以自动轮播
  init:function(){
    this.LIWIDTH=parseFloat($("#slider").css("width"));
    this.updateView();
    //为#slider_pages的ul添加事件代理，只有不是hover的li才能相应事件
    $("#slider_pages").on("mouseover","li:not(.hover)",
      function(e){
        var $target=$(e.target);//获得目标元素$target
        //调用move方法，传入要移动的个数：
        //目标元素的内容-目标元素的兄弟中class为Hover的li的内容
		this.move($target.attr("title")-$target.siblings(".hover").attr("title"));
    }.bind(this));
    //当鼠标进入#slider时，将canAuto改为false
    //当鼠标移出#slider时，将canAuto改为true
    $("#slider").hover(
      function(){this.canAuto=false;}.bind(this),
      function(){this.canAuto=true;}.bind(this)
    )
    this.autoMove();//启动自动轮播
  },
  autoMove:function(){//启动自动轮播
    //启动一次性定时器
    this.timer=setTimeout(
      function(){
        if(this.canAuto){
          this.move(1);//执行move移动一个
        }else{
          this.autoMove();
        }
      }.bind(this),
      this.WAIT
    )
  },
  move:function(n){
    clearTimeout(this.timer);//停止一次性定时器
    this.timer=null;
    $("#slider_images").stop(true);;
    //获得#slider_images当前的left，转为浮点数
    var left=parseFloat($("#slider_images").css("left"));
    //如果n<0，右移
    if (n<0)//先改数组再移动
    {
      n*=-1;//将n转为正数
      imgs=imgs.splice(imgs.length-n,n).concat(imgs);//先删除结尾的n个元素，拼接到开头
      this.updateView();//更新界面
      $("#slider_images").css("left",left-n*this.LIWIDTH);//修改#imgs的left为left-n*LIWIDTH
      $("#slider_images").animate(//启动动画，在duration时间内,left移动到0
        {left:"0"},
        this.DURATION,
        this.autoMove.bind(this)//启动自动轮播
      );
    }else{//否则，左移，先移动，再改数组
      //让#imgs的ul在DURATION事件内，left变为-n*this.LIWIDTH
      $("#slider_images").animate(
        {left:-n*this.LIWIDTH+"px"},
        this.DURATION,
        this.endMove.bind(this,n)//在动画结束后调用endMove,替换this,传入参数n
      );
    }

  },
  endMove:function(n){
    //删除imgs数组开头的n个元素,再拼接到结尾
    imgs=imgs.concat(imgs.splice(0,n));
    this.updateView();//更新页面
    $("#slider_images").css("left",0);//设置#imgs的left为0
    this.autoMove();//启动自动轮播
  },
  updateView:function(){//将数组中的元素更新到页面
    //遍历imgs数组中每个图片对象
    for(var i=0,html="",pages="";i<imgs.length;i++){
      html+="<li><a href='index.html' target='_blank' ><img src='"+imgs[i].img+
      "' title='banner'></a></li>";
	  pages+="<li title='"+(i+1)+"'></li>";
    }
    //设置id为slider_images的内容为html，再设置宽度为LIWIDTH*imgs.length
    $("#slider_images").html(html)
      .css("width",this.LIWIDTH*imgs.length);
    //设置id为slider_pages的内容为pages,
    $("#slider_pages").html(pages);
    //获得#slider_pages下的和imgs中第一个元素的i属性对应的li，设置其class为hover,
    //选择兄弟中的class为hover的li,清除其class
    $("#slider_pages>li:eq("+imgs[0].i+")")
      .addClass("hover")
      .siblings(".hover")
      .removeClass("hover");
  },
}
slider.init();

