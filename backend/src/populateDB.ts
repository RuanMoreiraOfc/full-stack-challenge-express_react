import axios from 'axios';

import getEnv from '@utils/getEnv';
import { PrismaClientSingleton } from '@utils/PrismaClientSingleton';

export default populateDB;

const prisma = PrismaClientSingleton.getInstance().client;

async function populateDB() {
  const wordCount = await prisma.word.count({ take: 1 });

  if (wordCount !== 0) {
    console.log('======== POPULATE SKIPPED ========');
    return;
  }

  const env = getEnv('WORDS_ENDPOINT', 'string');

  const response = await axios.get(env);
  const words: string[] = response.data.split(/\r?\n/);
  const data = words.map((word) => ({ value: word }));

  let pool: { value: string }[] = [];
  while (data.length > 0) {
    populatePool: {
      if (pool.length < 100) {
        const value = data.shift();
        if (value === undefined) {
          break populatePool;
        }
        pool.push(value);
      }
    }

    await prisma.word.createMany({ data: pool });
    pool = [];
  }

  console.log('======== DATABASE POPULATED ========');
}
