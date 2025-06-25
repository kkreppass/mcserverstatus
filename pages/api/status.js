import { status } from 'minecraft-server-util';

export default async function handler(req, res) {
  const serverIP = 'talkiyo.feathermc.gg';  // 실제 IP로 변경
  const serverPort = 25565;                     // 기본 포트, 필요하면 변경

  try {
    const result = await status(serverIP, serverPort, { timeout: 1000 });
    res.status(200).json({
      online: true,
      players: result.players.online,
      maxPlayers: result.players.max,
      version: result.version.name,
      description: result.motd.clean,
    });
  } catch (error) {
    res.status(200).json({ online: false, error: error.message });
  }
}
