'use server';

import { readFile, writeFile } from '@/lib/server-utils';

export const createNotice = async (values) => {
  try {
    const fileName = 'notices.json';
    const fileContent = await readFile(fileName);

    const savedData = JSON.parse(fileContent);
    const lastId = savedData.at(-1)?.id;

    const id = typeof lastId === 'number' ? lastId + 1 : 1;
    const notice = {
      id,
      type: values.type,
      petName: values.petName,
      petType: values.petType,
      breed: values.breed,
      lastSeen: values.lastSeen,
      photo: values.photo,
      description: values.description,
      location: [37.06738620638225, 55.85367530400972],
    };
    const data = [...savedData, notice];

    await writeFile(fileName, JSON.stringify(data));

    return { data: notice };
  } catch (error) {
    console.error('Error reading file:', error);

    return {
      error: {
        message: 'Не получилось сохранить объявление. Попробуйте еще раз',
      },
    };
  }
};
