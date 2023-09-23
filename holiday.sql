-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (x86_64)
--
-- Host: localhost    Database: holiday
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `userId` int NOT NULL,
  `holidayId` int NOT NULL,
  PRIMARY KEY (`userId`,`holidayId`),
  KEY `holidayId` (`holidayId`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`holidayId`) REFERENCES `holidays` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (3,1),(4,1),(3,3),(9,4),(4,5),(7,6),(10,7),(8,8),(8,9),(7,10);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `holidays`
--

DROP TABLE IF EXISTS `holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holidays` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holidays`
--

LOCK TABLES `holidays` WRITE;
/*!40000 ALTER TABLE `holidays` DISABLE KEYS */;
INSERT INTO `holidays` VALUES (1,'Montenegro','Explore picturesque landscapes and stunning coastal views','2023-11-14','2023-11-29',6000.00,'ade2cf99-1b44-47e2-9666-a0664119da96.jpg'),(3,'Santorini, Greece','Explore white-washed buildings and breathtaking sunsets','2023-09-15','2023-08-22',3870.00,'e1e23772-bde6-4347-a6e6-51e61a83fb47.jpg'),(4,'Cape Town, South Africa','Discover diverse landscapes, from Table Mountain to stunning beaches.','2023-11-16','2023-11-23',8000.00,'d478d41a-d8ff-4992-a142-0752def40588.jpg'),(5,'Bora Bora, French Polynesia','Experience overwater bungalows and stunning blue waters.','2023-09-01','2023-09-15',9700.00,'2a70955f-dea8-424a-947a-c0019ee0dcf6.jpg'),(6,'Machu Picchu, Peru','Hike the Inca Trail to the ancient ruins of Machu Picchu','2023-09-25','2023-10-05',4500.00,'e9460e58-2e5d-4069-81be-5633449b729f.jpeg'),(7,'jordan','great arab country','0124-10-29','2023-11-01',5000.00,'5cd8f374-f23b-4d08-a06d-101abc3b3ba2.jpeg'),(8,'Mauritius','lush green mountains, stunning beaches, and vibrant Creole culture.','2023-09-25','2023-10-02',5500.00,'374d210a-a791-4e1d-953d-53ef67c77abf.jpeg'),(9,'Seychelles','Discover pristine beaches, granite boulders, and abundant wildlife','2023-10-07','2023-11-07',5700.00,'bf1a4592-9b3b-40de-8937-19cdb8bf4bf4.jpeg'),(10,'The Dolomites','The Dolomites are a mountain range in northeastern Italy. They are known for their jagged peaks, turquoise lakes, and charming villages.','2023-12-10','2023-12-17',2380.00,'no-image.jpg'),(11,'The Dolomites','The Dolomites are a mountain range in northeastern Italy. They are known for their jagged peaks, turquoise lakes, and charming villages.','2023-12-10','2023-12-17',3860.00,'708166e0-86f3-4d71-be0a-b3270b1b5925.jpeg');
/*!40000 ALTER TABLE `holidays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(40) COLLATE utf8mb4_general_ci DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Elvis','Presley','elvis@example.com','rocknroll123',NULL),(4,'jay-z','zendelovitch','jay@zi','jay@zi',NULL),(5,'jay-z1','zendelovitch1','sw@admin','sw@admin','admin'),(6,'aaaaaaa','aaaaaaaaaaaaaa','aaa@aaaaaaaaaaa','aaaaaaaaaaaaaaaaaaaa','user'),(7,'admin','shaharAdmin','admin@gmail.com','admin','admin'),(8,'user','user','user@gmail.com','user','user'),(9,'michal','jordan','jordan@gmail.com','e26a1f8262097d12c2dc27967d7b31ed0b921ba1241e5ea69f','user'),(10,'yossi','yossi','yossi@gmail.com','yossi','user'),(11,'KKKK','KKKK','KKKK@KKKK','$2b$08$u/xIUgApVKmwZSnG20GOC.8gzAEK3TNOkWwiTEOHS3h','user'),(12,'user1','user1','user1@gmail.com','$2b$08$0BC6UwGRBLBY8/MD7KZqgOQ.2zLM/OyFKcefIJCs0PL','user'),(13,'user2','user2','user2@gmail.com','$2b$08$reBYaIjf9ij6e0Im05j8Ue08LHjQP0L8k0vHzPZYNOg','user'),(14,'user3','user3','user3@gmai.com','$2b$08$nPasHd2GzCqZAXtWowV3/eatXLBFL4pDv849AjFX9rb','user'),(15,'messi','lioenl','messi@gmail.com','messi','user'),(16,'asaf','lotz','asaf@gmail.com','$2b$10$dFaNXoOS9hkIWv.utfuAGO6gSCGTPj.x.7jDu64.qbz','user'),(17,'oshrat','oshrat','oshrat@gmail.com','$2b$10$RD7hMUuTEyC5yh4.2sDC3.TnQhWSpQWMJyIIzk0L/dC','user'),(18,'jay-z1','zendelovitch1','jay@zi1','$2b$08$y89qZOfKmVMRkwczmIP0tuDiYvYP6qKVdP7MpfbR7hA','user'),(19,'test02','test02','test02@test.ts','$2b$08$6jr6R.4mrDOHTAzWpCKHDuIV/Z0Wy1FzB7UgzE/JUXk','user'),(20,'Jimi','Hendrix','Jimi@gmail.com','Jimi@gmail.com','user'),(21,'test','test','test@test1','test','user'),(22,'test_aek_1_fname','test_aek_1_lname','aek@test1.ts','$2b$10$0V9I73skBztapYtBCyx4kObx7TVnosu3rl0yP4JefwwcCoHr4nn8u','user'),(23,'test_aek_2_fname','test_aek_2_lname','aek@test2.ts','$2b$10$1wCdyYK0KzY.N.t4HMI2IuBPfQWUZ2FQ9wemEl2s5ZILASPQs5nx2','user'),(24,'aek','admin','aek_admin@admin.ts','$2b$10$IDrwjFbIcq8WCZl9YwAUUuaucUsEjPx6q.4nADLLQgm3hn.0YlNB6','admin'),(25,'aek','user','aek_user@user.ts','$2b$10$ys3gKAusF2bnr5KtDdv2wOZyMMA3E4iExJNKV9N7DNFQPoTN7Xa1O','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'holiday'
--

--
-- Dumping routines for database 'holiday'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-23 15:48:05
