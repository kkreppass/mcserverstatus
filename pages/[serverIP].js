import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ServerStatusPage() {
  const router = useRouter();
  const { serverIP } = router.query;  // URL에서 서버 주소를 받음
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!serverIP) return;

    async function fetchStatus() {
      const res = await fetch(`/api/status?serverIP=${encodeURIComponent(serverIP)}`);
      const data = await res.json();
      setStatus(data);
    }

    fetchStatus();
    const intervalId = setInterval(fetchStatus, 5000);
    return () => clearInterval(intervalId);
  }, [serverIP]);

  if (!status) return <div>Loading...</div>;

  return (
    <div>
      <h1>서버 상태: {serverIP}</h1>
      {status.online ? (
        <>
          <p>접속자: {status.players} / {status.maxPlayers}</p>
          <p>버전: {status.version}</p>
          <p>설명: {status.description}</p>
          <p>플레이어 목록:</p>
          <ul>
            {status.playerSample.map(p => (
              <li key={p.name}>{p.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>서버가 오프라인입니다.</p>
      )}
    </div>
  );
}
