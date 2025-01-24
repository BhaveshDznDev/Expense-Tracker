<<<<<<< HEAD
# Expense-Tracker
=======
# Fullstack Expense Tracker App (PERN)

# Overview

The Fullstack Expense Tracker App designed to help monitor all financial expenditure and transactions.

###

## **Features:**

## **Dashboard:**

    - An overview of all transaction and account.

## **Transactions:**

- View all transactions even with a particualr date range.
- Filter transactions by date range
- Search a particular transaction
- View transaction details
- add transaction
- export transactions to excel file

## **Account Settings:**

- Create different accounts [`Cash account, Card account, Crypto account and Paypal account`]
- Add money to each account
- Transfer money from one account to another account

## **Settings:**

- Update user information
- Set country and currency
- Dark theme settings
- Change user password

## **Technologies Used:**

- **Frontend:**

  - React (Vite)
  - Zustand for State Management
  - Headless UI
  - Tailwind CSS

- **Backend:**
  - Node.js with Express.js
- **Database:**
  - PostgreSQL database for efficient and scalable data storage.

&nbsp;

## SETUP INSTRUCTIONS

# Server Setup

## Environment variables

First, create the environment variables file `.env` in the server folder. The `.env` file contains the following environment variables:

- DATABASE_URL = `your MongoDB URL`
- JWT_SECRET = `any secret key - must be secured`
- PORT = `8800` or any port number

&nbsp;

## Steps to run server/backend

1. Open the project in any editor of choice.
2. Navigate into the server directory `cd backend`.
3. Run `npm i` or `npm install` to install the packages.
4. Run `npm start` to start the server.

If configured correctly, you should see a message indicating that the server is running successfully and `Server running on port port number`.

&nbsp;

# Client/Frontend Side Setup

## Environment variables

- Goto the src/libs/apiCall.js file then change API_URL to your server url.

## Social Sign in Settings

1. Goto firebase console and create a new project.
2. Configure the project and enable authentication.
3. Copy and paste firebase project config valriables and add it to the firebaseConfig.js file

## Steps to run client/frontend

1. Navigate into the client directory `cd client`.
2. Run `npm i` or `npm install` to install the packages.
3. Run `npm run dev` to run the app on `http://localhost:5173`.

&nbsp;

## JOIN DISCORD SERVER:

- [https://discord.com/invite/MdAuvJBdGk](Discord)

## For Support, Contact:

- Email: codewavewithasante@gmail.com
- Telegram Chat: [https://t.me/Codewave_with_asante](https://t.me/Codewave_with_asante)
>>>>>>> 27755dc (Initial commit)
