# POS Management System

This project is a comprehensive Point of Sale (POS) management system designed to streamline sales, inventory management, and reporting for businesses. It consists of two main components: a React-based frontend for a seamless user interface and a Spring Boot backend for robust data management and API services.

## Project Structure

The project is divided into two main directories:

- `React_Frontend`: Contains the source code for the frontend application built with React and Vite. It includes components, actions, reducers, and the store for state management.
- `Spring_Backend`: Houses the Spring Boot application, including the source code for RESTful APIs, data models, and service layers. It also contains Maven configuration files for dependency management and project building.

### React Frontend

The frontend is designed with modularity and scalability in mind, utilizing React for the UI components and Redux for state management. It supports dynamic theming with a dark mode feature and is configured with ESLint for code quality assurance.

#### Key Features:

- Dynamic theming with dark mode
- State management with Redux
- Routing with React Router
- Material UI components for a modern look and feel

#### Building and Running

To get started with the frontend, navigate to the `React_Frontend` directory and install the dependencies:

```sh
cd React_Frontend
npm install
# Start the development server
npm run dev
# Preview the production build
npm run preview
```

### Spring Backend

The backend is built with Spring Boot, leveraging Spring Data JPA for database interactions and Spring Web for RESTful APIs. It is configured to run on Java 17 and uses Maven for dependency management and project building.

#### Key Features:

- RESTful API services
- Database interactions with Spring Data JPA
- Validation with Spring Boot Starter Validation
- Maven for dependency management

#### Building and Running

To build and run the backend, navigate to the `Spring_Backend` directory and use Maven commands:

```sh
cd Spring_Backend
./mvnw clean install
./mvnw spring-boot:run
```

This will compile the project, run tests, and start the Spring Boot application. Ensure you have Maven installed and configured properly on your system.