import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { memo } from 'react';

export const Report = memo(({ report }) => {
  const type = report.type === 'lost' ? 'Потерялся' : 'Нашелся';

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={report.image} alt={`Фото ${report.petName}`} />
        <AvatarFallback>{report.petName[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">
          {type} питомец: {report.petName}
        </p>
        <p className="text-sm text-muted-foreground">{report.breed}</p>
        <p className="text-sm text-muted-foreground">
          Последний раз видели {report.lastSeen}
        </p>
      </div>
    </div>
  );
});

Report.displayName = 'Report';
