import { DATE_FORMAT_STRING } from '@/lib/constants';
import { readFile } from '@/lib/server-utils';
import { interval, isWithinInterval, parse } from 'date-fns';

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;

  // Retrieve specific query parameters
  const petType = searchParams.get('pet-type');
  const noticeType = searchParams.get('notice-type');
  const search = searchParams.get('search');
  const lastSeen = searchParams.get('last-seen');

  const fileContent = await readFile('notices.json');
  let notices = JSON.parse(fileContent);

  if (petType) {
    notices = notices.filter((n) => n.petType === petType);
  }

  if (noticeType) {
    notices = notices.filter((n) => n.type === noticeType);
  }

  if (lastSeen) {
    const now = new Date();
    const lastSeenDate = parse(lastSeen, DATE_FORMAT_STRING, now);

    notices = notices.filter((n) => {
      const noticeDate = parse(n.lastSeen, DATE_FORMAT_STRING, now);
      return isWithinInterval(noticeDate, interval(lastSeenDate, now));
    });
  }

  if (search) {
    const searchLowercase = search.toLowerCase();

    notices = notices.filter(
      (n) =>
        n.petName.toLowerCase().includes(searchLowercase) ||
        n.breed.toLowerCase().includes(searchLowercase)
    );
  }

  return Response.json(notices, { status: 200 });
}
