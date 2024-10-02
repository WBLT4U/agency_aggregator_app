
# Agency Aggregator Dashboard

This project is a basic **Agency Aggregator Dashboard** that includes the following features:
- **Admin login** and **agency login**.
- **CRUD operations** for agency profiles.
- **Admin dashboard** for managing agencies, including editing, deleting, activating, and deactivating agencies.
- **Agency dashboard** for agencies to update their profile and view performance statistics.
- **JWT authentication** and role-based access control (Admin and Agency).

## Features
- **User Registration & Login**: Implemented with JWT-based authentication.
- **Role-based Access**: Admins can manage agencies, and agencies can update their own profiles.
- **Admin Features**:
  - View all registered agencies.
  - Edit agency details.
  - Delete agencies.
  - Activate and deactivate agencies.
- **Agency Features**:
  - Update profile details.
  - View basic performance information.

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB.
- **Frontend**: React.js.
- **Authentication**: JWT (JSON Web Tokens).
- **Database**: MongoDB.

## Project Setup Instructions

### Step 1: Clone the Repository

First, clone the repository from GitHub:

```bash
git clone https://github.com/yourusername/agency-aggregator.git
cd agency-aggregator
```

### Step 2: Install Backend Dependencies

Navigate to the root directory of the project and install the Node.js dependencies:

```bash
npm install
```

### Step 3: Install Frontend Dependencies

Navigate to the `client` directory (where the React app is located) and install dependencies:

```bash
cd client
npm install
```

### Step 4: Setup Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

- **MONGO_URI**: Your MongoDB connection string (local or remote).
- **JWT_SECRET**: A secret key for signing JWT tokens (you can use any random string).

### Step 5: Run the Backend Server

In the root directory of the project, run the following command to start the Express server:

```bash
npm run dev
```

This will start the backend server at `http://localhost:5000`.

### Step 6: Run the Frontend (React) App

Open another terminal and navigate to the `client` directory:

```bash
cd client
npm start
```

This will start the React development server at `http://localhost:3000`.

### Step 7: Testing the Application

- Open your browser and navigate to `http://localhost:3000`.
- You can now test the following features:
  - Admin login and management of agencies.
  - Agency login and profile update.

### Step 8: Build for Production

When you're ready to deploy, you can build the React frontend for production. Run this command from the `client` directory:

```bash
npm run build
```

The production build will be in the `client/build` directory. Express will serve this build when running the app in production.

### Step 9: Deploy to Production (Optional)

To deploy the project to production (e.g., Heroku, AWS, etc.), follow these steps:
- Push your repository to GitHub.
- Deploy to your preferred hosting provider.
- Ensure environment variables are set on your hosting platform (e.g., MongoDB connection, JWT secret).

## Project Structure

```bash
.
├── config
│   └── db.js               # MongoDB connection setup
├── controllers
│   ├── agencyController.js  # Agency-related functionality
│   └── adminController.js   # Admin-related functionality
├── middleware
│   └── authMiddleware.js    # Authentication and admin middleware
├── models
│   └── User.js              # User model schema
├── routes
│   ├── agencyRoutes.js      # Routes for agency operations
│   └── adminRoutes.js       # Routes for admin operations
├── client                   # React frontend
│   ├── src
│   │   ├── components       # React components
│   │   ├── pages            # React pages
│   └── public
├── server.js                # Main entry point for the Express server
└── README.md                # This readme file
```

## API Endpoints

Here are the main API endpoints available in the application:

### Admin Endpoints:
- `GET /api/admin/agencies`: Get all registered agencies (Admin only).
- `PUT /api/admin/agency/:id`: Edit an agency's profile (Admin only).
- `DELETE /api/admin/agency/:id`: Delete an agency (Admin only).
- `PUT /api/admin/agency/:id/toggle`: Activate or deactivate an agency (Admin only).

### Agency Endpoints:
- `GET /api/agency/profile`: Get the agency profile (Authenticated Agency).
- `PUT /api/agency/profile`: Update the agency profile (Authenticated Agency).

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
