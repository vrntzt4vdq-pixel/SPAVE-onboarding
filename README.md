# SPAVE-onboarding
_spave UI 
📋 QUICK CHECKLIST
🔗 SECTION 1: API BASICS
Base URL
Development: http://localhost:3003
Production: [ADD_YOUR_PRODUCTION_URL]
Server Status Check
GET http://localhost:3003
Response: "Spave API is running... 🚀"
Available Endpoints Summary
POST   /api/auth/register        - Create account
POST   /api/auth/login           - Login & get token
POST   /api/transactions         - Add transaction
GET    /api/transactions         - Get all transactions
DELETE /api/transactions/:id     - Delete transaction
GET    /api/dashboard            - Get dashboard data
 
🔐 SECTION 2: AUTHENTICATION
Authentication Method
Type: JWT (JSON Web Tokens)
Expiry: 7 days
Algorithm: HS256
How to Use Token
1. Get Token (from login/register)
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
2. Store Token
• Store in localStorage: localStorage.setItem('token', token)
• Or sessionStorage
• Or cookies (with httpOnly flag)
3. Use Token in Every Request
JavaScript/Fetch Example:
const token = localStorage.getItem('token');
 
fetch('http://localhost:3003/api/dashboard', {
 method: 'GET',
 headers: {
   'Authorization': `Bearer ${token}`,
   'Content-Type': 'application/json'
 }
})
.then(res => res.json())
.then(data => console.log(data))
JavaScript/Axios Example:
import axios from 'axios';
 
const token = localStorage.getItem('token');
 
const api = axios.create({
 baseURL: 'http://localhost:3003/api',
 headers: {
   'Authorization': `Bearer ${token}`,
   'Content-Type': 'application/json'
 }
});
 
// Use api.get(), api.post(), etc.
React Example (with Axios):
// API Service
import axios from 'axios';
 
const API = axios.create({
 baseURL: 'http://localhost:3003/api'
});
 
// Add token to every request
API.interceptors.request.use((config) => {
 const token = localStorage.getItem('token');
 if (token) {
   config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
});
 
export default API;
 
// Usage in Component
import API from './api';
 
useEffect(() => {
 API.get('/dashboard')
   .then(res => setDashboard(res.data))
   .catch(err => console.error(err));
}, []);
Token Expiry Handling
If Token Expires (401 response):
1. User gets 401 Unauthorized error
2. Redirect to login page
3. User must login again
4. New token generated (7 days from now)
 
📤 SECTION 3: REQUEST/RESPONSE FORMATS
Auth Endpoints
POST /api/auth/register
Request:
{
 "name": "John Doe",
 "email": "john@example.com",
 "password": "SecurePass123!",
 "monthly_budget": 100000,
 "income": 150000
}
Response (201):
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 "user": {
   "id": "507f1f77bcf86cd799439011",
   "name": "John Doe",
   "budget": 100000
 }
}
 
POST /api/auth/login
Request:
{
 "email": "john@example.com",
 "password": "SecurePass123!"
}
Response (200):
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 "user": {
   "id": "507f1f77bcf86cd799439011",
   "name": "John Doe"
 }
}
 
Transaction Endpoints
POST /api/transactions
Request:
{
 "amount": 5000,
 "description": "Lunch at restaurant",
 "category": "food"
}
Response (201):
{
 "message": "Success",
 "data": {
   "_id": "69cb22b3fe10d76ec6f6a771",
   "amount": 5000,
   "description": "Lunch at restaurant",
   "category": "food",
   "savings_generated": 375,
   "date": "2026-03-31T01:22:33.593Z",
   "createdAt": "2026-03-31T01:22:33.596Z"
 },
 "savings_sweep": 375,
 "notification": "none",
 "alert_message": "No alert",
 "remaining_budget": 95000
}
 
GET /api/transactions
Response (200):
[
 {
   "_id": "69cb22b3fe10d76ec6f6a771",
   "amount": 5000,
   "description": "Lunch at restaurant",
   "category": "food",
   "savings_generated": 375,
   "date": "2026-03-31T01:22:33.593Z"
 },
 {
   "_id": "69cb21d9b84d1aa9a8848db7",
   "amount": 60000,
   "description": "Monthly rent",
   "category": "housing",
   "savings_generated": 4500,
   "date": "2026-03-31T01:20:00.000Z"
 }
]
 
