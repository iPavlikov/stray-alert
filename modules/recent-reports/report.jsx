import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DATE_FORMAT_STRING } from '@/lib/constants';
import { computed } from '@/lib/utils';
import { formatDistanceToNow, isToday, isYesterday, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { memo } from 'react';

export const Report = memo(({ report }) => {
  const type = report.type === 'lost' ? 'Потерялся' : 'Нашелся';
  const parsedLastSeenDate = parse(
    report.lastSeen,
    DATE_FORMAT_STRING,
    new Date()
  );
  const lastSeenText = computed(() => {
    if (isToday(parsedLastSeenDate)) return 'сегодня';
    if (isYesterday(parsedLastSeenDate)) return 'вчера';

    return formatDistanceToNow(parsedLastSeenDate, {
      addSuffix: true,
      locale: ru,
    });
  });

  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-12 w-12">
        <AvatarImage
          className="object-cover"
          src={report.photo}
          alt={`Фото ${report.petName}`}
        />
        <AvatarFallback>{report.petName[0]}</AvatarFallback>
      </Avatar>

      <div>
        <p className="font-medium">
          {type} питомец: {report.petName}
        </p>
        <p className="text-sm text-muted-foreground">{report.breed}</p>
        <p className="text-sm text-muted-foreground">
          Последний раз видели {lastSeenText}
        </p>
        <p className="mt-2 text-sm whitespace-pre">{report.description}</p>
      </div>
    </div>
  );
});

Report.displayName = 'Report';
