import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => setStatus(data));
  }, []);

  if (!status) return <p>불러오는 중...</p>;

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>서버 상태</h1>
      <p>온라인 여부: {status.online ? '✅ 온라인' : '❌ 오프라인'}</p>
      {status.online && (
        <>
          <p>
            접속자 수: {status.players} / {status.maxPlayers}
          </p>
          <p>버전: {status.version}</p>
          <p>서버 설명: {status.description}</p>

          <h2>접속 중인 플레이어 목록</h2>
          {status.playerSample.length > 0 ? (
            <ul>
              {status.playerSample.map((player) => (
                <li key={player.id || player.name}>{player.name}</li>
              ))}
            </ul>
          ) : (
            <p>현재 접속 중인 플레이어가 없습니다.</p>
          )}
        </>
      )}
    </div>
  );
}
