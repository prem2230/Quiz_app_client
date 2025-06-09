# Tech Quiz - MERN Stack Quiz Application

A modern, responsive quiz application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to take quizzes on various technical topics and administrators to manage quizzes and questions.

## Features

### User Features
- User authentication (login/register)
- Browse available quizzes by difficulty level
- Take quizzes with timed sessions
- View quiz results and performance statistics
- Responsive design for all devices

### Admin Features
- Comprehensive dashboard for quiz management
- Create, edit, and delete quizzes
- Create, edit, and delete questions
- Assign questions to quizzes
- Set quiz parameters (duration, difficulty, etc.)

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **React Router v7** for navigation
- **Redux Toolkit** for state management
- **Redux Saga** for side effects
- **Material UI v7** for UI components
- **Vite** for build tooling and development server
- **JWT** for authentication

### Backend (Not included in this repository)
- Node.js with Express
- MongoDB for database
- JWT for authentication

## Project Structure

```bash
client/
├── public/              # Static assets
├── src/
│   ├── api/             # API service layer
│   ├── assets/          # Images, icons, etc.
│   ├── components/      # React components
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── exam/
│   │   ├── loaders/
│   │   ├── login/
│   │   ├── navBar/
│   │   ├── question/
│   │   ├── quiz/
│   │   └── snackBar/
│   ├── data/            # Dev mock data
│   ├── store/           # Redux config
│   │   ├── auth/
│   │   ├── questions/
│   │   ├── quiz/
│   │   └── snackbar/
│   ├── utils/           # Helper functions
│   └── App.tsx          # Main entry
├── .env.development
├── .env.production
└── vite.config.ts

```
## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Backend API server running (see separate repository)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/mernQuiz.git
   cd mernQuiz/client

2. Install dependencies
```bash
npm install
# or
yarn install
```
3. Configure environment variables

   Update .env.development for development

   Update .env.production for production
   
Start the development server
```bash
npm run dev
# or
yarn dev
```

  Build for production
```bash
npm run build
# or
yarn build
```
### Available Scripts

* npm run dev - Start development server
* npm run build - Build for production
* npm run build:dev - Build for development
* npm run build:prod - Build for production
* npm run lint - Run ESLint
* npm run preview - Preview production build
* npm run serve:dev - Serve development build
* npm run serve:prod - Serve production build

## Application Flow
### Authentication
* Users can register or login
* JWT token is stored for authenticated requests

### User Flow

* Browse available quizzes on the home page
* Select a quiz to start
* Answer questions within the time limit
* Submit answers and view results

### Admin Flow

* Access dashboard with admin privileges
* Manage quizzes (create, edit, delete)
* Manage questions (create, edit, delete)
* Assign questions to quizzes

### Deployment
The application can be deployed to any static hosting service:

Build the application
```bash
npm run build
```
Deploy the contents of the dist directory to your hosting provider

### Future Enhancements
* User profile management
* Quiz categories and tags
* Advanced analytics for quiz performance
* Social sharing of quiz results
* Dark mode theme option

## License
[Prem](https://github.com/prem2230)

