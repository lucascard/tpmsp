import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Port
const PORT = process.env.NODE_ENV === 'test' ? 5001 : 5000;

// Start server
if (process.env.NODE_ENV !== 'test') {
  // MongoDB Connection
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tpmsp')
    .then(() => {
      console.log('Conectado ao MongoDB');
      // Start server after MongoDB connection
      app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Erro ao conectar ao MongoDB:', error);
    });
}

export { app }; 