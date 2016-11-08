<?php
header('Content-Type:text/html;charset=UTF-8');
$did=$_REQUEST['did'];
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
$sql="set names utf8";
mysqli_query($conn,$sql);
$sql="delete from sdn_cart_detail where did='$did'";
$result=mysqli_query($conn,$sql);
if($result){
	echo 'succ';
}else{
	echo 'err';
}