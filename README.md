# Solar-System-React-2025-Retake

## Solar System React App

# Overview
This is a React-based application designed to showcase planets, quizzes, and user profiles. The app includes various features such as:

Displaying a list of planets.

Detailed planet view.

A quiz section with multiple categories.

User authentication (login, registration).

Admin dashboard for managing facts, quizzes, and planets.

The application has been deployed and can be accessed online.

Features
Lazy Loading: Components are lazy-loaded for optimized performance.

Routing: React Router is used for seamless navigation between different pages like Home, Planets, Quiz, User Profile, and Admin Dashboard.

User Authentication: Includes login, registration, and user profile pages.

Admin Dashboard: Admin users can create, edit, and manage planets, facts, and quizzes.

Suspense and Spinner: Uses React's Suspense with a custom spinner to handle lazy loading.

Responsive Design: The app is fully responsive, ensuring it works on both mobile and desktop devices.

 Install dependencies

 ```
 npm install
 ```
For development, you can start the server with:
```
npm run dev
```

Deployment
The app is deployed and can be accessed via the following link:
https://solar-system-react-2025-retake.onrender.com

Admin profile:
user: admin@abv.bg
password: 123123

It is hosted on Render, and due to the nature of cloud hosting, occasionally you might experience slower response times, especially when using services like Render or MongoDB Atlas. These platforms can sometimes experience brief downtimes (for a few minutes), and you may need to wait a bit longer for requests to complete.

Known Issues
Slow Response Times: As noted, sometimes Render or MongoDB Atlas may "sleep," which could cause slower-than-expected responses when making requests. This is usually resolved by retrying the request after a short wait.

Pending Requests: Certain requests (like /quiz) may show as pending while waiting for the backend to respond. If this happens, try waiting for the request to process, and it should eventually resolve.

Technologies Used
React: For building the user interface.

React Router: For routing and navigation between pages.

Suspense: For lazy loading components.

MongoDB Atlas: For cloud-based database hosting.

Render: For deploying the app.
 
## Starting the Project

1. **Navigate to the server directory**:

Open your terminal and go to the server directory of the project:

Install dependencies:

Run the following command to install the required dependencies:
npm install

Add .env file:

In the root directory of the server, create a .env file with the following environment variables:
```
MONGO_URI=mongodb+srv://projectUser:StrongPass123!@solarsystem.s8ccaq0.mongodb.net/?retryWrites=true&w=majority&appName=SolarSystem
JWT_SECRET=SLGADL378123781723312LNDAGLJNDJN
CLOUDINARY_API_KEY=631278238369768
CLOUDINARY_API_SECRET=seyVrmUkSK0GjSJ_nPBdy-uADiw
CLOUDINARY_CLOUD_NAME=planets
```

MongoDB Atlas: If you're using MongoDB Atlas, keep the MONGO_URI as it is. If you prefer to use a local MongoDB instance, you'll need to adjust the MONGO_URI to point to your local MongoDB server, for example:
MONGO_URI=mongodb://localhost:27017/your-database-name

Cloudinary: If you're using Cloudinary for image storage, keep the CLOUDINARY_* variables as they are. If you don't plan to use Cloudinary, you'll need to adjust your project code to use a different image storage method.

Start the server:

For development, you can start the server with:
```
npm run dev
```
This will automatically restart the server on code changes.

For production, use:
```
npm start
```

Verify the server is running:

Open your browser and go to http://localhost:3000. If everything is working correctly, you should see the server running.