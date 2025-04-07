import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tpmsp');
    
    // Lista de coleções para limpar
    const collections = ['testplans', 'users'];
    
    for (const collection of collections) {
      await mongoose.connection.collection(collection).deleteMany({});
      console.log(`Coleção ${collection} limpa com sucesso`);
    }
    
    console.log('Banco de dados limpo com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
  } finally {
    await mongoose.disconnect();
  }
};

clearDatabase(); 