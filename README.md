

# 2024 TikTok TechJamBy Hackathon

**Disclaimer**: Paytok is a web app designed for **mobile view**.

PayTok leverages agent networks and cash-in/cash-out points, users can deposit and withdraw money from their digital wallets using physical locations such as retail stores, kiosks, and partner agents.

## Inspiration
Paytok is inspired by prepaid services such as gift cards and prepaid sim.

## What it does
PayTok is a digital payment platform to offer customers the option to pay cashless without requiring a debit or credit card. PayTok acts as a 'bank account' where users 'deposit' money into the app via agents. An agent can deposit money into their account either by connecting to their bank account or by depositing cash from another agent. An agent is then able to sell top-up services to other users by transferring money from the agent to user's account and the user pays by cash.

## How We Built It

Our project was developed using a combination of React and Node.js, with the Google Gmail OAuth API integrated for a seamless login experience.

### Frontend
- **React**: Used to build the UI and components, ensuring a responsive and dynamic user experience.
- **Google Gmail OAuth API**: Provides secure and smooth user authentication.

### Backend
- **Node.js with Express**: Manages server-side logic and API endpoints.
- **MongoDB**: Serves as the database, storing user data and transaction histories.
- **Deployment**: The backend is deployed on Render, ensuring reliability and scalability.

### Features
- **Balance Transfer**: Securely handles the transfer of balances between users.
- **PIN Authentication**: Adds an extra layer of security for transactions.
- **Transaction History**: Maintains a detailed log of all user transactions.
- **Top Up via Credit Card**: Agents have the exclusive ability to top up their accounts using credit cards, enhancing convenience and flexibility.

This setup ensures a robust, secure, and user-friendly platform for managing digital transactions, catering to both regular users and agents with additional functionalities.

## Challenges we ran into
Not understanding the domain.

## Accomplishments that we're proud of
We were able to create a working payment service without the need of a debit or credit card.

## What we learned
We learnt the intricate details that go into creating a mobile payment service.

## What's next for PayTok
We hope that PayTok will be deployed into TikTok as an actual service to be used worldwide and reach parts of the world where bank accounts are uncommon. We hope that through PayTok, the TikTok community will grow via the continued engagement of users through transactions.
Subsequently, we hope to expand our services to other companies.
