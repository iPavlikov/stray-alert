export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;

  // Retrieve specific query parameters
  const petType = searchParams.get('pet-type');
  const noticeType = searchParams.get('notice-type');
  const search = searchParams.get('search');
  // const lastSeen = searchParams.get('last-seen');

  let { default: notices } = await import('@/data/notices.json');

  if (petType) {
    notices = notices.filter((n) => n.petType === petType);
  }

  if (noticeType) {
    notices = notices.filter((n) => n.type === noticeType);
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
