# Gift Cards Application

A modern web application for managing and purchasing gift cards, built with React, Node.js, and MongoDB.

## Features

- User authentication and authorization
- Gift card catalog with search and filtering
- Shopping cart functionality
- Secure checkout process
- Order management
- Admin dashboard
- Multi-language support (English and Arabic)
- Responsive design

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React i18next for internationalization
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Winston for logging

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd [repository-name]
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd project/frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
Create `.env` files in both frontend and backend directories with the following variables:

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:3001
```

Backend (.env):
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/giftcards
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:

```bash
# Start backend server
cd project/backend
npm run dev

# Start frontend server (in a new terminal)
cd project/frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Project Structure

```
project/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/     # Page components
│   │   ├── contexts/  # React contexts
│   │   ├── services/  # API services
│   │   └── locales/   # Translation files
│   └── public/        # Static files
│
└── backend/           # Node.js backend application
    ├── controllers/   # Route controllers
    ├── models/        # Database models
    ├── routes/        # API routes
    ├── middleware/    # Custom middleware
    └── utils/         # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 