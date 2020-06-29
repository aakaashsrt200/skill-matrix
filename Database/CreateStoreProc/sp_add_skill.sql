USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_skill`(IN in_domain varchar(50), in_skill varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
    select count(*) INTO count from skill_matrix.skills a where a.skill= in_skill and a.domain = in_domain;
    IF(count = 0)
	THEN INSERT INTO SKILL_MATRIX.skills (domain, skill) VALUES (in_domain,in_skill);
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;