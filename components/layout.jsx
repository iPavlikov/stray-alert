'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  MapPin,
  Search,
  Bell,
  MessageCircle,
  Settings,
  Menu,
  ChevronUp,
  ChevronDown,
  Filter,
} from 'lucide-react';
import { MapProvider } from '@/providers/map-provider';
import { Map } from '@/modules/map';
import { RecentReports } from '@/modules/recent-reports';
import { PLACES } from '@/data/places';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const apiUrl =
    'https://api-maps.yandex.ru/v3/?apikey=23ff3afe-b331-4b48-8a5a-87cdb5308875&lang=ru_RU';

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } flex flex-col bg-card text-card-foreground shadow-lg transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1
            className={`text-2xl font-bold ${
              isSidebarOpen ? 'block' : 'hidden'
            }`}
          >
            Найди питомца
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Переключить боковое меню</span>
          </Button>
        </div>
        <nav className="flex-1">
          <Button variant="ghost" className="w-full justify-start p-4">
            <MapPin className="h-5 w-5 mr-2" />
            {isSidebarOpen && <span>Карта</span>}
          </Button>
          {/* <Button variant="ghost" className="w-full justify-start p-4">
            <Bell className="h-5 w-5 mr-2" />
            {isSidebarOpen && <span>Уведомления</span>}
          </Button> */}
        </nav>
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {isSidebarOpen && (
              <div>
                <p className="text-sm font-medium">Маша Павликова</p>
                <p className="text-xs text-muted-foreground">
                  john@example.com
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-background border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Карта</h2>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Заявить о пропаже</Button>
              <Button>Заявить о находке</Button>
            </div>
          </div>
        </header>

        {/* Search and Filters */}
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

        {/* Map area */}
        <div className="flex-1 relative">
          {/* Replace this div with an actual map component */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <MapProvider apiUrl={apiUrl}>
              <Map places={PLACES} />
            </MapProvider>
          </div>
        </div>

        {/* Hideable bottom drawer */}
        <div
          className={`bg-background border-t transition-all duration-300 ease-in-out ${
            isDrawerOpen ? 'h-64' : 'h-12'
          }`}
        >
          <Button
            variant="ghost"
            className="w-full h-12 flex items-center justify-center"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <span className="mr-2">Недавние объявления</span>
            {isDrawerOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
          {isDrawerOpen && (
            <ScrollArea className="h-52">
              <RecentReports />
            </ScrollArea>
          )}
        </div>
      </main>
    </div>
  );
}
