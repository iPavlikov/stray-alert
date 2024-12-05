'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { MapProvider } from '@/providers/map-provider';
import { Map } from '@/modules/map';
import { RecentReports } from '@/modules/recent-reports';
import { NOTICES } from '@/data/notices';

const apiUrl =
  'https://api-maps.yandex.ru/v3/?apikey=23ff3afe-b331-4b48-8a5a-87cdb5308875&lang=ru_RU';

export function Layout() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Шапка */}
        <header className="bg-background border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Найди питомца</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Заявить о пропаже</Button>
              <Button>Заявить о находке</Button>
            </div>
          </div>
        </header>

        {/* Поиск и фильтры */}
        <div className="bg-background p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Найти объявления"
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Фильтры
            </Button>
          </div>
          {isFiltersOpen && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="pet-type">Питомец</Label>
                <Select>
                  <SelectTrigger id="pet-type">
                    <SelectValue placeholder="Выберите питомца" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Собака</SelectItem>
                    <SelectItem value="cat">Кошка</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Тип объявления</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lost">Пропал</SelectItem>
                    <SelectItem value="found">Нашелся</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date-range">Дата объявления</Label>
                <Select>
                  <SelectTrigger id="date-range">
                    <SelectValue placeholder="Выберите дату объявления" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Сегодня</SelectItem>
                    <SelectItem value="week">Последние 7 дней</SelectItem>
                    <SelectItem value="month">Последние 30 дней</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-grow">
          {/* Карта */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <MapProvider apiUrl={apiUrl}>
                <Map places={NOTICES} />
              </MapProvider>
            </div>
          </div>

          {/* Боковое меню */}
          <aside className="w-90">
            <ScrollArea className="h-full">
              <RecentReports reports={NOTICES} />
            </ScrollArea>
          </aside>
        </div>
      </main>
    </div>
  );
}
