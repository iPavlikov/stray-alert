export const PLACES = [
  [37.34204440950727, 56.04785018702136],
  [38.500545705915606, 55.187530758015846],
  [37.06738620638225, 55.85367530400972],
  [38.32257419466352, 55.85830988519754],
  [37.023440893882274, 55.52475698166306],
  [37.707061659273904, 55.558618711600225],
  [37.113799940523904, 55.23034108804907],
].map(([longitude, latitude], i) => ({
  id: `${i}`,
  label: `объявление ${i + 1}`,
  longitude,
  latitude,
  text: `Это объявление о пропаже`,
}));
