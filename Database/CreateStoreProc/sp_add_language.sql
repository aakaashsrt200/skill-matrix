USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_language`(IN in_language_name varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
	select count(*) INTO count from skill_matrix.`languages` a where a.language_name= in_language_name;
    IF(count = 0)
	THEN INSERT INTO SKILL_MATRIX.languages (language_name) VALUES (in_language_name);
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;