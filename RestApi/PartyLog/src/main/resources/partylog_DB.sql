-- --------------------------------------------------------
-- 호스트:                          stg-yswa-kr-practice-db-master.mariadb.database.azure.com
-- 서버 버전:                        10.3.23-MariaDB - MariaDB Server
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- S09P12A501 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `s09p12a501` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `S09P12A501`;

-- 테이블 S09P12A501.follow 구조 내보내기
CREATE TABLE IF NOT EXISTS `follow` (
  `follow_no` int(11) NOT NULL AUTO_INCREMENT,
  `follower_no` int(11) NOT NULL,
  `followee_no` int(11) NOT NULL,
  PRIMARY KEY (`follow_no`),
  KEY `fk_follower_user` (`follower_no`),
  KEY `fk_followee_user` (`followee_no`),
  CONSTRAINT `fk_followee_user` FOREIGN KEY (`followee_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_follower_user` FOREIGN KEY (`follower_no`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S09P12A501.letter 구조 내보내기
CREATE TABLE IF NOT EXISTS `letter` (
  `letter_id` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `letter_content` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `letter_receiver` int(11) DEFAULT NULL,
  `letter_reg_date` datetime(6) DEFAULT NULL,
  `letter_title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `letter_writer` int(11) DEFAULT NULL,
  PRIMARY KEY (`letter_id`),
  KEY `fk_writer_user` (`letter_writer`),
  KEY `fk_receiver_user` (`letter_receiver`),
  CONSTRAINT `fk_receiver_user` FOREIGN KEY (`letter_receiver`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_writer_user` FOREIGN KEY (`letter_writer`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S09P12A501.live 구조 내보내기
CREATE TABLE IF NOT EXISTS `live` (
  `live_id` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `live_title` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `live_start_time` datetime DEFAULT current_timestamp(),
  `live_end_time` datetime DEFAULT NULL,
  `live_desc` text COLLATE utf8mb4_bin DEFAULT NULL,
  `live_active` tinyint(1) DEFAULT 0,
  `live_host` int(11) NOT NULL,
  PRIMARY KEY (`live_id`) USING BTREE,
  KEY `fk_host_user` (`live_host`) USING BTREE,
  CONSTRAINT `fk_host_user` FOREIGN KEY (`live_host`) REFERENCES `user` (`user_no`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S09P12A501.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `user_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `user_birthday` date DEFAULT NULL,
  `user_nickname` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `user_profile` varchar(200) COLLATE utf8mb4_bin DEFAULT NULL,
  `W_refreshtoken` varchar(200) COLLATE utf8mb4_bin DEFAULT NULL,
  `A_refreshtoken` varchar(200) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1043 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 S09P12A501.video 구조 내보내기
CREATE TABLE IF NOT EXISTS `video` (
  `video_no` int(11) NOT NULL AUTO_INCREMENT,
  `video_name` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `video_reg_date` datetime NOT NULL DEFAULT current_timestamp(),
  `video_url` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  `live_id` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`video_no`),
  UNIQUE KEY `conference_id` (`live_id`) USING BTREE,
  CONSTRAINT `fk_live_id` FOREIGN KEY (`live_id`) REFERENCES `live` (`live_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 프로시저 S09P12A501.팔로우더미데이터 구조 내보내기
DELIMITER //
CREATE PROCEDURE `팔로우더미데이터`()
BEGIN

DECLARE i INT DEFAULT 0;

	WHILE (i <= 10000) DO 
	
-- 		INSERT INTO follow (follower_no, followee_no)
-- 		VALUES ( FLOOR(RAND()*(1000)+1), FLOOR(RAND()*(1000)+1));
		SET @a = FLOOR(RAND()*(1000)+1);
		SET @b = FLOOR(RAND()*(1000)+1);
		INSERT INTO `follow` (follower_no, followee_no) SELECT @a, @b FROM DUAL
		WHERE NOT EXISTS (SELECT * FROM `follow` WHERE follower_no = @a AND followee_no = @b)
		AND @a != @b;
		
		SET i = i + 1;
	
	END WHILE;

END//
DELIMITER ;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
