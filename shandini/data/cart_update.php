<?php
header('Content-Type:text/html');
$did=$_REQUEST['did'];
$count=$_REQUEST['count'];
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
$sql="set names utf8";
mysqli_query($conn,$sql);
$sql="update sdn_cart_detail set count='$count' where did='$did'";
$result=mysqli_query($conn,$sql);
if($result){
	echo 'succ';
}else{
	echo 'err';
}