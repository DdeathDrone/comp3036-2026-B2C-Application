# Code Credit
Base code sourced from: https://github.com/socdms/comp3036-2026-assignment-2-blog-group-2-scott-barber

# Testing

To run tests 
- turbo test-1 - Front end Tests
- turbo test-2 - Back end Tests

Workflows run tests on push or pull request to main

# Deployment
User: https://comp3036-2026-b2-c-application-web.vercel.app/
Admin: https://comp3036-2026-b2-c-application-admi.vercel.app/

# Local Set Up

Run `pnpm i` from the root of the repository, this will install dependencies and generate the database

Create .env files in apps/admin, apps/web, and packages/db with the following
Web and DB
DATABASE_URL = {link to prisma postgres ORM API key}
JWT_SECRET

ADMIN
JWT_SECRET
PASSWORD

Server can then be started with `turbo dev` in the repository root

Tests can then be run (doing so will also seed the database) with `turbo test-1` or `turbo-test-2` see above for details

# User Credentials

User:
Email: user@email.com
Password: 123

Admin: 
Email admin@adminuser.com
Password: 123

## Admin Page

Only requires password, this is set in environment variables



# API Reference

## Web

### Cart

#### POST `/api/cart`

Runs the mock checkout adding new a order to the database

Request Body:

```
{
    userId: number
    totalCost: number
    address: string 
    fName: string 
    lName: string
}
```
Response 200 OK
Returns no meaningful data and simply confirms the success of the operation

Response 404 - Error "Cart is empty"

#### PUT `/api/cart`

Adds an item to the cart

Request Body:
```
{
    id: number, 
    ammount: number
}
```

Response 200 OK

Returns the newly updated cart as a cookie

#### PATCH `/api/cart`

Updates the ammount of an item in the cart

Request Body:
```
{
    id: number, 
    ammount: number
}
```

Response 200 OK

Returns the newly updated cart as a cookie

Response 404 - Error "Cart is empty"

#### GET `api/cart`

Returns the cart with products and ammounts from the database

Response 200 OK

```
{
    message:
    {
        product: 
        {
            id: number,
            title: string,
            content: string,
            price: number,
            urlId: string,
            description: string,
            imageUrl: string,
            date: Date,
            categories: string,
            stock: number,
            active: boolean
        }
        ammount: number
    }
    status: 200
}
```

Response 404 - Error "Cart is empty"

#### DELETE `api/cart`

Deletes an item from the cart

Response 200 OK

Returns the newly updated cart as a cookie

Response 404 - Error "Cart is empty"


### Auth

#### POST `api/auth`

Authenticates the user and logs them in

Response 200 OK

Returns the JWT as a httponly secure cookie 

Response 401 - Error "Email or Password is incorrect" 

#### PUT `api/auth`

Creates a new user

Response 200 OK 

Returns the status and the details of the created user


#### DELETE `api/auth`

Deletes the auth_token cookie

Response 200 OK

Successful deletion of the cookie 

## Admin

### Products

#### PATCH `api/products?id={}&active={}`

Updates the active state of a selected product

Request url params 
id = the id of the product to change state of
active = the current state of the product

Response 200 OK

Returns database entry on the product that was changed

Response 400 - Error: Missing url Params
Response 401 - Error: Unauthorised Access

#### PUT `api/products?urlId={}&id={}`

Handles both creation and update of products

To update pass in the urlId and id to the request url, to create omit the urlId and id from the url

Request url params 
id (optional) = the id of the product to update
urlId (optional)= the urlid of the product to update

Request body
```
{
    Title: string
    Description: string
    Content: string
    ImageUrl: string
    Categories: string
    Stock: number
    Price: number
}
```

Response 200 OK

Returns data on the created or updated product

Response 401 - Error: Unauthorised Access

#### DELETE `api/products?id={}`

Deletes the selected product from database if possible

Request url params
id = Id of product to be deleted

Response 200 OK

Product has been deleted

Response 401 - Error: Unauthorised Access
Response 500 - Error: Product cannot be deleted

### History

#### GET `api/history`

Returns the orderhistory of all users

Response 200 OK

```
{
    message: 
    {
        OrderItem: 
        {
            Product: 
            {
                title: string
                price: number
            }
            productId: number
            orderId: number
            ammount: number
        }
        User: 
        {
            username: string
            email: string
        }
        orderId: number
        userId: number
        orderDate: Date
        totalCost: number
        deliveryAddress: string
        recipientFirstName: string
        recipientSurnam: string
    }
}
```

Response 401 - Error: Unauthorised Access

### Auth

#### POST `api/auth`

Authenticates the user and logs them in

Response 200 OK

Returns the JWT as a httponly secure cookie 

Response 401 - Error "Email or Password is incorrect" 


#### DELETE `api/auth`

Deletes the auth_token cookie

Response 200 OK

Successful deletion of the cookie 
