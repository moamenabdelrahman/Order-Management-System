# Order Management System API

## Overview:
Our API facilitates comprehensive e-commerce operations, enabling user account management, product catalog interactions, and seamless shopping cart functionalities. It supports order creation, status updates, and order history retrieval while incorporating discount and coupon application features. This API ensures efficient and user-friendly management of the entire purchase lifecycle.

## Code Structure:
- Our API was built using NestJs, a backend framework. NestJs depends mainly on Object-Oriented Programming (OOP) and MVC architecture. In other words, it deals with entities like products, carts, users, etc.
- You can see we have 3 folders and other files. The files are related to the TypeScript compiler configurations, dependencies, and other things.
- The folder "Prisma" is for the ORM used where our database model files exist.
- The folder "src" contains our TypeScript code (the main code) which is compiled into JavaScript code and stored in the folder "dist". At the end of the day, the JavaScript code is what we execute and runs the API.
- Focusing on "src", the code we wrote. We find a folder for each entity we have in our ERD shown below, besides a folder for the database.
- For example, inside "cart", we find a folder (for some TypeScript types), and 3 files:
  * "cart.service": It contains the functions related to the entity "Cart".
  * "cart.controller": Let's say our API receives a request for information about a cart, how does it know which function in "cart.service" to use? That's what "cart.controller" offers, it directs the incoming requests to the right functions.
  * "cart.module": That's what assembles "cart.service" and "cart.controller" under a single entity "Cart". The same structure applies to the other entities.
- Each of these entities requests and sends information from and to the database, however, they aren't directly interacting with the database.
- Here the entity "database" comes in, which initializes a connection with the database and offers its functionalities to the other entities for use.
- Finally, "Prisma", the ORM we use as a middleware between our API and database. It makes our API not dependent on a specific database and eases switching our database from PostgreSQL to MySQL for example without facing any problems.

## How to set up and run the project:

- Download NodeJS from here[https://nodejs.org/en] and install it.
- Check that NodeJS is installed successfully by running this command in cmd "node --version".
- Download PostgreSQL from here[https://www.postgresql.org/download/] and install it locally. Remember the password you will provide during the installation.
- After installation, open it by searching "pgAdmin" in the start menu.
- Click “Servers” in the left sidebar and provide the password.
- Open the nested server, right-click “Databases” and create a new database, name it “oms” and click save.
- Open the project folder, open the file .env, and edit the database URL in this format "postgresql://postgres:Password@localhost:5432/oms?schema=public".
- Open the cmd and navigate to the project folder, run the command “npm install”, then check the installation by running “npx --version”, if it provided a version then everything is ok.
- Then run “npx prisma migrate dev”.
- Then run “npm run start”.
- Now the API is listening to requests on port 3000. You can request it using ThunderClient, Postman, Swagger, or any similar tool.

## API Documentation URL on Postman:
- https://documenter.getpostman.com/view/36471329/2sA3XWbyLd


## ERD:

![ERD](ERD.png "ERD")
