# Employee Management System (EMS)

A comprehensive system for managing employees, departments, and company resources.

## Features

- Employee profile management
- Employee application management
- Departments management
- Companies management
- User management (for admins only)
- Authentication and authorization
- Responsive design
- RESTful API
- Data validation
- Error handling

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ems.git

# Navigate to the backnd
cd ems.backend

#install dependencies
pip install -r requirements_dev.txt

# Create a superuser
# this will create an admin user that you can use to log in to the system
python manage.py createsuperuser

# Start the server
python manage.py runserver

# Navigate to the frontend
cd ../frontend

# Install dependencies and start the server
npm install
npm start
```

## Usage

- After installation, access the system through your browser at `http://localhost:3000`.
- You will be redirected to the login page. Use the credentials of the superuser created before.
- You can now navigate through the system and manage employees, departments, companies, and users.
- You can also create new users and assign them roles.
- Managers can manage employees, companies and departments but not users.
- Employees can only manage employees and view companies and departments.

## Technologies

- Backend: Django, Django REST Framework, and simple JWT
- Frontend: Next.js.
- Database: PostgreSQL
- Styling: Tailwind CSS
- Testing: Django Test.
- Authentication: JWT

## License

This project is licensed under the MIT License - see the LICENSE file for details.
