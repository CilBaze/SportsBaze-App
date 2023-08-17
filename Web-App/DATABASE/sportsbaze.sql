-- Adminer 4.7.7 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `coaching_academy_enquiry`;
CREATE TABLE `coaching_academy_enquiry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `message` text,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `coaching_academy_enquiry_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `coaching_academy_enquiry_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `coaching_academy_enquiry` (`id`, `post_id`, `user_id`, `first_name`, `last_name`, `email`, `contact_no`, `message`, `created_date`, `updated_date`) VALUES
(14,	521,	357,	'Jawwad',	'Khan',	'Testernile6@gmail.com',	'8287599998',	'Test message\n',	'2021-07-30 08:44:58',	'2021-07-30 08:44:58');

DROP TABLE IF EXISTS `color`;
CREATE TABLE `color` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(50) NOT NULL,
  `status` enum('1','2') NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `color` (`id`, `color`, `status`, `created_date`, `updated_date`) VALUES
(1,	'BLACK',	'1',	'2021-04-26 07:46:02',	'2021-04-26 07:46:02'),
(2,	'WHITE',	'2',	'2021-04-26 07:46:02',	'2021-04-26 07:46:02');

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) NOT NULL,
  `event_description` text,
  `location` text NOT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `postal_code` varchar(10) NOT NULL,
  `event_date` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` enum('1','2') NOT NULL COMMENT '1: active, 2: inactive',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `events` (`id`, `event_name`, `event_description`, `location`, `latitude`, `longitude`, `postal_code`, `event_date`, `user_id`, `status`, `created_date`, `updated_date`) VALUES
(76,	'Airpods Pro',	'Xywbsbsnsnsnsnnssnsnnsn',	'Hind cold storage, Hardoi Bypass Rd, Mishripur, Uttar Pradesh, India',	'27.84185489999999',	'79.92347939999999',	'242406',	'2021-07-30 00:00:00',	305,	'1',	'2021-02-23 13:06:08',	'2021-07-07 21:39:51'),
(77,	'Footballer match ',	'Xywbsbsnsnsnsnnssnsnnsn',	'Noida Extension, Sector 1, Noida, Uttar Pradesh, India',	'28.5956616',	'77.4491018',	'',	'2021-09-29 00:00:00',	305,	'1',	'2021-02-23 13:06:35',	'2021-07-07 21:52:31'),
(79,	'Panchsheel ',	'Bsnssjjssj sbsjslwl sksowlwlw',	'Panchsheel Greens 2, Noida Phase-2, Panchsheel Green, Greater Noida, Uttar Pradesh, India',	'28.6079992',	'77.4581982',	'',	'2021-07-27 00:00:00',	305,	'1',	'2021-02-23 13:46:06',	'2021-07-07 21:52:22'),
(80,	'Event by admin',	'test description',	'Sector 77, Noida, Uttar Pradesh, India',	'28.5695554',	'77.3912953',	'',	'2021-08-26 00:00:00',	305,	'1',	'2021-02-23 13:59:48',	'2021-07-07 21:52:12'),
(81,	'Boxing event',	'This is a test description ',	'Sector 62, Noida, Uttar Pradesh, India',	'28.627981',	'77.3648567',	'',	'2021-07-31 00:00:00',	305,	'1',	'2021-02-23 18:26:28',	'2021-07-07 21:52:02'),
(93,	'Basketball charity raiser Event',	'We are organising a fund raiser event atesttjskj jskwo wjoworv djfiod djdowo jdkdrgev dhdjdufrvri jd',	'Hind cold storage, Hardoi Bypass Rd, Mishripur, Uttar Pradesh, India',	'27.84185489999999',	'79.92347939999999',	'',	'2021-03-16 00:00:00',	303,	'1',	'2021-03-12 17:38:11',	'2021-03-12 17:38:11'),
(97,	'Second event',	'Test',	'67 Dunlop Avenue, Leeds, UK',	'53.7785658',	'-1.6009227',	'LS12 6LE',	'2021-04-09 00:00:00',	305,	'1',	'2021-04-08 18:13:11',	'2021-07-07 21:50:55'),
(98,	'Kirti gupta',	'Event created with portal code',	'Noida Sector 18, Noida, Uttar Pradesh, India',	'28.60769299999999',	'77.37270269999999',	'201301',	'2021-04-14 00:00:00',	350,	'1',	'2021-04-14 12:22:46',	'2021-04-15 18:43:34'),
(100,	'Gymnastic',	'Gymnastics awards',	'Bareilly, Civil Lines, Bareilly, Uttar Pradesh, India',	'28.35828029999999',	'79.41891869999999',	'243001',	'2021-04-24 00:00:00',	305,	'1',	'2021-04-15 18:32:35',	'2021-07-07 21:23:18'),
(101,	'Harrison sports week',	'Sport events will take place throughout the week',	'RG Residency, Sector 120, Noida, Uttar Pradesh, India',	'28.5877034',	'77.3973942',	'201307',	'2021-05-01 00:00:00',	305,	'1',	'2021-04-20 19:30:41',	'2021-04-23 12:55:53'),
(105,	'Relay',	'Test',	'Hardoi, Uttar Pradesh, India',	'27.3965071',	'80.1250479',	'241001',	'2021-04-30 00:00:00',	305,	'1',	'2021-04-28 19:28:37',	'2021-07-07 21:22:27'),
(107,	'Warangal athletes meet',	'A quick brown fox loren ipsum',	'Warangal, Telangana, India',	'17.9689008',	'79.59405439999999',	'506002',	'2021-05-15 00:00:00',	357,	'1',	'2021-05-13 17:19:38',	'2021-05-13 17:19:38'),
(113,	'Birthday party',	'My party',	'Noida, Uttar Pradesh, India',	'28.5355161',	'77.3910265',	'201304',	'2021-06-18 00:00:00',	349,	'1',	'2021-06-16 14:35:57',	'2021-06-16 14:35:57'),
(116,	'Sports Quiz',	'Winners will get exciting prizes',	'67 Dunlop Avenue, Leeds, UK',	'53.7785658',	'-1.6009227',	'LS12 6LE',	'2021-07-10 00:00:00',	357,	'1',	'2021-07-07 21:20:28',	'2021-07-07 21:20:28'),
(117,	'Mail test',	'Mail test',	'RG Residency, Sector 120, Noida, Uttar Pradesh, India',	'28.5877034',	'77.3973942',	'201307',	'2021-08-05 00:00:00',	357,	'1',	'2021-07-30 14:11:00',	'2021-07-30 14:11:00'),
(118,	'Olympic ',	'All are invited\n',	'Tokyo, Japan',	'35.6803997',	'139.7690174',	'103-0028',	'2021-08-10 00:00:00',	456,	'1',	'2021-08-10 16:24:58',	'2021-09-13 13:43:36'),
(120,	'Merathan',	'All are invited\n',	'India',	'20.593684',	'78.96288',	'110001',	'2021-08-26 00:00:00',	305,	'1',	'2021-08-26 13:26:08',	'2021-09-06 13:40:36');

DROP TABLE IF EXISTS `events_enquiry`;
CREATE TABLE `events_enquiry` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `message` text,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `events_enquiry_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `events_enquiry_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `events_enquiry` (`id`, `event_id`, `user_id`, `first_name`, `last_name`, `email`, `contact_no`, `message`, `created_date`, `updated_date`) VALUES
(1,	81,	350,	'Abc',	'Abc',	'Abc@gmail.com ',	'885487565',	'Ok',	'2021-02-25 09:00:18',	'2021-02-25 09:00:18'),
(13,	100,	430,	'Norton',	'Dhingra',	'Jdjane@hotmail.com',	'8287599998',	'Test',	'2021-04-15 14:25:48',	'2021-04-15 14:25:48'),
(14,	100,	357,	'Hu',	'Han',	'Testernile6@gmail.com',	'8287599998',	'Test message',	'2021-04-20 09:53:17',	'2021-04-20 09:53:17'),
(15,	101,	430,	'Jawwad',	'Khan',	'Jawwad.khan@niletechnologies.com ',	'8287599998',	'Test message',	'2021-04-20 14:01:38',	'2021-04-20 14:01:38'),
(16,	107,	357,	'Jawwad',	'Khan',	'Jawwad.khan@niletechnologies.com ',	'9999999999',	'Test message',	'2021-05-13 11:50:44',	'2021-05-13 11:50:44'),
(17,	107,	357,	'Jawwad',	'Khan',	'Jawwad.khan@niletechnologies.com ',	'8287599998',	'Test',	'2021-05-13 12:07:14',	'2021-05-13 12:07:14'),
(21,	93,	451,	'Jawwad',	'Khan',	'Testernile@gmail.com',	'8287599998',	'This is a test message',	'2021-07-02 05:10:13',	'2021-07-02 05:10:13'),
(22,	117,	357,	'Jawwad',	'Khan',	'Testernile6@gmail.com',	'8287599998',	'Test message',	'2021-07-30 08:42:05',	'2021-07-30 08:42:05'),
(23,	120,	456,	'IPL',	'Sonica Tomar ',	'Sonica0412@gmail.com',	'9589980333',	'We all are invited.',	'2021-09-06 05:32:27',	'2021-09-06 05:32:27'),
(24,	120,	523,	'Kajal',	'Biswas',	'Kb10cse@gmail.com',	'7998243796',	'Hi',	'2023-02-17 04:34:55',	'2023-02-17 04:34:55'),
(25,	120,	523,	'Kajal',	'Biswas',	'Kb10cse@gmail.com',	'7998243796',	'Hi',	'2023-02-17 04:35:45',	'2023-02-17 04:35:45'),
(26,	120,	523,	'Kajal',	'Biswas',	'Kajalbiswascse @gmail.com',	'7998243796',	'Hi',	'2023-02-20 13:08:41',	'2023-02-20 13:08:41'),
(27,	113,	523,	'Kajal',	'Biswas',	'Kajalbiswascse@gmail.com',	'7998243796',	'Hello',	'2023-02-20 13:10:15',	'2023-02-20 13:10:15');

