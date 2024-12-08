import useSWR from 'swr';

export const useReports = (params) =>
  useSWR(['/api/reports', params], async (key) => {
    const searchParams =
      Object.values(params).filter(Boolean).length > 0
        ? `?${new URLSearchParams(params).toString()}`
        : '';
    const [route] = key;

    const data = await fetch(`${route}${searchParams}`).then((res) =>
      res.json()
    );

    return data.map(({ location: [longitude, latitude], ...notice }, i) => ({
      id: `${i}`,
      ...notice,
      longitude,
      latitude,
    }));
  });
