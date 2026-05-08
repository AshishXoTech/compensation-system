Complntel — Compensation Intelligence Platform

Overview

Complntel is a full-stack compensation intelligence platform inspired by modern salary benchmarking products like Levels.fyi. The platform enables users to explore, filter, compare, and analyze compensation data across multiple companies, engineering levels, and locations through a responsive analytics-driven interface.

The application focuses on delivering a production-grade user experience with scalable backend architecture, structured salary analytics, and real-world engineering practices including duplicate-entry prevention, API abstraction, database normalization, and cloud deployment.

Live Demo

Frontend
compensation-system-amber.vercel.app

Backend API
https://compensation-backend.onrender.com

Features

Dashboard Analytics

* Compensation overview statistics
* Top paying companies
* Level distribution analytics
* Compensation trend visualization
* Location-based insights
* Recent salary activity

Salary Exploration

* Multi-dimensional salary filtering
* Company-based filtering
* Role-based filtering
* Level filtering (L3–L7)
* Location search
* Pagination support
* Dynamic sorting

Company Intelligence

* Dedicated company analytics pages
* Compensation breakdowns
* Level distributions
* Average compensation insights
* Company-specific salary trends

Compensation Comparison

* Side-by-side company comparison
* Total compensation benchmarking
* Compensation component analysis
* Comparative salary visualization

Engineering Features

* Duplicate salary entry prevention
* RESTful API architecture
* Structured backend service layer
* Centralized error handling
* Loading and empty states
* Responsive mobile-first UI
* Production-ready deployment

⸻

Tech Stack

Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* React Query
* Axios
* Recharts
* Lucide Icons

Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL

Database

* Neon PostgreSQL

Deployment

* Vercel (Frontend)
* Render (Backend)

System Architecture
Frontend (Next.js)
        ↓
Axios API Layer
        ↓
Express REST API
        ↓
Service Layer
        ↓
Prisma ORM
        ↓
PostgreSQL Database

The frontend communicates with the backend through a centralized API abstraction layer using Axios and React Query for caching and server-state management. The backend follows a modular architecture using controllers, services, repositories, validators, and Prisma ORM for scalable database operations.

Database Design

Company Table

Stores:

* company name
* metadata
* company relationships

Salary Table

Stores:

* role
* level
* location
* years of experience
* base salary
* bonus
* stock compensation
* total compensation
* confidence score

Relationships

* One company → many salary records

Data Integrity

Implemented duplicate entry prevention to avoid repeated insertion of identical compensation records.

⸻

Key Engineering Decisions

Duplicate Entry Prevention

The backend validates existing salary records before insertion to prevent duplicate compensation entries for the same:

* company
* role
* level
* location
* compensation combination

React Query Integration

Implemented React Query for:

* API caching
* loading states
* background refetching
* server-state synchronization

Production Deployment

Configured:

* Vercel frontend deployment
* Render/Railway backend deployment
* Neon PostgreSQL cloud database
* CORS production handling
* environment-based API configuration

⸻

API Endpoints

Dashboard
GET /api/dashboard/overview
GET /api/dashboard/top-companies
GET /api/dashboard/location-insights
GET /api/dashboard/level-distribution

Salaries
GET /api/salaries
GET /api/salaries/recent

Companies
GET /api/companies
GET /api/companies/:company
GET /api/companies/:company/analytics

Compare
GET /api/compare

Screenshots

Dashboard
<img width="1470" height="956" alt="Screenshot 2026-05-08 at 2 44 35 PM" src="https://github.com/user-attachments/assets/20656289-9a06-471b-989d-6f492efe4cbf" />
<img width="1470" height="956" alt="Screenshot 2026-05-08 at 2 46 39 PM" src="https://github.com/user-attachments/assets/4faecfc2-4592-4f8e-bc27-647b58110ff1" />


Salaries Page<img width="1470" height="956" alt="Screenshot 2026-05-08 at 2 44 50 PM" src="https://github.com/user-attachments/assets/7ccbac86-d7a0-4729-9f34-967f439d916d" />

Compare Page
<img width="1470" height="956" alt="Screenshot 2026-05-08 at 2 46 01 PM" src="https://github.com/user-attachments/assets/c22d1d92-ab9f-40b8-91a1-373f3caf469a" />

Company Analytics
<img width="1470" height="956" alt="Screenshot 2026-05-08 at 2 46 33 PM" src="https://github.com/user-attachments/assets/23c78aa9-28e0-4d09-8178-04850a2c55c5" />



Future Improvements

* User authentication
* Salary submission portal
* Advanced analytics
* AI-driven salary prediction
* Saved comparisons
* Export reports
* Compensation trend forecasting
* Admin moderation dashboard

Project Goals

The primary goal of this project was to simulate the architecture and user experience of a modern compensation intelligence platform while applying real-world full-stack engineering practices including:

* scalable API architecture
* database normalization
* production deployment
* responsive design
* analytics visualization
* robust frontend/backend integration

Author

Ashish Kumar Jha

Built as a production-oriented full-stack engineering project focused on modern web architecture, data visualization, and scalable backend design.
