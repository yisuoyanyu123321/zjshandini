<?php
header('Content-Type:application/json;charset=utf-8');
$uname=$_REQUEST['uname'];
if(!$uname){
	echo '{}';
	return;
}

include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
//设置编码方式
$sql="set names utf8";
mysqli_query($conn,$sql);
//根据用户名查询用户编号，再根据用户编号查询出购物车编号
$sql="select cid from sdn_cart where userId=(select uid from sdn_user where uname='$uname')";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$cid=$row['cid'];
//根据购物车的编号查询出其中的产品
$sql="select did,cartId,productId,count,pname,price,pic from sdn_cart_detail,all_product where cartId='$cid' and productId=pid";//去除无效的结果  productId=pid
$result=mysqli_query($conn,$sql);
$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($list);