USE skill_matrix;
DELIMITER ;;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_user_skill`(IN in_skill_id int, IN in_user_id int, in_rating int)
BEGIN
	DECLARE count INT  DEFAULT 1;
    select count(*) INTO count from skill_matrix.user_skills a where a.skill_id= in_skill_id and a.user_id = in_user_id;
    IF(count = 0)
	THEN INSERT INTO SKILL_MATRIX.user_skills (user_id, skill_id, rating) VALUES (in_user_id, in_skill_id, in_rating);
		 Select 'Inserted';
    else
		Select 'Skipped';
    end if;
END ;;
DELIMITER ;