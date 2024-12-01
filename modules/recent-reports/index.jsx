import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import { RECENT_REPORTS } from './constants';

export const RecentReports = () => {
  return (
    <div className="p-4 space-y-4">
      {RECENT_REPORTS.map((report) => {
        const type = report.type === 'lost' ? 'Потерялся' : 'Нашелся';

        return (
          <div key={report.id} className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={report.image} alt={`Фото ${report.petName}`} />
              <AvatarFallback>{report.petName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {type}: {report.petName}
              </p>
              <p className="text-sm text-muted-foreground">
                {report.breed}, последний раз видели {report.lastSeen}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
