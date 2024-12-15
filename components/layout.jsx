'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapProvider } from '@/providers/map-provider';
import { Filters } from '@/modules/filters';
import { Map } from '@/modules/map';
import { RecentReports } from '@/modules/recent-reports';
import { ReportDialog } from '@/modules/report';
import { useReports } from '@/modules/report/api';
import { format, startOfDay, subMonths, subWeeks } from 'date-fns';
import { useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

const apiUrl =
  'https://api-maps.yandex.ru/v3/?apikey=23ff3afe-b331-4b48-8a5a-87cdb5308875&lang=ru_RU';

export function Layout() {
  const [search, setSearch] = useState('');
  const [petType, setPetType] = useState('');
  const [noticeType, setNoticeType] = useState('');
  const [lastSeen, setLastSeen] = useState('');

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setSearch(value);
  };

  const [debouncedSearch] = useDebounce(search, 500);
  const lastSeenDateString = useMemo(() => {
    const now = new Date();
    let lastSeenDate;

    switch (lastSeen) {
      case 'today': {
        lastSeenDate = startOfDay(now);
        break;
      }
      case 'week': {
        lastSeenDate = subWeeks(now, 1);
        break;
      }
      case 'month': {
        lastSeenDate = subMonths(now, 1);
        break;
      }
      default: {
        lastSeenDate = '';
        break;
      }
    }

    return lastSeenDate && format(lastSeenDate, 'yyyy-MM-dd');
  }, [lastSeen]);

  const { data, isLoading } = useReports({
    'pet-type': petType,
    'notice-type': noticeType,
    search: debouncedSearch,
    'last-seen': lastSeenDateString,
  });

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Шапка */}
        <header className="bg-background border-b p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Найди питомца</h2>
            <div className="flex items-center space-x-4">
              <ReportDialog
                type="lost"
                title="Заявить о пропаже"
                description="Заполните информацию о потерявшемся питомце."
              >
                <Button variant="outline" type="button">
                  Заявить о пропаже
                </Button>
              </ReportDialog>

              <ReportDialog
                type="found"
                title="Заявить о находке"
                description="Заполните информацию о найденном питомце."
              >
                <Button>Заявить о находке</Button>
              </ReportDialog>
            </div>
          </div>
        </header>

        {/* Поиск и фильтры */}
        <Filters
          search={search}
          petType={petType}
          noticeType={noticeType}
          lastSeen={lastSeen}
          onSearchChange={handleSearchChange}
          onPetTypeChange={setPetType}
          onNoticeTypeChange={setNoticeType}
          onLastSeenChange={setLastSeen}
        />

        <div className="flex flex-grow min-h-0">
          {/* Карта */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <MapProvider apiUrl={apiUrl}>
                <Map isLoading={isLoading} places={data} />
              </MapProvider>
            </div>
          </div>

          {/* Боковое меню */}
          <aside className="w-90">
            <ScrollArea className="h-full">
              <RecentReports isLoading={isLoading} reports={data} />
            </ScrollArea>
          </aside>
        </div>
      </main>
    </div>
  );
}
