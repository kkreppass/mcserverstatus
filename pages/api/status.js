import { status } from 'minecraft-server-util';

export default async function handler(req, res) {
  const serverIP = req.query.serverIP;
  if (!serverIP) {
    res.status(400).json({ error: 'serverIP 쿼리 파라미터가 필요합니다.' });
    return;
  }
  const serverPort = 25565;  // 필요하면 포트도 파라미터로 받도록 확장 가능

  try {
    const result = await status(serverIP, serverPort, { timeout: 1000 });
    res.status(200).json({
      online: true,
      players: result.players.online,
      maxPlayers: result.players.max,
      version: result.version.name,
      description: result.motd.clean,
      playerSample: result.players.sample || [],
    });
  } catch (error) {
    res.status(200).json({ online: false, error: error.message });
  }
}
