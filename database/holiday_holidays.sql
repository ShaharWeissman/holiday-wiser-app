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
-- Table structure for table `holidays`
--

DROP TABLE IF EXISTS `holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holidays` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start_date` varchar(100) NOT NULL,
  `end_date` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holidays`
--

LOCK TABLES `holidays` WRITE;
/*!40000 ALTER TABLE `holidays` DISABLE KEYS */;
INSERT INTO `holidays` VALUES (5,'Maldives','A group of islands in the Indian Ocean known for its beautiful beaches, clear waters, and luxurious resorts.','','',3000.00,'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2021/05/05125410/22.jpg'),(8,'a','a','0045-03-12','0005-03-12',1.00,'undefined'),(11,'Argentina','meat lover best place.','02/02/2024','02/04/2024',14000.00,'undefined'),(12,'sydney','enjoy down under','04/02/2024','05/05/2024',25000.00,'undefined'),(13,'sydney','enjoy down under','04/02/2024','05/05/2024',25000.00,'undefined'),(14,'sri lanka','water that make you sick','04/05/2024','05/08/2024',15000.00,'undefined'),(15,'sri lanka','water that make you sick','04/05/2024','05/08/2024',15000.00,'undefined'),(16,'sri lanka','water that make you sick','04/05/2024','05/08/2024',15000.00,'undefined'),(17,'sri lanka','water that make you sick','04/05/2024','05/08/2024',15000.00,'undefined'),(18,'sri lanka','water that make you sick','04/05/2024','05/08/2024',15000.00,'undefined'),(19,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'undefined'),(20,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'undefined'),(21,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'undefined'),(22,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'undefined'),(23,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'c0a4065f-83fa-4793-beb4-424277169f1f.jpg'),(24,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'821a0e82-a3cf-4c89-a7dc-c566496d8ac8.jpg'),(25,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'95f01adf-ac0d-41d6-b5ca-cb36e93876ca.jpg'),(26,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'9738448d-307c-429a-8339-42023433166a.jpg'),(27,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'08ad1c44-b063-4c58-b4d8-e731ec73cda6.jpg'),(28,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'075923a7-f91c-4026-b472-eff780e1e4ce.jpg'),(29,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'a7f52676-553b-42b8-8bda-0b7fb1d7c915.jpg'),(30,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'db1429ac-2e6e-40ef-b90a-b09942662608.jpg'),(31,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'4366c10b-525f-4a27-8d23-df53925695c7.jpg'),(32,'Kyoto, Japan','Immerse yourself in Japanese culture and historic temples','2024-02-05','2024-02-15',4000.00,'7b86cf1b-fe9d-4fff-b252-4a63dd28e34a.jpg'),(33,'Dubai, United Arab Emirates','Experience luxury and modern architecture in the desert oasis.','2023-12-10','2023-12-18',6000.00,'9be70090-7697-47dc-b435-ff814987c66d.jpeg');
/*!40000 ALTER TABLE `holidays` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-14 15:39:03
