# E-Commerce Platform Development Project

## Project Overview
This project involves the development of an e-commerce platform similar to Qatar-Living, Amazon, or eBay. The platform caters to three types of users: Customers, Sellers, and Admins, each with specific features and capabilities. Users can log in, search for items, purchase items, view purchase history, and sellers can manage their sales and items. Additionally, the project includes generating useful statistics about the platform's performance.

## Project Phases

### Phase 1: Design, Data Management, and Statistics Generation

1. **Design and Model Data**
   - Create a conceptual model for the application's data, including users, items, purchases, sales, etc.

2. **Implement Data Model with Prisma**
   - Use Prisma to implement the data model and connect it to a relational database (e.g., Oracle, SQLite, Postgres).

3. **Database Initialization and Data Population**
   - Populate the database using seed data with a substantial amount of data (products, buyers, sellers, purchases, etc.) for testing and statistics generation.

4. **Data Repository and APIs**
   - Create a Data Repository containing functions to read/write data from the database using Prisma Client queries.
   - Develop APIs using NextJS to interact with the data repository and provide functionality for the e-commerce platform (login, search, purchase, etc.).

5. **Statistics Generation**
   - Implement a statistics page using NextJS and React that provides useful insights about the e-commerce platform.
   - Generate at least six different statistics using database queries. Some examples include:
     - Total purchases per product and per year.
     - Number of buyers per location (city, country).
     - Top 3 products bought over the last 6 months.
     - Product types never purchased.
     - ...

## How to Run the Project

1. Clone the repository to your local machine.
2. Install the necessary dependencies for Prisma, NextJS, and React.
3. Set up and configure the database connection in Prisma.
4. Run the database initialization script (seed data) to populate the database with sample data.
5. Start the NextJS server to run the APIs, frontend, and statistics generation.
6. Access the e-commerce platform in your browser and explore the functionalities for users, sellers, and admins.
7. Navigate to the statistics page to view insightful statistics about the platform's performance and user behavior.

This project aims to demonstrate proficiency in full-stack development, database management, and data-driven decision-making through statistical analysis of e-commerce platform activities.
