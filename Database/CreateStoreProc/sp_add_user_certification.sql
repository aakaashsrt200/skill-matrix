USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_user_certification`(IN in_certification_id int, IN in_user_id int, in_description varchar(5000))
BEGIN
	DECLARE count INT  DEFAULT 1;
    select count(*) INTO count from skill_matrix.user_certification a where a.certification_id= in_certification_id and a.user_id = in_user_id;
    IF(count = 0)
	THEN INSERT INTO SKILL_MATRIX.user_certification (user_id, certification_id, description) VALUES (in_user_id, in_certification_id, in_description);
		 Select 'Inserted';
    else
		Select 'Skipped';
    end if;
END ;;
DELIMITER ;