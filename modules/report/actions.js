'use server';

import { readFile, writeFile } from '@/lib/server-utils';

const calculateCoordinates = (address) => {
  const minifiedAddress = address.toLowerCase().replace(/[,\s]/g, '');

  if (minifiedAddress === 'москвапятницкоешоссе16к5')
    return [37.388128, 55.841698];

  if (minifiedAddress === 'москвапятницкоешоссе15')
    return [37.379186, 55.842565];

  if (minifiedAddress === 'красногорсккрасногорскийбульвар36')
    return [37.377489, 55.823874];
};

export const createNotice = async (values) => {
  try {
    const fileName = 'notices.json';
    const fileContent = await readFile(fileName);

    const savedData = JSON.parse(fileContent);
    const lastId = savedData.at(-1)?.id;

    const id = typeof lastId === 'number' ? lastId + 1 : 1;
    const location = calculateCoordinates(values.address);
    const notice = {
      id,
      type: values.type,
      petName: values.petName,
      petType: values.petType,
      breed: values.breed,
      lastSeen: values.lastSeen,
      photo: values.photo,
      description: values.description,
      location,
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
