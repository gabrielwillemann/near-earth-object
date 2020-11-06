export function url(startDate, endDate) {
  const baseUrl = 'https://api.nasa.gov/neo/rest/v1/feed?';
  const apiKey = 'NvgU8KMFr08wspj5z1ewoV7NZIiP71AfwoqF3t62';
  const params = `start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
  return `${baseUrl}${params}`;
}
