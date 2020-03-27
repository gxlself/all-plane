/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.0.87-community-nt : Database - allplant
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`allplant` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `allplant`;

/*Table structure for table `h_token` */

DROP TABLE IF EXISTS `h_token`;

CREATE TABLE `h_token` (
  `token` char(1) NOT NULL,
  PRIMARY KEY  (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `h_token` */

/*Table structure for table `h_users` */

DROP TABLE IF EXISTS `h_users`;

CREATE TABLE `h_users` (
  `name` char(16) collate utf8_unicode_ci NOT NULL,
  `sex` int(1) default NULL,
  `address` char(30) collate utf8_unicode_ci default NULL,
  `mobile` int(11) NOT NULL,
  `identity_type` int(1) NOT NULL default '1' COMMENT '身份类型：1-游客  2-飞人',
  `id` varchar(16) collate utf8_unicode_ci NOT NULL,
  PRIMARY KEY  (`mobile`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `h_users` */

/*Table structure for table `m_message` */

DROP TABLE IF EXISTS `m_message`;

CREATE TABLE `m_message` (
  `id` int(8) NOT NULL auto_increment,
  `title` char(50) NOT NULL COMMENT '标题',
  `theme` char(50) NOT NULL COMMENT '主题',
  `content` longtext COMMENT '内容',
  `create_user` char(16) default NULL COMMENT '创建者',
  `create_date` datetime default NULL COMMENT '创建时间',
  `last_modify` datetime default NULL COMMENT '最近一次更新',
  `status` int(1) default NULL COMMENT '审核状态',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

/*Data for the table `m_message` */

insert  into `m_message`(`id`,`title`,`theme`,`content`,`create_user`,`create_date`,`last_modify`,`status`) values (3,'5rWL6K+V5YWs5ZGK5L+h5oGv','5Li76aKYMjEyNTE1','PHA+5Y2V562+5b2T5YmN5pegPC9wPjxwPmhlcmUgYXJlIG11bHRpcGxlIG1vZHVsZXMgd2l0aCBuYW1lcyB0aGF0IG9ubHkgZGlmZmVyIGluIGNhc2luZy48YnI+VGhpcyBjYW4gbGVhZCB0byB1bmV4cGVjdGVkIGJlaGF2aW9yIHdoZW4gY29tcGlsaW5nIG9uIGEgZmlsZXN5c3RlbSB3aXRoIG90aGVyIGNhc2Utc2VtYW50aWMuPGJyPlVzZSBlcXVhbCBjYXNpbmcuIENvbXBhcmUgdGhlc2UgbW9kdWxlIGlkZW50aWZpZXJzOjwvcD48cD48aW1nIHNyYz0iaHR0cDovL2ltZy50LnNpbmFqcy5jbi90NC9hcHBzdHlsZS9leHByZXNzaW9uL2V4dC9ub3JtYWwvNDAvcGNtb3Jlbl90aWFuX29yZy5wbmciIGFsdD0iW+iIlOWxj10iIGRhdGEtdy1lPSIxIj48YnI+PC9wPg==','gxlself','2019-09-30 18:08:32','2019-09-30 18:08:32',1),(4,'5rWL6K+V5YWs5ZGK','5rWL6K+V5YWs5ZGK','PHAgc3R5bGU9InRleHQtYWxpZ246IGxlZnQ7Ij5neGxzZWxmPC9wPjxwIHN0eWxlPSJ0ZXh0LWFsaWduOiBsZWZ0OyI+5bCx5piv5rWL6K+VPC9wPjxwIHN0eWxlPSJ0ZXh0LWFsaWduOiBsZWZ0OyI+PGltZyBzcmM9Imh0dHBzOi8vZ3hsc2VsZi5jb20vaW1hZ2VzL2ljb24tYmxvZy5wbmciIHN0eWxlPSJtYXgtd2lkdGg6MTAwJTsiPjxicj48L3A+','gxlself','2019-11-13 18:51:12','2019-11-13 18:51:12',2),(5,'5rWL6K+V5YWs5ZGK','5rWL6K+V5YWs5ZGK','PHAgc3R5bGU9InRleHQtYWxpZ246IGxlZnQ7Ij5neGxzZWxmPC9wPjxwIHN0eWxlPSJ0ZXh0LWFsaWduOiBsZWZ0OyI+5bCx5piv5rWL6K+VPC9wPjxwIHN0eWxlPSJ0ZXh0LWFsaWduOiBsZWZ0OyI+PGltZyBzcmM9Imh0dHBzOi8vZ3hsc2VsZi5jb20vaW1hZ2VzL2ljb24tYmxvZy5wbmciIHN0eWxlPSJtYXgtd2lkdGg6MTAwJTsiPjxicj48L3A+','gxlself','2019-11-13 18:51:50','2019-11-13 18:51:50',1),(6,'YXNkcWFzZHM=','YXNkYXNkYQ==','PHA+PGltZyBzcmM9Imh0dHA6Ly9pbWcudC5zaW5hanMuY24vdDQvYXBwc3R5bGUvZXhwcmVzc2lvbi9leHQvbm9ybWFsLzQwL3BjbW9yZW5fdGlhbl9vcmcucG5nIiBhbHQ9IlvoiJTlsY9dIiBkYXRhLXctZT0iMSI+PGJyPjwvcD4=','gxlself','2019-11-14 09:23:21','2019-11-14 09:23:21',2),(7,'YXNkcWFzZHM=','YXNkYXNkYQ==','PHA+PGltZyBzcmM9Imh0dHA6Ly9pbWcudC5zaW5hanMuY24vdDQvYXBwc3R5bGUvZXhwcmVzc2lvbi9leHQvbm9ybWFsLzQwL3BjbW9yZW5fdGlhbl9vcmcucG5nIiBhbHQ9IlvoiJTlsY9dIiBkYXRhLXctZT0iMSI+PGJyPjwvcD4=','gxlself','2019-11-14 09:25:29','2019-11-14 09:25:29',2),(8,'ZndlZg==','ZndlZndlZnc=','PHAgc3R5bGU9InRleHQtYWxpZ246IGxlZnQ7Ij5md2VmZndlZmZ3ZWY8L3A+PHAgc3R5bGU9InRleHQtYWxpZ246IGxlZnQ7Ij5mZXd3ZWY8L3A+PHAgc3R5bGU9InRleHQtYWxpZ246IGxlZnQ7Ij5md2Vmd2Vmd2U8L3A+','gxlself','2019-11-14 09:26:14','2019-11-14 09:26:14',2),(9,'ZGVxd2Rm','d2Zld2Z3ZQ==','PHA+ZndlZndlZndlZjwvcD4=','gxlself','2019-11-14 09:57:47','2019-11-14 09:57:47',2),(10,'ZndlZg==','ZndlZndlZg==','PHA+d2VyZndlcjwvcD4=','gxlself','2019-11-14 09:59:18','2019-11-14 09:59:18',2),(12,'ZHF3ZA==','cXdkcXdk','PHA+cXdkcXdkPC9wPg==','gxlself','2019-11-14 10:03:40','2019-11-14 10:03:40',1),(13,'Z2VyZw==','ZXJncmU=','PHA+Z2VyZ2VyZzwvcD4=','gxlself','2019-11-14 10:51:17','2019-11-14 10:51:17',2),(20,'ZmZlZg==','','PHA+PGJyPjwvcD4=','gxlself','2019-11-14 13:44:02','2019-11-14 13:44:02',1),(21,'ZHdkdw==','ZHdkdw==','PHA+PGJyPjwvcD4=','gxlself','2019-11-14 13:44:24','2019-11-14 13:44:24',1),(22,'5rWL6K+V5qCH6aKY','5Li76aKYMQ==','PHAgc3R5bGU9InRleHQtYWxpZ246IGxlZnQiICI9IiI+PHNwYW4gc3R5bGU9InRleHQtZGVjb3JhdGlvbi1saW5lOiB1bmRlcmxpbmU7Ij7lhazlkYrlhoXlrrkmbmJzcDsmbmJzcDs8L3NwYW4+PGJyPjwvcD48cCBzdHlsZT0idGV4dC1hbGlnbjogbGVmdCIgIj0iIj48c3BhbiBzdHlsZT0idGV4dC1kZWNvcmF0aW9uLWxpbmU6IHVuZGVybGluZTsgZm9udC1mYW1pbHk6IFZlcmRhbmE7IGZvbnQtc2l6ZTogeHgtbGFyZ2U7Ij7lhajmlrnkvY3lj5E8L3NwYW4+PC9wPjx0YWJsZSBib3JkZXI9IjAiIHdpZHRoPSIxMDAlIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiPjx0Ym9keT48dHI+PHRoPiZuYnNwO2Zld2Y8L3RoPjx0aD4mbmJzcDtmZXc8L3RoPjx0aD5lZncmbmJzcDs8L3RoPjx0aD5mZXdmJm5ic3A7PC90aD48dGg+Jm5ic3A7d2Vmd2VmPC90aD48L3RyPjx0cj48dGQ+Jm5ic3A7d2VmdzwvdGQ+PHRkPiZuYnNwO2VmPC90ZD48dGQ+Jm5ic3A7d2VmPC90ZD48dGQ+ZXdmJm5ic3A7PC90ZD48dGQ+Jm5ic3A7d2VmPC90ZD48L3RyPjx0cj48dGQ+Jm5ic3A7ZWZ3PC90ZD48dGQ+Jm5ic3A7ZXdmPC90ZD48dGQ+Jm5ic3A7d2VmPC90ZD48dGQ+Jm5ic3A7ZXdmPC90ZD48dGQ+Jm5ic3A7ZXdmPC90ZD48L3RyPjx0cj48dGQ+Jm5ic3A7ZndlPC90ZD48dGQ+ZndlJm5ic3A7PC90ZD48dGQ+ZiZuYnNwOzwvdGQ+PHRkPndlZiZuYnNwOzwvdGQ+PHRkPmYmbmJzcDs8L3RkPjwvdHI+PHRyPjx0ZD4mbmJzcDtmd2VmPC90ZD48dGQ+Jm5ic3A7ZXdmd2U8L3RkPjx0ZD5md2UmbmJzcDs8L3RkPjx0ZD4mbmJzcDt3ZWZldzwvdGQ+PHRkPndld2VmJm5ic3A7PC90ZD48L3RyPjwvdGJvZHk+PC90YWJsZT48cD48YnI+PC9wPjxwIHN0eWxlPSJ0ZXh0LWFsaWduOiBsZWZ0IiAiPSIiPjxzcGFuIHN0eWxlPSJ0ZXh0LWRlY29yYXRpb24tbGluZTogdW5kZXJsaW5lOyBmb250LWZhbWlseTogVmVyZGFuYTsgZm9udC1zaXplOiB4eC1sYXJnZTsiPueahOiuv+mXruazlTwvc3Bhbj48L3A+PHAgc3R5bGU9InRleHQtYWxpZ246IGxlZnQiICI9IiI+PHNwYW4gc3R5bGU9ImNvbG9yOiByZ2IoMTk0LCA3OSwgNzQpOyI+55qE6ZKx5peg5aSaPC9zcGFuPjwvcD48cCBzdHlsZT0idGV4dC1hbGlnbjogbGVmdCIgIj0iIj48c3BhbiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0MSwgMjQxLCAyNDEpOyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij4mbHQ7YSBocmVmPSJodHRwczovL2d4bHNlbGYuY29tIiZndDtneGxzZWxmJmx0Oy9hJmd0Ozwvc3Bhbj48c3BhbiBzdHlsZT0idGV4dC1kZWNvcmF0aW9uLWxpbmU6IHVuZGVybGluZTsgZm9udC1mYW1pbHk6IFZlcmRhbmE7IGZvbnQtc2l6ZTogeHgtbGFyZ2U7Ij48YnI+PC9zcGFuPjwvcD48cD48YnI+PC9wPg==','gxlself','2019-11-14 14:22:34','2019-11-14 14:22:34',1);

/*Table structure for table `m_token` */

DROP TABLE IF EXISTS `m_token`;

CREATE TABLE `m_token` (
  `token` varchar(43) NOT NULL,
  `a_token` char(200) NOT NULL,
  `username` char(16) NOT NULL,
  PRIMARY KEY  (`token`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `m_token` */

insert  into `m_token`(`token`,`a_token`,`username`) values ('tySKWst6nhh878e0t13N1RMJJxv3atkzpATx_YHWDLM','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd4bHNlbGYiLCJpYXQiOjE1ODUyODg3MTN9.tySKWst6nhh878e0t13N1RMJJxv3atkzpATx_YHWDLM','gxlself');

/*Table structure for table `m_users` */

DROP TABLE IF EXISTS `m_users`;

CREATE TABLE `m_users` (
  `username` char(32) NOT NULL,
  `password` char(32) NOT NULL,
  `login_status` int(2) default NULL,
  `o_username` char(16) NOT NULL,
  `o_password` char(16) NOT NULL,
  PRIMARY KEY  (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `m_users` */

insert  into `m_users`(`username`,`password`,`login_status`,`o_username`,`o_password`) values ('5c1338f06725fee21bfe6e43ef2a18e0','e10adc3949ba59abbe56e057f20f883e',NULL,'gxlself','123456');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
