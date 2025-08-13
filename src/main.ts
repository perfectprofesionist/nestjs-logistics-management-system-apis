// Import the NestFactory to bootstrap the NestJS application
import { NestFactory } from '@nestjs/core';
// Import the root application module for the NestJS app
import { AppModule } from './app.module';
// Import ValidationPipe to enable automatic validation of incoming requests
import { ValidationPipe } from '@nestjs/common';
// Import cookie-parser middleware to parse cookies from HTTP requests
import * as cookieParser from 'cookie-parser';
// Import Swagger tools for API documentation generation and UI
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// The main function to bootstrap and start the NestJS application
async function bootstrap() {
  // Create a new NestJS application instance using the root AppModule
  const app = await NestFactory.create(AppModule);

  // Register cookie-parser middleware globally to enable cookie parsing for all incoming requests
  // This allows you to access cookies via req.cookies in controllers and guards
  app.use(cookieParser());

  // Enable Cross-Origin Resource Sharing (CORS) with specific configuration
  // This allows the frontend (e.g., React, Angular) to communicate with the backend API
  app.enableCors({
    // Allow requests from the frontend URL specified in environment variables,
    // or default to 'http://localhost:3000' if not set
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    // Allow only these HTTP methods from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // Allow credentials (cookies, authorization headers, etc.) to be sent in requests
    credentials: true,
  });

  // Apply a global validation pipe to automatically validate incoming request bodies, query params, etc.
  // This helps ensure that all incoming data matches the expected DTOs and types, and throws errors if not
  app.useGlobalPipes(new ValidationPipe());

  // =========================
  // Swagger API Documentation
  // =========================

  // Create a Swagger configuration using DocumentBuilder
  // This sets up the metadata for the generated API docs
  const config = new DocumentBuilder()
    // Set the title of the API documentation
    .setTitle('Logistics Management API')
    // Set a description for the API documentation
    .setDescription('API documentation for Logistics, Organizations, Users, etc.')
    // Set the version of the API
    .setVersion('1.0')
    // Optionally add a tag for grouping endpoints in the UI
    .addTag('logistics-providers')
    // Optionally add Bearer authentication support (e.g., for JWT)
    .addBearerAuth()
    // Build the Swagger configuration object
    .build();

  // Generate the Swagger document based on the application and config
  const document = SwaggerModule.createDocument(app, config);

  // Set up the Swagger UI at the '/api-docs' endpoint
  // This provides a web interface for exploring and testing the API
  SwaggerModule.setup('api-docs', app, document);

  // Start the NestJS application and listen on the port specified in environment variables,
  // or default to 4000 if not set
  await app.listen(process.env.PORT ?? 4000);
}

// Call the bootstrap function to start the application
bootstrap();
