USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_edit_language`(IN in_language_id int(11),in_language_name varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
	select count(*) INTO count from skill_matrix.`languages` a where a.language_name= in_language_name and language_id != in_language_id;
    IF(count = 0)
	THEN UPDATE SKILL_MATRIX.languages set language_name = in_language_name WHERE language_id = in_language_id;
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;