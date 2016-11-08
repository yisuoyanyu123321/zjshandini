<?php
header('Content-Type:application/json;charset=utf-8');
@$uname=$_REQUEST['uname'];
@$pid=$_REQUEST['pid'];
if(!$uname||!$pid){//若客户端未提交必需的数据
	echo "{}";
	return;
}
$output=[
	//'msg'=>null,
	'uid'=>0,
	'cid'=>0,
	'pid'=>intval($pid),
	'count'=>0
];
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
$sql="set names utf8";
mysqli_query($conn,$sql);
//根据用户名查找用户编号
$sql="select uid from sdn_user where uname='$uname'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$uid=intval($row['uid']);
$output['uid']=$uid;
//根据用户编号查找购物车编号
$sql="select cid from sdn_cart where userId='$uid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
//若用户编号没有对应的购物车编号，则执行添加语句生成购物车，得到购物车编号
if($row){//已有购物车
	$cid=$row['cid'];
}else{
	$sql="insert into sdn_cart values(null,'$uid')";
	$result=mysqli_query($conn,$sql);
	$cid=mysqli_insert_id($conn);
}
$cid=intval($cid);
$output['cid']=$cid;
//根据购物车编号和产品编号，到详情表查询是否有该记录
$sql="select*from sdn_cart_detail where cartId='$cid' and productId='$pid'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
//若详情表中没有该商品记录，则执行插入，购物数量为1
if($row){//已经购买过该商品
	$count=$row['count'];
	//修改购买数量
	$count++;
	$sql="update sdn_cart_detail set count='$count' where cartId='$cid' and product='$pid'";
	mysqli_query($conn,$sql);
}else{//未购买过
	//插入一行购买记录
	$sql="insert into sdn_cart_detail values(null,'$cid','$pid',1)";
	mysqli_query($conn,$sql);
	$count=1;
}
$output['count']=$count;
echo json_encode($output);