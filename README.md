<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<h1 align="center">NestJs Logistics Management System APIs</h1>

<p align="center">
  A robust, scalable, and secure API backend for logistics management, built with <a href="https://nestjs.com/" target="_blank">NestJS</a> and TypeScript.
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Getting Started](#getting-started)

---

## Overview

NestJs Logistics Management System APIs provide a foundation for building logistics and supply chain management solutions. The system is designed to handle users, roles, organizations, and other logistics-related entities, with a focus on security, modularity, and extensibility.

## Features

- User registration and authentication (with secure password hashing)
- Role-based access control
- Organization management
- Modular service structure for easy extension
- RESTful API design
- Prisma ORM integration for database access
- Environment-based configuration
- Ready for production deployment

## Tech Stack

- [NestJS](https://nestjs.com/) (Node.js framework)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/) (default, configurable)
- [bcrypt](https://www.npmjs.com/package/bcrypt) (for password hashing)
- [Jest](https://jestjs.io/) (for testing)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/nestjs-logistics-management-system-apis.git
   cd nestjs-logistics-management-system-apis
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

4. **Push the Prisma schema to your database:**
   ```bash
   npx prisma db push
   ```

5. **Run the base database migration:**
   ```bash
   npx prisma migrate dev --name base_migration
   ```

6. **Seed the database:**
   ```bash
   npx prisma db seed
   ```

7. **Start the development server:**
   ```bash
   npm run start:dev
   ```

> **Note:** Make sure to configure your `.env` file with the correct database connection string and other environment variables before running the above commands.

## Getting Started

After following the installation steps, your NestJS Logistics Management System API server will be running locally. You can access the API endpoints as documented below.


