# MiniLedger

Track money you've lent to friends. Node.js + TypeScript + PostgreSQL backend, React Native (Expo) app.

## Project structure
```
backend/src/
  config/        env + database connection (creates tables on startup)
  models/        SQL queries only (user, otp, loan)
  services/      business logic (OTP generation, JWT)
  controllers/   read request -> call model/service -> send response
  routes/        URL -> middleware -> controller
  middleware/    auth (JWT), validate (zod), upload (multer), errorHandler
  validators/    zod schemas
  utils/         HttpError, asyncHandler
backend/tests/   API tests

mobile/
  App.tsx        providers + navigation
  src/api/       fetch client + auth/loan API calls
  src/context/   AuthContext (token, login, logout)
  src/navigation/ stack navigator (Login vs Home/AddEntry)
  src/screens/   LoginScreen, HomeScreen, AddEntryScreen
  src/components/ Button, SummaryCard, LoanItem
  src/utils/, theme.ts, config.ts, types.ts
```

## 1. Backend
Requires Node 18+ and PostgreSQL.
```bash
createdb miniledger
cd backend
cp .env.example .env           # edit DATABASE_URL if needed
npm install
npm run dev                    # http://localhost:4000, tables auto-created
npm test
```
**Mock OTP:** request an OTP in the app, then read the code in the server terminal (`[MOCK OTP] <phone> -> <code>`).

### API
| Method | Path | Notes |
|---|---|---|
| POST | `/auth/request-otp` | `{phone}` |
| POST | `/auth/verify-otp` | `{phone, otp}` -> `{token}` (JWT) |
| POST | `/loans` | multipart: `friendName, amount, dueDate (YYYY-MM-DD), receipt?` |
| GET | `/loans` | list; each has `overdue` flag |
| POST | `/loans/:id/repay` | mark repaid |
| GET | `/summary` | `{totalLent, totalRepaid, overdueAmount}` |

All except `/auth/*` need `Authorization: Bearer <token>`.

## 2. Mobile app
```bash
npx create-expo-app@latest mobile-app --template blank-typescript
cd mobile-app
npx expo install @react-native-async-storage/async-storage expo-image-picker \
  @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
rm App.tsx
cp -r ../mobile/App.tsx ../mobile/src .
npx expo start                 # press "a" for Android emulator
```
Android emulator uses `http://10.0.2.2:4000`. On a real phone, edit `src/config.ts` to your computer's LAN IP.

## Design notes
- Overdue = not repaid AND due date before today, computed in SQL so list and summary always agree.
- OTPs expire in 5 minutes and are single-use. Login returns a 7-day JWT.
- Money is `NUMERIC(12,2)` in Postgres (no floating-point drift).
