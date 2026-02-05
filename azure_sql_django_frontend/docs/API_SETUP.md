# API URL Setup

This guide explains how to configure the API base URL for the frontend application.

## Configuration File

The API configuration is located in:
`src/services/api.js`

## Switching Environments

To switch between the local development environment and the Azure production environment, modify the `baseURL` property in `src/services/api.js`.

### Local Development

For local development, ensure the `baseURL` points to your local Django server (default: `http://127.0.0.1:8000/api`).

```javascript
const api = axios.create({
  // baseURL: 'https://bearlab-backend-d9awbhgfe4c6abdq.southeastasia-01.azurewebsites.net/api',
  baseURL: 'http://127.0.0.1:8000/api', // Local API
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Production (Azure)

For the production environment, uncomment the Azure URL and comment out the local URL.

```javascript
const api = axios.create({
  baseURL: 'https://bearlab-backend-d9awbhgfe4c6abdq.southeastasia-01.azurewebsites.net/api',
  // baseURL: 'http://127.0.0.1:8000/api', // Local API
  headers: {
    'Content-Type': 'application/json',
  },
});
```