DROP TABLE IF EXISTS `my_post`;
CREATE TABLE `my_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `status` enum('1','2') NOT NULL COMMENT '1:Save 2:Unsave',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `my_post` (`id`, `user_id`, `post_id`, `status`, `created_date`, `updated_date`) VALUES
(6,	350,	168,	'2',	'2021-08-17 13:15:17',	'2021-08-24 11:17:26'),
(9,	456,	576,	'2',	'2021-08-17 14:50:33',	'2021-09-13 13:38:03'),
(36,	456,	580,	'2',	'2021-08-24 12:08:05',	'2021-09-13 13:38:01'),
(37,	456,	580,	'2',	'2021-08-24 12:11:52',	'2021-09-13 13:38:01'),
(38,	456,	580,	'2',	'2021-08-24 12:12:31',	'2021-09-13 13:38:01'),
(39,	456,	580,	'2',	'2021-08-24 12:15:44',	'2021-09-13 13:38:01'),
(40,	456,	580,	'2',	'2021-08-24 12:18:23',	'2021-09-13 13:38:01'),
(41,	456,	580,	'2',	'2021-08-24 12:18:28',	'2021-09-13 13:38:01'),
(42,	456,	580,	'2',	'2021-08-24 12:20:32',	'2021-09-13 13:38:01'),
(43,	456,	580,	'2',	'2021-08-24 13:00:20',	'2021-09-13 13:38:01'),
(44,	456,	576,	'2',	'2021-08-24 13:00:27',	'2021-09-13 13:38:03'),
(45,	456,	171,	'2',	'2021-08-24 13:00:45',	'2021-09-13 13:38:05'),
(46,	456,	580,	'2',	'2021-08-24 16:39:26',	'2021-09-13 13:38:01'),
(48,	456,	580,	'2',	'2021-08-26 13:27:22',	'2021-09-13 13:38:01'),
(49,	456,	580,	'2',	'2021-08-26 17:42:36',	'2021-09-13 13:38:01'),
(50,	456,	580,	'2',	'2021-08-30 10:32:33',	'2021-09-13 13:38:01'),
(51,	456,	576,	'2',	'2021-08-30 10:32:36',	'2021-09-13 13:38:03'),
(52,	456,	580,	'2',	'2021-08-31 10:45:17',	'2021-09-13 13:38:01'),
(53,	456,	576,	'2',	'2021-08-31 10:45:19',	'2021-09-13 13:38:03'),
(54,	456,	580,	'2',	'2021-08-31 12:03:00',	'2021-09-13 13:38:01'),
(55,	456,	576,	'2',	'2021-08-31 12:03:03',	'2021-09-13 13:38:03'),
(56,	456,	576,	'2',	'2021-08-31 12:03:13',	'2021-09-13 13:38:03'),
(57,	456,	580,	'2',	'2021-08-31 15:13:26',	'2021-09-13 13:38:01'),
(58,	456,	580,	'2',	'2021-08-31 19:14:24',	'2021-09-13 13:38:01'),
(59,	456,	580,	'2',	'2021-08-31 19:14:44',	'2021-09-13 13:38:01'),
(60,	456,	580,	'2',	'2021-09-01 15:53:44',	'2021-09-13 13:38:01'),
(61,	456,	576,	'2',	'2021-09-01 15:53:47',	'2021-09-13 13:38:03'),
(62,	456,	580,	'2',	'2021-09-01 17:21:15',	'2021-09-13 13:38:01'),
(63,	456,	580,	'2',	'2021-09-02 13:14:47',	'2021-09-13 13:38:01'),
(64,	456,	580,	'2',	'2021-09-02 16:16:01',	'2021-09-13 13:38:01'),
(65,	456,	580,	'2',	'2021-09-03 13:03:20',	'2021-09-13 13:38:01'),
(66,	456,	576,	'2',	'2021-09-06 11:09:15',	'2021-09-13 13:38:03'),
(68,	456,	171,	'2',	'2021-09-06 18:56:24',	'2021-09-13 13:38:05'),
(69,	456,	576,	'2',	'2021-09-06 18:56:27',	'2021-09-13 13:38:03'),
(70,	456,	580,	'2',	'2021-09-06 19:30:46',	'2021-09-13 13:38:01'),
(72,	456,	580,	'1',	'2021-09-13 13:45:46',	'2021-09-13 13:45:46'),
(73,	349,	580,	'1',	'2023-02-20 18:42:06',	'2023-02-20 18:42:06');

DROP TABLE IF EXISTS `options`;
CREATE TABLE `options` (
  `option_id` int(11) NOT NULL AUTO_INCREMENT,
  `option_name` varchar(50) NOT NULL,
  `option_value` longtext NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`option_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `options` (`option_id`, `option_name`, `option_value`, `created_date`, `modified_date`) VALUES
