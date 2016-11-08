<?php
header('Content-Type:application/json;carset=utf-8');
/*接收客户端提交的数据*/
$pageNum=$_REQUEST['pageNum'];
/*向客户端输出的数据*/
$pager=[
	'recordCount'=>0,//总记录数
	'pageSize'=>8,//页面大小
	'pageCount'=>0,//总页数
	'pageNum'=>intval($pageNum),//当前页号
	'data'=>null
];
/*******************************/
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
//设置编码方式
$sql="set names utf8";
mysqli_query($conn,$sql);
//获取总记录数，并计算总页数
$sql="select count(*) from all_product where type='large'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$pager['recordCount']=intval($row['count(*)']);//字符串解析为整数
$pager['pageCount']=ceil(($pager['recordCount'])/($pager['pageSize']));//计算总页数
//获取当前指定页中的数据
$start=($pager['pageNum']-1)*$pager['pageSize'];//从哪行开始读取记录
$count=$pager['pageSize'];//读取多少行
$sql="select*from all_product where type='large' LIMIT $start,$count";
$result=mysqli_query($conn,$sql);
//读取所有的产品记录
$pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($pager);