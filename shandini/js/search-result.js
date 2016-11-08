/**
 * Created by Administrator on 2016/10/27.
 */
//异步请求头尾
$(function(){$("header").load("../../data/header2.php")});
$(function(){$("footer").load("../../data/footer2.php")});
var k=sessionStorage.getItem('kw');
$.ajax({
  url:"../../data/search_feedback.php",
  data:{kw:k},
  success:function(arr){
    if(arr){
      var html="";
      $.each(arr,function(i,obj){
        html+="<dl><dt><a href='flower_detail.html' data-pid='"+obj.pid+"'><img src='../../"
        +obj.pic+"'></a><dd>"+obj.pname+"</dd><dd>"+obj.price+
        "</dd><button class='add_cart' data-pid="+obj.pid+">加入购物车</button></dl>"
      });
      $('#product-list').html(html);
      $(".result_pname").html("'关键字："+k+"'").css("color","#f00");
    }else{
      $(".result_pname").html("'关键字："+k+"'").css("color","#f00");
      $('#product-list').html("没有相关信息");
    }
  }
});
//用户点击”添到购物车“则实现购物车添加（必须使用事件代理）
$("#product-list").on('click','.add_cart',function(event){
  event.preventDefault();
  var pid=$(this).attr('pid');
  $.ajax({
    type:'POST',
    url:'../../data/cart_add.php',
    data:{uname:sessionStorage['loginName'],pid:pid},
    success:function(){
      alert("添加成功！");
    }
  });
});