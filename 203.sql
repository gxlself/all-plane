/*
SQLyog Professional v12.08 (64 bit)
MySQL - 5.0.96-community-nt : Database - 203-chat
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`203-chat` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `203-chat`;

/*Table structure for table `m_cache_chat` */

DROP TABLE IF EXISTS `m_cache_chat`;

CREATE TABLE `m_cache_chat` (
  `from_user` char(16) NOT NULL,
  `chat_content` longblob,
  `chat_type` char(20) default NULL,
  `group_id` int(6) default NULL,
  `timestamp` datetime default NULL,
  `chat_content_type` char(20) default NULL,
  `to_user` char(16) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `m_cache_chat` */

insert  into `m_cache_chat`(`from_user`,`chat_content`,`chat_type`,`group_id`,`timestamp`,`chat_content_type`,`to_user`) values ('test1','欢迎来到聊天室','groupChat',1,'2020-04-10 00:00:33','text',''),('111111','Nihao ','groupChat',1,'2020-04-10 00:00:40','text',''),('test1','who are you','groupChat',1,'2020-04-10 00:00:49','text',''),('111111','aaaaaa ','groupChat',1,'2020-04-10 00:00:53','text',''),('111111','你好','groupChat',1,'2020-04-10 00:01:00','text',''),('test1','哪个？','groupChat',1,'2020-04-10 00:01:16','text',''),('test1','tell me','groupChat',1,'2020-04-10 00:01:40','text',''),('111111','you know','groupChat',1,'2020-04-10 00:03:58','text',''),('gxlself','嗯','groupChat',1,'2020-04-10 00:58:24','text',''),('1','啥玩意儿','groupChat',1,'2020-04-10 01:05:48','text',''),('1','睡觉','groupChat',1,'2020-04-10 01:05:54','text',''),('gxlself','睡哇','groupChat',1,'2020-04-10 01:06:23','text',''),('1','斗地主','groupChat',1,'2020-04-10 01:06:33','text',''),('gxlself','没人','groupChat',1,'2020-04-10 01:09:17','text',''),('test1','来人啊','groupChat',1,'2020-04-10 12:44:16','text',''),('awy5456','啥玩意','groupChat',1,'2020-04-10 13:03:55','text',''),('17326864148','输入框小了点','groupChat',1,'2020-04-10 13:19:29','text',''),('17326864148','这玩意用户名就是刚刚输入那个啊','groupChat',1,'2020-04-10 13:19:51','text',''),('17326864148','我还以为手机号注册呢哎呀嘛','groupChat',1,'2020-04-10 13:20:00','text',''),('ChineseNoZhiChi','啧啧','groupChat',1,'2020-04-10 14:20:02','text','');

/*Table structure for table `m_group` */

DROP TABLE IF EXISTS `m_group`;

CREATE TABLE `m_group` (
  `username` char(48) default NULL,
  `avator` blob,
  `sex` int(1) default NULL,
  `group_id` int(6) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `m_group` */

insert  into `m_group`(`username`,`avator`,`sex`,`group_id`) values ('gxlself','�PNG\r\n\Z\n',1,1),('test1','�PNG\r\n\Z\n',0,1);

/*Table structure for table `m_token` */

DROP TABLE IF EXISTS `m_token`;

CREATE TABLE `m_token` (
  `token` varchar(43) NOT NULL,
  `a_token` char(200) NOT NULL,
  `username` char(16) NOT NULL,
  PRIMARY KEY  (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `m_token` */

insert  into `m_token`(`token`,`a_token`,`username`) values ('bFoAMkerCMFROv5RISjIEkH4xmFP3KSORUsPPJqtteY','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEiLCJpYXQiOjE1ODY0NTE5MzUsImV4cCI6MTU4NjYyNDczNX0.bFoAMkerCMFROv5RISjIEkH4xmFP3KSORUsPPJqtteY','1'),('4OzhnKjgiqZZyqHV2uTRPrpdwNcclTj5NZDVjHq5fDM','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE3MzI2ODY0MTQ4IiwiaWF0IjoxNTg2NDk1OTQ2LCJleHAiOjE1ODY2Njg3NDZ9.4OzhnKjgiqZZyqHV2uTRPrpdwNcclTj5NZDVjHq5fDM','17326864148'),('M6uZ1pmx53V3OI8LbtSNd0H57mnR4XjOBAArzOm5-nE','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIiLCJpYXQiOjE1ODY0OTYwNTQsImV4cCI6MTU4NjY2ODg1NH0.M6uZ1pmx53V3OI8LbtSNd0H57mnR4XjOBAArzOm5-nE','2'),('iymWDzxCMEExQSM9woPnbh3OorrgADIVeoosOZszZi4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF3eTU0NTYiLCJpYXQiOjE1ODY0OTUwMDAsImV4cCI6MTU4NjY2NzgwMH0.iymWDzxCMEExQSM9woPnbh3OorrgADIVeoosOZszZi4','awy5456'),('4atzSeWOQYGO3l1jXCbSTUZ-iBnaWwXa--9yJ9lc1Aw','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNoaW5lc2VOb1poaUNoaSIsImlhdCI6MTU4NjQ5OTU4OCwiZXhwIjoxNTg2NjcyMzg4fQ.4atzSeWOQYGO3l1jXCbSTUZ-iBnaWwXa--9yJ9lc1Aw','ChineseNoZhiChi'),('1Fzqae1Yo67Klpz2SuWqd-IbPO4CAMt6omsqMJkcFRU','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd4bHNlbGYiLCJpYXQiOjE1NzYzNzgyNjV9.1Fzqae1Yo67Klpz2SuWqd-IbPO4CAMt6omsqMJkcFRU','gxlself'),('T2FSWTqmM8ZK2s4TLasrGEK658MQlcoVLc1tS6_OwRI','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imxpbmh1YWppZSIsImlhdCI6MTU3NjMzNDU5N30.T2FSWTqmM8ZK2s4TLasrGEK658MQlcoVLc1tS6_OwRI','linhuajie'),('QT19IyXG2ck86accbE8P-4u2xwKBPfvRF7eRUZYqO_8','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwiaWF0IjoxNTg2NDQ3Njg2LCJleHAiOjE1ODY2MjA0ODZ9.QT19IyXG2ck86accbE8P-4u2xwKBPfvRF7eRUZYqO_8','test1'),('1Fto5A37eW3C_haB6jw0qR3b5Qixdx2hbxjfNmTwyR4','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QyIiwiaWF0IjoxNTc2MzM0NTk5fQ.1Fto5A37eW3C_haB6jw0qR3b5Qixdx2hbxjfNmTwyR4','test2'),('Ol5LnmDByn6mEgUa_9d9L09nTKVGQ7GSoLb0TyGfhGU','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3Q0IiwiaWF0IjoxNTg2NDUwMjI5LCJleHAiOjE1ODY2MjMwMjl9.Ol5LnmDByn6mEgUa_9d9L09nTKVGQ7GSoLb0TyGfhGU','test4'),('EWv6ys1XDi8jitJT94bBfB-kApy2BFN8SiMk9F00Ql8','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3Q1IiwiaWF0IjoxNTg2NDUwNDE2LCJleHAiOjE1ODY2MjMyMTZ9.EWv6ys1XDi8jitJT94bBfB-kApy2BFN8SiMk9F00Ql8','test5');

/*Table structure for table `m_users` */

DROP TABLE IF EXISTS `m_users`;

CREATE TABLE `m_users` (
  `username` char(32) NOT NULL,
  `password` char(32) NOT NULL,
  `o_username` char(16) NOT NULL,
  `o_password` char(16) NOT NULL,
  `login_status` int(2) default '0',
  PRIMARY KEY  (`username`,`o_username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `m_users` */

insert  into `m_users`(`username`,`password`,`o_username`,`o_password`,`login_status`) values ('5677d5a71da3672e37a339d0262fda97','e10adc3949ba59abbe56e057f20f883e','awy5456','123456',1),('5a105e8b9d40e1329780d62ea2265d8a','e10adc3949ba59abbe56e057f20f883e','test1','123456',1),('5c1338f06725fee21bfe6e43ef2a18e0','e10adc3949ba59abbe56e057f20f883e','gxlself','123456',1),('5f8ec14055e33fa2c310c4ffb13ed72e','5f8ec14055e33fa2c310c4ffb13ed72e','linhuajie','linhuajie',1),('6046e3e2e057d84c5e3169254991cf94','4e53b39459e85f528e6cd4f807c69317','awy5456','awy123',1),('67decdaebf0cb8f0f4c7a50c634087ca','980ac217c6b51e7dc41040bec1edfec8','ChineseNoZhiChi','dddddd',1),('68131b63adec1742c73be142dd9effb7','c25986dd5411f576ff28ba7e439b706c','17326864148','herui980322',1),('86985e105f79b95d6bc918fb45ec7727','e10adc3949ba59abbe56e057f20f883e','test4','123456',1),('8ad8757baa8564dc136c1e07507f4a98','e10adc3949ba59abbe56e057f20f883e','test3','123456',1),('96e79218965eb72c92a549dd5a330112','96e79218965eb72c92a549dd5a330112','111111','111111',1),('ad0234829205b9033196ba818f7a872b','e10adc3949ba59abbe56e057f20f883e','test2','123456',1),('c4ca4238a0b923820dcc509a6f75849b','c4ca4238a0b923820dcc509a6f75849b','1','1',1),('c81e728d9d4c2f636f067f89cc14862c','caf1a3dfb505ffed0d024130f58c5cfa','2','321',1),('e3d704f3542b44a621ebed70dc0efe13','e10adc3949ba59abbe56e057f20f883e','test5','123456',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
