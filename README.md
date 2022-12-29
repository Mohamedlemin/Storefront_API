# Storefront Backend Project

## how to setup and connect to the database
-   install docker
-   pull postgres image
-   run  docker-compose up
-   open the container terminal
-   create your database
-   Create 2 databases in postgres docker container with the same information in found in database.json file

## DB Port : 5432
         
- To generate the database schema RUN :

 ``` 
 npm i
 db-migrate up

 ```
## what ports the backend and database are running on
 - create .env file like this 
 ```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123

ENV=dev
POSTGRES_TEST_DB=storefront_test

BCRYPT_PASSWORD = my_scret_pass
SALT_ROUND = 10
TOKEN = my_scret_token

```

## scripts 

### npm run :
- build  // to build the project
- test   // buid and run all test include database tests
- prettier  or lint  // code format
- start // run the server
   
## API Endpoints

# You can import the postman collection from this file
storefronAPI.postman_collection.json

## OR use this :
#### Products
- Index  
> GET/    http://localhost:3000/dev/products
- Show   
> GET/    http://localhost:3000/dev/product/:id
- Create 
> POST/   [token required] http://localhost:3000/dev/product
 body  ex {
  "name": "Macbook",
  "price": 530,
  "category": "Tech"
}
- delete 
> DELETE/ [token required] http://localhost:3000/dev/product/:id

#### Users
- Index [token required]   GET/  http://localhost:3000/dev/users
- Show [token required]    GET/  http://localhost:3000/dev/user/:id
- Create N  POST/ http://localhost:3000/dev/user
body ex {
   "firstName":"ahmed",
   "lastName":"babe",
   "password":"passwordA"
}

#### Note : user FirstName shoud be unique
- Auth  
> POST/ http://localhost:3000/dev/user/auth
{
   "firstName":"ahmed",
   "password":"passwordA"
}

#### Orders
- Index 
> GET/    http://localhost:3000/dev/orders
- Show  
> GET/    http://localhost:3000/dev/order/:id
- Create
> POST/   [token required] http://localhost:3000/dev/order
 body  ex {

     "fk_user_id": "9",
     "status": "complete"
}
- delete DELETE/ [token required] http://localhost:3000/dev/order/:id

- add product to cart [token required] 
 > POST / http://localhost:3000/dev/orders/:orderID/products

- Current Order by user (args: user id)[token required]
 > GET/  http://localhost:3000/dev/orders/user/:id/active
- Completed Orders by user (args: user id)[token required]
>  GET/  http://localhost:3000/dev/orders/user/:id/complete