import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import authRoutes from './routes/authRoutes';
import testPlanRoutes from './routes/testPlanRoutes';

dotenv.config();

const app = express();

// Debug middleware - deve ser o primeiro
app.use((req, res, next) => {
  console.log('\n--- Nova Requisição ---');
  console.log('URL:', req.url);
  console.log('Método:', req.method);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/auth', authRoutes);
app.use('/test-plans', testPlanRoutes);

// 404 handler
app.use((req, res, next) => {
  console.log('404 - Rota não encontrada:', req.method, req.url);
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro:', err);
  res.status(500).json({ message: 'Erro interno do servidor', error: err.message });
});

// Port
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tpmsp')
  .then(() => {
    console.log('Conectado ao MongoDB');
    // Start server after MongoDB connection
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

export { app }; 