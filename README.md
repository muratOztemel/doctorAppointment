# Doctor Appointment Project

## Overview

The Doctor Appointment Project is a comprehensive web application designed to facilitate easy and efficient appointment scheduling for patients with their preferred doctors. It includes dedicated dashboards for patients, doctors, and administrators, providing a seamless user experience tailored to each role.
![Screenshot 2024-05-18 223242](https://github.com/muratOztemel/doctorAppointment/assets/31402706/d15e3abd-813a-403d-91a4-6bf3147e2546)
![Screenshot 2024-05-18 223351](https://github.com/muratOztemel/doctorAppointment/assets/31402706/4da73259-5e16-4706-81da-7c2ed3c2e9c6)
![Screenshot 2024-05-18 223501](https://github.com/muratOztemel/doctorAppointment/assets/31402706/92fc334c-e986-482c-aee1-301866761c79)
![Screenshot 2024-05-18 223602](https://github.com/muratOztemel/doctorAppointment/assets/31402706/9f970a41-f802-43c5-af9e-490a58c2a539)
![Screenshot 2024-05-18 223632](https://github.com/muratOztemel/doctorAppointment/assets/31402706/0c0ea9df-dfae-45ef-8782-392a768895aa)
![Screenshot 2024-05-18 223717](https://github.com/muratOztemel/doctorAppointment/assets/31402706/ed69d0fe-ea00-4235-a547-58229c956a5d)
![Screenshot 2024-05-18 223812](https://github.com/muratOztemel/doctorAppointment/assets/31402706/a4a3c1b6-55c6-4d9f-842c-7bac240baf08)
![Screenshot 2024-05-18 223853](https://github.com/muratOztemel/doctorAppointment/assets/31402706/9bfbfec0-536a-43b3-ba8b-db6ec5f20495)
![Screenshot 2024-05-18 223933](https://github.com/muratOztemel/doctorAppointment/assets/31402706/a5465939-a5e9-45b3-ab88-b1d56cdadcc2)
![Screenshot 2024-05-18 224003](https://github.com/muratOztemel/doctorAppointment/assets/31402706/076a284d-15e8-43f1-99ce-6bd6a594ce96)
![Screenshot 2024-05-20 160206](https://github.com/muratOztemel/doctorAppointment/assets/31402706/d7b923f6-1ea1-4117-ac26-ba8f199ad2ce)
![Screenshot 2024-05-20 160416](https://github.com/muratOztemel/doctorAppointment/assets/31402706/060a1865-b11e-443c-9e57-ef922d0179d7)
![Uploading Screenshot 2024-05-20 160524.png…]()


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
