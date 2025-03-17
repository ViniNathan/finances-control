# FinTrack

Welcome to the repository of FinTrack, a powerful finance tracking web application. FinTrack is designed to help users efficiently manage their personal finances, track expenses, and analyze financial trends with ease. This README provides a detailed explanation of the application, its components, and how to get started.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Conclusion](#conclusion)

## Introduction

FinTrack is a full-stack web application that provides an intuitive and user-friendly interface for managing personal finances. It enables users to categorize expenses, and track income and expenses. With its robust backend and dynamic frontend, FinTrack ensures a smooth and efficient financial tracking experience.

## Technologies Used

### Frontend

- **Vite**: A build tool that boasts a faster and leaner development experience for modern web projects.
- **React**: A JavaScript library for building user interfaces. It allows us to create reusable UI components.
- **TypeScript**: A superset of JavaScript, offering static type-checking and the latest ECMAScript features.
- **TailwindCSS**: A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and more to style your websites without leaving your HTML.
- **React-Router-Dom**: A routing library for React, enabling navigation among views.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**: A powerful non-relational database system.
- **Nodemon**: A utility that monitors for any changes in your source and automatically restarts your server.

## Installation

Before you start, ensure you have `node` and `npm` installed on your machine. 

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/ViniNathan/finances-control
   ```

2. **Navigate to the repository**:

   ```bash
   cd finances-control
   ```

3. **Install the dependencies**:

   - For Frontend:
   
     ```bash
     cd frontend && npm install
     ```

   - For Backend:

     ```bash
     cd backend && npm install
     ```

## Running the Application in localhost

- **To run the frontend**:

  ```bash
   cd frontend && npm run dev
  ```

  This starts the React application on `http://localhost:5173` (or another available port).

- **To run the backend**:

  ```bash
  cd backend && npm run dev
  ```

  This initializes the Express server, typically on `http://localhost:5000`.


Ensure that the frontend and backend are configured to run on separate ports to avoid conflicts.

---

If you find any bugs or have a feature request, please open an issue on [GitHub](https://github.com/ViniNathan/finances-control/issues).
