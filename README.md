# RoamingRadar

RoamingRadar is a user-focused web page application which leverages the powerful capabilities of online mapping. It provides an intuitive feature for users to create and save Pins for their favourite landmarks and places of interest. This application is built using Node.js, Express.js, and React.js, along with the implementation of Mapbox service for online mapping.

## Main Features

### Interactive Map

RoamingRadar's core feature is its interactive map, implemented using the Mapbox service. Upon double-clicking on any location, users can place a pin and create a landmark with a title, description, and rating. All pins are rendered on the map, and users can review details of any pin by clicking on it.

### User Authentication System

Security is a top priority for RoamingRadar. It uses a secure authentication system built with Express.js and bcrypt. The password provided by the user during registration is hashed before it is stored in the MongoDB database. During login, the user-provided password is rehashed and compared with the stored hashed password to ensure a secure match.

### Pin and User Routing

The application uses Express routers to handle specific user-related requests (like registration and login) and pin-related requests (like creating and fetching pins). 

## Project Structure

RoamingRadar consists of a frontend and a backend part:

1. **Frontend:** The frontend is developed using React.js. It consists of the main application (`App.js`), where the map and pins are rendered. It also includes `Register.js` and `Login.js` components that handle user registration and login, respectively.

2. **Backend:** The backend is a Node.js server developed using Express.js. It consists of a main server file that connects to MongoDB using Mongoose. It also sets up user and pin routes for handling specific requests.

## Future Improvements

Here are some features we're considering for future releases:

- **Sharing and Social Features:** We plan to add social features so users can share their pins with friends and view others' landmarks.
- **Enhanced Security:** We'll be enhancing the security by adding email verification and two-factor authentication.
- **Mobile App:** A mobile application to allow users to mark their favourite places on the go.


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- Mapbox account

### Installing

1. Clone the repo

```bash
git clone https://github.com/vyom1611/travel-map-application.git
```

2. Install NPM packages

```bash
npm install
```

3. Enter your API in `config.js`

```env
MONGO_URL='Your MongoDB connection URL'
REACT_APP_MAPBOX='Your Mapbox token'
```

## Usage

After following the installation steps, you can run:

```bash
npm start
```

This command will start the server at `localhost:3000`.

## Built With

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [Mapbox](https://www.mapbox.com/)

