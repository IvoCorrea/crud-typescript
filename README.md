# Task Management CRUD API

This is a Task Management CRUD API built with TypeScript, Express, Prisma, and MySQL. The API allows you to create, read, update, and delete tasks.

## Technologies Used

- **TypeScript**
- **Express**
- **Prisma**
- **MySQL**

## Getting Started

### Prerequisites

- Node.js
- MySQL

## API Endpoints

### Create Task

- **URL:** `/tasks`
- **Method:** POST
- **Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task description",
    "status": "Task Status",
    "duedate": "Task due date"
  }
  ```

### Get All Tasks

- **URL:** `/tasks`
- **Method:** GET

### Get Task by ID

- **URL:** `/tasks/:id`
- **Method:** GET

### Update Task

- **URL:** `/tasks/:id`
- **Method:** PUT
- **Body:**
  ```json
  {
    "title": "updated title",
    "description": "updated description",
    "status": "completed",
    "duedate": "2024-07-20T10:20:30.000Z"
  }
  ```

### Delete Task

- **URL:** `/tasks/:id`
- **Method:** DELETE
- **Body:**
  ```json
  {
    "title": "task title"
  }
  ```