DELETE /api/transactions/:id
Response (200):
{
 "message": "Transaction deleted successfully"
}
 
Dashboard Endpoint
GET /api/dashboard
Response (200):
{
 "total_spent": 65000,
 "remaining_balance": 35000,
 "savings_pocket": 4875,
 "safe_to_spend_today": 1750.00,
 "days_left": 20,
 "active_alerts": ["75_percent"]
}
 
🔧 SECTION 4: FIELD SPECIFICATIONS
Registration Fields
Field

Type

Required

Example

Notes

name

String

Yes

"John Doe"

User's full name

email

String

Yes

"john@example.com"

Must be unique

password

String

Yes

"Pass123!"

Min 6 chars recommended

monthly_budget

Number

Yes

100000

In Naira, positive integer

income

Number

Yes

150000

In Naira, positive integer

Transaction Fields
Field

Type

Required

Example

Notes

amount

Number

Yes

5000

In Naira, positive

description

String

Yes

"Lunch"

Min 3 characters

category

String

Yes

"food"

See categories below

Valid Categories
- food
- transport
- housing
- utilities
- shopping
- entertainment
- other
Dashboard Fields
Field

Type

Meaning

Example

total_spent

Number

Amount spent this month

65000

remaining_balance

Number

Budget - spent

35000

savings_pocket

Number

7.5% accumulated

4875

safe_to_spend_today

Number

Remaining ÷ days_left

1750.00

days_left

Number

Days in month remaining

20

active_alerts

Array

Triggered alerts

["75_percent"]

 
⚠️ SECTION 5: ERROR HANDLING
HTTP Status Codes
Code

Meaning

Example Error

200

OK

GET successful

201

Created

Resource created

400

Bad Request

Invalid input

401

Unauthorized

Missing/invalid token

404

Not Found

Resource doesn't exist

500

Server Error

Database error

Error Response Format
{
 "message": "Error description"
}
Common Error Responses
401 - Missing Authorization
{
 "message": "Not authorized to access this route"
}
401 - Invalid Token
{
 "message": "Not authorized to access this route"
}
401 - Wrong Credentials
{
 "message": "Invalid email or password"
}
400 - Duplicate Email
{
 "message": "User already exists"
}
404 - Not Found
{
 "message": "Transaction not found"
}
How to Handle Errors
JavaScript/React Example:
API.post('/auth/login', {email, password})
 .then(res => {
   localStorage.setItem('token', res.data.token);
   redirectToDashboard();
 })
 .catch(err => {
   if (err.response?.status === 401) {
     showError('Invalid email or password');
   } else if (err.response?.status === 400) {
     showError('User already exists');
   } else {
     showError('Server error. Try again.');
   }
 });
 
🧮 SECTION 6: KEY CALCULATIONS
Savings Calculation
Formula: savings = amount × 0.075
 
This happens AUTOMATICALLY on backend.
Frontend just displays the savings_generated value.
 
Example:
- User spends: ₦5,000
- Savings: ₦5,000 × 0.075 = ₦375
- Backend returns: savings_generated: 375
- Frontend displays: "Savings: ₦375"
Safe-to-Spend Daily
Formula: safe_to_spend = remaining_budget ÷ days_left
 
Example:
- Remaining: ₦35,000
- Days left: 20
- Safe today: ₦35,000 ÷ 20 = ₦1,750/day
 
Display to user: "Safe to spend today: ₦1,750"
Budget Alerts
Alert Triggers (AUTOMATIC on backend):
- 75% Alert: total_spent >= (budget × 0.75)
- 90% Alert: total_spent >= (budget × 0.90)
 
Backend sends:
notification: "75_percent" or "90_percent" or "none"
alert_message: "⚠️ WARNING: You've reached 75% of your budget!"
 
Frontend displays alert to user based on notification value.
Days Remaining
Last day of month - Current day = Days left
 
Example (March):
- Today: March 11
- Last day: March 31
- Days left: 31 - 11 = 20 days
 
Display: "20 days left in month"
 
