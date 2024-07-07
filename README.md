

# 2024 TikTok TechJamBy Hackathon

PayTok leverages agent networks and cash-in/cash-out points, users can deposit and withdraw money from their digital wallets using physical locations such as retail stores, kiosks, and partner agents.

**Disclaimer**: Paytok is a web app designed for **mobile view**.

## Contributors
- [@carlintyj](https://github.com/Carlintyj)
- [@jonyxzx](https://github.com/Jonyxzx)
- [@shunpingong](https://github.com/shunpingong)
- [@aaronlim2001](https://github.com/AaronLim2001)
- [@yiheng27](https://github.com/yiheng27)

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
- **API security**: We secure the API payload with API keys
- **PIN security**: PINs are stored in db using SHA256

This setup ensures a robust, secure, and user-friendly platform for managing digital transactions, catering to both regular users and agents with additional functionalities.

## Challenges We Ran Into

One of the significant challenges we faced was not fully understanding the domain initially. This lack of familiarity made it difficult to make informed decisions regarding the architecture and specific requirements of the payment service. Additionally, integrating various third-party APIs presented a steep learning curve, especially in ensuring they worked seamlessly together. We also encountered issues with ensuring data security and maintaining a smooth user experience across different devices and platforms.

## Accomplishments That We're Proud Of

- We are proud to have created a functional payment service that operates without the need for a debit or credit card. This achievement demonstrates our ability to innovate and develop solutions for users who may not have access to traditional banking services.
- Successfully integrating the Google Gmail OAuth API to provide a seamless and secure login experience for users.
- Implementing a backend system using Node.js, Express.js, and MongoDB, which efficiently handles balance transfers, PIN authentication, transaction histories, and more.
- Developing a user-friendly interface with React that makes navigating the payment service intuitive and straightforward.
- Enabling top-up functionality via credit card exclusively for agents, adding an extra layer of utility for specific user roles.

## What We Learned

- We gained a deep understanding of the intricate details involved in creating a mobile payment service, from ensuring secure transactions and user authentication to managing transaction histories and integrating third-party APIs.
- We learned the importance of thorough domain research before diving into development, which helps in making informed architectural and design decisions.
- We enhanced our skills in full-stack development, particularly in using React for front-end development and Node.js, Express.js, and MongoDB for back-end development.
- We learned how to effectively manage and synchronise different components of a project, ensuring that the frontend and backend work together seamlessly.
- We improved our problem-solving skills by overcoming various technical challenges and ensuring a smooth and secure user experience.
- We gained experience in deploying applications on platforms like Render, understanding the deployment process, and handling post-deployment issues.

## What's next for PayTok
We hope that PayTok will be deployed into TikTok as an actual service to be used worldwide and reach parts of the world where bank accounts are uncommon. We hope that through PayTok, the TikTok community will grow via the continued engagement of users through transactions.
Subsequently, we hope to expand our services to other companies.

# Screenshots of PayTok

![IMG_6697](https://github.com/Carlintyj/PayTok/assets/102083899/58d6bc5f-9771-419d-a92f-2c561d759098)
![IMG_6699](https://github.com/Carlintyj/PayTok/assets/102083899/21173bf6-912c-4b56-9cd7-a94641128adf)
![IMG_6701](https://github.com/Carlintyj/PayTok/assets/102083899/b511903a-4a5e-44e1-aaed-75aa9e3b1c31)
![IMG_6704](https://github.com/Carlintyj/PayTok/assets/102083899/80696406-7702-487b-8bf2-c9fdfae8e913)
![IMG_6700](https://github.com/Carlintyj/PayTok/assets/102083899/d9bfe552-c525-4e37-b60c-10006f75521f)
![IMG_6702](https://github.com/Carlintyj/PayTok/assets/102083899/4e2b2552-3b00-4d77-b33e-cc444e4d863f)
![IMG_6703](https://github.com/Carlintyj/PayTok/assets/102083899/ec31a087-b9b0-472c-b3bc-557daf93af1f)

