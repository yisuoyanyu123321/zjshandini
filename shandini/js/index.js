//�첽����ͷβ
$(function(){$("header").load("../data/header.php")});
$(function(){$("footer").load("../data/footer.php")});
/*���ͼƬ����*/
var imgs=[
  {"i":0,"img":"http://www.shandini.com/upload/201207/01.jpg"},
  {"i":1,"img":"http://www.shandini.com/upload/201207/02.jpg"},
  {"i":2,"img":"http://www.shandini.com/upload/201207/03.jpg"},
  {"i":3,"img":"http://www.shandini.com/upload/201207/04.jpg"}
];
var slider={
  LIWIDTH:0,//����ÿ��li�Ŀ��,��ʵ����#slider�ĳ�ʼ��
  DURATTION:1000,//��������ʱ��
  WAIT:3000,//�Զ��ֲ�֮��ĵȴ�ʱ��
  timer:null,//����һ���Զ�ʱ�����
  canAuto:true,//�����Ƿ�����Զ��ֲ�
  init:function(){
    this.LIWIDTH=parseFloat($("#slider").css("width"));
    this.updateView();
    //Ϊ#slider_pages��ul����¼�����ֻ�в���hover��li������Ӧ�¼�
    $("#slider_pages").on("mouseover","li:not(.hover)",
      function(e){
        var $target=$(e.target);//���Ŀ��Ԫ��$target
        //����move����������Ҫ�ƶ��ĸ�����
        //Ŀ��Ԫ�ص�����-Ŀ��Ԫ�ص��ֵ���classΪHover��li������
		this.move($target.attr("title")-$target.siblings(".hover").attr("title"));
    }.bind(this));
    //��������#sliderʱ����canAuto��Ϊfalse
    //������Ƴ�#sliderʱ����canAuto��Ϊtrue
    $("#slider").hover(
      function(){this.canAuto=false;}.bind(this),
      function(){this.canAuto=true;}.bind(this)
    )
    this.autoMove();//�����Զ��ֲ�
  },
  autoMove:function(){//�����Զ��ֲ�
    //����һ���Զ�ʱ��
    this.timer=setTimeout(
      function(){
        if(this.canAuto){
          this.move(1);//ִ��move�ƶ�һ��
        }else{
          this.autoMove();
        }
      }.bind(this),
      this.WAIT
    )
  },
  move:function(n){
    clearTimeout(this.timer);//ֹͣһ���Զ�ʱ��
    this.timer=null;
    $("#slider_images").stop(true);;
    //���#slider_images��ǰ��left��תΪ������
    var left=parseFloat($("#slider_images").css("left"));
    //���n<0������
    if (n<0)//�ȸ��������ƶ�
    {
      n*=-1;//��nתΪ����
      imgs=imgs.splice(imgs.length-n,n).concat(imgs);//��ɾ����β��n��Ԫ�أ�ƴ�ӵ���ͷ
      this.updateView();//���½���
      $("#slider_images").css("left",left-n*this.LIWIDTH);//�޸�#imgs��leftΪleft-n*LIWIDTH
      $("#slider_images").animate(//������������durationʱ����,left�ƶ���0
        {left:"0"},
        this.DURATION,
        this.autoMove.bind(this)//�����Զ��ֲ�
      );
    }else{//�������ƣ����ƶ����ٸ�����
      //��#imgs��ul��DURATION�¼��ڣ�left��Ϊ-n*this.LIWIDTH
      $("#slider_images").animate(
        {left:-n*this.LIWIDTH+"px"},
        this.DURATION,
        this.endMove.bind(this,n)//�ڶ������������endMove,�滻this,�������n
      );
    }

  },
  endMove:function(n){
    //ɾ��imgs���鿪ͷ��n��Ԫ��,��ƴ�ӵ���β
    imgs=imgs.concat(imgs.splice(0,n));
    this.updateView();//����ҳ��
    $("#slider_images").css("left",0);//����#imgs��leftΪ0
    this.autoMove();//�����Զ��ֲ�
  },
  updateView:function(){//�������е�Ԫ�ظ��µ�ҳ��
    //����imgs������ÿ��ͼƬ����
    for(var i=0,html="",pages="";i<imgs.length;i++){
      html+="<li><a href='index.html' target='_blank' ><img src='"+imgs[i].img+
      "' title='banner'></a></li>";
	  pages+="<li title='"+(i+1)+"'></li>";
    }
    //����idΪslider_images������Ϊhtml�������ÿ��ΪLIWIDTH*imgs.length
    $("#slider_images").html(html)
      .css("width",this.LIWIDTH*imgs.length);
    //����idΪslider_pages������Ϊpages,
    $("#slider_pages").html(pages);
    //���#slider_pages�µĺ�imgs�е�һ��Ԫ�ص�i���Զ�Ӧ��li��������classΪhover,
    //ѡ���ֵ��е�classΪhover��li,�����class
    $("#slider_pages>li:eq("+imgs[0].i+")")
      .addClass("hover")
      .siblings(".hover")
      .removeClass("hover");
  },
}
slider.init();

