import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  image: z.string().url(),
  category: z.enum(['CUPCAKE', 'CAKE']),
});

router.get('/', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const data = productSchema.parse(req.body);
    const product = await prisma.product.create({ data });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Erro na validação dos dados' });
  }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const data = productSchema.parse(req.body);
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Erro na validação dos dados' });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar produto' });
  }
});

export { router as productsRouter };