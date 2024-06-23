# Slash/Order Managment System API

## How to setup and run the project:

- Download NodeJS from here[https://nodejs.org/en] and install it.
- Check that NodeJS installed successfully by running this command in cmd "node --version".
- Download PostgreSQL from here[https://www.postgresql.org/download/] and install it locally. Remember the password you will provide during the installation.
- After installation, open it by searching about "pgAdmin" in start menu.
- Click on “Servers” in the left side bar and provide the password.
- Open the nested server, then right-click on “Databases” and create new database, name it “oms” and click save.
- Open the project folder, open the file .env and edit the database URL in this format "postgresql://postgres:Password@localhost:5432/oms?schema=public".
- Open the cmd and navigate to the project folder, run the command “npm install”, then check installation by running “npx --version”, if it provided a version then everything is ok.
- Then run “npx prisma migrate dev”.
- Then run “npm run start”.
- Now the API is listening requests on port 3000. You can request it using ThunderClient, Postman, Swagger, or any similar tool.

## API Documentation URL on Postman:
- https://documenter.getpostman.com/view/36471329/2sA3XWbyLd


## ERD:

![ERD](ERD.png "ERD")
