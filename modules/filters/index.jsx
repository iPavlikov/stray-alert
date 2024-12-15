import { Button } from '@/components/ui/button';
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
import { useState } from 'react';

export const Filters = ({
  search,
  petType,
  noticeType,
  lastSeen,
  onSearchChange,
  onPetTypeChange,
  onNoticeTypeChange,
  onLastSeenChange,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="bg-background p-4 border-b">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Найти объявления"
              className="pl-10"
              value={search}
              onChange={onSearchChange}
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
            <Label htmlFor="filter-pet-type">Питомец</Label>
            <Select onValueChange={onPetTypeChange} defaultValue={petType}>
              <SelectTrigger id="filter-pet-type">
                <SelectValue placeholder="Выберите питомца" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Собака</SelectItem>
                <SelectItem value="cat">Кошка</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filter-status">Тип объявления</Label>
            <Select
              value={noticeType}
              onValueChange={onNoticeTypeChange}
              defaultValue={noticeType}
            >
              <SelectTrigger id="filter-status">
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lost">Пропал</SelectItem>
                <SelectItem value="found">Нашелся</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filter-last-seen">Дата объявления</Label>
            <Select
              value={lastSeen}
              onValueChange={onLastSeenChange}
              defaultValue={lastSeen}
            >
              <SelectTrigger id="filter-last-seen">
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
  );
};
