<?php
header('Content-Type:application/json;carset=utf-8');
/*���տͻ����ύ������*/
$pageNum=$_REQUEST['pageNum'];
/*��ͻ������������*/
$pager=[
	'recordCount'=>0,//�ܼ�¼��
	'pageSize'=>8,//ҳ���С
	'pageCount'=>0,//��ҳ��
	'pageNum'=>intval($pageNum),//��ǰҳ��
	'data'=>null
];
/*******************************/
include('0_config.php');
$conn=mysqli_connect($db_url,$db_user,$db_pwd,$db_name,$db_port);
//���ñ��뷽ʽ
$sql="set names utf8";
mysqli_query($conn,$sql);
//��ȡ�ܼ�¼������������ҳ��
$sql="select count(*) from all_product where type='large'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
$pager['recordCount']=intval($row['count(*)']);//�ַ�������Ϊ����
$pager['pageCount']=ceil(($pager['recordCount'])/($pager['pageSize']));//������ҳ��
//��ȡ��ǰָ��ҳ�е�����
$start=($pager['pageNum']-1)*$pager['pageSize'];//�����п�ʼ��ȡ��¼
$count=$pager['pageSize'];//��ȡ������
$sql="select*from all_product where type='large' LIMIT $start,$count";
$result=mysqli_query($conn,$sql);
//��ȡ���еĲ�Ʒ��¼
$pager['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($pager);