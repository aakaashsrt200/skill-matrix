USE skill_matrix;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_edit_certificates`(IN in_certification_id int(11),in_domain varchar(50), in_certificate varchar(50))
BEGIN
	DECLARE count INT  DEFAULT 1;
select count(*) INTO count from skill_matrix.certificates a where a.certification= in_certificate and a.domain = in_domain and certification_id != in_certification_id;
    IF(count = 0)
	THEN UPDATE SKILL_MATRIX.certificates set certification = in_certificate, domain = in_domain WHERE certification_id = in_certification_id;
		 Select count;
    else
		Select count;
    end if;
END ;;
DELIMITER ;