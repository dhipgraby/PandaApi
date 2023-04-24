# 🌟 Panda API 🌟

Panda API for Ai Chat application. 

## 🚀 Technologies

- TypeScript
- Express
- Prisma

## 📁 Project Structure


<pre>
    hooks
    models
    ├── db models and test models
    prisma
    ├── database
    src
    ├── controllers
    │    ├── userController.ts
    │    
    ├── routes
    │    ├── all app routes
    ├── test
    │    ├── test folder for running jest containing also test controllers
    swagger
    ├── swagger implementation files
    test
    ├── all tests written in jest
</pre>


## 💻 Getting Started

1. Clone the repository to your local machine.
2. Install the dependencies using `npm install` or `yarn`.
4. Set up the database by running `npx prisma generate` and right after `npx prisma migrate dev --preview-feature`.
5. Create a `.env` file in the root folder of the project and configure the required environment variables.
6. To run tests, change the `RUN_PROD_ENV` variable to `false` in the `.env` file.
7. Run the development server using `npm run dev` or `yarn dev`.
8. Open your browser and navigate to `http://localhost:3000` to access the application.

## 📝 API Documentation

The API documentation can be found in the `swagger` folder of the project. To view the documentation, open the `http://localhost:3000/api-docs/` file in a browser.

## 🧪 Testing

The project uses Jest for testing. To run the tests, use the command `npm run test` or `yarn test`. Make sure to set the `RUN_PROD_ENV` variable to `false` in the `.env` file before running the tests.
