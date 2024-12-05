import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import questionsRoutes from './routes/questionsRoutes.js';  // Default import now works

dotenv.config();

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Use the questions routes
app.use('/api/questions', questionsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
