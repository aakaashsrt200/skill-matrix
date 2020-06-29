USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_designation_role`(IN in_designation varchar(50), in_role varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
	select count(*) INTO count from skill_matrix.designation a where a.designation= in_designation and a.current_role = in_role;
    IF(count = 0)
	THEN INSERT INTO SKILL_MATRIX.designation (designation, current_role) VALUES (in_designation,in_role);
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;