USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_edit_designation_role`(IN in_designation_role_id int(11),in_designation varchar(50), in_role varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
	select count(*) INTO count from skill_matrix.designation a where a.designation= in_designation and a.current_role = in_role and designation_role_id != in_designation_role_id;
    IF(count = 0)
	THEN UPDATE SKILL_MATRIX.designation set designation = in_designation, current_role = in_role WHERE designation_role_id = in_designation_role_id;
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;