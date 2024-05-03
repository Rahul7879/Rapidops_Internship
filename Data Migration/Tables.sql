DROP TABLE IF EXISTS `MigrationEntities`;

CREATE TABLE `MigrationEntities` (
  `MigrationEntityID` int NOT NULL AUTO_INCREMENT,
  `TotalRecords` int DEFAULT NULL,
  `DataProvider` varchar(255) DEFAULT NULL,
  `ModuleID` int DEFAULT NULL,
  `Module` varchar(255) DEFAULT NULL,
  `ModuleDescription` text,
  `IsCompleted` tinyint(1) DEFAULT '0',
  `IsActive` tinyint(1) DEFAULT '1',
  `Metas` text,
  `MigrationID` int DEFAULT NULL,
  `LastActivity` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`MigrationEntityID`),
  KEY `MigrationID` (`MigrationID`),
  CONSTRAINT `MigrationEntities_ibfk_1` FOREIGN KEY (`MigrationID`) REFERENCES `MigrationLogs` (`MigrationLogID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `MigrationEntities` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `MigrationLogs`;

CREATE TABLE `MigrationLogs` (
  `MigrationLogID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Source` varchar(255) DEFAULT NULL,
  `CanRevert` tinyint(1) DEFAULT '0',
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `LastModified` datetime DEFAULT NULL,
  `LastModifiedBy` varchar(255) DEFAULT NULL,
  `SkippedRecords` int DEFAULT '0',
  `UpdatedRecords` int DEFAULT '0',
  `MergedRecords` int DEFAULT '0',
  `AddedRecords` int DEFAULT '0',
  `CompletedAt` datetime DEFAULT NULL,
  `IsCompleted` tinyint(1) DEFAULT '0',
  `IsDeleted` tinyint(1) DEFAULT '0',
  `IsReverted` tinyint(1) DEFAULT '0',
  `IsRevertInProgress` tinyint(1) DEFAULT '0',
  `Transferring` tinyint(1) DEFAULT '0',
  `RevertDetails` varchar(255) DEFAULT NULL,
  `Notes` text,
  `ProcessDetails` text,
  `MigrationType` varchar(50) DEFAULT NULL,
  `Description` text,
  PRIMARY KEY (`MigrationLogID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `MigrationLogs_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `MigrationLogs` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `UserType` varchar(50) DEFAULT NULL,
  `AccountStatus` varchar(50) DEFAULT 'active',
  `LastLogin` datetime DEFAULT NULL,
  `ProfilePicture` varchar(255) DEFAULT NULL,
  `Region` varchar(50) DEFAULT NULL,
  `Language` varchar(50) DEFAULT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT '1',
  `EmailVerified` tinyint(1) NOT NULL DEFAULT '0',
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `PostalCode` varchar(20) DEFAULT NULL,
  `Country` varchar(50) DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `Users` WRITE;
UNLOCK TABLES;

