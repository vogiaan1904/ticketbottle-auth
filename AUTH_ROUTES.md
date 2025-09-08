# Authentication Routes Documentation

This project uses BetterAuth for authentication. Below are the available authentication routes and how to use them.

## Basic Authentication Routes

### Change Password
- **URL:** `/api/change-password`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "currentPassword": "your-current-password",
    "newPassword": "your-new-password",
    "revokeOtherSessions": false
  }
  ```
- **Headers:** Include the session cookie or Authorization header
- **Response:** 
  ```json
  {
    "success": true,
    "message": "Password changed successfully"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Error message",
    "success": false
  }
  ```

### Sign Up
- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe",          // Required
    "phone": "+1234567890",      // Optional
  }
  ```
- **Response:** User object with session token

### Sign In
- **URL:** `/api/auth/signin`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** User object with session token

### Sign Out
- **URL:** `/api/auth/signout`
- **Method:** `POST`
- **Headers:** Include the session cookie or Authorization header
- **Response:** Success message

### Get Current Session
- **URL:** `/api/auth/session`
- **Method:** `GET`
- **Headers:** Include the session cookie or Authorization header
- **Response:** Current session data or null

## OAuth Authentication

### Google OAuth
- **Start OAuth Flow:** `/api/auth/providers/google`
- **Method:** `GET`
- **Query Parameters:** 
  - `callbackUrl`: URL to redirect after authentication (optional)
- **Response:** Redirects to Google authentication
- **Note:** When using Google OAuth, the following fields will be automatically populated:
  - `name`: Combined from Google profile's given_name and family_name
  - `email`: From Google profile's email
  - `country`: Default value "Unknown" (can be updated by user later)

### Google OAuth Callback
- **URL:** `/api/auth/callback/google`
- **Method:** `GET`
- **Handled automatically by BetterAuth**

## Additional Helper Routes

### Get Current User
- **URL:** `/api/me`
- **Method:** `GET`
- **Headers:** Include the session cookie or Authorization header
- **Response:** User profile data or 401 Unauthorized

### Check Authentication Status
- **URL:** `/api/check`
- **Method:** `GET`
- **Headers:** Include the session cookie or Authorization header
- **Response:** 
  ```json
  {
    "authenticated": true|false,
    "user": {...} // User data if authenticated, null otherwise
  }
  ```

## Using Authentication in Frontend

### React Example
```jsx
// Sign up
const signUp = async (userData) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      zip: userData.zip,
      country: userData.country
    })
  });
  return response.json();
};

// Sign in
const signIn = async (email, password) => {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Sign out
const signOut = async () => {
  await fetch('/api/auth/signout', {
    method: 'POST',
    credentials: 'include'
  });
};

// Get session
const getSession = async () => {
  const response = await fetch('/api/auth/session', {
    credentials: 'include'
  });
  return response.json();
};

// Sign in with Google
const signInWithGoogle = () => {
  window.location.href = '/api/auth/providers/google';
};
```

## Notes
- All authentication routes are automatically handled by BetterAuth
- Make sure to include credentials in fetch requests to maintain session
- For OAuth providers, ensure the correct client IDs and secrets are set in environment variables
- Required fields for user registration:
  - email
  - password
  - name
  - country
- Optional fields for user registration:
  - phone
  - address
  - city
  - state
  - zip
