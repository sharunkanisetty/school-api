# School Management System API

This project implements a set of RESTful APIs to manage school data using **Node.js**, **Express.js**, and **MySQL**. The system allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Objective

This project provides the following functionalities:

1. **Add School API**: Allows the user to add a new school with details like name, address, latitude, and longitude.
2. **List Schools API**: Retrieves a list of schools sorted by their proximity to a given latitude and longitude.

## Database Setup

### Schools Table Structure

The system uses a MySQL database with a **schools** table containing the following fields:

| Field      | Type      | Description                                     |
|------------|-----------|-------------------------------------------------|
| id         | INT       | Primary Key, Auto Increment                     |
| name       | VARCHAR   | Name of the school                              |
| address    | VARCHAR   | Address of the school                           |
| latitude   | FLOAT     | Latitude of the school's location               |
| longitude  | FLOAT     | Longitude of the school's location              |

To set up the database, run the following SQL query:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

## 🚀 Live Demo

🌐 Frontend: [school-api-frontend.onrender.com](https://school-api-frontend.onrender.com)  
🔗 Backend API: [school-api-backend.onrender.com](https://school-api-backend.onrender.com)

> You can visit the frontend to test the app live.

