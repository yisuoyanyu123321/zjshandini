//异步请求头尾
$(function(){$("header").load("../data/header.php")});
$(function(){$("footer").load("../data/footer.php")});
//验证客户提交的信息
uname.onblur = function () {
  var span = this.nextElementSibling.nextElementSibling;
  if (this.validity.valueMissing) {
    this.setCustomValidity("姓名不能为空");
    span.setAttribute("class", "fail");
    span.innerHTML = "请输入您的姓名";
  } else {
    span.setAttribute("class", "succ");
    span.innerHTML = "验证通过";
  }
};
uname.onfocus=function(){
  this.nextElementSibling.nextElementSibling.innerHTML="请输入您的姓名";
  this.nextElementSibling.nextElementSiblingclassName="active";
};

email.onblur = function () {
  var span = this.nextElementSibling;
  console.log(this.validity);
  if(this.validity.typeMismatch){
    this.setCustomValidity("请输入您的邮箱");
    span.setAttribute("class", "fail");
    span.innerHTML = "邮箱格式错误！";
  } else{
    span.setAttribute("class", "succ");
    span.innerHTML = "正确的邮箱";
  }
};