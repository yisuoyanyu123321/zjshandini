<?php
header('Content-Type:application/json;charset=utf-8');
$kw=$_REQUEST['kw'];
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
$sql="set names utf8";
mysqli_query($conn,$sql);
$sql="select pid from all_product where pname like '%$kw%'";
$result=mysqli_query($conn,$sql);
//从查询结果集中获取数据
$list=mysqli_fetch_all($result);
$arr=[];
for($i=0;$i<count($list);$i++){
	$pid=$list[$i][0];
	$output['pid']=$pid;
	$sql="select pname from all_product where pid=$pid";
    $result=mysqli_query($conn,$sql);
    $output['pname']=mysqli_fetch_assoc($result)['pname'];
    $sql="select pic from all_product where pid=$pid";
    $result=mysqli_query($conn,$sql);
    $output['pic']=mysqli_fetch_assoc($result)['pic'];
    $sql="select price from all_product where pid=$pid";
    $result=mysqli_query($conn,$sql);
    $output['price']=mysqli_fetch_assoc($result)['price'];
    $arr[]=$output;
}
echo json_encode($arr);

