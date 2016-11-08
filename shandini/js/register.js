//异步请求头尾
$(function(){$("header").load("../../data/header2.php")});
$(function(){$("footer").load("../../data/footer2.php")});
/*功能1：验证*/
var agree=false;
$('#uname').blur(function(){
if(this.validity.valueMissing){
  $('#uname-msg').removeClass().addClass('fail').html('用户名不能为空！');
  agree=false;
}else{
  $('#uname-msg').removeClass().addClass('succ').html('用户名可以使用！');
  agree=true;
  $('#upwd').focus();
}
});
$('#upwd').blur(function(){
  if(this.validity.valueMissing){
    $('#upwd-msg').removeClass().addClass('fail').html('密码不能为空！');
    this.value='';
    this.focus();
    agree=false;
  }else if(this.validity.patternMismatch){
    $('#upwd-msg').removeClass().addClass('fail').html('请输入6-12位数字！');
    this.value='';
    this.focus();
    agree=false;
  }
  else{
    $('#upwd-msg').removeClass().addClass('succ').html('密码正确！');
    agree=true;
  }
});
$('#email').blur(function(){
  if(this.validity.valueMissing){
    $('#email-msg').removeClass().addClass('fail').html('邮箱不能为空！');
    agree=false;
  } else if(this.validity.typeMismatch){
    $('#email-msg').removeClass().addClass('fail').html('请输入有效的邮箱地址！');
    agree=false;
  }else{
    $('#email-msg').removeClass().addClass('succ').html('邮箱格式正确！');
    agree=true;
  }
});
$('#homepage').blur(function(){
  if(this.validity.typeMismatch){
    $('#homepage-msg').addClass('fail').html('请输入有效的地址！');
    agree=false;
  }else{
    $('#homepage-msg').removeClass().addClass('succ').html('地址正确！');
    agree=true;
  }
});
$('#age').blur(function(){
  if(this.validity.rangeOverflow){
    $('#age-msg').removeClass().addClass('fail').html('请输入正确的年龄！');
    agree=false;
  } else if(this.validity.rangeUnderflow){
    $('#age-msg').removeClass().addClass('fail').html('请输入正确的年龄！');
    agree=false;
  } else{
    $('#age-msg').removeClass().addClass('succ').html('正确！');
    agree=true;
  }
});
$('#birthday').blur(function(){
  if(this.validity.rangeOverflow){
    $('#birthday-msg').removeClass().addClass('fail').html('请输入正确的日期！');
    agree=false;
  } else if(this.validity.rangeUnderflow){
    $('#birthday-msg').removeClass().addClass('fail').html('请输入正确的日期！');
    agree=false;
  } else{
    $('#birthday-msg').removeClass().addClass('succ').html('正确！');
    agree=true;
  }
});
/*功能2：异步提交注册信息*/
  //表单序列化
$('#bt-register').click(function(){
  if(!agree){alert("注册失败！");return;}
  var data=$('#form-register').serialize();
  $.ajax({
    type:'POST',
    url:'../../data/user_add.php',
    data:data,
    success:function(result){
      if(result.msg=='succ'){
        sessionStorage.setItem('loginName',$("#uname").val());
        alert('注册成功！');
        location.href='Flower.html';
      }else{
        alert('注册失败！');
      }
    }
  })
});