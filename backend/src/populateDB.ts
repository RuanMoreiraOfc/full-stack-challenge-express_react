import { PrismaClient } from '@prisma/client';
import axios from 'axios';

export default populateDB;

const prisma = new PrismaClient();

async function populateDB() {
  const wordCount = await prisma.word.count({ take: 1 });

  if (wordCount !== 0) {
    console.log('======== POPULATE SKIPPED ========');
    return;
  }

  if (process.env.WORDS_ENDPOINT === undefined) {
    throw new Error('`WORDS_ENDPOINT` not defined');
  }

  const response = await axios.get(process.env.WORDS_ENDPOINT);
  const words: string[] = response.data.split(/\r?\n/);
  const data = words.map((word) => ({ value: word }));

  await prisma.word.createMany({ data });
  console.log('======== DATABASE POPULATED ========');
}
