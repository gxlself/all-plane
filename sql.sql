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

/*Table structure for table `m_message` */

DROP TABLE IF EXISTS `m_message`;

CREATE TABLE `m_message` (
  `title` char(100) default NULL,
  `theme` char(100) default NULL,
  `content` longtext,
  `type` int(1) default NULL,
  `create_user` char(40) default NULL,
  `create_date` datetime default NULL,
  `last_modify` datetime default NULL,
  `id` int(9) NOT NULL auto_increment,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `m_message` */

insert  into `m_message`(`title`,`theme`,`content`,`type`,`create_user`,`create_date`,`last_modify`,`id`) values ('','','dW5kZWZpbmVk',1,'gxlself','2019-10-20 18:47:15','2019-10-20 18:47:15',1);

/*Table structure for table `m_token` */

DROP TABLE IF EXISTS `m_token`;

CREATE TABLE `m_token` (
  `token` char(43) NOT NULL,
  `a_token` char(200) NOT NULL,
  `username` char(16) NOT NULL,
  PRIMARY KEY  (`token`,`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `m_token` */

insert  into `m_token`(`token`,`a_token`,`username`) values ('Qm9url7dQR9GvPPlVp_LSr1ICmsANlnQZozD5LrTPPc','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd4bHNlbGYiLCJpYXQiOjE1NzE1NjgyODN9.Qm9url7dQR9GvPPlVp_LSr1ICmsANlnQZozD5LrTPPc','gxlself');

/*Table structure for table `m_users` */

DROP TABLE IF EXISTS `m_users`;

CREATE TABLE `m_users` (
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `o_username` char(16) NOT NULL,
  `o_password` char(16) NOT NULL,
  `login_status` int(1) default NULL,
  PRIMARY KEY  (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `m_users` */

insert  into `m_users`(`username`,`password`,`o_username`,`o_password`,`login_status`) values ('5c1338f06725fee21bfe6e43ef2a18e0','e10adc3949ba59abbe56e057f20f883e','gxlself','123456',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
