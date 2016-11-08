if(!sessionStorage['loginName']){
  location.href='Flower.html';
  //未登录的话跳转到登录页
}
$(function(){$("header").load("../../data/header2.php")});
$(function () {
  $.ajax({
    url: '../../data/cart_detail.php',
    data: {uname: sessionStorage['loginName']},
    success: function (detailList) {
      //购物车的详情列表，拼接html片段
      var html = "";
      $.each(detailList, function (i, d) {
        html += "<tr><td><input type='checkbox'/><input type='hidden' name='did' value='"
        + d.did + "' /><div><img src='../../"+ d.pic +"'/></div></td><td><a href='#'>"
        + d.pname +"</a></td><td>"+ d.price +"</td><td><button>-</button><input type='text' value='"
        +d.count+"' /><button>+</button></td><td><span>"+ d.price * d.count +"</span></td>"
        +"<td><a href='" + d.did + "'>删除</a></td></tr>";
      });
      $('#cart tbody').html(html);
    }
  });
});
/*为+和-添加事件监听,单击修改购物数量*/
$('#cart').on('click', 'button', function () {
  var self = this;
  var count = parseInt($(this).siblings('input').val());
  var operation = $(this).html();
  if (operation == '-' && count > 1) {
    count--;
  }
  if (operation == '+') {
    count++;
  }
  var did = $(this).parent().parent().find("input[name='did']").val();
  $.ajax({
    url: '../../data/cart_update.php',
    data: {did: did, count: count},
    success: function (txt) {
      if (txt == 'succ') {
        $(self).siblings('input').val(count);
      } else {
        console.log('修改失败');
      }
    }
  });
});
/*删除*/
$('#cart').on('click', 'a:contains("删除")', function (e) {
  e.preventDefault();
  var did = $(this).attr('href');
  var self=this;
  $.ajax({
    url: '../../data/shopcart_delete.php',
    data: {did: did},
    success: function(txt){
      if(txt=='succ'){
        console.log('删除成功');
        $(self).parent().parent().remove();
      }else{
        console.log('删除失败');
      }
    }
  });
});
var totalPrice=0;
$("#cart>thead input[type='checkbox']").change(function(){
  if($(this).prop('checked')){
    $("#cart>tbody input[type='checkbox']").prop('checked',true);
    var span=$("#cart>tbody span");
    for(var i=0;i<span.length;i++) {
      var price=span[i].innerHTML;
      console.log(price);
      totalPrice += Math.round(price);
    }
  }
  $("#cart_footer>div>span").html('¥'+totalPrice);
});
$("#cart>tbody").on("click","input[type='checkbox']",function(){
  var input=$("#cart>tbody input[type='checkbox']");
  for(var i=0;i<input.length;i++){
    var span=input[i].parentElement.parentElement.lastElementChild.previousElementSibling
      .children;
    if(input[i].checked) {
      totalPrice+=Math.round(span[0].innerHTML);
    }
  }
  $("#cart_footer>div>span").html('¥' + totalPrice);
});
$("#to_pay").click(function(){
  alert('付款成功！');
  location.href="Flower.html"
});
