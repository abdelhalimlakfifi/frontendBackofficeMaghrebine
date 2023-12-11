# Front-End Back-Office

#Project Structure 

```
├── public
├── src
│ ├── assets
│ ├── components
│ │ ├── Data
│ │ ├── Global
│ │ ├── InsertOtp
│ │ ├── Register
│ │ ├── auth
│ │ ├── confirmEmail
│ │ ├── general
│ │ ├── login
│ │ ├── navbar
│ │ ├── resetPassword
│ │ └── sidebar
│ ├── layouts
│ │ └── pages
│ │ ├── Auth
│ │ ├── CategoriesAndSubCategories
│ │ ├── Roles
│ │ ├── Users
│ │ ├── products
│ │ └── types
│ ├── Home.jsx
│ ├── Profile.jsx
│ ├── store
│ │ ├── ForgotPasswordSlice.js
│ │ ├── UserSlice.js
│ │ ├── ValidateOtpSlice.js
│ │ └── index.js
│ ├── utils
│ │ ├── GuestRoutes.jsx
│ │ ├── ProtectedRoutes.jsx
│ │ ├── request.js
│ │ └── App.css
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── index.html
├── package-lock.json
└── package.json
```

## Overview

This frontend project for the backoffice follows a modular structure for better organization and maintenance. Here's a brief explanation of the main directories and files:

- **public:** Public assets and HTML files.
- **src:**
  - **assets:** Images, styles, and other static assets.
  - **components:** Reusable React components, organized by functionality.
    - **Data, Global, InsertOtp, Register, auth, ...:** Specific components categorized accordingly.
  - **layouts:** Page layouts for different sections.
  - **pages:** React components for individual pages, organized by functionality.
    - **Auth, CategoriesAndSubCategories, Roles, Users, ...:** Specific pages categorized accordingly.
  - **store:** Redux store setup and slices.
  - **utils:** Utility functions and common components.
  - **Home.jsx:** Main home page component.
  - **Profile.jsx:** Profile page component.
  - **App.jsx:** Main application component.
  - **index.js:** Application entry point.
- **.env.example:** Example environment configuration file.
- **.eslintrc.cjs:** ESLint configuration file.
- **.gitignore:** Specifies files and directories to be ignored by version control.
- **README.md:** Documentation for the frontend architecture.
- **index.html:** Main HTML file for the application.
- **package-lock.json:** Automatically generated file to lock dependencies versions.
- **package.json:** Configuration file for Node.js project, including dependencies and scripts.
