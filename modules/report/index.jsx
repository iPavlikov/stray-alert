'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';
import { z } from 'zod';
import { createNotice } from './actions';

const schema = z.object({
  type: z.enum(['found', 'lost']),
  petName: z.string().min(2),
  petType: z.string().min(2),
  breed: z.string().min(2),
  photo: z.string().min(2),
  lastSeen: z.string().min(1),
  address: z.string().min(3),
});

const resolver = zodResolver(schema);
const initialFormValues = {
  type: '',
  petName: '',
  petType: '',
  breed: '',
  photo: '',
  lastSeen: '',
  address: '',
};

export const ReportDialog = ({ children, description, title, type }) => {
  const defaultValues = { ...initialFormValues, type };
  const { mutate } = useSWRConfig();
  const [open, setOpen] = useState();
  const form = useForm({ defaultValues, resolver });

  const invalidateNotices = () => {
    mutate((key) => {
      return Array.isArray(key) && key[0] === '/api/reports';
    });
  };

  const onSubmit = async (values) => {
    const { data } = await createNotice(values);

    if (data) {
      invalidateNotices();
      setOpen(false);
      form.reset();
    }
  };

  const handleGeoAutocomplete = async () => {
    // const data = await fetch(
    //   'https://suggest-maps.yandex.ru/v1/suggest?apikey=4fa97013-9743-4d9a-9edc-97e7253a602f&text=бурдж'
    // )
    //   .then((res) => {
    //     if (res.ok) return res.json();
    //   })
    //   .catch((e) => {
    //     console.error(e);
    //   });
    // console.log(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="petName" className="text-right">
              Имя питомца
            </Label>
            <Controller
              control={form.control}
              name="petName"
              render={({ field }) => (
                <Input id="petName" className="col-span-3" {...field} />
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="petType" className="text-right">
              Тип
            </Label>
            <Controller
              control={form.control}
              name="petType"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger id="petType" className="col-span-3">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Собака</SelectItem>
                    <SelectItem value="cat">Кошка</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="breed" className="text-right">
              Порода
            </Label>
            <Controller
              control={form.control}
              name="breed"
              render={({ field }) => (
                <Input id="breed" className="col-span-3" {...field} />
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photo" className="text-right">
              Фото
            </Label>
            <Controller
              control={form.control}
              name="photo"
              render={({ field: { onChange } }) => (
                <FileUpload
                  accept="image/png, image/jpeg, image/webp"
                  id="photo"
                  type="file"
                  className="col-span-3"
                  onValueChange={onChange}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastSeen" className="text-right">
              Последний раз видели
            </Label>
            <Controller
              control={form.control}
              name="lastSeen"
              render={({ field }) => (
                <Input
                  id="lastSeen"
                  type="date"
                  className="col-span-3"
                  {...field}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Адрес
            </Label>
            <Controller
              control={form.control}
              name="address"
              render={({ field }) => {
                const onChange = (e) => {
                  field.onChange(e);
                  handleGeoAutocomplete();
                };

                return (
                  <Input
                    id="address"
                    type="text"
                    className="col-span-3"
                    onChange={onChange}
                  />
                );
              }}
            />
          </div>
          <DialogFooter>
            <Button disabled={!form.formState.isValid} type="submit">
              {form.formState.isSubmitting
                ? 'Сохранение...'
                : 'Создать объявление'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
