import { memo } from 'react';
import { Report } from './report';

export const RecentReports = memo(({ reports }) => {
  return (
    <div className="p-4 space-y-4">
      {reports.map((report) => (
        <Report key={report.id} report={report} />
      ))}
    </div>
  );
});

RecentReports.displayName = 'RecentReports';
