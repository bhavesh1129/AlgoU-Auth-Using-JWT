# 🔐 AlgoU Auth Using JWT

A robust backend authentication service built with Node.js, Express.js, and MongoDB. This project implements secure user registration and login functionality using JSON Web Tokens (JWT) and bcrypt password hashing.

## ✨ Features

- 🔑 **Secure User Registration** - Password hashing with bcrypt and salt rounds
- 🔐 **JWT Authentication** - Stateless authentication with JSON Web Tokens  
- 🍪 **Cookie-based Sessions** - HTTP-only cookies for enhanced security
- 🗄️ **MongoDB Integration** - Mongoose ODM for robust data modeling
- 🛡️ **Input Validation** - Comprehensive validation for user inputs
- 🌐 **CORS Support** - Cross-Origin Resource Sharing enabled
- ⚡ **Environment Configuration** - Secure configuration with dotenv
- 📝 **Error Handling** - Comprehensive error responses and logging

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/AlgoU-Auth-Using-JWT.git
   cd AlgoU-Auth-Using-JWT/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=8080
   MONGODB_URL=mongodb://localhost:27017/algou-auth
   SECRET_KEY=your-super-secret-jwt-key-here-min-32-chars
   NODE_ENV=development
   ```

   **Environment Variables Explained:**
   - `PORT`: Server port (default: 8080)
   - `MONGODB_URL`: MongoDB connection string
   - `SECRET_KEY`: JWT signing secret (use a strong, random string)
   - `NODE_ENV`: Environment mode (development/production)

### Running the Project

**Development Mode** (with auto-restart):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

The server will be available at `http://localhost:8080`

## 📚 API Documentation

### Base URL

## Example Usage

### Register a new user

*   **Endpoint:** `POST /register`
*   **Request Body:**
    ```json
    {
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com",
        "password": "yoursecurepassword"
    }
    ```
*   **Success Response (200):**
    ```json
    {
        "message": "You have successfully registered!",
        "user": {
            "_id": "someuserid",
            "firstname": "John",
            "lastname": "Doe",
            "email": "john.doe@example.com",
            "token": "generatedjwttoken"
        }
    }
    ```

### Login an existing user

*   **Endpoint:** `POST /login`
*   **Request Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "yoursecurepassword"
    }
    ```
*   **Success Response (200):**
    *   A `token` cookie will be set in your browser.
    *   JSON Response:
        ```json
        {
            "message": "You have successfully logged in!",
            "success": true,
            "token": "generatedjwttoken"
        }
        ```

## Dependencies

*   [bcryptjs](https://www.npmjs.com/package/bcryptjs): For hashing passwords.
*   [cookie-parser](https://www.npmjs.com/package/cookie-parser): For parsing cookies.
*   [cors](https://www.npmjs.com/package/cors): For enabling Cross-Origin Resource Sharing.
*   [dotenv](https://www.npmjs.com/package/dotenv): For loading environment variables.
*   [express](https://www.npmjs.com/package/express): Web framework for Node.js.
*   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): For generating and verifying JWTs.
*   [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling tool.
*   [nodemon](https://www.npmjs.com/package/nodemon): Utility that monitors for any changes in your source and automatically restarts your server (development dependency).

## Contribution Guidelines

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License.