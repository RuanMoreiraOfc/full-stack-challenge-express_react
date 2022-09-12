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

  console.log('======== POPULATE STARTED ========');
  const allWordsEndpoint = getEnv('WORDS_ENDPOINT', 'string');
  const populateHardPermission = getEnv('POPULATE_HARD', 'boolean', false);

  const response = await axios.get(allWordsEndpoint);
  const words: string[] = response.data.split(/\r?\n/);
  const data = words.map((word) => ({ value: word }));
  const totalCount = data.length;
  console.log(`total: ${totalCount} words`);

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

    if (populateHardPermission) {
      await prisma.word.createMany({ data });
      break;
    } else {
      console.log('======== ADDING 100 WORDS ========');
      console.log(`state: ${1 - data.length / totalCount}%`);
      await prisma.word.createMany({ data: pool });
      pool = [];
    }
  }

  console.log('======== DATABASE POPULATED ========');
}
