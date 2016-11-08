<?php
/*接收客户端提交的新用户信息*/
header('Content-Type:application/json;charset=UTF-8');
$uname=$_REQUEST['uname'];
$upwd=$_REQUEST['upwd'];
$email=$_REQUEST['email'];
$homepage=$_REQUEST['homepage'];
$age=$_REQUEST['age'];
$birthday=$_REQUEST['birthday'];
$birthday=strtotime($birthday)*1000;
//链接
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
//提交SQL语句
$sql="set names utf8";
mysqli_query($conn,$sql);
$sql="insert into sdn_user values(null,'$uname','$upwd','$email',
'$homepage','$age','$birthday')";
$result=mysqli_query($conn,$sql);
if($result){
    $output['msg']='succ';
    $output['uid']=mysqli_insert_id($conn);
}else{
$output['msg']='err';
    $output['sql']=$sql;
}
echo json_encode($output);