import mongoose from 'mongoose';
import { User } from '../models/User';
import { hashPassword } from '../middleware/auth';

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tpmsp-test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a new user with valid data', async () => {
    const userData = {
      name: 'Test User',
      email: 'test1@example.com',
      password: 'password123'
    };

    const user = new User(userData);
    await user.save();

    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.password).not.toBe(userData.password); // Password should be hashed
  });

  it('should not create a user with invalid email', async () => {
    const userData = {
      name: 'Test User',
      email: 'invalid-email',
      password: 'password123'
    };

    const user = new User(userData);
    await expect(user.save()).rejects.toThrow();
  });

  it('should not create a user with duplicate email', async () => {
    const userData1 = {
      name: 'Test User 1',
      email: 'test2@example.com',
      password: 'password123'
    };

    const userData2 = {
      name: 'Test User 2',
      email: 'test2@example.com', // Mesmo email
      password: 'password123'
    };

    const user1 = new User(userData1);
    await user1.save();

    const user2 = new User(userData2);
    await expect(user2.save()).rejects.toThrow();
  });

  it('should compare passwords correctly', async () => {
    const password = 'password123';
    const hashedPassword = await hashPassword(password);

    const user = new User({
      name: 'Test User',
      email: 'test3@example.com',
      password: hashedPassword
    });

    const isMatch = await user.comparePassword(password);
    expect(isMatch).toBe(true);

    const isNotMatch = await user.comparePassword('wrongpassword');
    expect(isNotMatch).toBe(false);
  });
}); 