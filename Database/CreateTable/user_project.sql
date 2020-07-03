DROP TABLE IF EXISTS `user_project`;

CREATE TABLE `user_project` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `project_id` varchar(100) DEFAULT NULL,
  `utilization` int(11) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `insert_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=300001 DEFAULT CHARSET=latin1;