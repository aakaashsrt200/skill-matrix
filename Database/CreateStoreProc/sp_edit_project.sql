USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_edit_project`(IN in_project_id int(11),in_project varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
    select count(*) INTO count from skill_matrix.projects a where a.project= in_project and project_id != in_project_id;
    IF(count = 0)
	THEN UPDATE SKILL_MATRIX.projects set project = in_project WHERE project_id = in_project_id;
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;