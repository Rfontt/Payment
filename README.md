# About the project

This projects is about methods of payments which involves making a payment using one of the 3 methods.

### Method of payment in a e-commerce application

- Should have 3 method of payment: bankPaymentSlip, credit card and pix.

### Folders 

- src: Main folder
  - base: Contains the contentStrategy that manipulate which strategy will be used;
  - controller: Responsible for the logic of linking the user to the business rules;
  - database: Contains the connection with databases;
  - model: Create the tables in the databases;
  - routes: Responsible for the route controllers;
  - services: Business rules in the projec;
  - strategy: Contains the strategys for the payment;
  - utils: Reused methods.
- test
  - responsible for the tests in the application

### Run Project

```
docker-compose up
```

### Run Tests

```
npm run test
```

### Erros solved

The mocha no supported the **import**, then to build the application is required install the @babel/register package and declare in package.json the command below:

```
"test": "npx mocha -r @babel/register tests/*.test.js"
```