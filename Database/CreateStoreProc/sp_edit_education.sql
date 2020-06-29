USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_edit_education`(IN in_education_id int(11),in_degree varchar(50), in_stream varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
	select count(*) INTO count from skill_matrix.`education` a where a.degree= in_degree and a.stream = in_stream and education_id != in_education_id;
    IF(count = 0)
	THEN UPDATE SKILL_MATRIX.education set degree = in_degree, stream = in_stream WHERE education_id = in_education_id;
		 Select count;
    else
		 Select count;
    end if;
END ;;
DELIMITER ;