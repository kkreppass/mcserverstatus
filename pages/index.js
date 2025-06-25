import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(() => setStatus({ online: false }));
  }, []);

  if (!status) return <p>Loading...</p>;

  return (
    <div>
      <h1>마인크래프트 서버 상태</h1>
      {status.online ? (
        <p>서버가 온라인입니다! 플레이어: {status.players}</p>
      ) : (
        <p>서버가 오프라인입니다.</p>
      )}
    </div>
  );
}
