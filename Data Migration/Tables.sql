DROP TABLE IF EXISTS `migration_entries`;

CREATE TABLE `migration_entries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_records` int DEFAULT NULL,
  `data_provider` varchar(255) DEFAULT NULL,
  `module_id` int DEFAULT NULL,
  `module` varchar(255) DEFAULT NULL,
  `isCompleted` tinyint(1) DEFAULT '0',
  `isActive` tinyint(1) DEFAULT '1',
  `metas` text,
  `migration_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `migration_id` (`migration_id`),
  KEY `idx_data_provider` (`data_provider`),
  KEY `idx_module` (`module`),
  KEY `idx_isCompleted` (`isCompleted`),
  KEY `idx_isActive` (`isActive`),
  CONSTRAINT `migration_entries_ibfk_1` FOREIGN KEY (`migration_id`) REFERENCES `migration_logs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `migration_entries` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `migration_logs`;

CREATE TABLE `migration_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `canRevert` tinyint(1) DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `lastModified` datetime DEFAULT NULL,
  `lastModifiedBy` varchar(255) DEFAULT NULL,
  `skippedRecords` int DEFAULT '0',
  `updatedRecords` int DEFAULT '0',
  `mergedRecords` int DEFAULT '0',
  `addedRecords` int DEFAULT '0',
  `completedAt` datetime DEFAULT NULL,
  `isCompleted` tinyint(1) DEFAULT '0',
  `isDeleted` tinyint(1) DEFAULT '0',
  `isReverted` tinyint(1) DEFAULT '0',
  `isRevertInProgress` tinyint(1) DEFAULT '0',
  `transferring` tinyint(1) DEFAULT '0',
  `revert` varchar(255) DEFAULT NULL,
  `notes` text,
  `processDetails` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_status` (`status`),
  KEY `idx_source` (`source`),
  KEY `idx_isCompleted` (`isCompleted`),
  KEY `idx_isDeleted` (`isDeleted`),
  CONSTRAINT `migration_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `migration_logs` WRITE;
UNLOCK TABLES;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `user_type` varchar(50) DEFAULT NULL,
  `account_status` varchar(50) DEFAULT 'active',
  `last_login` datetime DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `region` varchar(50) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_role` (`role`),
  KEY `idx_user_type` (`user_type`),
  KEY `idx_region` (`region`),
  KEY `idx_language` (`language`),
  KEY `idx_account_status` (`account_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;
UNLOCK TABLES;

