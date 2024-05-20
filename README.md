# Doctor Appointment Project

## Overview

The Doctor Appointment Project is a comprehensive web application designed to facilitate easy and efficient appointment scheduling for patients with their preferred doctors. It includes dedicated dashboards for patients, doctors, and administrators, providing a seamless user experience tailored to each role.

## Features

- **Patient Dashboard:** 
  - View available appointment slots.
  - Schedule appointments with preferred doctors.
  - Manage and view upcoming appointments.
  - Mark doctors as favorites for easy access.
  
- **Doctor Dashboard:**
  - View and manage patient appointments.
  - Set availability and manage time slots.
  - Access patient history and view past treatments.
  
- **Admin Dashboard:**
  - Manage users (patients, doctors, administrators).
  - Monitor and analyze appointment statistics.
  - Create doctor accounts with automatically generated passwords sent to their email.
  - Ensure doctors change their password on first login.

- **User Authentication:**
  - Patients must confirm their email during registration.
  
## Technologies Used

- **Frontend:**
  - React
  - Redux & Redux Toolkit
  - TypeScript
  - RTK Query
  - Tailwind CSS
  - React Router DOM

- **Backend:**
  - Dotnet
  - Swagger (for API documentation)
  - RESTful APIs

- **Database:**
  - MSSQL

- **Authentication:**
  - JSON Web Token (JWT)

- **Testing:**
  - Jest
  - React Testing Library

- **Deployment:**
  - Netlify
  - CI/CD (Continuous Integration/Continuous Deployment) pipelines

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/muratOztemel/doctorAppointment.git
   cd doctorAppointment
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../server
   npm install
   ```

## Running the Application

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend server:**
   ```bash
   cd ../client
   npm start
   ```

3. **Access the application:**
   Open your browser and go to `http://localhost:3000`

## API Documentation

API documentation is provided via Swagger. After starting the backend server, you can access the API docs at:
```
http://localhost:5000/api-docs
```

## Testing

To run tests for the frontend:
```bash
cd client
npm test
```

To run tests for the backend:
```bash
cd ../server
npm test
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or suggestions, please contact me at [murat@muratoztemel.com](mailto:murat@muratoztemel.com).
