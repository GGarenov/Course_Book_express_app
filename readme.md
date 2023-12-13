# Course Book Web App

A simple web application built with Node.js, Express, Handlebars, MongoDB, and other technologies for managing courses and posts.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with bcrypt and JSON Web Tokens (JWT)
- CRUD operations for users and posts
- Handlebars templates for dynamic views
- MongoDB for data storage
- Error handling and middleware for user authentication

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB
- Git (optional but recommended)

## Installation

1. Clone the repository:

``bash
git clone https://github.com/your-username/course-book.git
cd course-book

2. Clone the repository:
    - npm install

3. Set up MongoDB:

    - Ensure MongoDB is running.
    - Update the constants.js file in the src folder with your MongoDB connection details.


## Usage

1. Start the application
    - npm start

2. Open your browser and navigate to http://localhost:your-port (default port is specified in constants.js).

3. Explore the application, register, and start managing courses and posts.

## Project Structure

- src: Main source code folder containing controllers, models, services, and other modules.
- controllers: Contains controllers for handling different routes.
- lib: JWT logic for user authentication.
- middlewares: Authentication middleware.
- models: Mongoose models for User and Post.
- public: CSS files.
- services: Service files for handling business logic.
- utils: Error handling utilities.
- views: Handlebars templates.
- index.js: Entry point of the application.
- router.js: Centralized routing configuration.
- constants.js: Configuration file for database connection, secret, and port.

## Dependencies

- bcrypt
- cookie-parser
- express
- express-handlebars
- jsonwebtoken
- mongoose
- nodemon

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.



