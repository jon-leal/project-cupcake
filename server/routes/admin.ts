import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { adminMiddleware } from '../middlewares/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(adminMiddleware);

router.get('/dashboard', async (req, res) => {
  try {
    const [totalOrders, totalUsers, totalProducts, revenue] = await Promise.all([
      prisma.order.count(),
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.aggregate({
        _sum: {
          total: true,
        },
        where: {
          status: 'COMPLETED',
        },
      }),
    ]);

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      revenue: revenue._sum.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados do dashboard' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar pedidos' });
  }
});

export { router as adminRouter };