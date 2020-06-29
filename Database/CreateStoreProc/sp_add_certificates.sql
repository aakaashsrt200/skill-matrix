USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_add_certificates`(IN in_domain varchar(50), in_certificate varchar(50),in_created_by varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
select count(*) INTO count from skill_matrix.certificates a where a.certification= in_certificate and a.domain = in_domain;
    IF(count = 0)
	THEN INSERT INTO SKILL_MATRIX.certificates (domain, certification,created_by) VALUES (in_domain,in_certificate,in_created_by);
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;