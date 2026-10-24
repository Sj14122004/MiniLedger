# MiniLedger

MiniLedger is a mobile application for tracking money lent to friends.

## Features

- Phone number login with mock OTP.
- Add loan entries with friend name, amount, and due date.
- View all loan entries.
- Mark loans as repaid.
- View total lent, total repaid, and overdue amount.
- Highlight overdue loans.
- Input validation and basic tests.

## Tech Stack

**Mobile:** React Native, Expo, TypeScript

**Backend:** Node.js, Express, TypeScript

**Database:** PostgreSQL

## Prerequisites

- Node.js and npm
- PostgreSQL
- Expo Go or an Android emulator

## Setup and Run

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd MiniLedger
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Configure the required environment variables in the backend `.env` file, including the PostgreSQL database URL and authentication secret.

Run the database migrations and start the backend using the commands defined in `backend/package.json`.

### 3. Set up the mobile app

Open a new terminal:

```bash
cd mobile
npm install
npx expo start
```

Open the app using Expo Go or an Android emulator.

### 4. Authentication

Enter your phone number to request an OTP. The mock OTP is printed in the backend server logs. Enter that OTP to log in.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/send-otp` | Generate a mock OTP |
| POST | `/auth/verify-otp` | Verify OTP and authenticate |
| GET | `/loans` | List loan entries |
| POST | `/loans` | Create a loan entry |
| PATCH | `/loans/:id/repay` | Mark a loan as repaid |
| GET | `/loans/summary` | Get loan summary |

## Testing

Run the backend tests using the test command defined in `backend/package.json`.

## Submission

**GitHub Repository:** Add your repository URL.

**Screen Recording:** Add your Loom or Google Drive recording link.
