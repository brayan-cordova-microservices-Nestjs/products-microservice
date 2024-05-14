# Products Microservice

Microservice to manage products.

Using as transport TCP

## Develop Mode

1. Clone repository
2. Install dependencies with the command `npm install` or `npm i` on your terminal
3. Create an `.env` file based on `.env.template`
4. Run prisma migration with the command `npx prisma migrate dev` and if you want to add a column type `npx prisma migrate dev --name (name it)`
5. Then execute the command `npm run start:dev` on your terminal to run the server in development mode
6. NATS server up `docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats`
7. This Products Microservice is running on port `3001`

## INFORMATION MICROSERVICES-NESTJS

Creation of a distributed system using multiple databases, transporters and techniques to independently scale each microservice. Following the best practices on hot to configure, connect and scale them.

1. Microservices Architecture
2. Nest JS as backend
3. Communication by messages and events
4. Message Patterns
5. CRUDs
6. Communication between Microservices
7. Multiple databases as PostreSQL, Mongo, SQLite (several microservices have different type of databases)
8. Gateways
9. Exception Handling
10. Prisma, Prisma Models and Relationships
11. Filters and Pages
12. Dockerization
13. Kubernetes
14. Deployed in Google Cloud
15. Google Kubernetes Engine (GKE)
16. Private records for artifacts in GCloud
17. CI/CD - Github Copilot and Jenkins(Training)
18. Payments with Stripe
19. Webhooks
20. Proxys
21. Handling of environment variables (.env)
22. Secrets
23. Auth (Login)
24. NATS Server
25. Transporters such as TCP, HTTP, gRPC
26. Postman
27. Third Party API Integration: Rest
28. Swagger Documentation
29. Git sub modules and Git Organizations
30. Auth, Gateway, Products, Orders, Order Details, Payments Microservices
