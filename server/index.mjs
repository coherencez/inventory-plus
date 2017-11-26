import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const PORT = process.env.PORT || 8000;

const app = express();

app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
