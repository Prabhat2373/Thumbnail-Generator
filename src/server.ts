import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ErrorCodesType } from 'babylonjs';
import circular from 'circular-json';
dotenv.config({
  path: './.env',
});
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());

const configuration = new Configuration({
  organization: 'org-yYM0HNzVBWoCWNgj7clt0bRJ',
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', async (req, res) => {
  try {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createEdit({
      model: 'text-davinci-edit-001',
      input: 'What day of the wek is it?',
      instruction: 'Fix the spelling mistakes',
    });
    console.log('response', response);
    // const imgResponse = await fetch('https://api.openai.com/v1/images/generations0')
    res.status(200).json({
      response,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'BAD REQUEST',
      message: error?.message,
    });
  }
});
app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
