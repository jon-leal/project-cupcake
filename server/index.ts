import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { authRouter } from './routes/auth';
import { productsRouter } from './routes/products';
import { adminRouter } from './routes/admin';
import { authMiddleware } from './middlewares/auth';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/products', productsRouter);
app.use('/admin', authMiddleware, adminRouter);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});