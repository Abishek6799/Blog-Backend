# Blog Website Backend

## Description:
This project contains the backend for a blog website built with Node.js and Express.js. It handles user authentication, blog creation, approval/rejection, and email notifications.

## Key Concepts:

* **User Authentication:**
    * User registration and login with role-based access control (admin and user).
    * JWT (JSON Web Tokens) for secure authentication.
* **Blog Management:**
    * Create, read, update, and delete blog posts with status management (pending approval, approved, rejected).
* **Email Notifications:**
    * Send emails to users upon blog creation, approval, and rejection.

## Features:

* **User Authentication:**
    * User registration and login with role-based access control (admin and user).
    * JWT (JSON Web Tokens) for secure authentication.
* **Blog Management:**
    * Create new blog posts (only for user role).
    * Store blog data with status (pending approval, approved, rejected) in a database (e.g., MongoDB).
* **Admin functionalities:**
    * Approve or reject blog posts.
    * Delete blogs.
* **Email Notifications:**
    * Send emails to users upon blog creation, approval, and rejection.
* **Error Handling:**
    * Implement proper error handling and return appropriate status codes.

## Technologies Used:

* **Backend:**
    * Node.js
    * Express.js
* **Database:**
    * MongoDB
* **Email:**
    * Nodemailer (for sending emails)
* **Security:**
    * bcryptjs (for password hashing)
    * JWT (for token-based authentication)