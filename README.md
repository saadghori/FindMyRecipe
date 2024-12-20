# FindMyRecipe - Recipe Finder Web Application

## Description
A full-stack web application that allows users to search and view detailed recipes. Users can register and log in to save favorite recipes and maintain a search history.

## Features
- **Search Recipes**: Search for recipes by name.
- **User Authentication**: Secure user registration and login with JWT tokens.
- **Favorites and History**: Save favorite recipes and maintain a search history.
- **Global State Management**: Utilized Jotai for managing state across the application.
- **Protected Routes**: Route guards to ensure only logged-in users can access certain features.
- **Responsive Design**: Mobile-friendly design for seamless use on various devices.

## Tech Stack
- **Frontend**: React, Next.js, React Bootstrap, Jotai
- **Backend**: Node.js, Express.js, MongoDB
- **API**: TheMealDB API
- **Authentication**: JWT
- **Styling**: CSS, Bootstrap
- **State Management**: Jotai, SWR
- **Version Control**: Git, GitHub
- **Deployment**: Vercel

## Installation and Setup

**Prerequisites**
- Node.js
- MongoDB

### Clone the Repository


```sh
git clone https://github.com/your-username/findmyrecipe.git
```
### Install Dependencies
```sh
cd findmyrecipe
npm install
```
### Environment Variables
Create a .env file in the root directory and add the following environment variables:

```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

### Start the Application
```sh
npm run dev
```

### Usage
**Running the Application**
Start the application using the command above and access it at http://localhost:3000.

**Features Demonstration**
Use the search bar to find recipes, and access detailed recipe information.
Register and log in to save favorites and maintain a search history.

### Contributing
1. Fork the repository
2. Create a new branch:
```sh
git checkout -b feature-branch
```
3. Commit your changes:
```sh
git commit -m 'Add new feature'
```
4. Push to the branch:
```sh
git push origin feature-branch
```
5. Open a Pull Request

