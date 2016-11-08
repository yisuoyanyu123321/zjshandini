<?php
header('Content-Type:application/json;charset=utf-8');
/*接收客户端提交的数据*/
$pid=$_REQUEST['pid'];
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
//设置编码方式
$sql="set names utf8";
mysqli_query($conn,$sql);
$sql="select click_count from all_product where pid=$pid";
$result=mysqli_query($conn,$sql);
$click_count=mysqli_fetch_assoc($result)['click_count'];
$click_count++;
$sql="update all_product set click_count=$click_count where pid='$pid'";
mysqli_query($conn,$sql);
$output['count']=$click_count;
$sql="select pname from all_product where pid=$pid";
$result=mysqli_query($conn,$sql);
$pname=mysqli_fetch_assoc($result)['pname'];
$output['pname']=$pname;
$sql="select pic from all_product where pid=$pid";
$result=mysqli_query($conn,$sql);
$pic=mysqli_fetch_assoc($result)['pic'];
$output['pic']=$pic;
$next=$pid+1;
$sql="select pname from all_product where pid=$next";
$result=mysqli_query($conn,$sql);
if($result){
	$next_product=mysqli_fetch_assoc($result)['pname'];
	$output['next']=$next_product;
	$output['next_id']=$next;
}else{
	echo 'none';
}
$preview=$pid-1;
$sql="select pname from all_product where pid=$preview";
$result=mysqli_query($conn,$sql);
if($result){
	$prev_product=mysqli_fetch_assoc($result)['pname'];
	$output['prev']=$prev_product;
	$output['prev_id']=$preview;
}else{
	echo 'none';
}
echo json_encode($output);