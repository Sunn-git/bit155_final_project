-- TRIGGER START --------- INSERT END ----------

-- 유저 가입시 유저권한주기
DELIMITER $$
CREATE TRIGGER `USER_INSERT_TRIGGER`
AFTER INSERT ON `USER`
FOR EACH ROW 
BEGIN
INSERT INTO `ROLE_MEMBER` 
SET 
`AUTHORITY` = 'ROLE_USER',  
`ID` = NEW.`ID`;
END $$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER `USER_DELETE_TRIGGER`
AFTER DELETE ON `ROLE_MEMBER`
FOR EACH ROW 
BEGIN
DELETE
FROM `USER` 
WHERE `ID` = OLD.`ID`;
END $$
DELIMITER ;

-- 유저 가입시 default group 추가하기
DELIMITER $$
CREATE TRIGGER `DEFAULT_GROUP_TRIGGER`
AFTER INSERT ON `USER`
FOR EACH ROW 
BEGIN
INSERT INTO `GROUP` 
SET 
`GROUP_NAME` = 'Personal',  
`ID` = NEW.`ID`;
END $$
DELIMITER ;


-- 댓글 등록시 칸반카드 테이블에 댓글 갯수 자동 증가시키기
DELIMITER $$
CREATE TRIGGER `CARD_COMMENT_COUNT_TRIGGER`
AFTER INSERT ON `board_comment`
FOR EACH ROW 
BEGIN
	IF (NEW.`CARD_NO` > 0) THEN
		UPDATE `KANBAN_CARD`
		SET `COMMENT_COUNT` = `COMMENT_COUNT`+1
		WHERE `CARD_NO` = NEW.`CARD_NO`;
	END IF;
END $$
DELIMITER ;


-- 트리거가 만들어졌는지 확인
SHOW TRIGGERS;