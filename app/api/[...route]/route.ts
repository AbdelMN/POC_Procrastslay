import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import {setCookie} from 'hono/cookie'
export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/callback', async (c) => {
  const code = c.req.query("code");
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  

// encode in base 64
const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

const response = await fetch("https://api.notion.com/v1/oauth/token", {
	method: "POST",
	headers: {
	Accept: "application/json",
	"Content-Type": "application/json",
	Authorization: `Basic ${encoded}`,
},
	body: JSON.stringify({
		grant_type: "authorization_code",
		code: code,
    redirect_uri : "http://localhost:3000/api/callback"
		
	}),
});
  const tokenData = await response.json()
  console.log(tokenData);
  const token = tokenData.access_token;
  console.log(token);
  setCookie(c, 'access_token', token, {path : '/'});
  return c.redirect('/databases')
})



export const GET = handle(app)
