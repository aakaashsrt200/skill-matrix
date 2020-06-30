CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `skill_matrix`.`vw_profile_service_details_admin` AS select `ud`.`user_id` AS `user_id`,`ud`.`username` AS `username`,`ud`.`email_id` AS `email_id`,`ud`.`first_name` AS `first_name`,`ud`.`last_name` AS `last_name`,`ud`.`user_type` AS `user_type` from ((((`skill_matrix`.`user_details` `ud` left join `skill_matrix`.`practices` `pr` on((`ud`.`coe_id` = `pr`.`coe_id`))) left join `skill_matrix`.`designation` `ds` on((`ud`.`designation_role_id` = `ds`.`designation_role_id`))) left join `skill_matrix`.`education` `ed` on((`ud`.`education_id` = `ed`.`education_id`))) left join `skill_matrix`.`vw_user_language_concat` `lc` on((`ud`.`user_id` = `lc`.`user_id`)));
