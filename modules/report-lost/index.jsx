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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const ReportLost = () => {
  const handleGeoAutocomplete = async () => {
    const data = await fetch(
      'https://suggest-maps.yandex.ru/v1/suggest?apikey=4fa97013-9743-4d9a-9edc-97e7253a602f&text=бурдж'
    )
      .then((res) => {
        if (res.ok) return res.json();
      })
      .catch((e) => {
        console.error(e);
      });

    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Заявить о пропаже</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle>Заявить о пропаже</DialogTitle>
          <DialogDescription>
            Заполните информацию о потерявшемся питомце.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="petName" className="text-right">
              Имя питомца
            </Label>
            <Input id="petName" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="petType" className="text-right">
              Тип
            </Label>
            <Select>
              <SelectTrigger id="petType" className="col-span-3">
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Собака</SelectItem>
                <SelectItem value="cat">Кошка</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="breed" className="text-right">
              Порода
            </Label>
            <Input id="breed" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastSeen" className="text-right">
              Последний раз видели
            </Label>
            <Input id="lastSeen" type="date" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastSeen" className="text-right">
              Адрес
            </Label>
            <Input
              id="lastSeen"
              type="text"
              className="col-span-3"
              onChange={handleGeoAutocomplete}
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Создать объявление</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
