import { status } from 'minecraft-server-util';

export default async function handler(req, res) {
  const serverIP = 'your.minecraft.server.ip';  // 서버 주소로 바꿔줘
  const serverPort = 25565;                     // 필요하면 포트도

  try {
    const result = await status(serverIP, serverPort, { timeout: 1000 });
    res.status(200).json({
      online: true,
      players: result.players.online,
      maxPlayers: result.players.max,
      version: result.version.name,
      description: result.motd.clean,
      playerSample: result.players.sample || [],  // 플레이어 이름 목록 (배열)
    });
  } catch (error) {
    res.status(200).json({ online: false, error: error.message });
  }
}
