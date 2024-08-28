-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2024 at 04:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ideanest`
--

DELIMITER $$
--
-- Procedures
--
CREATE PROCEDURE `usp_CollectionDetail_IU`(IN `_collectionId` INT, IN `_collectionName` NVARCHAR(55), in _collectionParentId int, IN `_createdBy` INT)
BEGIN
-- Update
if(_collectionId > 0) THEN
	UPDATE CollectionDetails 
	set CollectionName = _collectionName, 
		LastUpdateOn = NOW()
	WHERE CollectionId = _collectionId;
-- Insert
ELSE
	INSERT INTO CollectionDetails (`CollectionName`, `CollectionParentId`,`CreatedBy`) 
	VALUES (_collectionName, _collectionParentId, _createdBy);

END IF;
END$$

CREATE PROCEDURE `usp_deleteCollection` (IN `_collectionId` INT)   BEGIN
	DELETE FROM CollectionDetails 
  WHERE CollectionId = _collectionId;
END$$

CREATE PROCEDURE `usp_deleteNestItem` (IN `_id` INT, IN `_createdBy` INT)   BEGIN
	DELETE From NestItems 
  WHERE id = _id And CreatedBy = _createdBy;
END$$

CREATE PROCEDURE `usp_getCollectionDetails` (IN `_collectionId` INT, IN `_userId` INT)   BEGIN
    -- Fetching collection details
    SELECT CollectionId, CollectionName 
    FROM CollectionDetails 
    WHERE CreatedBy = _userId AND 
          (CollectionParentId = _collectionId OR (_collectionId IS NULL AND CollectionParentId IS NULL));
    
    -- Fetching Items details
    SELECT id, Title, Description, CAST(IsPreview AS UNSIGNED) as IsPreview, UrlTitle, UrlImage, UrlDescription, UrlDomain 
    FROM NestItems 
    WHERE CreatedBy = _userId AND 
          (ParentCollectionId = _collectionId OR (_collectionId IS NULL AND ParentCollectionId IS NULL));
END$$

CREATE PROCEDURE `usp_getDetailsByItemId` (IN `_id` INT)   BEGIN
	SELECT Id, Title, Description, CAST(IsPreview AS UNSIGNED) as IsPreview, Url, UrlTitle, UrlImage, UrlDescription, UrlDomain 
    FROM NestItems 
    WHERE Id = _id;
END$$

CREATE PROCEDURE `usp_getUrlByItemId` (IN `_id` INT)   BEGIN
	SELECT Url FROM NestItems where Id = _id;
END$$

CREATE PROCEDURE `usp_getUserDetailsByEmail` (IN `_email` VARCHAR(101))   BEGIN
	select UserId, UserName, FirstName, MiddleName, LastName, Email, Password, ContactNo, Theme, ProfileUrl, CAST(IsVerified AS UNSIGNED) as IsVerified, CAST(IsActive AS UNSIGNED) as IsActive
	from UserInfo 
	WHERE Email = _email;
END$$

CREATE PROCEDURE `usp_NestItem_IU` (IN `_id` INT, IN `_title` VARCHAR(150), IN `_description` VARCHAR(150), IN `_url` NVARCHAR(1000), IN `_isPreview` BIT, IN `_urlTitle` VARCHAR(500), IN `_urlImage` VARCHAR(500), IN `_urlDescription` TEXT, IN `_urlDomain` VARCHAR(200), IN `_parentCollectionId` INT, IN `_createdBy` INT)   BEGIN
-- Update
if(_id > 0) THEN
	UPDATE NestItems 
	SET Title = _title, 
		Description = _description,
        Url = _url,
        IsPreview = _isPreview,
        UrlTitle = _urlTitle,
        UrlImage = _urlImage,
        UrlDescription = _urlDescription,
        UrlDomain = _urlDomain,
		LastUpdatedOn = NOW()
	WHERE id = _id;
-- Insert
ELSE
	INSERT INTO NestItems (`Title`, `Description`, `IsPreview`, `Url`,`UrlTitle`, `UrlImage`, `UrlDescription`, `UrlDomain`, `ParentCollectionId`, `CreatedBy`) 
	VALUES (_title, _description, _isPreview, _url, _urlTitle, _urlImage, _urlDescription, _urlDomain, _parentCollectionId, _createdBy);
	END IF;
END$$

CREATE PROCEDURE `usp_UserDetails_UI` (IN `_userId` INT, IN `_userName` VARCHAR(60), IN `_firstName` VARCHAR(45), IN `_middleName` VARCHAR(45), IN `_lastName` VARCHAR(45), IN `_email` VARCHAR(101), IN `_password` VARCHAR(120), IN `_contactNo` VARCHAR(12), IN `_theme` VARCHAR(15), IN `_profileUrl` VARCHAR(500))   BEGIN


IF (_userId > 0) THEN
		UPDATE UserInfo
        SET FirstName = _firstName,
            MiddleName = _middleName,
            LastName = _lastName,
            ContactNo = _contactNo,
            Theme = _theme,
            ProfileUrl = _profileUrl,
            LastUpdatedOn =  NOW()
		WHERE userId = _userId;
    ELSE
        INSERT INTO UserInfo (`UserName`, `FirstName`, `MiddleName`, `LastName`, `Email`, `Password`, `ContactNo`, `Theme`, `ProfileUrl`, `IsVerified`, `IsActive`)
		VALUES (_userName, _firstName, _middleName, _lastName, _email, _password, _contactNo, _theme, _profileUrl, 0, 1);
	END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `CollectionDetails`
--

CREATE TABLE `CollectionDetails` (
  `CollectionId` int(11) NOT NULL,
  `CollectionName` varchar(55) NOT NULL,
  `CollectionParentId` int(11) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT current_timestamp(),
  `LastUpdateOn` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `NestItems`
--

CREATE TABLE `NestItems` (
  `Id` int(11) NOT NULL,
  `Title` varchar(150) NOT NULL,
  `Description` text DEFAULT NULL,
  `IsPreview` bit(1) NOT NULL DEFAULT b'1',
  `Url` varchar(1000) DEFAULT NULL,
  `UrlTitle` varchar(500) DEFAULT NULL,
  `UrlImage` varchar(500) DEFAULT NULL,
  `UrlDescription` text DEFAULT NULL,
  `UrlDomain` varchar(200) DEFAULT NULL,
  `ParentCollectionId` int(11) DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedOn` datetime DEFAULT current_timestamp(),
  `LastUpdatedOn` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `UserInfo`
