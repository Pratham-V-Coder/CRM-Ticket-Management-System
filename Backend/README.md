# CRM client side API

This api is a part of create CRM Ticket system with mern stack from scratch.

# How to use

- run `git clone ...`
- run `npm run dev`

Note: Make sure you have nodemon is installed in your stytem oterwise you can install as a dev dependancies in this poject .

## API Resources

### User API Resources

All the user API router follows `/v1/user/`

| #   | Routers                           | Verbs | Progress | Is Private | Description                                      |
| --- | --------------------------------- | ----- | -------- | ---------- | ------------------------------------------------ |
| 1   | `/v1/user/login`                  | POST  | TODO     | No         | Verify user Authentication and return jwt        |
| 2   | `/v1/user/request-reset-password` | POST  | TODO     | No         | Verify email and email pin to reset the password |
| 3   | `/v1/user/reset-password`         | PUT   | TODO     | No         | Replace with new password                        |
| 4   | `/v1/user/{id}`                   | GET   | TODO     | Yes        | Get users Info                                   |

### Ticket API Resources

1. C = Create Ticket
2. R = Read Ticket
3. U = Update Ticket
4. D = Delete Ticket

All the user API router follows `/v1/ticket/`

| #   | Routers           | Verbs | Progress | Is Private | Description                             |
| --- | ----------------- | ----- | -------- | ---------- | --------------------------------------- |
| 1   | `/v1/ticket`      | GET   | TODO     | Yes        | Get all ticket for the logged in user   |
| 2   | `/v1/ticket/{id}` | GET   | TODO     | Yes        | Get a ticket details                    |
| 3   | `/v1/ticket`      | POST  | TODO     | Yes        | Create a new ticket                     |
| 4   | `/v1/ticket/{id}` | PUT   | TODO     | Yes        | Update ticket details ie. reply message |
| 5   | `/v1/ticket/{id}` | PUT   | TODO     | Yes        | Update ticket details ie. reply message |
