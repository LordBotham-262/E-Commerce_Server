# Patel Shop
 This branch focuses on NoSQL and uses mongoDB as its DB.


## Goal

Goal of the repo was to work as a backend server for the Flutter App. Initially the Backend used MySql as the database.Now the BackEnd server is forked into two different servers , MongoDB and MySQL. Please find code for concerned database in respective Branch.

## TO DO

- [x] create API for products,productTypes and cartItems
- [x] authentication added and checkAuth middleware added to critical API
- [x] segregate Controllers
- [x] cartItem count API/Logic pending
- [ ] Reset password APIs/Logic
- [x] support to add & delete variants as well as products 
- [ ] adding user Roles
- [x] Order table with APIs



## Installation

Please `cd` into project directory before running all below commands.

Install dependencies:

```bash
$ npm install
```

Create an .env file and save the enviroment variables:
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
