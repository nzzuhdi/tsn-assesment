# tsn-assesment

## Endpoints :

List of available endpoints:

OAUTH

- `POST /register`
- `POST /login`
- `GET /users`

MAIN ENTITY

- `POST /products`
- `GET /products`
- `GET /products/:id`
- `GET /products/cart/:userid`
- `PUT /products/:productId`

&nbsp;

## OAUTH

&nbsp;

## 1. POST /register

Description:

- Post new user data to database

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "phoneNumber": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email is required!"
}
OR
{
    "message": "not an email format"
}
OR
{
    "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Description:

- Post user data for login user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Email or Password is incorrect"
}
```

&nbsp;

&nbsp;

## 4. GET /users

Request:

- headers:

```json
{
    "access_token"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "email": "string"
}
```

&nbsp;

## MAIN ENTITY

&nbsp;

## 1. POST /products

Description:

- Post new product to database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "price": "integer",
  "image": "string",
  "gender": "array",
  "size": "array"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "title": "string",
  "price": "integer",
  "image": "string",
  "gender": "array",
  "size": "array"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Title is required"
}
OR
{
    "message": "Gender is required"
}
OR
{
    "message": "Price is required"
}
OR
{
    "message": "size is required"
}
OR
{
    "message": "Must be at least 10000, got {VALUE}"
}
```

&nbsp;

## 2. GET /products

Description:

- Get all product from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {{
  "id": "integer",
   "title": "string",
  "price": "integer",
  "image": "string",
  "gender": "array",
  "size": "array"
},
  {
  "id": "integer",
   "title": "string",
  "price": "integer",
  "image": "string",
  "gender": "array",
  "size": "array"
}
]
```

&nbsp;

## 3. GET /products/:id

Description:

- Get product by specific id from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "title": "string",
  "price": "integer",
  "image": "string",
  "gender": "array",
  "size": "array"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 4. PGET /products/cart/:userId

Description:

- get cart by specific userid from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "userId": "integer",
  "products": [
    {
      "id": "integer",
      "title": "string",
      "price": "integer",
      "image": "string",
      "gender": "array",
      "size": "array"
    },
    {
      "id": "integer",
      "title": "string",
      "price": "integer",
      "image": "string",
      "gender": "array",
      "size": "array"
    }
  ]
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

&nbsp;

## 5. PUT /products/cart/:productId

Description:

- Create or update cart specific productid

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "productId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success update cart"
}
```

&nbsp;

## Global Error

````

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
````
