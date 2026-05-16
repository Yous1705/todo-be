# Todo List & Category Management Dashboard

![NestJS](https://img.shields.io/badge/NestJS-v9.0.0-red) ![Prisma](https://img.shields.io/badge/Prisma-v4.0.0-blue) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14.0-green)

## Project Overview

This project is a **Todo List & Category Management Dashboard** built with a **NestJS backend** and **Prisma ORM** for database management. It allows users to manage tasks (todos) and categories efficiently with features like:

- **Multi-parameter Search Filtering**: Search todos by title, priority, and status.
- **Category Management**: Create, update, and delete categories with conditional visibility.
- **Efficient Pagination**: Paginate todos and categories for better performance.

---

## Setup & Installation

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Yous1705/todo-be.git
cd todo-be
```

### 2. Install Dependencies

```bash
# Install backend dependencies
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/todo_db
PORT=3000
```

### 4. Run Database Migrations

```bash
# Apply Prisma migrations
pnpm prisma migrate dev
```

### 5. Start the Application

```bash
# Start the backend server
pnpm run start:dev
```

### 6. Run Tests (Optional)

```bash
# Run unit tests
pnpm run test

```

---

## API Documentation

### Todo Endpoints

| Method | Endpoint       | Description       | Query/Body Parameters                                        |
| ------ | -------------- | ----------------- | ------------------------------------------------------------ |
| GET    | `/todo`        | Get all todos     | `page`, `limit`                                              |
| GET    | `/todo/search` | Search todos      | `title`, `priority`, `status`                                |
| POST   | `/todo`        | Create a new todo | `title`, `description`, `priority`, `due_date`, `categoryId` |
| PATCH  | `/todo/:id`    | Update a todo     | `title`, `description`, `priority`, `status`                 |
| DELETE | `/todo/:id`    | Delete a todo     | -                                                            |

### Category Endpoints

| Method | Endpoint              | Description              | Query/Body Parameters |
| ------ | --------------------- | ------------------------ | --------------------- |
| GET    | `/category`           | Get all categories       | -                     |
| GET    | `/category/:id/todos` | Get todos by category ID | -                     |
| POST   | `/category`           | Create a new category    | `name`, `color`       |
| PATCH  | `/category/:id`       | Update a category        | `name`, `color`       |
| DELETE | `/category/:id`       | Delete a category        | -                     |

---

## Technical Questions

### A. Database Design

#### 1. What database tables did you create and why?

- **Todo Table**: Stores tasks with fields like `title`, `description`, `status`, `priority`, `due_date`, and `categoryId`. The `categoryId` establishes a one-to-many relationship with the `Category` table.
- **Category Table**: Stores categories with fields like `name` and `color`. This relational structure ensures that todos can be grouped under categories for better organization.

#### 2. How did you handle pagination and filtering in the database?

- **Pagination**: Implemented using `page` and `limit` parameters in Prisma queries. For example:
  ```typescript
  const todos = await prisma.todo.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  ```
- **Filtering**: Used dynamic Prisma queries to filter by `title`, `priority`, and `status`. Indexes were added on frequently queried fields like `title` and `categoryId` for performance optimization.

### B. Technical Decisions

#### 1. What backend architecture did you choose and why?

- **NestJS Modular Architecture**: Organized into `Controllers`, `Repository`, `Services`, and `Modules` for separation of concerns. This structure ensures scalability and maintainability.
- **Global Error Handling**: Used HTTP exceptions and custom interceptors for consistent error responses.

#### 2. How did you handle data validation?

- **Backend Validation**: Used `class-validator` in DTOs to enforce validation rules.
  ```typescript
  @IsString()
  title: string;
  ```
- **Dual-layer Validation**: Ensures data integrity both at the API layer and database layer.

### C. Testing & Quality

#### 1. What did you choose to unit test and why?

- **Unit Tests**: Focused on `Service` methods to ensure business logic correctness.

#### 2. If you had more time, what would you improve or add?

- **Future Features**: Add real-time notifications for task updates and analytics dashboards & Auth.

---

## License

Yous Sibarani : [youssibarani17@gmail.com](mailto:youssibarani17@gmail.com)
