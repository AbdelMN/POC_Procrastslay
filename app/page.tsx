'use client';

export default function Home() {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const connectToNotion = () => {
    const notionAuthUrl = `https://api.notion.com/v1/oauth/authorize?client_id=1a742c0b-3d8a-4551-ac89-ea55b89231be&redirect_uri=http://localhost:3000/api/callback&response_type=code`;
    window.location.href = notionAuthUrl;
  };

  return (
    <div>
      <h1>Connect to Notion</h1>
      <button onClick={connectToNotion}>Connect to Notion</button>
    </div>
  );
}
