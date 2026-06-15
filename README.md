## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- Redis server

### Backend Setup

1. Navigate to the backend directory:

```bash
   cd Backend/CRMbackend
```

2. Install dependencies:

```bash
   npm install
```

3. Create a `.env` file in the backend root with the following variables:

```dotenv
   PORT=4000
   DATABASE=your_mongodb_connection_string
   JWT_ACCESS_SECRET=your_access_token_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret
   JWT_REFRESH_SECRET_EXP_DAY=30
   REDIS_URL=redis://localhost:6379
```

4. Start the server:

```bash
   npm start
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
   cd Frontend/CRMfrontend
```

2. Install dependencies:

```bash
   npm install
```

3. Start the development server:

```bash
   npm run dev
```

4. Open the app at `http://localhost:5173`

## Ticket Categories

When an employee raises a new ticket, they first select a category from the **Raise a Ticket** page (`/raise-ticket`). This routes them to a pre-filled ticket form (`/addticket/:category`) with the category locked in.

| Category                 | Use Case                                       |
| ------------------------ | ---------------------------------------------- |
| Hardware Issue           | Laptop, desktop, monitor, peripheral problems  |
| Software Issue           | OS, app crashes, installation, licensing       |
| Network Issue            | Wifi, LAN, VPN, internet connectivity          |
| Application/Access Issue | Login problems, access requests, CRM/ERP tools |
| Account/HR Issue         | Payroll, leave portal, ID card, attendance     |
| Email Issue              | Email not working, spam, configuration         |
| Asset Request            | New laptop, monitor, accessories               |
| Security Issue           | Virus, suspicious activity, password reset     |
| Printer/Scanner Issue    | Printer or scanner not working                 |
| Server/Database Issue    | Backend, server, or database access issues     |
| Training/Onboarding      | Help with new tools or processes               |
| Other                    | Anything not covered above                     |

Admins can filter tickets by category on the Admin Dashboard to quickly group and resolve similar issues (e.g., view all Hardware Issue tickets together).

## Screenshots

> _Add screenshots of the Login page, Employee Dashboard, Raise Ticket category cards, Ticket Form, and Admin Dashboard here._

## License

This project is for educational/demo purposes.
