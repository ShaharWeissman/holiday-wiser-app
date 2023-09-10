-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: holiday
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'John','Doe','john.doe@example.com','secretpassword',1),(3,'John','Doe','john.doe@example.com','secretpassword',1),(4,'John','Doe','john.doe@example.com','secretpassword',1),(5,'John','Doe','john.doe@example.com','secretpassword',1),(6,'John','Doe','john.doe@example.com','secretpassword',1),(7,'John','Doe','john.doe@example.com','secretpassword',1),(8,'haim','Doe','haim.doe@example.com','haim',1),(9,'rami','Doe','rami.doe@example.com','rami',1),(10,'rabin','izhak','rami.doe@example.com','rami',1),(11,'rabin','izhak','rami.doe@example.com','rami',1),(12,'rabin','izhak','rami.doe@example.com','rami',1),(13,'haim','Doe','a.doe@example.com','haim',1),(14,'haim','aoe','r.doe@example.com','haim',1),(15,'avi','izhak','avi.doe@example.com','rami',1),(16,'havi','izhak','avi2.doe@example.com','rami',1),(17,'haim','aoe','tr.doe@example.com','haim',1),(18,'Alice','Smith','alice.smith@example.com','mysecretpassword',1),(19,'aAlice','Smith','alicea.smith@example.com','mysecretpassword',1),(20,'aAlice','Smith','aliceaa.smith@example.com','mysecretpassword',1),(21,'dave','dave','hay.doe@example.com','haim',2),(22,'rami','Doe','arami.doe@example.com','rami',1),(23,'Sofía','García','sofia.garcia@example.com','securepass456',1),(24,'izik','falah','falah@walla.com','falahpass',2),(25,'osher','bit','osher@com','pass',2),(26,'bart','simpson','simpson@com','abcd',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-14 15:39:04
