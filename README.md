# Authentication-API

### Registration

Add new user with email and password and start new session.

Routes `localhost:5000/register` POST request body:

```| jsonify }}'
{
    "email": "test@test.com",
    "password": "password"
}

```

Response with token:

```| jsonify }}'
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MzA2ODY5Mzl9.IGNDfc8lSunEd5diu_BEMeE7Jqzzvk-b7kBFpANQbB4"
}
```

### Login

Login with email and password and get valid session token.

Routes `localhost:5000/login` POST request body:

```| jsonify }}'
{
    "email": "test@test.com",
    "password": "password"
}
```

Response with a token and user data:

```| jsonify }}'
{
    "data": {
        "email": "test@test.com",
        "password": "password"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MzA2ODczMTd9.61fNf4q6O5Cukwc7RGZlnRE51ntRrWq695Pvofia31s"
}
```

### Logout

Logout and remove this session token.

Routes `localhost:5000/logout` DELETE request with no body but need valid token.
Response with message:

```| jsonify }}'
{
    "data": "logout"
}
```

### Change Password

Change the password and remove all session but this one.

Routes `localhost:5000/updatepassword` PUT request with new password also you need to valid token body:

```| jsonify }}'
{
    "newPassword": "newPassword"
}
```

Response with new token:

```| jsonify }}'
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsIiwiaWF0IjoxNjMwNjg0NTMxfQ.i6UCVZxku7xRt5OPTbxM55J5d-bv6Cbz5u_ggjWJJZw"
}
```
