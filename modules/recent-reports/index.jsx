import { memo } from 'react';
import { Report } from './report';

export const RecentReports = memo(({ isLoading, reports }) => {
  if (isLoading)
    return <div className="p-4 text-center">Загрузка объявлений...</div>;

  if (!reports?.length)
    return <div className="p-4 text-center">Объявлений не найдено</div>;

  return (
    <div className="p-4 space-y-4">
      {reports.map((report) => (
        <Report key={report.id} report={report} />
      ))}
    </div>
  );
});

RecentReports.displayName = 'RecentReports';
