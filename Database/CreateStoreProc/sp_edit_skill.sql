USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_edit_skill`(IN in_skill_id int(11),in_domain varchar(50), in_skill varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
	select count(*) INTO count from skill_matrix.skills a where a.skill= in_skill and a.domain = in_domain and skill_id != in_skill_id;
    IF(count = 0)
	THEN UPDATE SKILL_MATRIX.skills set skill = in_skill, domain = in_domain WHERE skill_id = in_skill_id;
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;