🎨 SECTION 7: UI COMPONENTS TO BUILD
Pages/Screens Needed
1. Authentication Pages
o Sign Up page
o Login page
2. Main App Pages
o Dashboard (main screen)
o Transactions List
o Add Transaction (form)
o User Settings/Profile
Dashboard Components
Dashboard Screen Should Display:
 
┌─────────────────────────────────────┐
│  Safe-to-Spend Today: ₦1,750        │
│  Remaining Budget: ₦35,000          │
│  Savings Pocket: ₦4,875             │
│  Days Left: 20                      │
│  [Alert: 75% Warning!] (if alert)  │
└─────────────────────────────────────┘
 
Recent Transactions:
- Lunch - ₦5,000 (3 hours ago)
- Rent - ₦60,000 (1 day ago)
 
[+ Add Transaction Button]
[View All Transactions]
Transaction List Component
Transactions:
 
[Description] [Amount] [Savings] [Date]
Lunch         ₦5,000   ₦375     Today
Rent          ₦60,000  ₦4,500   Yesterday
 
[Delete button for each transaction]
Add Transaction Form
Amount: [____]
Description: [____]
Category: [Select dropdown]
        - food
        - transport
        - housing
        - utilities
        - shopping
        - entertainment
        - other
 
[Cancel] [Add Transaction]
 
📡 SECTION 8: API INTEGRATION FLOW
Complete Login Flow
1. User enters email & password
  ↓
2. Frontend: POST /api/auth/login
  {
    "email": "user@example.com",
    "password": "Pass123!"
  }
  ↓
3. Backend validates credentials
  ↓
4. Backend returns token
  {
    "token": "eyJhbGc...",
    "user": { "id": "...", "name": "..." }
  }
  ↓
5. Frontend saves token to localStorage
  localStorage.setItem('token', response.token)
  ↓
6. Frontend redirects to dashboard
  ↓
7. Dashboard page loads and calls GET /api/dashboard
  (with Authorization header)
  ↓
8. Backend returns dashboard data
  {
    "total_spent": X,
    "remaining_balance": Y,
    ...
  }
  ↓
9. Frontend displays dashboard
Complete Add Transaction Flow
1. User enters amount, description, category
  ↓
2. User clicks "Add Transaction"
  ↓
3. Frontend: POST /api/transactions
  {
    "amount": 5000,
    "description": "Lunch",
    "category": "food"
  }
  With Authorization header
  ↓
4. Backend calculates 7.5% savings
  ↓
5. Backend checks budget thresholds
  ↓
6. Backend returns:
  {
    "message": "Success",
    "data": { transaction details },
    "savings_sweep": 375,
    "notification": "none" or "75_percent" or "90_percent",
    "remaining_budget": X
  }
  ↓
7. Frontend updates dashboard
  - Update remaining balance
  - Update savings pocket
  - Show alert if notification = "75_percent" or "90_percent"
  ↓
8. Frontend shows success message
 
💾 SECTION 9: DATA TO STORE ON FRONTEND
After Login - Store Locally
// In localStorage or state
{
 token: "eyJhbGc...",
 userId: "507f1f77bcf86cd799439011",
 userName: "John Doe",
 monthlyBudget: 100000
}
Dashboard Data - Store in State
{
 totalSpent: 65000,
 remainingBalance: 35000,
 savingsPocket: 4875,
 safeToSpendToday: 1750.00,
 daysLeft: 20,
 activeAlerts: ["75_percent"]
}
Transactions List - Store in State
[
 {
   _id: "69cb22b...",
   amount: 5000,
   description: "Lunch",
   category: "food",
   savings_generated: 375,
   date: "2026-03-31T01:22:33.593Z"
 }
]
 
🧪 SECTION 10: TESTING CHECKLIST FOR FRONTEND DEV
Before submitting frontend, test:
• [ ] Registration works (creates account)
• [ ] Login works (returns token)
• [ ] Token stored in localStorage
• [ ] Dashboard displays correct data
• [ ] Can add transaction
• [ ] Savings calculated correctly (7.5%)
• [ ] Can view all transactions
• [ ] Can delete transaction
• [ ] Alert shows at 75% budget
• [ ] Alert shows at 90% budget
• [ ] Cannot access protected routes without token
• [ ] Logout clears token and redirects to login
• [ ] Token expiry handled (shows login after 7 days)
• [ ] Error messages display on API errors
• [ ] Loading states show during API calls
 
