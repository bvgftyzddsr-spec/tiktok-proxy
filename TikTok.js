const ED_TOKEN = 'dygbQfdmF0AnSpIa';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { type, url, username } = req.query;

  try {
    let apiUrl = '';

    if (type === 'video') {
      apiUrl = `https://ensembledata.com/apis/tt/post/info?url=${encodeURIComponent(url)}&token=${ED_TOKEN}`;
    } else if (type === 'user') {
      apiUrl = `https://ensembledata.com/apis/tt/user/info?username=${username}&token=${ED_TOKEN}`;
    } else {
      return res.status(400).json({ error: 'Invalid type' });
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}