--

CREATE TABLE `UserInfo` (
  `UserId` int(11) NOT NULL,
  `UserName` varchar(60) NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `MiddleName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) NOT NULL,
  `Email` varchar(101) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `ContactNo` varchar(12) DEFAULT NULL,
  `Theme` varchar(15) DEFAULT NULL,
  `ProfileUrl` varchar(500) DEFAULT NULL,
  `IsVerified` bit(1) NOT NULL,
  `IsActive` bit(1) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `LastUpdatedOn` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for table `CollectionDetails`
--
ALTER TABLE `CollectionDetails`
  ADD PRIMARY KEY (`CollectionId`),
  ADD KEY `fk_colectionCreatedBy_UserInfoUserId` (`CreatedBy`);

--
-- Indexes for table `NestItems`
--
ALTER TABLE `NestItems`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_nestitemCreatedBy_UserInfoUserId` (`CreatedBy`);

--
-- Indexes for table `UserInfo`
--
ALTER TABLE `UserInfo`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collectiondetails`
--
ALTER TABLE `collectiondetails`
  MODIFY `CollectionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `nestitems`
--
ALTER TABLE `nestitems`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


--
-- Constraints for dumped tables
--

--
-- Constraints for table `CollectionDetails`
--
ALTER TABLE `CollectionDetails`
  ADD CONSTRAINT `fk_colectionCreatedBy_UserInfoUserId` FOREIGN KEY (`CreatedBy`) REFERENCES `UserInfo` (`UserId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `NestItems`
--
ALTER TABLE `NestItems`
  ADD CONSTRAINT `fk_nestitemCreatedBy_UserInfoUserId` FOREIGN KEY (`CreatedBy`) REFERENCES `UserInfo` (`UserId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
