USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_user_project`(IN in_project_id varchar(50), IN in_user_id int, in_utilization varchar(50), in_end_date date)
BEGIN
	DECLARE count INT  DEFAULT 1;
    select count(*) INTO count from skill_matrix.user_project a where a.project_id= in_project_id and a.user_id = in_user_id;
    IF(count = 0)
	THEN INSERT INTO SKILL_MATRIX.user_project (user_id, project_id, utilization, end_date) VALUES (in_user_id, in_project_id, in_utilization, in_end_date);
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;