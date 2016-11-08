set names utf8;
drop database if exists flowers;
create database flowers charset=utf8;
use flowers;
create table sdn_user(
	uid int primary key auto_increment,
	uname varchar(32),
	upwd varchar(32),
	email varchar(32),
	homepage varchar(32),
	age int,
	birthday bigint
);
insert into sdn_user values(null,'tom','123456','123@qq.com','www.tom.com',40,52121125),
(null,'mary','456789','321@qq.com','www.mary.com',20,6541565);
create table sdn_cart(
	cid int primary key auto_increment,
	userId int
);
insert into sdn_cart values(100,1);
create table sdn_cart_detail(
	did int primary key auto_increment,
	cartId int,
	productId int,
	count int
);
insert into sdn_cart_detail values(1,100,10,3),
(2,100,15,1),(3,100,18,2);
create table all_product(
	pid int primary key auto_increment,
	pname varchar(64),
	price float(10,2),
	pic varchar(128),
	type varchar(16),
	click_count int
);
insert into all_product values(null,'英冠玉',25.00,'images/flowers/small_001.JPG','small',0),
(null,'银斑葛
',20.00,'images/flowers/small_002.JPG','small',0),(null,'鸭脚木
',25.00,'images/flowers/small_003.JPG','small',0),(null,'橡皮树
',20.00,'images/flowers/small_004.JPG','small',0),(null,'夏威夷竹
',25.00,'images/flowers/small_005.JPG','small',0),(null,'文竹
',25.00,'images/flowers/small_006.JPG','small',0),(null,'太阳神
',30.00,'images/flowers/small_007.JPG','small',0),(null,'双线竹芋
',25.00,'images/flowers/small_008.JPG','small',0),(null,'清香木
',25.00,'images/flowers/small_009.JPG','small',0),(null,'琴叶榕
',20.00,'images/flowers/small_010.JPG','small',0),(null,'碰碰香
',25.00,'images/flowers/small_011.JPG','small',0),(null,'芦荟
',35.00,'images/flowers/small_012.JPG','small',0),(null,'虎皮兰
',30.00,'images/flowers/small_013.JPG','small',0),(null,'富贵竹
',25.00,'images/flowers/small_014.JPG','small',0),(null,'单药花
',25.00,'images/flowers/small_015.JPG','small',0),(null,'菠萝
',20.00,'images/flowers/small_016.JPG','small',0),(null,'爱心发财树
',25.00,'images/flowers/small_017.JPG','small',0),(null,'绿帝王
',20.00,'images/flowers/small_018.JPG','small',0),(null,'吊兰
',30.00,'images/flowers/small_019.JPG','small',0),(null,'白掌
',25.00,'images/flowers/small_020.JPG','small',0),(null,'碧玉
',35.00,'images/flowers/small_021.JPG','small',0),(null,'长寿花
',25.00,'images/flowers/small_022.JPG','small',0),(null,'龟背竹
',20.00,'images/flowers/small_023.jpg','small',0),(null,'金心也门铁
',25.00,'images/flowers/small_024.JPG','small',0),(null,'酒瓶兰
',30.00,'images/flowers/small_025.JPG','small',0),(null,'君子兰
',20.00,'images/flowers/small_026.JPG','small',0),(null,'罗汉松
',30.00,'images/flowers/small_027.JPG','small',0),(null,'蒲葵
',25.00,'images/flowers/small_028.JPG','small',0),(null,'铁皮石斛
',20.00,'images/flowers/small_029.JPG','small',0),(null,'万年青
',25.00,'images/flowers/small_030.JPG','small',0),(null,'富贵蕨
',50.00,'images/flowers/middle_001.JPG','middle',0),(null,'铁树',50.00,'images/flowers/middle_002.JPG','middle',0),
(null,'太阳神',80.00,'images/flowers/middle_003.JPG','middle',0),
(null,'绿萝',50.00,'images/flowers/middle_004.JPG','middle',0),
(null,'龙血树',100.00,'images/flowers/middle_005.JPG','middle',0),
(null,'龙舌兰',60.00,'images/flowers/middle_006.JPG','middle',0),
(null,'金钻',80.00,'images/flowers/middle_007.JPG','middle',0),
(null,'金心也门铁',90.00,'images/flowers/middle_008.JPG','middle',0),
(null,'棕竹',80.00,'images/flowers/middle_009.JPG','middle',0),
(null,'龙骨',100.00,'images/flowers/middle_010.JPG','middle',0),
(null,'螺纹铁',60.00,'images/flowers/middle_011.JPG','middle',0),
(null,'千年木',100.00,'images/flowers/middle_012.JPG','middle',0),
(null,'人参榕',120.00,'images/flowers/middle_013.JPG','middle',0),
(null,'万年青',70.00,'images/flowers/middle_014.JPG','middle',0),
(null,'巴西铁树',140.00,'images/flowers/middle_015.JPG','middle',0),
(null,'海芋',110.00,'images/flowers/middle_016.JPG','middle',0),
(null,'蝴蝶兰',160.00,'images/flowers/middle_017.JPG','middle',0),
(null,'造型榕',180.00,'images/flowers/middle_018.JPG','middle',0),
(null,'针葵',160.00,'images/flowers/middle_019.JPG','middle',0),
(null,'组合1',260.00,'images/flowers/middle_020.JPG','middle',0),
(null,'组合2',260.00,'images/flowers/middle_021.JPG','middle',0),
(null,'针葵',220.00,'images/flowers/large_001.JPG','large',0),
(null,'幸福树',220.00,'images/flowers/large_002.JPG','large',0),
(null,'香蕉树',220.00,'images/flowers/large_003.JPG','large',0),
(null,'夏威夷竹',220.00,'images/flowers/large_004.JPG','large',0),
(null,'天堂鸟',220.00,'images/flowers/large_005.JPG','large',0),
(null,'绿萝',220.00,'images/flowers/large_006.JPG','large',0),
(null,'绿宝',220.00,'images/flowers/large_007.JPG','large',0),
(null,'螺纹铁',220.00,'images/flowers/large_008.JPG','large',0),
(null,'柳叶榕',220.00,'images/flowers/large_009.JPG','large',0),
(null,'发财树',220.00,'images/flowers/large_010.JPG','large',0),
(null,'巴西木',220.00,'images/flowers/large_011.JPG','large',0),
(null,'澳洲杉',220.00,'images/flowers/large_012.jpg','large',0),
(null,'巴西美人',220.00,'images/flowers/large_013.jpg','large',0),
(null,'大叶伞',220.00,'images/flowers/large_014.jpg','large',0),
(null,'花叶榕',220.00,'images/flowers/large_015.jpg','large',0),
(null,'花叶橡皮树',220.00,'images/flowers/large_016.jpg','large',0),
(null,'金山棕',220.00,'images/flowers/large_017.jpg','large',0),
(null,'金钻',220.00,'images/flowers/large_018.jpg','large',0),
(null,'龙血树',220.00,'images/flowers/large_019.jpg','large',0),
(null,'旅人蕉',220.00,'images/flowers/large_020.jpg','large',0),
(null,'绿霸王',220.00,'images/flowers/large_021.jpg','large',0),
(null,'散尾葵',220.00,'images/flowers/large_022.jpg','large',0),
(null,'百合竹',220.00,'images/flowers/large_023.jpg','large',0),
(null,'宝塔榕',220.00,'images/flowers/large_024.jpg','large',0),
(null,'保罗',220.00,'images/flowers/large_025.jpg','large',0);