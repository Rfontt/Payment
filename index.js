import express from 'express';
import 'dotenv/config';
import route from './src/routes/route.js';
import Connection from './src/database/connection.js';

const app = express();

Connection.mongodb();
Connection.postgres();

app.use(express.json());
app.use(route);

app.listen(process.env.SERVER_PORT);

export default app;