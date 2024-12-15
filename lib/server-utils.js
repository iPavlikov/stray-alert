'use server';

import { promises } from 'fs';
import path from 'path';

const dataDirectory = path.join(process.cwd(), 'data');

export async function readFile(fileName) {
  const filePath = path.join(dataDirectory, fileName);
  const fileContent = await promises.readFile(filePath, 'utf8');

  return fileContent;
}

export async function writeFile(fileName, data) {
  const filePath = path.join(dataDirectory, fileName);
  await promises.writeFile(filePath, data);
}
