USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_education`(IN in_degree varchar(50), in_stream varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
	select count(*) INTO count from skill_matrix.`education` a where a.degree= in_degree and a.stream = in_stream;
    IF(count = 0)
	THEN INSERT INTO SKILL_MATRIX.`education` (degree, stream) VALUES (in_degree,in_stream);
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;