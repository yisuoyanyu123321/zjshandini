//异步请求头尾
$(function(){$("header").load("../../data/header2.php")});
$(function(){$("footer").load("../../data/footer2.php")});
//如果用户已经登录，修改欢迎回来
if (sessionStorage['loginName']) {
	$('#login>li:first').html('欢迎回来'+sessionStorage['loginName']);
	$('li.done').css('display','none');
	$('li.esc').css('display','inline-block');
}
$('li.done').click(function(e){
	e.preventDefault();
	$('.modal').fadeIn(300);
});
//用户登录
$('#bt-login').click(function(){
	var inputData=$('#login-form').serialize();
	$.ajax({
		type:'POST',
		url:'../../data/login.php',
		data:inputData,
		success:function(txt){
			if (txt=='ok')
			{//登录成功
				$('.modal').fadeOut(300);
				loginName=$('[name="uname"]').val();//修改欢迎回来
				sessionStorage['loginName']=loginName;
				$('#login>li:first').html('欢迎回来'+loginName);
				$('li.done').css('display','none');
				$('li.esc').css('display','inline-block');
			}else{
				$('.modal .alert').html('登录失败！'+txt);
			}
		}
	});
});
//退出登录
$('li.esc').click(function(){
	sessionStorage.removeItem('loginName');
	$(this).css('display','none');
	$('#login>li:first').html('您好！欢迎来到珊蒂妮');
	$('li.done').css('display','inline-block');
});
//异步加载商品
$(function(){
	loadProductByPage(1);
});
//分页加载商品数据
function loadProductByPage(pageNum){
	$.ajax({
		type:'GET',
		url:'../../data/flower_select.php?pageNum='+pageNum,
		success:function(pager){
			var html="";
			//遍历读取到产品数组，拼接HTML,追加到
			$.each(pager.data,function(i,pro){
				html+="<dl><dt><a href='flower_detail.html' data-pid='"+pro.pid+"'><img src='../../"+pro.pic+
				"'></a><dd>"+pro.pname+
				"</dd><dd>"+pro.price+"</dd><button class='add_cart' data-pid='"+pro.pid+"'>加入购物车</button></dl>"
			});
			$('#product-list').html(html);
			//根据返回的分页数据，动态创建分页条
			var html='';
			if((pager.pageNum-4)>0){
				html+="<a href='"+(pager.pageNum-4)+"'>"+(pager.pageNum-4)+"</a>";}
			if((pager.pageNum-3)>0){
				html+="<a href='"+(pager.pageNum-3)+"'>"+(pager.pageNum-3)+"</a>";}
			if((pager.pageNum-2)>0){
				html+="<a href='"+(pager.pageNum-2)+"'>"+(pager.pageNum-2)+"</a>";}
			if((pager.pageNum-1)>0){
				html+="<a href='"+(pager.pageNum-1)+"'>"+(pager.pageNum-1)+"</a>";}
			html+="<a class='preview' href='#'>"+pager.pageNum+"</a>";
			if((pager.pageNum+1)<=pager.pageCount){
				html+="<a href='"+(pager.pageNum+1)+"'>"+(pager.pageNum+1)+"</a>";}
			if((pager.pageNum+2)<=pager.pageCount){
				html+="<a href='"+(pager.pageNum+2)+"'>"+(pager.pageNum+2)+"</a>";}
			if((pager.pageNum+3)<=pager.pageCount){
				html+="<a href='"+(pager.pageNum+3)+"'>"+(pager.pageNum+3)+"</a>";}
			if((pager.pageNum+4)<=pager.pageCount){
				html+="<a href='"+(pager.pageNum+4)+"'>"+(pager.pageNum+4)+"</a>";}
			$('#pages').html(html);
		}
	});
}
//点击产品图片时，将该产品的pid传递给产品详情页,并传递点击次数+1
$("#product-list").on("click","dl>dt>a",function(){
	var a=this.getAttribute('data-pid');
	sessionStorage.setItem('pid',a);
});
//用户点击页号时，实现跳转
$('#pages').on('click','a',function(event){
	event.preventDefault();
	var pageNum=$(this).attr('href');//获取要跳转的页号
	loadProductByPage(pageNum);
});
//用户点击”添到购物车“则实现购物车添加
$("#product-list").on('click','.add_cart',function(event){
	event.preventDefault();
	var pid=$(this).attr('data-pid');
	//发起异步请求
	$.ajax({
		type:'POST',
		url:'../../data/cart_add.php',
		data:{uname:sessionStorage['loginName'],pid:pid},
		success:function(){
			alert("添加成功！");
		}
	});
});
//点击”结算，跳转到购物车详情页面“
$('li.settle_up').click(function(){
	//跳转到购物车详情页
	location.href='shoppingcart.html?loginName='+loginName;
});
//搜索建议
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