🔌 SECTION 11: CORS & HEADERS
CORS Configuration
Backend already has CORS enabled.
Frontend can make requests from:
• http://localhost:3000 (React dev server)
• http://localhost:3001 (any localhost port)
• Or your deployed frontend URL
Required Headers
For all requests:
Content-Type: application/json
For protected endpoints:
Authorization: Bearer <JWT_TOKEN>
CORS Error Prevention
If you get CORS error, it means:
1. Backend CORS not configured for your frontend URL
2. Contact backend developer to add your URL to CORS whitelist
 
📚 SECTION 12: DOCUMENTATION LINKS
Share these with frontend dev:
1. Complete API Documentation
o File: API_DOCUMENTATION.md
o Shows every endpoint with examples
2. Interactive Postman Docs
o Link: https://documenter.postman.com/view/[ID]/spave-api
o Can test endpoints in browser
3. Postman Collection
o File: Spave_Postman_Collection.json
o Import into Postman for testing
4. Project README
o File: README_SHORT.md
o Quick overview of project
5. This Document
o File: FRONTEND_INTEGRATION_PACKAGE.md
o Everything to get started
 
🚀 SECTION 13: IMPLEMENTATION CHECKLIST
Frontend Dev Should:
• [ ] Read this entire document
• [ ] Review API_DOCUMENTATION.md
• [ ] Import Postman collection
• [ ] Test endpoints in Postman
• [ ] Setup API service (axios/fetch)
• [ ] Create login/register pages
• [ ] Create dashboard page
• [ ] Create transactions list page
• [ ] Create add transaction form
• [ ] Implement token management
• [ ] Implement error handling
• [ ] Test all flows manually
• [ ] Run through testing checklist
 
💡 SECTION 14: COMMON QUESTIONS FOR BACKEND DEV
Backend Dev should be able to answer:
1. What version of Node.js are you using?
Answer: Run node --version
2. What's your MongoDB connection string?
Answer: Should be in .env file
3. Can I test endpoints locally?
Answer: Yes, server runs on http://localhost:3003
4. What's the JWT secret?
Answer: In .env file
5. Can I change error messages?
Answer: Suggest what you want changed
6. How long is token valid?
Answer: 7 days from issue
7. Can you add CORS for my frontend URL?
Answer: Will add to CORS whitelist
8. Can I add new endpoints?
Answer: Wait until Phase 2, not for MVP
 
📋 SECTION 15: FILES TO GIVE FRONTEND DEV
Create a folder with these files:
frontend-integration-package/
├── API_DOCUMENTATION.md
├── FRONTEND_INTEGRATION_PACKAGE.md (this file)
├── POSTMAN_DOCUMENTATION_GUIDE.md
├── Spave_Postman_Collection.json
├── README_SHORT.md
└── QUICK_START.txt
QUICK_START.txt Content
QUICK START - FRONTEND INTEGRATION
 
1. READ THIS FIRST:
  - FRONTEND_INTEGRATION_PACKAGE.md (this folder)
 
2. UNDERSTAND THE API:
  - Review API_DOCUMENTATION.md
  - Import Spave_Postman_Collection.json into Postman
  - Test each endpoint in Postman
 
3. SETUP YOUR PROJECT:
  - Create React/Vue/etc app
  - Install axios or use fetch
  - Setup API service with Bearer token
 
4. IMPLEMENT PAGES:
  - Login page (POST /api/auth/login)
  - Register page (POST /api/auth/register)
  - Dashboard (GET /api/dashboard)
  - Transactions (GET /api/transactions)
  - Add Transaction (POST /api/transactions)
 
5. KEY THINGS TO REMEMBER:
  - Save token in localStorage after login
  - Add "Authorization: Bearer {token}" header to all protected endpoints
  - Handle 401 errors (redirect to login)
  - Token expires after 7 days
  - Budget thresholds: 75% and 90%
  - Savings auto-calculated as 7.5%
 
6. TESTING:
  - Test login/register
  - Test dashboard loads correctly
  - Test add transaction
  - Test calculations (7.5% savings, safe-to-spend)
  - Test error handling
  - Test token expiry
 
7. QUESTIONS?
  Contact backend developer with API questions
 