(1,	'distance_settings',	'a:4:{i:0;s:1:\"5\";i:1;s:2:\"10\";i:2;s:2:\"15\";i:3;s:2:\"50\";}',	'2019-10-11 15:55:30',	'2021-07-08 20:01:20'),
(12,	'logo_settings',	'a:3:{s:9:\"dark_logo\";s:16:\"161301135518.png\";s:10:\"light_logo\";s:17:\"1613011355181.png\";s:11:\"active_logo\";i:1;}',	'2019-10-11 15:55:30',	'2021-07-08 20:01:20');

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) DEFAULT NULL,
  `description` text,
  `sports_id` int(11) DEFAULT NULL,
  `sub_sports_id` int(11) DEFAULT NULL,
  `views` int(11) NOT NULL DEFAULT '0',
  `website_url` varchar(255) DEFAULT NULL,
  `location` text,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `postal_code` varchar(10) NOT NULL,
  `post_type` enum('post','coaching_academy','gym','sports_center','fitness_studio') NOT NULL,
  `link_contact_form` enum('0','1') NOT NULL COMMENT '0: No Need To Link Form 1: Link Contact Form',
  `contact_email` varchar(150) DEFAULT NULL,
  `rating` tinyint(4) NOT NULL,
  `status` enum('1','2','3') NOT NULL COMMENT '1: Active, 1:Inactive, 2: Blocked',
  `created_by` int(11) DEFAULT NULL,
  `shared_post_id` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `posts_ibfk_1` (`sports_id`),
  KEY `sub_sports_id` (`sub_sports_id`),
  KEY `created_by` (`created_by`),
  KEY `shared_post_id` (`shared_post_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`sports_id`) REFERENCES `sports` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`sub_sports_id`) REFERENCES `sports` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `posts_ibfk_4` FOREIGN KEY (`shared_post_id`) REFERENCES `posts` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `posts` (`id`, `title`, `description`, `sports_id`, `sub_sports_id`, `views`, `website_url`, `location`, `latitude`, `longitude`, `postal_code`, `post_type`, `link_contact_form`, `contact_email`, `rating`, `status`, `created_by`, `shared_post_id`, `created_date`, `updated_date`) VALUES
(170,	'Rugby Academy',	'This is a test description',	NULL,	NULL,	0,	NULL,	'arizona',	NULL,	NULL,	'',	'coaching_academy',	'1',	NULL,	4,	'1',	305,	NULL,	'2020-11-30 23:27:57',	'2021-08-30 11:04:07'),
(171,	NULL,	'',	15,	16,	0,	NULL,	NULL,	NULL,	NULL,	'',	'fitness_studio',	'0',	NULL,	0,	'1',	305,	NULL,	'2020-11-30 23:31:40',	'2020-11-30 23:31:40'),
(474,	'Motorsport Academy',	'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',	NULL,	NULL,	0,	'http://google.com',	'Sector 57, Noida, Uttar Pradesh, India',	'28.603341',	'77.35397739999999',	'',	'gym',	'0',	NULL,	4,	'1',	305,	NULL,	'2021-03-15 16:03:21',	'2021-08-30 11:03:44'),
(518,	NULL,	'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n',	5,	8,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	357,	NULL,	'2021-04-22 16:45:08',	'2021-04-22 16:45:08'),
(520,	'Brian Snitker\'s Complex',	'Baseball learning Academy',	NULL,	NULL,	0,	'https://www.google.com/',	'Beta II, Greater Noida, Uttar Pradesh, India',	'28.4863409',	'77.5146453',	'201301',	'gym',	'0',	NULL,	3,	'1',	305,	NULL,	'2021-04-23 14:17:06',	'2021-04-26 17:48:04'),
(521,	'Diego Football Learning Academy',	'test',	NULL,	NULL,	0,	NULL,	'RG Residency, Sector 120, Noida, Uttar Pradesh, India',	'28.5877034',	'77.3973942',	'201307',	'coaching_academy',	'1',	'jawwad.khan@niletechnologies.com',	5,	'1',	305,	NULL,	'2021-04-23 14:19:45',	'2021-08-30 11:02:38'),
(525,	'O2 Gym',	'We have the best fitness trainers in town',	NULL,	NULL,	0,	'https://www.google.com/',	'Commercial Belt, Block E, Alpha I, Greater Noida, Uttar Pradesh, India',	'28.4711929',	'77.51195740000001',	'201310',	'gym',	'0',	NULL,	4,	'1',	305,	NULL,	'2021-04-23 14:34:11',	'2021-08-30 11:02:15'),
(534,	NULL,	'Moving to the city in a brokedown car',	11,	12,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	357,	NULL,	'2021-05-13 16:00:50',	'2021-05-13 16:00:50'),
(543,	NULL,	'This is a test description',	1,	10,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	305,	NULL,	'2021-05-24 12:00:30',	'2021-05-24 12:00:30'),
(549,	NULL,	'Bruno Fernandes has an instant impact on Manchester United. \n\'A really, really good signing\'\nIf such a thing as a typical Manchester United player exists, Fernandes would surely be it.\nA risk-taker, exciting to watch and able to cope with the extreme pressures of playing at one of the biggest clubs in the world, the attacking midfielder has become an instant hit.',	1,	10,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	430,	NULL,	'2021-06-10 15:41:18',	'2021-06-10 15:43:44'),
(562,	NULL,	'Lionel Messi Plays With Bleeding Ankle During Argentina vs Colombia Copa America 2021 Semi-Final',	1,	2,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	357,	NULL,	'2021-07-07 18:43:45',	'2021-07-07 18:43:45'),
(563,	'Brian Stinker Coaching Academy',	'Brian Gerald Snitker is an American professional baseball coach and former player who is the manager of the Atlanta Braves of Major League Baseball. Snitker has been in the Braves organization in different roles since becoming a minor league player in 1977. He became their manager in 2016',	NULL,	NULL,	0,	NULL,	'Connaught Place, New Delhi, Delhi, India',	'28.6304203',	'77.21772159999999',	'110001',	'coaching_academy',	'1',	'test@brian.com',	5,	'1',	305,	NULL,	'2021-07-07 21:14:48',	'2021-08-30 11:00:53'),
(565,	'Bruno Fernandes has an instant impact on Manchester United. \n\'A really, really good signing\'\nIf such a thing as a typical Manchester United player exi',	'',	1,	10,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	349,	549,	'2021-07-09 22:38:53',	'2021-07-09 22:38:53'),
(570,	NULL,	'Match highlights ',	1,	10,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	2,	'1',	456,	NULL,	'2021-08-09 15:48:58',	'2021-08-10 13:59:04'),
(576,	NULL,	'',	20,	21,	0,	NULL,	NULL,	NULL,	NULL,	'',	'fitness_studio',	'0',	NULL,	0,	'1',	305,	NULL,	'2021-08-10 15:01:07',	'2021-08-10 15:01:07'),
(577,	NULL,	'Football match\n',	1,	2,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	456,	NULL,	'2021-08-10 15:03:08',	'2021-08-11 18:35:43'),
(580,	NULL,	'',	15,	16,	0,	NULL,	NULL,	NULL,	NULL,	'',	'fitness_studio',	'0',	NULL,	0,	'1',	305,	NULL,	'2021-08-10 16:12:05',	'2021-08-10 16:12:05'),
(582,	NULL,	'Basketball shots',	5,	8,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	349,	NULL,	'2021-08-10 17:04:22',	'2021-08-10 17:04:22'),
(583,	NULL,	'#WaveSurfing',	28,	29,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	305,	NULL,	'2021-08-10 17:51:12',	'2021-08-10 17:51:12'),
(586,	NULL,	'Yoga\n',	30,	31,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	456,	NULL,	'2021-08-12 10:05:23',	'2021-08-12 10:05:23'),
(603,	NULL,	'Motivational sports highlights ',	1,	10,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	456,	NULL,	'2021-09-06 11:52:25',	'2021-09-06 11:52:25'),
(604,	'Motivational sports highlights ',	'',	1,	10,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	434,	603,	'2021-09-06 16:12:02',	'2021-09-06 16:12:02'),
(605,	NULL,	'With Fola',	4,	24,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	434,	NULL,	'2021-10-30 01:35:56',	'2021-10-30 01:35:56'),
(608,	NULL,	'GYM',	15,	17,	0,	NULL,	NULL,	NULL,	NULL,	'',	'fitness_studio',	'0',	NULL,	0,	'1',	305,	NULL,	'2023-02-17 16:12:15',	'2023-02-17 16:14:28'),
(609,	NULL,	'Hey',	3,	7,	0,	NULL,	NULL,	NULL,	NULL,	'',	'post',	'0',	NULL,	0,	'1',	349,	NULL,	'2023-02-20 18:30:24',	'2023-02-20 18:30:24');

DROP TABLE IF EXISTS `post_book_appointment`;
CREATE TABLE `post_book_appointment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `message` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `post_book_appointment` (`id`, `user_id`, `post_id`, `first_name`, `last_name`, `email`, `phone_number`, `date`, `time`, `message`, `created_date`) VALUES
(1,	350,	520,	'PTS',	'tiwari',	'gmail@google.com',	'',	NULL,	NULL,	'hello',	'2021-08-18 11:26:49'),
(2,	350,	520,	'PTS',	'tiwari',	'gmail@google.com',	'45456425412',	NULL,	NULL,	'hello',	'2021-08-18 11:39:57'),
(3,	350,	520,	'As',	'Dad',	'Dd@gmail.com',	'887372537',	NULL,	NULL,	'Sdsd',	'2021-08-18 11:41:02'),
(4,	456,	525,	'Sonica ',	'Tomar',	'Sonica0412@gmail.com',	'9589980333',	NULL,	NULL,	'Ok',	'2021-08-19 10:51:23'),
(5,	349,	563,	'Payal',	'Chhikara',	'Chhikara.payal@gmail.com',	'7698345419',	NULL,	NULL,	'How can i join?',	'2021-08-19 15:33:26'),
(6,	456,	563,	'Sonica',	'Tomar',	'Sonica0412@gmail.com',	'9589980333',	NULL,	NULL,	'Ok\n',	'2021-08-19 16:09:20'),
(7,	350,	563,	'Ff',	'F',	'Fg@gmail.com',	'32453546',	NULL,	NULL,	'Dfdf',	'2021-08-19 17:15:06'),
(8,	350,	563,	'Dodd',	'Dad',	'Fdf@gmail.com',	'324555646',	NULL,	NULL,	'Rtr',	'2021-08-19 17:15:53'),
(9,	350,	563,	'Sad',	'D',	'Df@gmail.com',	'435436546',	NULL,	NULL,	'Fffg',	'2021-08-19 17:18:04'),
(10,	350,	563,	'As',	'Ff',	'Fdfs@gmail.com',	'4364664334',	NULL,	NULL,	'Djgjsgf',	'2021-08-19 17:26:09'),
(11,	350,	563,	'Er',	'R',	'Re',	'er',	NULL,	NULL,	'Er',	'2021-08-19 17:29:44'),
(12,	456,	563,	'Sonica',	'Tomar',	'Sonica0412@gmail.com',	'9589980333',	NULL,	NULL,	'Any type of documents you have required \n',	'2021-08-19 19:35:26'),
(13,	456,	593,	'Sonica',	'Tomar',	'A',	'1234567890',	NULL,	NULL,	'Ok',	'2021-08-24 16:37:18'),
(14,	349,	521,	'Payal',	'Sirohi',	'Abc@123',	'5889665888',	NULL,	NULL,	'How i can join\n',	'2021-08-25 10:49:57'),
(15,	484,	563,	'Sonica',	'Tomar',	'Sonica.tomar@niletechnologies.com',	'9589980333',	NULL,	NULL,	'Kindly contact me via mail or call',	'2021-08-30 10:29:50'),
(16,	484,	525,	'Sonica',	'Tomar',	'Sonica.tomar@niletechnologies.com',	'9589980333',	NULL,	NULL,	'Kindly connect me via mail or call',	'2021-08-30 10:31:32'),
(17,	486,	563,	'Sonica',	'Tomar',	'Sonica12@gmail.com',	'9589980333',	NULL,	NULL,	'Kindly connect via email or call',	'2021-08-31 10:21:03'),
(18,	486,	525,	'Sonica',	'Tomar',	'Sonica12@gmail.com',	'9589980333',	NULL,	NULL,	'Kindly connect me by mail or call',	'2021-08-31 10:44:22'),
(19,	517,	563,	'Sonica',	'Tomar',	'Sonica36@gmail.com',	'9589980333',	NULL,	NULL,	'How I can join?',	'2021-09-01 15:53:04'),
(20,	519,	563,	'Sonica',	'Tomar',	'Sonica100@gmail.com',	'9589980333',	NULL,	NULL,	'How I can join?',	'2021-09-01 17:17:39'),
(21,	350,	520,	'PTS',	'tiwari',	'gmail@google.com',	'45456425412',	'2021-09-07',	'07:00:00',	'hello',	'2021-09-02 18:57:12'),
(22,	350,	563,	'Adds',	'Drag',	'Bc@gmail.com',	'4656566546',	'2021-09-07',	'06:09:18',	'Sdf',	'2021-09-02 18:57:32'),
(23,	519,	563,	'Sonica',	'Tomar',	'Sonica0412@gmail.com',	'9589980333',	'2021-09-07',	'07:51:30',	'How I can n',	'2021-09-02 19:53:25'),
(24,	350,	520,	'PTS',	'tiwari',	'gmail@google.com',	'45456425412',	'2021-09-04',	'17:00:00',	'hello',	'2021-09-03 10:15:09'),
(25,	456,	563,	'Sonica',	'Tomar',	'Sonica0412@gmail.com',	'9589980333',	'2021-09-03',	'05:10:55',	'Ok',	'2021-09-03 11:12:32'),
(26,	350,	563,	'Gwgw',	'Gegy',	'Ffag@gmail.com',	'5888555',	'2021-09-03',	'12:20:04',	'Bhh',	'2021-09-03 11:34:12'),
(27,	350,	563,	'Abc',	'Abc',	'Abc@gmail.com ',	'2158452455',	'2021-09-03',	'05:07:04',	'Cgg',	'2021-09-03 11:34:52'),
(28,	350,	563,	'Hwh',	'Hwhw',	'Wgg@gma8l.com',	'94949',	'2021-09-03',	'03:07:04',	'Fqffq',	'2021-09-03 11:35:40'),
(29,	350,	563,	'Ehhe',	'Shhs',	'Avva@gmail.com',	'656569',	'2021-09-03',	'23:35:57',	'Bzb',	'2021-09-03 11:40:39'),
(30,	456,	563,	'Sonica',	'Tomar',	'Sonica0412@gmail.com',	'9589980333',	'2021-09-03',	'18:43:20',	'How I can join??',	'2021-09-03 12:59:34'),
(31,	456,	525,	'Sonica',	'Tomar',	'Sonica0412@gmail.com',	'9589980333',	'2021-09-03',	'04:44:20',	'Ok',	'2021-09-03 13:01:31'),
(32,	456,	521,	'Sonica',	'Tomar',	'Sonica0412@gmail.com',	'9589980333',	'2021-09-03',	'17:11:20',	'Ok',	'2021-09-03 13:02:42'),
(33,	456,	563,	'Sonica',	'Tomar',	'Sonica0412@gmail.com',	'9589980333',	'2021-09-03',	'14:09:56',	'How I can join ',	'2021-09-03 13:16:41'),
(34,	456,	520,	'Sonica',	'Tomar',	'Sonica0412@gmail.com',	'9589980333',	'2021-09-03',	'03:09:56',	'Ok',	'2021-09-03 13:17:35'),
(35,	523,	563,	'Kajal',	'Biswas',	'Kb10cse@gmail.com',	'7998243796',	'2023-02-20',	'10:03:04',	'Hey',	'2023-02-17 10:14:13'),
(36,	523,	563,	'Kajal',	'Biswas',	'Kb10cse@gmail.com',	'7998243796',	'2023-02-19',	'10:05:04',	'Hi\n',	'2023-02-17 10:17:40');

DROP TABLE IF EXISTS `post_comments`;
CREATE TABLE `post_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comments` text NOT NULL,
  `status` enum('1','2','3') NOT NULL COMMENT '1:Active, 2: Inactive 3: Blocked',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_comments_ibfk_1` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `post_comments` (`id`, `user_id`, `post_id`, `comments`, `status`, `created_date`, `updated_date`) VALUES
(116,	305,	171,	'This is a test comment',	'1',	'2020-12-08 16:49:22',	'2020-12-08 04:19:22'),
(117,	305,	171,	'hellow',	'1',	'2020-12-08 16:49:34',	'2020-12-08 04:19:34'),
(118,	305,	171,	'ok',	'1',	'2020-12-08 16:49:38',	'2020-12-08 04:19:38'),
(389,	350,	518,	'Ok',	'1',	'2021-05-05 10:28:21',	'2021-05-05 10:28:21'),
(390,	350,	518,	'Gvyc6g',	'1',	'2021-05-05 10:28:23',	'2021-05-05 10:28:23'),
(391,	357,	534,	'Older ',	'1',	'2021-05-13 16:02:19',	'2021-05-13 16:02:19'),
(392,	357,	534,	'New comment',	'1',	'2021-05-13 16:07:27',	'2021-05-13 16:07:27'),
(404,	357,	543,	'Hi',	'1',	'2021-06-04 15:37:24',	'2021-06-04 15:37:24'),
(405,	357,	518,	'Test comment',	'1',	'2021-06-07 17:45:06',	'2021-06-07 17:45:06'),
(407,	349,	549,	'Jhdjdjxnnznznzn',	'1',	'2021-06-10 21:13:15',	'2021-06-10 21:13:15'),
(409,	456,	570,	'Very nice',	'1',	'2021-08-09 16:10:35',	'2021-08-09 16:10:35'),
(410,	456,	580,	'Nice',	'1',	'2021-08-10 16:20:05',	'2021-08-10 16:20:05'),
(412,	305,	576,	'nice',	'1',	'2021-08-19 18:21:59',	'2021-08-19 12:51:59'),
(413,	304,	582,	'Hello',	'1',	'2023-02-16 18:18:14',	'2023-02-16 18:18:14'),
(414,	523,	605,	'Hi',	'1',	'2023-02-16 18:44:35',	'2023-02-16 18:44:35'),
(415,	523,	605,	'Hello',	'1',	'2023-02-16 18:44:44',	'2023-02-16 18:44:44'),
(416,	523,	605,	'Heeeeyyyy',	'1',	'2023-02-16 18:44:54',	'2023-02-16 18:44:54'),
(417,	523,	605,	'Nooo',	'1',	'2023-02-16 18:45:53',	'2023-02-16 18:45:53'),
(418,	523,	586,	'Hi',	'1',	'2023-02-16 18:51:21',	'2023-02-16 18:51:21'),
(419,	523,	604,	'Nice',	'1',	'2023-02-20 12:01:21',	'2023-02-20 12:01:21'),
(420,	349,	609,	'Hello',	'1',	'2023-02-20 18:31:18',	'2023-02-20 18:31:18');

DROP TABLE IF EXISTS `post_favourite`;
CREATE TABLE `post_favourite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_favourite_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `post_favourite_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `post_favourite` (`id`, `user_id`, `post_id`, `created_date`, `updated_date`) VALUES
(99,	357,	534,	'2021-05-13 16:05:29',	'2021-05-13 16:05:29'),
(104,	357,	543,	'2021-05-27 14:46:31',	'2021-05-27 14:46:31'),
(106,	350,	543,	'2021-06-07 18:26:48',	'2021-06-07 18:26:48'),
(111,	349,	565,	'2021-07-09 22:39:08',	'2021-07-09 22:39:08'),
(112,	434,	543,	'2021-07-31 20:22:42',	'2021-07-31 20:22:42'),
(154,	350,	586,	'2021-08-26 10:38:04',	'2021-08-26 10:38:04'),
(164,	519,	586,	'2021-09-02 16:16:54',	'2021-09-02 16:16:54'),
(165,	456,	586,	'2021-09-03 12:55:05',	'2021-09-03 12:55:05'),
(166,	456,	583,	'2021-09-03 14:58:04',	'2021-09-03 14:58:04'),
(168,	456,	603,	'2021-09-13 13:27:15',	'2021-09-13 13:27:15');

DROP TABLE IF EXISTS `post_images`;
CREATE TABLE `post_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `thumbnail_image` varchar(200) DEFAULT NULL,
  `post_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_images_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `post_images` (`id`, `name`, `thumbnail_image`, `post_id`, `created_date`, `updated_date`) VALUES
(30,	'160675905853.jpg',	NULL,	170,	'2020-11-30 23:27:57',	'2020-11-30 23:27:57'),
(31,	'160675929330.jpg',	NULL,	171,	'2020-11-30 23:31:40',	'2020-11-30 23:31:40'),
(218,	'161580431374.jpg',	NULL,	474,	'2021-03-15 16:03:21',	'2021-03-15 16:03:21'),
(219,	'161580431452.jpg',	NULL,	474,	'2021-03-15 16:03:21',	'2021-03-15 16:03:21'),
(270,	'1619090108abcbcbc.jpg',	NULL,	518,	'2021-04-22 16:45:08',	'2021-04-22 16:45:08'),
(271,	'1619090108abcbcbc1.jpg',	NULL,	518,	'2021-04-22 16:45:08',	'2021-04-22 16:45:08'),
(272,	'161916772810.jpg',	NULL,	521,	'2021-04-23 14:19:45',	'2021-04-23 14:19:45'),
(277,	'161916853432.png',	NULL,	525,	'2021-04-23 14:34:11',	'2021-04-23 14:34:11'),
(278,	'161916853577.jpg',	NULL,	525,	'2021-04-23 14:34:11',	'2021-04-23 14:34:11'),
(280,	'161943948111.jpg',	NULL,	520,	'2021-04-26 17:48:04',	'2021-04-26 17:48:04'),
(285,	'1620901850abcbcbc.jpeg',	NULL,	534,	'2021-05-13 16:00:50',	'2021-05-13 16:00:50'),
(293,	'162183780911.jpg',	NULL,	543,	'2021-05-24 12:00:30',	'2021-05-24 12:00:30'),
(297,	'1623319878abcbcbc.jpg',	NULL,	549,	'2021-06-10 15:41:18',	'2021-06-10 15:41:18'),
(307,	'1625663625abcbcbc.jpg',	NULL,	562,	'2021-07-07 18:43:45',	'2021-07-07 18:43:45'),
(308,	'162567070853.jpg',	NULL,	563,	'2021-07-07 21:14:48',	'2021-07-07 21:14:48'),
(309,	'162567071135.jpeg',	NULL,	563,	'2021-07-07 21:14:48',	'2021-07-07 21:14:48'),
(314,	'16285043391628504338abcbcbc.mp4',	'1628504338abcbcbc.jpeg',	570,	'2021-08-09 15:48:58',	'2021-08-09 15:48:58'),
(319,	'1628587988abcbcbc.jpg',	NULL,	577,	'2021-08-10 15:03:08',	'2021-08-10 15:03:08'),
(320,	'1628587867162858781522.mp4',	'162858781522.jpeg',	576,	'2021-08-10 15:01:07',	'2021-08-10 15:01:07'),
(323,	'1628592126162859211022.mp4',	'162859211022.jpeg',	580,	'2021-08-10 16:12:05',	'2021-08-10 16:12:05'),
(325,	'16285952621628595262abcbcbc.mp4',	'1628595262abcbcbc.jpeg',	582,	'2021-08-10 17:04:22',	'2021-08-10 17:04:22'),
(326,	'1628598074162859805372.mp4',	'162859805372.jpeg',	583,	'2021-08-10 17:51:12',	'2021-08-10 17:51:12'),
(330,	'16287429241628742923abcbcbc.mp4',	'1628742923abcbcbc.jpeg',	586,	'2021-08-12 10:05:23',	'2021-08-12 10:05:23'),
(341,	'16309093461630909345abcbcbc.mp4',	'1630909345abcbcbc.jpeg',	603,	'2021-09-06 11:52:25',	'2021-09-06 11:52:25'),
(342,	'16355379561635537956abcbcbc.mp4',	'1635537956abcbcbc.jpeg',	605,	'2021-10-30 01:35:56',	'2021-10-30 01:35:56'),
(344,	'167663051886.png',	NULL,	608,	'2023-02-17 16:12:15',	'2023-02-17 16:12:15'),
(345,	'167663066528.jpeg',	NULL,	608,	'2023-02-17 16:14:28',	'2023-02-17 16:14:28'),
(346,	'1676898024abcbcbc.jpg',	NULL,	609,	'2023-02-20 18:30:24',	'2023-02-20 18:30:24');

DROP TABLE IF EXISTS `post_like`;
CREATE TABLE `post_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `isLike` enum('1','2') NOT NULL COMMENT '1: Like, 2: DisLike',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_like_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `post_like_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `post_like` (`id`, `user_id`, `post_id`, `isLike`, `created_date`, `updated_date`) VALUES
(89,	350,	171,	'1',	'2021-01-14 22:15:30',	'2021-01-14 22:15:30'),
(92,	349,	171,	'1',	'2021-01-29 21:30:42',	'2021-01-29 21:30:42'),
(93,	357,	171,	'1',	'2021-01-29 21:33:50',	'2021-01-29 21:33:50'),
(210,	357,	518,	'1',	'2021-04-27 17:21:30',	'2021-04-27 17:21:30'),
(217,	350,	518,	'1',	'2021-05-05 10:29:42',	'2021-05-05 10:29:42'),
(221,	357,	534,	'1',	'2021-05-13 16:01:20',	'2021-05-13 16:01:20'),
(230,	357,	543,	'1',	'2021-06-07 18:01:22',	'2021-06-07 18:01:22'),
(234,	303,	549,	'1',	'2021-06-10 16:20:33',	'2021-06-10 16:20:33'),
(245,	350,	549,	'1',	'2021-07-04 08:01:37',	'2021-07-04 08:01:37'),
(247,	303,	562,	'1',	'2021-07-07 18:49:06',	'2021-07-07 18:49:06'),
(248,	349,	562,	'1',	'2021-07-25 03:28:58',	'2021-07-25 03:28:58'),
(249,	349,	565,	'1',	'2021-07-27 14:30:47',	'2021-07-27 14:30:47'),
(250,	434,	543,	'1',	'2021-07-31 20:20:54',	'2021-07-31 20:20:54'),
(262,	456,	580,	'1',	'2021-08-10 16:27:19',	'2021-08-10 16:27:19'),
(265,	456,	582,	'1',	'2021-08-10 17:53:32',	'2021-08-10 17:53:32'),
(266,	349,	586,	'1',	'2021-08-12 15:20:23',	'2021-08-12 15:20:23'),
(269,	456,	521,	'1',	'2021-08-20 09:40:23',	'2021-08-20 09:40:23'),
(278,	456,	583,	'1',	'2021-08-24 16:28:44',	'2021-08-24 16:28:44'),
(280,	456,	563,	'1',	'2021-08-25 14:51:51',	'2021-08-25 14:51:51'),
(281,	456,	170,	'1',	'2021-08-26 13:21:27',	'2021-08-26 13:21:27'),
(286,	350,	583,	'1',	'2021-09-02 16:35:12',	'2021-09-02 16:35:12'),
(287,	350,	582,	'1',	'2021-09-02 16:35:18',	'2021-09-02 16:35:18'),
(288,	350,	586,	'1',	'2021-09-02 17:06:57',	'2021-09-02 17:06:57'),
(289,	349,	583,	'1',	'2021-09-03 19:50:06',	'2021-09-03 19:50:06'),
(291,	456,	570,	'1',	'2021-09-06 11:15:55',	'2021-09-06 11:15:55'),
(292,	349,	577,	'1',	'2021-09-06 18:36:17',	'2021-09-06 18:36:17'),
(293,	456,	604,	'1',	'2021-09-06 18:47:39',	'2021-09-06 18:47:39'),
(296,	304,	577,	'1',	'2023-02-16 18:18:51',	'2023-02-16 18:18:51'),
(297,	304,	565,	'1',	'2023-02-16 18:19:00',	'2023-02-16 18:19:00'),
(298,	523,	582,	'1',	'2023-02-16 18:40:15',	'2023-02-16 18:40:15'),
(304,	523,	604,	'1',	'2023-02-20 12:01:35',	'2023-02-20 12:01:35'),
(305,	304,	170,	'1',	'2023-02-20 18:22:49',	'2023-02-20 18:22:49'),
(306,	304,	521,	'1',	'2023-02-20 18:23:02',	'2023-02-20 18:23:02'),
(307,	349,	609,	'1',	'2023-02-20 18:30:45',	'2023-02-20 18:30:45'),
(308,	349,	580,	'1',	'2023-02-20 18:33:48',	'2023-02-20 18:33:48'),
(311,	523,	609,	'1',	'2023-02-20 21:56:54',	'2023-02-20 21:56:54'),
(312,	523,	605,	'1',	'2023-02-20 21:57:06',	'2023-02-20 21:57:06');

DROP TABLE IF EXISTS `sports`;
CREATE TABLE `sports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `parent_sports_id` int(11) DEFAULT NULL,
  `taxonomy_type` enum('post','coaching_academy','gym','sports_center','fitness_studio') NOT NULL,
  `status` enum('1','2') NOT NULL COMMENT '1: Active 2: Inactive',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `Sports Id` (`parent_sports_id`),
  CONSTRAINT `Sports Id` FOREIGN KEY (`parent_sports_id`) REFERENCES `sports` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `sports` (`id`, `name`, `image`, `parent_sports_id`, `taxonomy_type`, `status`, `created_date`, `updated_date`) VALUES
(1,	'Football',	NULL,	NULL,	'post',	'1',	'2020-11-03 10:31:23',	'2020-11-03 10:31:23'),
(2,	'Football Shots',	NULL,	1,	'post',	'1',	'2020-11-03 10:31:56',	'2020-11-03 10:31:56'),
(3,	'Baseball',	NULL,	NULL,	'post',	'1',	'2020-11-03 10:31:23',	'2020-11-03 10:31:23'),
(4,	'Handball',	NULL,	NULL,	'post',	'1',	'2020-11-03 10:31:23',	'2020-11-03 10:31:23'),
(5,	'Volleyball',	NULL,	NULL,	'post',	'1',	'2020-11-03 10:31:23',	'2020-11-03 10:31:23'),
(6,	'Leg Foot Shoots',	NULL,	1,	'post',	'1',	'2020-11-12 00:56:56',	'2020-11-12 00:56:56'),
(7,	'Ultimate Goals',	NULL,	3,	'post',	'1',	'2020-11-12 00:57:16',	'2020-11-12 00:57:16'),
(8,	'Service',	NULL,	5,	'post',	'1',	'2020-11-12 00:57:29',	'2020-11-12 00:57:29'),
(9,	'overhand',	NULL,	4,	'post',	'1',	'2020-11-12 00:57:44',	'2020-11-12 00:57:44'),
(10,	'Ultimate Goals',	NULL,	1,	'post',	'1',	'2020-11-17 00:43:32',	'2020-11-17 00:43:32'),
(11,	'Rugby',	NULL,	NULL,	'post',	'1',	'2020-11-18 02:13:28',	'2020-11-18 02:13:28'),
(12,	'Rugby ruck',	NULL,	11,	'post',	'1',	'2020-11-18 02:14:56',	'2020-11-18 02:14:56'),
(13,	'Cricket',	NULL,	NULL,	'post',	'1',	'2020-11-20 05:50:27',	'2020-11-20 05:50:27'),
(15,	'Structural Exercise',	NULL,	NULL,	'fitness_studio',	'1',	'2020-11-30 08:09:31',	'2020-11-30 08:09:31'),
(16,	'Arms',	NULL,	15,	'fitness_studio',	'1',	'2020-11-30 08:09:43',	'2020-11-30 08:09:43'),
(17,	'Chest',	NULL,	15,	'fitness_studio',	'1',	'2020-11-30 08:10:00',	'2020-11-30 08:10:00'),
(18,	'LEGS',	NULL,	15,	'fitness_studio',	'1',	'2021-01-15 08:03:26',	'2021-01-15 08:03:26'),
(19,	'cardio workout',	NULL,	NULL,	'fitness_studio',	'1',	'2021-01-15 08:05:20',	'2021-01-15 08:05:20'),
(20,	'Swimming Training',	NULL,	NULL,	'fitness_studio',	'1',	'2021-03-15 11:00:41',	'2021-03-15 11:00:41'),
(21,	'Swimming strokes',	NULL,	20,	'fitness_studio',	'1',	'2021-03-15 11:01:18',	'2021-03-15 11:01:18'),
(22,	'Pre workout cardio',	NULL,	19,	'fitness_studio',	'1',	'2021-04-23 08:58:45',	'2021-04-23 08:58:45'),
(23,	'batsman',	NULL,	13,	'post',	'1',	'2021-08-10 11:24:52',	'2021-08-10 11:24:52'),
(24,	'sidearm',	NULL,	4,	'post',	'1',	'2021-08-10 11:27:32',	'2021-08-10 11:27:32'),
(25,	'underarm',	NULL,	4,	'post',	'1',	'2021-08-10 11:27:54',	'2021-08-10 11:27:54'),
(26,	'bowler',	NULL,	13,	'post',	'1',	'2021-08-10 11:28:33',	'2021-08-10 11:28:33'),
(27,	'wicket keeper',	NULL,	13,	'post',	'1',	'2021-08-10 11:28:46',	'2021-08-10 11:28:46'),
(28,	'Surfing',	NULL,	NULL,	'post',	'1',	'2021-08-10 12:19:43',	'2021-08-10 12:19:43'),
(29,	'Wave Surfing',	NULL,	28,	'post',	'1',	'2021-08-10 12:20:38',	'2021-08-10 12:20:38'),
(30,	'YOGA',	NULL,	NULL,	'post',	'1',	'2021-08-12 04:31:14',	'2021-08-12 04:31:14'),
(31,	'KarmaYoga',	NULL,	30,	'post',	'1',	'2021-08-12 04:32:07',	'2021-08-12 04:32:07');

DROP TABLE IF EXISTS `trainee`;
CREATE TABLE `trainee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `location` varchar(150) NOT NULL,
  `speciality` varchar(200) DEFAULT NULL,
  `skill` varchar(200) DEFAULT NULL,
  `experience` varchar(200) DEFAULT NULL,
  `rating` decimal(10,2) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `profile_pic` varchar(200) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `trainee` (`id`, `title`, `email`, `location`, `speciality`, `skill`, `experience`, `rating`, `description`, `profile_pic`, `created_by`, `created_date`, `updated_date`) VALUES
(23,	'Diego',	'shivendratiwari.567@gmail.com',	'',	'Football coach',	'First touch, Striker, 1V1, Dribble, Defending ball',	'40',	4.00,	'Meet our star personal Trainer famous for his Hand of God goal. ',	'162875569494.jpg',	305,	'2021-08-12 13:38:17',	'2021-08-12 13:38:49'),
(26,	'Virat',	'Virat@yopmail.com',	'',	'Cricketer',	'Cricket',	'17',	5.00,	'King kohli',	NULL,	305,	'2023-02-20 18:54:25',	'2023-02-20 19:01:16');

DROP TABLE IF EXISTS `trainee_image`;
CREATE TABLE `trainee_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trainee_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `thumbnail_image` varchar(200) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `trainee_id` (`trainee_id`),
  CONSTRAINT `trainee_image_ibfk_1` FOREIGN KEY (`trainee_id`) REFERENCES `trainee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `trainee_image` (`id`, `trainee_id`, `name`, `thumbnail_image`, `created_date`, `updated_date`) VALUES
(41,	23,	'162875572716.jpg',	NULL,	'2021-08-12 13:38:49',	'2021-08-12 13:38:49'),
(46,	26,	'167689943114.png',	NULL,	'2023-02-20 18:54:25',	'2023-02-20 18:54:25'),
(47,	26,	'167689943822.jpeg',	NULL,	'2023-02-20 18:54:25',	'2023-02-20 18:54:25');

DROP TABLE IF EXISTS `trainee_session`;
CREATE TABLE `trainee_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trainee_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `type` varchar(150) NOT NULL,
  `meeting_link` varchar(200) NOT NULL,
  `skype_link` varchar(255) NOT NULL,
  `zoom_link` varchar(255) NOT NULL,
  `profile_name` varchar(200) NOT NULL,
  `status` enum('1','2') NOT NULL COMMENT '1:Active 2:Inactive',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `trainee_id` (`trainee_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `trainee_session_ibfk_1` FOREIGN KEY (`trainee_id`) REFERENCES `trainee` (`id`),
  CONSTRAINT `trainee_session_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `trainee_session` (`id`, `trainee_id`, `user_id`, `name`, `date`, `time`, `type`, `meeting_link`, `skype_link`, `zoom_link`, `profile_name`, `status`, `created_date`, `updated_date`) VALUES
(22,	23,	456,	'',	'1970-01-01',	'05:30:00',	'',	'',	'',	'',	'Sonica Tomar',	'1',	'2021-08-20 09:59:50',	'2021-08-20 09:59:50'),
(23,	23,	456,	'',	'2021-08-20',	'11:00:00',	'Football training ',	'',	'',	'',	'Sonica Tomar',	'1',	'2021-08-20 10:03:35',	'2021-08-20 10:03:35'),
(25,	23,	456,	'',	'1970-01-01',	'05:30:00',	'',	'',	'',	'',	'Sonica Tomar',	'1',	'2021-08-20 14:16:23',	'2021-08-20 14:16:23'),
(26,	23,	456,	'',	'1970-01-01',	'05:30:00',	'',	'',	'',	'',	'Sonica Tomar',	'1',	'2021-08-20 14:16:52',	'2021-08-20 14:16:52'),
(27,	23,	456,	'',	'1970-01-01',	'05:30:00',	'',	'',	'',	'',	'Sonica Tomar',	'1',	'2021-08-20 14:17:47',	'2021-08-20 14:17:47'),
(28,	23,	456,	'',	'2021-08-24',	'17:17:00',	' Sports Coaching',	'Hshshsbjsbsbvwgsbsj',	'',	'',	'Sonica Tomar',	'1',	'2021-08-24 17:17:41',	'2021-08-24 17:17:41'),
(29,	23,	456,	'',	'2021-08-30',	'10:11:00',	'Olympic Games',	'CiCIacOhachHcsgsh',	'',	'',	'Sonica Tomar',	'1',	'2021-08-30 10:44:16',	'2021-08-30 10:44:16'),
(30,	23,	523,	'',	'2023-02-19',	'10:03:00',	'Sweet',	'Hssjsj',	'',	'',	'Kajal Biswas',	'1',	'2023-02-17 10:41:36',	'2023-02-17 10:41:36');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `contact_no` varchar(15) NOT NULL,
  `parent_first_name` varchar(100) DEFAULT NULL,
  `parent_last_name` varchar(100) DEFAULT NULL,
  `parent_email` varchar(100) DEFAULT NULL,
  `parent_contact_no` varchar(100) DEFAULT NULL,
  `password` varchar(150) NOT NULL,
  `user_group` enum('1','2','3','4','5') NOT NULL COMMENT '1: Admin 2: User 3: Coach 4: Scout 5: Athlete',
  `sports_id` int(11) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('Male','Female','Transgender','Transgender Male','Transgender Female','Non-Binary','Gender-fluid','Prefer not to Say') NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zip_code` varchar(15) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `nationality` varchar(100) DEFAULT NULL,
  `current_club` varchar(250) DEFAULT NULL,
  `favourite_club` varchar(250) DEFAULT NULL,
  `preferred_foot` varchar(50) DEFAULT NULL,
  `height` varchar(15) DEFAULT NULL,
  `profession` varchar(100) DEFAULT NULL,
  `professional_certificate` varchar(100) DEFAULT NULL,
  `letter_of_employment` varchar(100) DEFAULT NULL,
  `id_card` varchar(100) DEFAULT NULL,
  `profile_pic` varchar(250) DEFAULT NULL,
  `status` enum('1','2','3','4') NOT NULL COMMENT '1: Active 2: Inactive 3: Need to approval,4:Suspend',
  `fcm_token` text NOT NULL,
  `otp` varchar(15) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `oauth_provider` enum('1','2','3') NOT NULL DEFAULT '1' COMMENT '1:Web 2:Google 3: Facebook',
  `oauth_uid` varchar(50) NOT NULL,
  `scouting_sports_id` int(11) DEFAULT NULL,
  `is_freelance` enum('0','1') NOT NULL,
  `isseen` enum('1','2') NOT NULL COMMENT '1:Seen 2:Unseen',
  `accept_term_condition` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `User Sports` (`sports_id`),
  KEY `scouting_sports_id` (`scouting_sports_id`),
  CONSTRAINT `User Sports` FOREIGN KEY (`sports_id`) REFERENCES `sports` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`scouting_sports_id`) REFERENCES `sports` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `contact_no`, `parent_first_name`, `parent_last_name`, `parent_email`, `parent_contact_no`, `password`, `user_group`, `sports_id`, `dob`, `gender`, `address`, `city`, `zip_code`, `country`, `nationality`, `current_club`, `favourite_club`, `preferred_foot`, `height`, `profession`, `professional_certificate`, `letter_of_employment`, `id_card`, `profile_pic`, `status`, `fcm_token`, `otp`, `created_date`, `updated_date`, `oauth_provider`, `oauth_uid`, `scouting_sports_id`, `is_freelance`, `isseen`, `accept_term_condition`) VALUES
(303,	'Jawwad',	'Khan',	'jawwad.khan@niletechnologies.com',	'8287599998',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'5',	1,	'2021-04-02',	'Male',	'Sector 120 Noida',	'Noida',	'242001',	'India',	'Indian',	'Strikers',	'FC BARCELONA',	NULL,	'6\'7\"',	NULL,	NULL,	NULL,	NULL,	'16160491517021F8A4-D6F7-44CE-89A6-2E35F73CD633.jpg',	'1',	'null',	'Xsz865',	'2020-11-09 10:40:08',	'2021-07-07 19:34:32',	'1',	'',	NULL,	'',	'2',	NULL),
(304,	'Sunil ',	'Chetry',	'testernile@gmail.com',	'8287599998',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'5',	1,	NULL,	'Male',	'Sector 120',	'Noida',	'201301',	'India',	'Indian',	'Shahjahanpur strikers',	'Fc barcelona',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'null',	'Xue234',	'2020-11-11 09:59:13',	'2020-11-11 09:59:13',	'1',	'',	NULL,	'0',	'1',	NULL),
(305,	'Admin',	NULL,	'admin@niletechnologies.com',	'',	NULL,	NULL,	NULL,	NULL,	'e6e061838856bf47e1de730719fb2609',	'1',	NULL,	NULL,	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'ewlkcbIySZuJrs1oAK_IPQ:APA91bFfqPMvt1yMA3pGRnzC5YuSqx0NGsAvh6_xX8mlh2iEDS22bvwZU3x041xWMZtrQcx_CVVvc_kCVc4aoprmym1iYVURkeJZaTCeONTXMXA0i_pZIYqnkxr8XAfBXfLYfXwxS0YG',	NULL,	'2020-11-12 00:56:10',	'2020-11-12 00:56:10',	'1',	'',	NULL,	'0',	'1',	NULL),
(337,	'Jerry',	'jone',	'jerry@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'5',	NULL,	NULL,	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'',	'NOr356',	'2020-11-25 14:48:58',	'2020-11-25 14:48:58',	'1',	'',	NULL,	'0',	'1',	NULL),
(346,	'Kirti',	'Gupta',	'kirti9718@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'4',	4,	'2020-11-01',	'Female',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'',	'7qb694',	'2020-12-18 23:22:35',	'2020-12-18 23:22:35',	'1',	'',	NULL,	'0',	'1',	NULL),
(347,	'Kirti',	'Gupta',	'sarita@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'4',	NULL,	'2020-11-01',	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1608314047image-c2a00146-91b0-4a82-a052-e01c15bf5fb7.jpg',	'1',	'',	'rMX795',	'2020-12-18 23:24:07',	'2020-12-18 23:24:07',	'1',	'',	NULL,	'0',	'1',	NULL),
(348,	'Akash',	'Gupta',	'akash1@gmail.com',	'8874589805',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'5',	3,	'2020-12-01',	'Male',	'Noida city center',	'Noida',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1609864411image-f4dc85d4-b13c-4c6c-89bc-1adac8ec7bdd.jpg',	'1',	'fIxVGPQW0Eu7qWCT6kLuSm:APA91bEzaySdZYTu0MIMwT_EX4GiYnoDuhnZelX-jjFVIAJ-4YyeSSVd-PqnxWGHrHQR7QFQEJBIswy2iwmbYTBaokANX_g2Qs_Fn0t4cPOI8Bgx7y7ZvK6x25fjX3xDnFHd9qlaZWZd',	'gGC134',	'2021-01-05 22:03:31',	'2021-02-08 10:13:16',	'1',	'',	NULL,	'0',	'1',	NULL),
(349,	'Payal',	'Chhikara',	'payal.chhikara@niletechnologies.com',	'7698345419',	'A',	'B',	'technologiesnile@gmail.com',	'7698345419',	'b24331b1a138cde62aa1f679164fc62f',	'5',	NULL,	'1988-08-01',	'Female',	'Sector 77',	'Noida',	'201301',	'India',	'Indian',	NULL,	NULL,	NULL,	'3.2',	NULL,	NULL,	NULL,	NULL,	'16287518292BF0B0C4-68C0-44A9-A4A6-0595C93D83F6.jpg',	'1',	'e8QeNh16PU1KuVKKeOPeQA:APA91bHbum5QpP2u4EY4JzRqfA4ooBZ3ho3_PolM0gUXliPW2-QqWjkE5RSrfirXf9ptcQ6Ild23pbQryKsT-DHOw51tY93KEcYnBj-cr7i8Zr4lMNDndTiEnD1LPdP3Pp1-_PK1Kag4',	'd0W460',	'2021-01-06 12:36:04',	'2021-08-12 12:33:49',	'1',	'',	NULL,	'',	'1',	NULL),
(350,	'Mike',	'Thoms',	'mike@gmail.com',	'8877518865',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'2',	13,	'2021-02-02',	'Male',	'New delhi',	'Delhi',	'123456',	'India',	'India ',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1612939813image-a3dd957b-4866-4e6d-86e7-d7da976a02ca.jpg',	'1',	'd8gh5gpP3UeXmM58Ym_riM:APA91bEnlPzQZ872yXbp_13AYWBuqLgffu6iDichl04tR6zqYGzq1sOmZ1MPp6Ltz518jkKIHHx_Nec7kpQykNriKtzmV0jx2ppTTyasyHPgGmKEctxLhla6HaQhVgqDk0JN4TTBzU5-',	'6XM341',	'2021-01-06 21:04:07',	'2021-06-09 17:38:13',	'1',	'',	NULL,	'0',	'1',	NULL),
(357,	'Peter',	'Pettigrew',	'testernile6@gmail.com',	'8287599998',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'2',	11,	'2021-02-01',	'Male',	'Sector 18',	'Noida',	'201301',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1615270634image-61afa851-9e7e-43b9-85aa-d38513186d5f.jpg',	'1',	'null',	'6gF682',	'2021-01-11 18:29:39',	'2021-07-30 14:17:01',	'1',	'',	NULL,	'',	'2',	NULL),
(383,	'Diego',	'Maradona',	'testernile8@gmail.com',	'999999999',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'3',	1,	'1964-02-02',	'Male',	'Mexico',	'Mexico',	'1111111',	'Brazil',	'Brazil',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1614160472image-db8921e1-8739-4a8c-bba9-9b5162366da9.jpg',	'1',	'',	'7N1471',	'2021-02-24 15:24:32',	'2021-02-24 15:24:32',	'1',	'',	NULL,	'0',	'1',	NULL),
(410,	'Jawwad',	'Scout',	'khanmohdjawwad@hotmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'3',	11,	NULL,	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1614348960Screenshot_20210223-221242_Ocory.jpg',	'1614348960image-94188607-d592-4e03-8db0-46757567ad48.jpg',	'3',	'',	'QEe136',	'2021-02-26 19:46:00',	'2021-02-26 19:46:00',	'1',	'',	3,	'1',	'1',	NULL),
(414,	'Sauravs',	'Ganguly',	'testernile15@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'3',	5,	'1970-01-01',	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1614845710Screenshot_20210303-165101_AutoMonkey.jpg',	'1614845710Title_(24).jpg',	'1614845710Screenshot_20210304-121951_AutoMonkey.jpg',	'1614845710image-8b9c4ce2-54d4-400d-8e8c-16550a8e3e6c.jpg',	'1',	'',	'K5f534',	'2021-03-04 13:45:10',	'2021-06-09 13:36:57',	'1',	'',	NULL,	'',	'2',	NULL),
(428,	'Kirti',	'Gupta',	'kirti9971@gmail.com',	'88957485',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'3',	3,	'2021-04-01',	'Female',	'Noida ',	'Noida',	'201001',	'India ',	'India ',	NULL,	NULL,	NULL,	NULL,	NULL,	'1618288938IMG-20210413-WA0000.jpg',	NULL,	NULL,	'1618288938image-ea1c91ac-ff1a-48e0-865a-7d9b6107c76b.jpg',	'1',	'',	'ZqN574',	'2021-04-13 10:12:18',	'2021-06-09 16:11:41',	'1',	'',	3,	'0',	'2',	NULL),
(429,	'Prabha',	'Gupta',	'prabha@gmail.com',	'8899558745',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'3',	3,	'2021-04-01',	'Female',	'Noida',	'Noida',	'102001',	'India ',	'India ',	NULL,	NULL,	NULL,	NULL,	'Xyzhjj',	'1618318914IMG-20210413-WA0002.jpg',	NULL,	NULL,	'1618318914image-6acf438c-1c17-446d-a138-2186665d42ef.jpg',	'1',	'',	'A7Q496',	'2021-04-13 18:31:54',	'2021-04-13 18:31:54',	'1',	'',	NULL,	'0',	'1',	NULL),
(430,	'Harrison',	'Grandour',	'jdjane@hotmail.com',	'8287599998',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'2',	5,	'2021-06-01',	'Male',	'Sector 30 noida',	'Noida',	'201301',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'16233195826B5B97B7-EF67-401C-BB9D-CB47CCA4AE1F.jpg',	'2',	'dGwh40anF0shlt-rK4IUhC:APA91bGc5v3zwGXDhboX8QNjc8KvdFNFKuJ6AhFrbUFuBOPRVaDUS3547hyfrwWUH2BooeQ1vlUkaPRLTP7FHfg22LkLdBl5bEFG_DuuK77gO8_z_wKEuBG8gso62SKi8Pp2dNBTmqQ7',	'7KW583',	'2021-04-15 11:31:44',	'2021-08-26 13:29:32',	'1',	'',	NULL,	'',	'2',	NULL),
(432,	'Amanda',	'Cerni',	'jawwa@d.com',	'8287599998',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'3',	11,	'1987-04-01',	'Male',	'Sector 120 noida',	'Noida',	'242001',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	'Rugby ruck coach',	'1618563404Screenshot_20210415-122558_SportsBaze.jpg',	NULL,	NULL,	NULL,	'1',	'',	'NIA891',	'2021-04-16 14:26:44',	'2021-04-16 14:26:44',	'1',	'',	NULL,	'0',	'1',	NULL),
(434,	'Ambrose',	'Ikekhua',	'ambroseikekhua@gmail.com',	'07595586350',	NULL,	NULL,	NULL,	NULL,	'e98c7ede009f6c9ba45af837621d70a2',	'5',	1,	'1977-05-01',	'Male',	'67 Dunlop Avenue',	'Leeds',	'LS12 4ND ',	'United Kingdom',	'British',	'None',	'Chelsea Fc',	NULL,	'5.2',	NULL,	NULL,	NULL,	NULL,	'1623409959DA4ABC31-07EA-40E7-BA4C-D7FBF9753EAC.jpg',	'1',	'diy5047kOUrjpkGvdFpBmy:APA91bGlT1IVQZe9Tc1eazlxk-OcyPFW1SG1dCUaO93MDlwCU9IHf65OWSIPwoiNKpZIU_EIrkrjNuZGyyIS2dbNNGfR5JPTh9vIkUJDcHJuO4jW1l58ink8OqM17C9peDSnCAbnJeVI',	'EK1846',	'2021-06-11 16:42:39',	'2021-07-30 17:12:24',	'1',	'',	NULL,	'0',	'2',	1),
(445,	'Test',	'Test',	'test@test.testq',	'',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'3',	NULL,	NULL,	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1624974540Fastag_Challan.pdf',	NULL,	NULL,	NULL,	'1',	'dZaCh2R5fkH9sYH-SKaMRv:APA91bG2hbKmgwt0lItX6HthbFBybmC-Fxo_DwsjRRu0LPZmpr7KlwUJeQaFlc0Nf-1ncn0ra3WGtBTaGqvWVoi6uAp655hnJCkZPQrwNBFhGy1jne0HS4JXM45kg-17yQs6guEUB8mB',	'L24176',	'2021-06-29 19:19:00',	'2021-06-29 19:20:17',	'1',	'',	4,	'0',	'2',	1),
(448,	'David',	'David',	'david@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'5',	4,	'2021-07-02',	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'right',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'dB8928',	'2021-07-01 12:35:52',	'2021-07-01 12:35:52',	'1',	'',	NULL,	'0',	'1',	1),
(449,	'Shiv',	'Shiv',	'shiv@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'5',	3,	'2021-07-25',	'Female',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'Both',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'RIM096',	'2021-07-01 13:01:02',	'2021-07-01 13:01:02',	'1',	'',	NULL,	'0',	'1',	1),
(450,	'Test',	'User',	'testernile1@gmail.com',	'8287599998',	'Test',	'Gargian',	'Test@dhdhhd.com',	'8888888888',	'b24331b1a138cde62aa1f679164fc62f',	'5',	4,	'1993-04-21',	'Transgender Female',	'Test address',	'Noida',	'201301',	'India',	'Indian',	'Spn strikers',	'Mn united',	'right',	'5 feet11',	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'jCg197',	'2021-07-01 15:02:38',	'2021-07-01 15:02:38',	'1',	'',	NULL,	'0',	'1',	1),
(451,	'Jawwad',	'Scout',	'testernile2@gmail.com',	'8287599998',	'Pp',	'Ll',	'Pp',	'8287599998',	'b24331b1a138cde62aa1f679164fc62f',	'4',	11,	'1993-04-09',	'Prefer not to Say',	'Test address',	'Spn',	'111111',	'Brazil',	'Brazilian',	NULL,	NULL,	NULL,	NULL,	'Test',	'1625132292Fastag_Challan.pdf',	NULL,	NULL,	NULL,	'1',	'eQqbul04bEBghUBidSSxtC:APA91bGZqO0V_RU25KzNz6tV3NKKTKJR5jo_xay96XwaZzYVnFJd8tjrQ_ocpDKxQefjWHRZU9Lly66E0ZT-KaqxMQlIJWX2s6LmGk5qQiEfJ433wOxZndB7jK3tITbf32IjyZZL-bFt',	'kC6168',	'2021-07-01 15:08:12',	'2021-07-01 15:21:24',	'1',	'',	11,	'1',	'2',	1),
(452,	'Bsbs',	'Bdh',	'testqwerty@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'5',	NULL,	NULL,	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'1eb702',	'2021-07-30 18:17:02',	'2021-07-30 18:17:02',	'1',	'',	NULL,	'0',	'1',	1),
(453,	'Jawwad',	'Cuz',	'jawadxyz@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'4',	NULL,	NULL,	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1627884815hello-i-m-nik-seF4Uo_AuXk-unsplash.jpg',	NULL,	NULL,	NULL,	'3',	'',	'crM651',	'2021-08-02 11:43:35',	'2021-08-02 11:43:35',	'1',	'',	3,	'1',	'1',	1),
(454,	'Lotto',	'Gupta',	'kirtinile9718@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'5',	3,	'2021-08-03',	'Female',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'Right',	'3 feet2 inch',	NULL,	NULL,	NULL,	NULL,	'162797206844543C0D-C8CA-45E2-96F7-126E3CC3657D.jpg',	'3',	'',	'cDO051',	'2021-08-03 11:57:48',	'2021-08-03 11:57:48',	'1',	'',	NULL,	'0',	'1',	1),
(455,	'A',	'B',	'testernile10@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'4',	NULL,	NULL,	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'162797245664572917_1617866146770.pdf',	NULL,	NULL,	NULL,	'3',	'',	'aIT832',	'2021-08-03 12:04:16',	'2021-08-03 12:04:16',	'1',	'',	NULL,	'0',	'1',	1),
(456,	'Sonica',	'Tomar',	'sonica0412@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'2',	5,	'1990-12-01',	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'd9n-bP0guEuqqhSTLYF9Xb:APA91bHd12aLZ-rkED8pBXeWUbmlBTrNA_xOxLAHKXEuRKgfIbeHy9bNhh8-h99zYGIPs8iK42nOqAb_4ILM2sAjgC4jRQWQk7ANTml-CuI0OC0RL_u4OZIsA_YGfrqK5icq3SO4Gyh1',	'M8J495',	'2021-08-09 11:52:49',	'2021-08-24 10:54:37',	'1',	'',	NULL,	'',	'1',	1),
(457,	'Sonica',	'Tomar',	'testernile12@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'827ccb0eea8a706c4c34a16891f84e7b',	'5',	4,	NULL,	'Female',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'3br895',	'2021-08-10 11:34:05',	'2021-08-10 11:34:05',	'1',	'',	NULL,	'0',	'1',	1),
(458,	'Sonica',	'Tomar',	'sonica041990@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'5fa82395d1d60f6b72ea7417cc39e3fd',	'5',	1,	NULL,	'Female',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'bgf479',	'2021-08-12 12:51:38',	'2021-08-12 12:51:38',	'1',	'',	NULL,	'0',	'1',	1),
(459,	'Sonica',	'Tomar',	'testernile4@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'827ccb0eea8a706c4c34a16891f84e7b',	'3',	30,	NULL,	'Female',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'',	'ZJ0375',	'2021-08-12 12:56:35',	'2021-08-26 13:29:04',	'1',	'',	NULL,	'0',	'2',	1),
(483,	'Sonica',	'Tomar',	'testernile11@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'e67c10a4c8fbfc0c400e047bb9a056a1',	'2',	4,	'1990-12-04',	'Female',	'1618 vamsee',	'Hyderabad',	'500081',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'',	'fQO952',	'2021-08-30 10:16:06',	'2021-08-30 10:16:06',	'1',	'',	NULL,	'0',	'1',	1),
(484,	'Sonica',	'Tomar',	'sonica11@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'e67c10a4c8fbfc0c400e047bb9a056a1',	'2',	4,	'1990-12-04',	'Female',	'123civil lines',	'Hyderabad ',	'500081',	'India',	'Indian ',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'',	'amv296',	'2021-08-30 10:18:19',	'2021-08-30 10:18:19',	'1',	'',	NULL,	'0',	'1',	1),
(486,	'Sonica',	'Tomar',	'sonica12@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'2',	1,	'1990-12-04',	'Female',	'23civil lines',	'Hyderabad ',	'500081',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'',	'Ttw430',	'2021-08-31 10:07:28',	'2021-08-31 10:07:28',	'1',	'',	NULL,	'0',	'1',	1),
(501,	'Sonica',	'Tomar',	'sonica13@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'3',	1,	'1990-12-04',	'Female',	'123 civil line',	'Hyderabad ',	'500081',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'Mpr358',	'2021-08-31 11:58:52',	'2021-08-31 11:58:52',	'1',	'',	NULL,	'0',	'1',	1),
(508,	'Sonica ',	'Tomar',	'sonica20@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'5',	1,	'1990-12-04',	'Female',	'Civil Lines',	'Hyderabad ',	'500081',	'India',	'Indian',	'Gandhi club',	'Modi club',	'Both',	'5 feet4 inch',	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'CaU149',	'2021-08-31 15:01:25',	'2021-08-31 15:01:25',	'1',	'',	NULL,	'0',	'1',	1),
(509,	'Sonica',	'Tomar',	'sonica21@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'4',	4,	'1990-12-31',	'Female',	'Civil Lines',	'Hyderabad',	'500081',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'wcO925',	'2021-08-31 15:05:29',	'2021-08-31 15:05:29',	'1',	'',	4,	'0',	'1',	1),
(510,	'Sonica',	'Tomar',	'sonica22@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'2',	1,	'1990-12-04',	'Female',	'618 vamsee Mulayam',	'Hyderabad ',	'500081',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'fKf3R5QeFE_CgOUYmYjNA9:APA91bGv6gjyMM-E4T1abnbIJhHVaC8m25bnSfgY6IObUSxQ0xM37kAND4J19vCs68DPCv5g8JZtwSX_t27xpwzAsWSer07fKRDCknatZiLioJL9IudSOCBXWKByz7r3bi8bztscSgfo',	'KhZ826',	'2021-08-31 15:12:28',	'2021-08-31 15:12:28',	'1',	'',	NULL,	'0',	'1',	1),
(512,	'Sonica',	'Tomar',	'sonica24@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'5',	1,	'1990-08-30',	'Female',	'Civil lines',	'Hyderabad',	'500081',	'India',	'Indian',	'Gandhi club',	'Modi club',	'Both',	'5 feet4 inch',	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'gal730',	'2021-08-31 17:31:25',	'2021-08-31 17:31:25',	'1',	'',	NULL,	'0',	'1',	1),
(513,	'Sonica',	'Tomar',	'sonica25@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'4',	13,	'1993-08-19',	'Female',	'Vamsee 123',	'Hyderabad',	'500081',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	NULL,	'1630411447Screenshot_20210824-121814_Incursus.jpg',	NULL,	NULL,	NULL,	'3',	'',	'SqD982',	'2021-08-31 17:34:07',	'2021-08-31 17:34:07',	'1',	'',	13,	'0',	'1',	1),
(514,	'Sonica',	'Tomar',	'sonica26@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'4',	11,	'1995-08-31',	'Female',	'Civil lines',	'Hyderabad ',	'500081',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	NULL,	'1630411624JPEG_image.jpeg',	NULL,	NULL,	NULL,	'3',	'',	'u9P614',	'2021-08-31 17:37:04',	'2021-08-31 17:37:04',	'1',	'',	11,	'0',	'1',	1),
(515,	'Sonica',	'Tomar',	'sonica27@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'3',	28,	'1973-08-31',	'Female',	'Vamsee435',	'Hyderabad',	'500081',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	'Surfing',	'163041208220210827_152743.jpg',	NULL,	NULL,	NULL,	'3',	'',	't7S218',	'2021-08-31 17:44:42',	'2021-08-31 17:44:42',	'1',	'',	NULL,	'0',	'1',	1),
(517,	'Sonica',	'Tomar',	'sonica36@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'2',	1,	'1995-12-04',	'Female',	'1618 vamsee',	'Hyderabad ',	'500081',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'fjP2me3slEnXv9ptfE3uhW:APA91bHgKrDwIDxbge9ylNf0ER8oUR4W-Bz2SGKrJ72m6tqBQn7wuexovbGwMX8dhYDQHUNO8o8gGK67Nn0A9g-4z962gLRHw5bEN290J74fDQ5t6ICxqgzPqM_qvL9fRW_Pmc3ReYNE',	'YVo904',	'2021-09-01 15:50:17',	'2021-09-01 15:50:17',	'1',	'',	NULL,	'0',	'1',	1),
(519,	'Sonica',	'Tomar',	'sonica100@gmail.com',	'9589980333',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'2',	1,	'1990-12-04',	'Female',	'1618 vamsee',	'Hyderabad ',	'500081',	'India',	'Indian',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'',	'GwQ849',	'2021-09-01 17:16:05',	'2021-09-01 17:16:05',	'1',	'',	NULL,	'0',	'1',	1),
(520,	'Sonica Tomar',	NULL,	'sonica.tomar@niletechnologies.com',	'',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'1',	NULL,	NULL,	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'',	NULL,	'2021-09-01 17:23:30',	'2021-09-01 17:23:30',	'1',	'',	NULL,	'0',	'1',	NULL),
(521,	'Sonica',	'Tomar',	'sonica38@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'5',	1,	'2021-09-10',	'Female',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'InS702',	'2021-09-03 14:24:04',	'2021-09-03 14:24:04',	'1',	'',	NULL,	'0',	'1',	1),
(522,	'Sonica',	'Tomar',	'sonica37@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'b24331b1a138cde62aa1f679164fc62f',	'5',	NULL,	NULL,	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'3',	'',	'ulv985',	'2021-09-03 14:26:29',	'2021-09-03 14:26:29',	'1',	'',	NULL,	'0',	'1',	1),
(523,	'Kajal',	'Biswas',	'kb10cse@gmail.com',	'',	NULL,	NULL,	NULL,	NULL,	'3a06478714e18d794e07ba6d180adb46',	'2',	NULL,	'1997-04-02',	'Male',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'4',	'dUvcKkAImUfumQIx3khYhk:APA91bGld_0Am0WmG2NW1Fg7Ek36crPmX2F7reA_CpmU3uk1ngHWbNFKAyaK0n-3pEf2aEUvQGupg6fdbHKNnVhKCLa1yJpkPdvP5y3OG1YtlXnivsfG6cE4MjAtRJEyRfbp6aFK2uXF',	'LAC901',	'2023-02-16 18:35:33',	'2023-02-20 22:21:51',	'1',	'',	NULL,	'',	'2',	1),
(524,	'Robin',	'Singh',	'robin@yopmail.com',	'8475847029',	NULL,	NULL,	NULL,	NULL,	'e10adc3949ba59abbe56e057f20f883e',	'5',	5,	'1995-02-20',	'Male',	'S4',	'Meerut',	'250002',	'India',	'Indian',	NULL,	NULL,	'Left',	'5 feet1 inch',	NULL,	NULL,	NULL,	NULL,	NULL,	'1',	'fT5UDXxtU0PeuSKB_RPxFM:APA91bHx5IjfD-uCWfhFcH9p4OZRiU__rudWwMGswkQ4T0qvIEqYB-HgQX5C31fQwikclaNUI92e8oI8WbcHJ3OO7c3rJ4z2G0OMZrAYpQ7MZTsLU_MzZDq9h2AGgOA9emcJFzR5jPC6',	'DMQ837',	'2023-02-20 11:37:08',	'2023-02-20 11:39:04',	'1',	'',	NULL,	'0',	'2',	1);

DROP TABLE IF EXISTS `user_follower`;
CREATE TABLE `user_follower` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follower_id` int(11) NOT NULL,
  `following_id` int(11) NOT NULL,
  `isseen` enum('1','2') NOT NULL DEFAULT '2' COMMENT '1:Seen 2:Unseen',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `follower_id` (`follower_id`),
  KEY `following_id` (`following_id`),
  CONSTRAINT `user_follower_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `user` (`id`) ON UPDATE NO ACTION,
  CONSTRAINT `user_follower_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `user` (`id`) ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user_follower` (`id`, `follower_id`, `following_id`, `isseen`, `created_date`) VALUES
(32,	303,	348,	'1',	'2021-01-07 10:11:44'),
(53,	349,	303,	'1',	'2021-01-08 14:44:58'),
(62,	303,	303,	'1',	'2021-01-08 20:28:17'),
(95,	348,	350,	'1',	'2021-02-12 17:10:02'),
(96,	350,	357,	'1',	'2021-02-23 17:04:32'),
(107,	357,	414,	'1',	'2021-03-10 11:26:09'),
(108,	410,	349,	'2',	'2021-03-10 15:25:10'),
(114,	428,	357,	'2',	'2021-04-14 15:45:45'),
(116,	303,	432,	'1',	'2021-04-16 14:30:37'),
(117,	432,	349,	'2',	'2021-04-23 00:18:42'),
(118,	414,	357,	'2',	'2021-05-02 16:15:47'),
(120,	432,	357,	'2',	'2021-05-03 10:11:33'),
(156,	410,	357,	'2',	'2021-05-04 18:43:48'),
(169,	410,	350,	'1',	'2021-05-05 11:07:20'),
(171,	432,	350,	'1',	'2021-05-05 11:07:26'),
(174,	414,	350,	'1',	'2021-05-07 14:49:12'),
(175,	357,	348,	'1',	'2021-05-11 10:57:32'),
(176,	350,	348,	'1',	'2021-05-11 12:50:29'),
(177,	348,	348,	'1',	'2021-05-13 16:53:21'),
(186,	350,	350,	'1',	'2021-05-17 12:57:37'),
(195,	410,	303,	'2',	'2021-05-17 14:40:41'),
(197,	432,	303,	'2',	'2021-05-17 14:40:45'),
(198,	414,	303,	'2',	'2021-05-17 14:40:47'),
(201,	348,	303,	'2',	'2021-05-17 14:52:13'),
(203,	350,	303,	'1',	'2021-05-17 14:52:23'),
(205,	303,	349,	'1',	'2021-05-17 16:28:58'),
(208,	303,	350,	'1',	'2021-05-17 16:39:29'),
(211,	348,	357,	'2',	'2021-05-20 19:22:36'),
(217,	357,	349,	'1',	'2021-05-20 20:18:39'),
(222,	305,	357,	'2',	'2021-05-21 20:57:56'),
(232,	357,	350,	'1',	'2021-06-07 11:48:50'),
(233,	430,	350,	'1',	'2021-06-07 11:50:04'),
(234,	305,	350,	'2',	'2021-06-07 14:11:56'),
(238,	357,	303,	'1',	'2021-06-07 17:55:18'),
(239,	430,	357,	'1',	'2021-06-07 17:59:31'),
(240,	305,	303,	'2',	'2021-06-07 19:39:47'),
(253,	303,	430,	'2',	'2021-06-08 20:44:08'),
(265,	357,	430,	'1',	'2021-06-09 15:43:03'),
(266,	349,	357,	'1',	'2021-06-09 16:44:59'),
(267,	430,	303,	'2',	'2021-06-10 16:22:02'),
(268,	383,	349,	'2',	'2021-06-11 01:47:36'),
(270,	430,	349,	'2',	'2021-07-01 03:56:46'),
(271,	303,	357,	'2',	'2021-07-07 18:56:59'),
(272,	452,	434,	'2',	'2021-07-31 20:23:50'),
(273,	350,	456,	'1',	'2021-08-20 10:54:58'),
(274,	456,	350,	'2',	'2021-08-20 10:58:10'),
(275,	448,	456,	'2',	'2021-09-06 10:58:59'),
(277,	434,	523,	'2',	'2023-02-16 19:17:27');

-- 2023-03-10 11:40:06
