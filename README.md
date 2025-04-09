# Solar-System-React-2025-Retake


## Starting the Project

1. **Navigate to the server directory**:

Open your terminal and go to the server directory of the project:

Install dependencies:

Run the following command to install the required dependencies:
npm install

Add .env file:

In the root directory of the server, create a .env file with the following environment variables:
```
PORT=5000
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