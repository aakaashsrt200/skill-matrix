USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_project`(IN in_project varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
    select count(*) INTO count from skill_matrix.projects a where a.project= in_project;
    IF(count = 0)
	THEN INSERT INTO SKILL_MATRIX.projects (project) VALUES (in_project);
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;