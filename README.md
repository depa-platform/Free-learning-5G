# Free-learning-5G

A web app for 5G learning .

## Tech Stack

### Frontend
- **Framework:** [React](https://react.dev/) (v19)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4), [Bootstrap](https://getbootstrap.com/)
- **HTTP Client:** Axios
- **Routing:** React Router DOM

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (using `mysql2` driver)
- **Storage:** AWS S3 (via `@aws-sdk/client-s3`)

### Infrastructure
- **Docker:** Containerized services for Frontend (Nginx) and Backend.
- **Nginx:** Serves the frontend static files.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Docker](https://www.docker.com/) & Docker Compose
- MySQL Database (if running locally without Docker)

## Installation & Running

### Option 1: Using Docker (Recommended)

1.  Clone the repository.
2.  Create a `.env` file in the root or `backend/` directory if required by the application logic.
3.  Run the application using Docker Compose:

```bash
docker-compose up --build -d
```

- **Frontend:** Accessible at `http://localhost:3306`
- **Backend:** Accessible at `http://localhost:12345`

### Option 2: Manual Setup

#### Backend

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm run dev
    ```

#### Frontend

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Project Structure

```
.
├── backend/            # Express.js backend source code
│   ├── Routes/         # API routes
│   ├── utils/          # Utility functions & DB connection
│   └── server.js       # Entry point
├── frontend/           # React frontend source code
│   ├── public/         # Static assets
│   └── src/            # React components and logic
├── docker-compose.yml  # Docker Compose configuration
└── nginx.conf         # Nginx configuration for serving frontend
```
