/*
SQLyog Professional v12.08 (64 bit)
MySQL - 5.0.96-community-nt : Database - allplant
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`allplant` /*!40100 DEFAULT CHARACTER SET utf8 */;

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

/*Table structure for table `m_article` */

DROP TABLE IF EXISTS `m_article`;

CREATE TABLE `m_article` (
  `id` int(8) NOT NULL auto_increment,
  `title` varchar(50) NOT NULL COMMENT '标题',
  `theme` varchar(50) NOT NULL COMMENT '主题',
  `content` longtext COMMENT '内容',
  `create_user` char(16) default NULL COMMENT '创建者',
  `create_date` datetime default NULL COMMENT '创建时间',
  `last_modify` datetime default NULL COMMENT '最近一次更新',
  `status` int(1) default NULL COMMENT '审核状态',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `m_article` */

/*Table structure for table `m_article_comment` */

DROP TABLE IF EXISTS `m_article_comment`;

CREATE TABLE `m_article_comment` (
  `id` int(8) NOT NULL auto_increment COMMENT '评论id',
  `article_id` int(8) NOT NULL COMMENT '文章id',
  `remark` varchar(100) NOT NULL COMMENT '评论内容',
  `images` text COMMENT '图片',
  `create_date` datetime default NULL COMMENT '创建评论时间',
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `m_article_comment` */

/*Table structure for table `m_menus` */

DROP TABLE IF EXISTS `m_menus`;

CREATE TABLE `m_menus` (
  `id` int(3) NOT NULL auto_increment COMMENT '菜单id',
  `menu_name` varchar(60) NOT NULL COMMENT '菜单名',
  `type` int(1) NOT NULL default '0' COMMENT '类型(0.菜单 1.按钮)',
  `icon` varchar(30) default NULL COMMENT 'icon',
  `sort` int(8) default '1' COMMENT '排序',
  `parent_id` int(3) NOT NULL COMMENT '父节点id',
  `create_date` datetime default NULL,
  `url` varchar(60) default NULL COMMENT '页面路径',
  `enable` tinyint(1) NOT NULL default '1' COMMENT '是否可用',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `m_menus` */

insert  into `m_menus`(`id`,`menu_name`,`type`,`icon`,`sort`,`parent_id`,`create_date`,`url`,`enable`) values (1,'基础信息维护',0,'el-menu',0,0,'2020-04-01 20:29:13','/menulist',1),(2,'菜单管理',0,'el-1',0,1,'2020-04-01 20:29:41','/menu',1),(3,'角色管理',0,'el-role',1,1,'2020-04-01 20:30:02','/role',1),(4,'人员管理',0,'el-people',2,1,'2020-04-01 20:30:26','/people',1);

/*Table structure for table `m_roles` */

DROP TABLE IF EXISTS `m_roles`;

CREATE TABLE `m_roles` (
  `remark` varchar(30) default NULL,
  `id` int(3) NOT NULL auto_increment,
  `role_name` varchar(10) NOT NULL,
  `menus` text,
  `enable` tinyint(1) NOT NULL default '1',
  `last_modify` datetime NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `m_roles` */

insert  into `m_roles`(`remark`,`id`,`role_name`,`menus`,`enable`,`last_modify`,`create_date`) values ('这是管理员',2,'管理员','[10,20,15,16,17]',0,'2020-03-11 17:46:47','2020-03-10 17:27:14'),('运营',4,'运营',NULL,0,'2020-03-04 17:46:50','2020-03-04 17:27:14'),('运营1',5,'运营1',NULL,1,'2020-03-06 17:46:52','2020-03-03 17:27:14'),('运营2',6,'运营2',NULL,1,'2020-03-06 17:46:54','2020-03-09 17:27:14'),('123456',7,'测试',NULL,0,'2020-03-31 17:27:14','2020-03-31 17:27:14');

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
  `login_status` int(2) default NULL COMMENT '登录状态',
  `o_username` char(16) NOT NULL,
  `o_password` char(16) NOT NULL,
  `role` text COMMENT '角色',
  `create_date` datetime default NULL,
  `last_modify` datetime default NULL,
  `mobile` int(11) default NULL COMMENT '手机',
  `avatar` varchar(255) default NULL COMMENT '头像',
  `introduction` varchar(50) default NULL COMMENT '介绍',
  PRIMARY KEY  (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `m_users` */

insert  into `m_users`(`username`,`password`,`login_status`,`o_username`,`o_password`,`role`,`create_date`,`last_modify`,`mobile`,`avatar`,`introduction`) values ('5c1338f06725fee21bfe6e43ef2a18e0','e10adc3949ba59abbe56e057f20f883e',NULL,'gxlself','123456',NULL,NULL,NULL,NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
