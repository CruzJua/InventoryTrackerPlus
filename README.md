# Inventory Tracker+

Inventory Tracker+ is a lightweight, responsive web application designed for businesses and individuals to efficiently manage their stock. Designed with a sleek, dark-themed UI, it provides a comprehensive suite of tools for adding, editing, and monitoring inventory levels.

## Features

- **Dynamic Inventory Grid**: Quickly view your entire stock catalog with an intuitive, image-supported grid layout.
- **Stock Management**: Create, view, update, and delete (CRUD) inventory items effortlessly.
- **Image Support**: Upload custom images for your stock or rely on slick fallback placeholders. 
- **User Authentication**: Securely log in to manage your private database of items.
- **Mobile Responsive**: Access your inventory smoothly on both desktop and mobile devices.

### (Upcoming Features)
- **Low Stock Alerts**: Automatic notifications when item quantities drop below a specified threshold.
- **Custom Stock Templates**: Presets for frequently added items to save time on data entry.

## Tech Stack

- **Frontend**: HTML5, Vanilla CSS (CSS Variables, Flexbox, CSS Grid), JavaScript, EJS (Embedded JavaScript Templating)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via `connect-mongo`), Mongoose 
- **Authentication**: `express-session`
- **File Uploads**: Multer / Cloudinary (for image handling)

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CruzJua/InventoryTrackerPlus.git
   cd InventoryTrackerPlus
   ```

2. **Install dependencies:**
   ```bash
   npm run install-all
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the necessary credentials:
   ```env
   PORT=3050
   CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster.mongodb.net/
   SESSION_SECRET=your_super_secret_key

   # Email Configuration
   GMAIL_USER=your_email@gmail.com
   GMAIL_APP_PASSWORD=your_app_password

   # Cloudinary Image Uploads
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run the Application:**

   *For Development (uses nodemon):*
   ```bash
   npm run dev
   ```

   *For Production:*
   ```bash
   npm start
   ```

5. **Run the Automated Tests:**
   This project uses `jest` and `supertest` for unit testing the API routes. To run the test suite:
   ```bash
   npm test
   ```

6. **Access the Application:**
   Open your browser and navigate to `http://localhost:3050` (or whichever port you specified in `.env`).

## Final Project Notes

This repository contains the completed project files for PRO150. Recent updates include a polished landing page, robust fallback logics for missing images, structured image-upload validation, and a cohesive dark-mode design system.
