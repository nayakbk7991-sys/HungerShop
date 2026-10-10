# HungerShop 🛍️
### A Modern Online Shopping Platform

A full-stack e-commerce application built to deliver a convenient online shopping experience through intuitive product discovery, shopping cart management, secure authentication, order tracking, and administrative controls.

**HungerShop** brings together a responsive user interface, server-side business logic, and database-backed functionality to demonstrate the core workflows of a modern online shopping platform.

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Project Objectives](#-project-objectives)
- [Features](#-features)
- [Application Workflow](#-application-workflow)
- [Technology Stack](#-technology-stack)
- [Application Architecture](#-application-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation and Setup](#-installation-and-setup)
- [Running the Application](#-running-the-application)
- [API Testing](#-api-testing)
- [Security Considerations](#-security-considerations)
- [Current Limitations](#-current-limitations)
- [Future Enhancements](#-future-enhancements)
- [Learning Outcomes](#-learning-outcomes)
- [Author](#-author)

---

## 🛒 About the Project

HungerShop is an online shopping application designed to demonstrate how a complete e-commerce workflow can be implemented across a frontend, backend, and database.

The application provides two primary areas of functionality:

- **Customer experience:** Customers can browse available products, register or sign in, manage their shopping cart, place demo orders, and review their previous purchases.
- **Administrative management:** Authorized administrators can manage product listings, oversee user accounts, review customer orders, and update order statuses.

The project focuses on the practical integration of client-side interfaces, RESTful APIs, database operations, authentication, and application-level workflows.

## 🎯 Project Objectives

The primary objectives of HungerShop are to:

- Build a structured and maintainable web application.
- Implement communication between a frontend and a backend through HTTP APIs.
- Integrate a database for persistent application data.
- Provide user registration and authentication.
- Implement product discovery and cart-management workflows.
- Support order creation and order-history functionality.
- Separate customer operations from administrative operations.
- Apply basic security practices when handling authentication and configuration.
- Establish a foundation for future enhancements and production deployment.

## ✨ Features

### 👤 Customer Features

**User Registration and Authentication**
- Register a customer account and sign in.
- Authenticate users before accessing protected functionality.
- Use token-based authentication where configured by the application.

**Product Discovery**
- Browse available products.
- View product information provided by the application.
- Retrieve product data through backend endpoints.

**Shopping Cart**
- Add products to the shopping cart.
- Review selected items before checkout.
- Update cart contents according to the implemented cart functionality.

**Checkout and Orders**
- Submit orders through the demo checkout workflow.
- Create order records in the database.
- View order history.
- Follow order-status updates.

### 🛠️ Administrative Features

**Product Management**
- Create product listings.
- Review existing products.
- Update product information.
- Remove products when appropriate.

**User Management**
- Retrieve and review user records.
- Manage user-related information through authorized operations.

**Order Management**
- Review customer orders.
- Inspect order information.
- Update order statuses to reflect the order-management workflow.

Administrative operations should only be available to appropriately authorized accounts.

### 🔐 Application Security

- Password hashing for stored passwords.
- JSON Web Token (JWT) authentication.
- Protected backend routes.
- Role-based access controls where implemented.
- Environment variables for sensitive configuration.
- Separation of application configuration from source code.

Security measures should be reviewed and tested before the application is used in a production environment.

---

## 🔄 Application Workflow

The main customer workflow follows these steps:

1. **Access the application:** Open the frontend in a browser.
2. **Discover products:** Browse the available product listings.
3. **Authenticate:** Register or sign in when required.
4. **Manage the cart:** Select products and review the cart.
5. **Checkout:** Submit an order through the demo checkout process.
6. **Store the order:** The backend processes the request and persists the order data.
7. **Track purchases:** Review order history and available status information.

The administrative workflow is separate:

1. Sign in with an authorized administrative account.
2. Access the available administrative operations.
3. Manage products and user records.
4. Review customer orders.
5. Update order statuses as required.

The exact workflow and access permissions depend on the application's current implementation.

## 🧰 Technology Stack

| Layer | Technologies | Purpose |
|---|---|---|
| Frontend | React | Component-based user interface |
| Programming Language | JavaScript | Application logic and interactivity |
| Markup | HTML5 | Page structure |
| Styling | CSS3 | Layout and visual presentation |
| Backend Runtime | Node.js | Server-side JavaScript execution |
| Web Framework | Express.js | HTTP routing and API handling |
| Database | MongoDB | Persistent application data |
| Authentication | JWT and password hashing | Identity verification and protected access |
| Package Management | npm | Dependency installation and scripts |
| Version Control | Git and GitHub | Source-code management |
| API Testing | Postman | Endpoint testing and request validation |
| Code Editor | Visual Studio Code | Development environment |

## 🏗️ Application Architecture

HungerShop follows a client-server architecture.

### Frontend Layer

The frontend provides the interface customers and administrators use to interact with the application. It handles page rendering, user interactions, form submissions, and communication with backend endpoints.

### Backend Layer

The backend receives HTTP requests, applies business logic, validates incoming data, enforces applicable access controls, and coordinates database operations.

### Database Layer

MongoDB stores application records such as user accounts, product information, and orders according to the application's data models.

### Request Lifecycle

A typical application request follows this sequence:

```text
User
  |
  v
Frontend Interface
  |
  v
HTTP Request
  |
  v
Backend API
  |
  v
Validation and Business Logic
  |
  v
MongoDB Database
  |
  v
Backend Response
  |
  v
Frontend Update
```

This separation makes it easier to understand, maintain, and extend the different parts of the application.

## 📁 Project Structure

The repository is organized into separate frontend and backend applications.

```text
hungerShop/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── model/
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md
```

*Note: This is a representative structure. The exact files and directories may differ from the current repository.*

### Backend Responsibilities

- API endpoints and server configuration
- Database connectivity
- Data models
- Authentication and authorization middleware
- Product, user, and order operations

### Frontend Responsibilities

- User interface and page components
- Product presentation
- Cart and checkout interactions
- Authentication forms
- Order-history and administrative views

---

## ⚙️ Prerequisites

Before installing HungerShop, ensure that you have:

- [Node.js](https://nodejs.org/) installed.
- npm available through the Node.js installation.
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally.
- [Git](https://git-scm.com/) installed.
- [Visual Studio Code](https://code.visualstudio.com/) or another suitable code editor.
- [Postman](https://www.postman.com/) for optional API testing.

Verify the Node.js and npm installations:

```bash
node --version
npm --version
```

Verify Git:

```bash
git --version
```

## 🚀 Installation and Setup

### Step 1: Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/nayakbk7991-sys/HungerShop.git
cd HungerShop
```

### Step 2: Install Backend Dependencies

Navigate to the backend directory:

```bash
cd backend
npm install
```

### Step 3: Configure Environment Variables

Create a local `.env` file inside the backend directory and configure the environment variables required by the backend source code.

The required variable names depend on the application's configuration. Check the backend configuration files to identify them.

Typical categories may include:

- Database connection URI
- JWT signing secret
- Port configuration
- Payment-provider configuration, if applicable

Use appropriate local values and keep all credentials private. Never commit a real `.env` file to version control.

### Step 4: Start MongoDB

Ensure your local MongoDB service is running before starting the backend.

The backend must use the database connection URI configured for the project. This setup is intended for local development and does not require MongoDB Atlas.

### Step 5: Start the Backend Server

For development with automatic restarts, run this command from the `backend` directory:

```bash
npm run dev
```

Alternatively, start the backend without automatic restarts:

```bash
npm start
```

Keep this terminal open while using the application. Confirm that the server starts and establishes its database connection.

### Step 6: Install Frontend Dependencies

Open a second terminal from the project root:

```bash
cd frontend
npm install
```

### Step 7: Start the Frontend

From the `frontend` directory, run:

```bash
npm start
```

The development server will display a local URL in the terminal. Open that URL in your browser.

Keep both the backend and frontend running while testing the application.

---

## 🧪 API Testing

Postman can be used to test backend endpoints independently of the frontend.

A typical API testing process includes:

1. Start the backend server.
2. Open Postman and create an HTTP request.
3. Enter the backend endpoint URL and select the appropriate HTTP method.
4. Provide the required headers and request body.
5. Send the request and inspect the response status and data.
6. Test valid requests, invalid inputs, missing authentication, and unauthorized access.

Common HTTP methods include:

| Method | Typical Purpose |
|---|---|
| GET | Retrieve resources |
| POST | Create resources or submit operations |
| PUT/PATCH | Update resources |
| DELETE | Remove resources |

The exact endpoint URLs, request bodies, and authorization requirements should be taken from the current backend implementation.

## 🏭 Production Build

To create an optimized frontend build, open a terminal in the `frontend` directory and run:

```bash
npm run build
```

The build output is generated according to the frontend build configuration.

Creating a build does not automatically deploy the application or make the backend publicly accessible.

## 🔒 Security Considerations

Security is an important part of application development. Before deploying HungerShop to a public environment, review the following:

- Keep environment files and credentials out of GitHub.
- Store passwords using an appropriate password-hashing algorithm.
- Validate and sanitize incoming data.
- Verify authentication tokens on protected endpoints.
- Enforce authorization checks for administrative operations.
- Avoid exposing sensitive user information in API responses.
- Configure production CORS policies appropriately.
- Use HTTPS in production.
- Implement suitable error handling and logging.
- Review dependency vulnerabilities and update packages when necessary.
- Protect database access and use appropriate database permissions.

These are review recommendations and should not be interpreted as a guarantee that every control is already implemented.

## ⚠️ Current Limitations

- The checkout workflow currently uses demo payment processing and is not a live payment gateway integration.
- Production deployment and infrastructure configuration may require additional setup.
- Testing coverage and input-validation requirements should be reviewed as the application evolves.
- Security and operational readiness should be verified before accepting real customers or payments.

## 🗺️ Future Enhancements

Potential areas for further development include:

- Integration with a live payment gateway and server-side payment verification.
- Product search, filtering, sorting, and pagination improvements.
- Product reviews and ratings.
- Improved order notifications.
- Automated unit, integration, and end-to-end tests.
- Enhanced accessibility and responsive design.
- Improved monitoring, logging, and error reporting.
- Production deployment with environment-specific configuration.
- Performance optimization and caching where appropriate.
- Expanded documentation for API endpoints.

## 📚 Learning Outcomes

Developing HungerShop provides practical experience with:

- Building interactive interfaces using reusable components.
- Connecting a frontend application to backend APIs.
- Designing and consuming RESTful endpoints.
- Integrating a document-oriented database.
- Implementing authentication and protected operations.
- Managing product, user, and order workflows.
- Testing APIs with Postman.
- Using Git and GitHub for source-code management.
- Configuring local development environments.
- Structuring a multi-layer web application.

## 👨‍💻 Author

**Balakrushna Nayak**

GitHub: [nayakbk7991-sys](https://github.com/nayakbk7991-sys)

## 📄 License

No license has been specified for this repository. Contact the repository owner before redistributing or reusing the project.

---

**HungerShop** — a practical exploration of modern web application development, e-commerce workflows, and full