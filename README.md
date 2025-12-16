Flight Data Service ✈️
A robust backend microservice built with Node.js, Express, and MySQL (via Sequelize ORxm) designed to manage the core data requirements of a flight booking system. This service handles the creation and management of Airplanes, Airports, Cities, and Flights, providing a RESTful API for client applications.

📋 Table of Contents
Features

Tech Stack

Project Architecture

Database Schema

Setup & Installation

Environment Variables

API Documentation

Airplanes

Cities

Airports

Flights

Filtering & Sorting

fZ Features
CRUD Operations: Full Create, Read, Update, Delete capabilities for Airplanes, Cities, and Airports.

Flight Management: Create flight schedules with validation (e.g., arrival time > departure time).

Advanced Querying: Filter flights by price range, travel date, and availability.

Transactional Safety: Handles seat count updates with Row Locking (Pessimistic Concurrency) to prevent double-booking.

Layered Architecture: Clean separation of concerns (Controller, Service, Repository).

Standardized Responses: Consistent error and success response structures across all endpoints.

Logging: Integrated Winston logger for tracking server events.

🛠 Tech Stack
Runtime: Node.js

Framework: Express.js

Database: MySQL

ORM: Sequelize

Logging: Winston

Utilities: Dotenv, Http-Status-Codes

cJ Project Architecture
The project follows a standard service-repository pattern:

src/controllers: Handles incoming HTTP requests and responses.

src/services: Contains business logic and interacts with the repository layer.

src/repositories: Direct interaction with the database using Sequelize models.

src/models: Sequelize schema definitions.

src/migrations: Database schema version control.

src/seeders: Scripts to populate the database with initial data (e.g., standard Airplane models).

🗄 Database Schema
The service manages the following key entities:

City: Represents a city (e.g., London, Mumbai).

Airport: Linked to a City. Contains specific address and code.

Airplane: Physical aircraft details (Model Number, Capacity).

Flight: A specific scheduled trip linked to an Airplane, Departure Airport, and Arrival Airport.

Seat: Detailed seat map configuration for airplanes (Business/Economy classes).

Setup & Installation
1.Clone the Repository

`git clone <repository-url>`
`cd flight_data_service`

2.Install Dependencies

`npm install`

3.Configure Database

->Ensure you have MySQL installed and running.

->Update src/config/config.json with your database credentials (username, password, dialect) or use Environment variables.

4.Run Migrations Create the necessary tables in your database:

`npx sequelize db:migrate`

5.Run Seeders (Optional) Populate the DB with dummy airplanes and seats:

`npx sequelize db:seed:all`

6.Start the Server

`npm run dev`

🌿 Environment Variables

PORT=3000
# If using config.js to read env variables for DB:
# DB_USERNAME=root
# DB_PASSWORD=yourpassword
# DB_DATABASE=Flights
# DB_HOST=127.0.0.1