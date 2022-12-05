// const express = require('express');
// // const Jest = require('jest');
// // const { getType } = require('jest-get-type');
// const jwt = require('jsonwebtoken');
// const request = require('supertest');
// // const app = require('../app');
// require('dotenv').config();

// const { loginController } = require('./authController');

// const app = express();

// app.post('/api/users/login', loginController);

// const mockLoginService = jest.fn();
// jest.mock('../services/authService.js', () => {
//     return { login: () => mockLoginService() };
// });

// describe('test login controller', () => {
//     // запустить сервер
//     beforeAll(() => app.listen(3000));

//     // остановить сервер
//     afterAll(() => {
//         // mongoose.connection.close();

//         function gracefulshutdown() {
//             console.log('Shutting down');
//             app.close(() => {
//                 console.log('HTTP server closed.');

//                 process.exit(0);
//             });
//         }

//         process.on('SIGTERM', gracefulshutdown);
//     });

//     const body = {
//         email: 'baggins@gmail.com',
//         password: '11111111',
//     };

//     const _id = '63775e883a184bd720366501';
//     const createdAt = new Date();
//     const { JWT_SECRET } = process.env;
//     const subscription = 'starter';
//     const token = jwt.sign({ _id, createdAt }, JWT_SECRET);

//     test('success request with status code 200', async () => {
//         mockLoginService.mockImplementation(() => {
//             token, subscription;
//         });

//         const response = await request(app).post('/api/users/login').send(body);
//         // loginController(req[body]);
//         expect(response.statusCode).toBe(200);
//     });

//     // test('в ответе должен возвращаться токен', () => {
//     //     expect('token').toBe('token');
//     // });

//     // test('в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String', () => {
//     //     const _id = '12345';
//     //     const createdAt = new Date();
//     //     const { JWT_SECRET } = process.env;
//     //     const subscription = 'starter';
//     //     const token = jwt.sign({ _id, createdAt }, JWT_SECRET);

//     //     mockLoginService.mockImplementation(() => {
//     //         token, subscription;
//     //     });

//     //     expect('объект user').toEqual(
//     //         expect.objectContaining({
//     //             email: expect.any(String),
//     //             subscription: expect.any(String),
//     //         })
//     //     );
//     // });
// });

// const app = require('../app');
// const mongoose = require('mongoose');
// // const { DB_HOST } = require('../src/config');
// const request = require('supertest');
// require('dotenv').config();
// const { JWT_SECRET, DB_HOST } = process.env;

// const baseURL = 'http://localhost:3000';

// describe('POST /login', () => {
//     beforeAll(async () => {
//         try {
//             await mongoose.connect(DB_HOST);
//             console.log('Database connection successful');

//             app.listen(3000, () => {
//                 console.log('Server running. Use our API on port: 3000');
//             });
//         } catch (err) {
//             console.error('Failed to start server with error: ', err.message);
//             process.exit(1);
//         }
//     });

//     afterAll(() => {
//         mongoose.connection.close();

//         function gracefulshutdown() {
//             console.log('Shutting down');
//             app.close(() => {
//                 console.log('HTTP server closed.');

//                 process.exit(0);
//             });
//         }

//         process.on('SIGINT', gracefulshutdown);
//     });

//     const user = {
//         email: 'baggins@mail.com',
//         password: '11111111',
//     };

//     it('success login', async () => {
//         const response = await request(baseURL)
//             .post('/api/users/login')
//             .send(user);

//         expect(response.status).toBe(200);
//     });
// });
