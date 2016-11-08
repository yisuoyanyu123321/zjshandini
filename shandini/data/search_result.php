<?php
header('Content-Type:application/json');
$kw=$_REQUEST['kw'];
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
$sql="set names utf8";
mysqli_query($conn,$sql);
$sql="select pname from all_product where pname like '%$kw%'";
$result=mysqli_query($conn,$sql);
//从查询结果集中获取数据
$list=mysqli_fetch_all($result);
$arr=array();
for($i=0;$i<count($list);$i++){
	$pname=$list[$i][0];
	$arr[]=$pname;
}
echo json_encode($arr);