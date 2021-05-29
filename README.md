# Patel Shop

 This branch focuses on NoSQL and uses mongoDB as its DB.


## Goal

Goal of the repo was to work as a backend server for the Flutter App. Initially the Backend used MySql as the database. Now the BackEnd server is segregated into two different servers , MongoDB and MySQL. Please find code for concerned database in respective Branch. User can use any one branch for development as both of them are standalone servers.

## TO DO

- [x] create API for products,productTypes and cartItems
- [x] authentication added and checkAuth middleware added to critical API
- [x] segregate Controllers
- [x] cartItem count API/Logic
- [ ] Reset password APIs/Logic
- [x] support to add & delete variants as well as products 
- [x] adding user Roles
- [x] Order collection with APIs
- [x] separate buyer and seller logic



## Installation

Please `cd` into project directory before running all below commands.

Install dependencies:

```bash
$ npm install
```

Create an .env file in the root folder and save the enviroment variables:

```bash
// mongoDB settings
MONGO_URL = ''
JWT_KEY = ''
```
Run the server using the follwoing command :

```bash
nodemon server.js
```

## [License: MIT](LICENSE.md)

Copyright (c) 2021 Dhaval Patel
