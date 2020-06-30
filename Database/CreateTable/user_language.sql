DROP TABLE IF EXISTS `user_language`;

CREATE TABLE `user_language` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `language_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9081 DEFAULT CHARSET=latin1;