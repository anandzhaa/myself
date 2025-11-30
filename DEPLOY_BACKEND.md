# Deploy Backend and Make Contact Form Public

This file explains how to deploy the backend (`server/index.js`) so anyone can send messages to your contact form from anywhere, and how to wire up the frontend (`Vite`/Vercel) to call the public API.

1) Overview
- The backend is in `server/index.js` and expects `MONGODB_URI` for MongoDB and `FRONTEND_URL` (optional) for CORS.
- We've added an environment toggle `ALLOW_ALL_ORIGINS`. By default the server allows requests from anywhere unless you explicitly set `ALLOW_ALL_ORIGINS=false`.

2) Recommended: Deploy to Render (free tier available)

- Sign in to Render (https://render.com) and connect your GitHub repo `anandzhaa/myself`.
- Create a new **Web Service** (name it `myself-backend`), choose branch `main` and enable YAML deploys if prompted — `render.yaml` in the repo will be used.
- In the service settings -> Environment -> add these environment variables:
  - `MONGODB_URI` = your MongoDB Atlas connection string
  - `FRONTEND_URL` = your frontend URL (e.g. `https://myself-taupe-six.vercel.app`) — optional when using open CORS
  - `ALLOW_ALL_ORIGINS` = `true` (optional; server allows all origins by default unless set to `false`)

- Deploy the service and note the public URL Render gives you (for example: `https://myself-backend.onrender.com`).

3) Configure Vercel (frontend)

- Go to your Vercel project for the frontend and add an Environment Variable:
  - `VITE_API_URL` = `https://your-backend.onrender.com` (use the Render URL)
- Add the var to both Preview and Production if you want all builds to use the public backend.
- Trigger a redeploy (push a commit or click "Redeploy") so the frontend is built with the correct API base.

4) Quick test (once backend is live)

Use `curl` from any machine or phone shell app, or just open the frontend and submit the contact form.

Example curl (PowerShell):
```
curl -X POST "https://your-backend.onrender.com/api/contact" `
  -H "Content-Type: application/json" `
  -d '{"name":"Test","email":"test@example.com","message":"hello"}'
```

You can also GET the contacts (no auth):
```
curl "https://your-backend.onrender.com/api/contacts"
```

5) Security notes
- Allowing all origins (`ALLOW_ALL_ORIGINS` not set to `false`) means any website can POST to your API. For a simple contact form this is usually acceptable but be aware it makes your endpoint callable from anywhere.
- If you want tighter security, set `ALLOW_ALL_ORIGINS=false` and set `FRONTEND_URL` to your Vercel URL. The server will then only accept requests from the allowed origins.
- Protect your `MONGODB_URI` credentials; never commit them to the repo.

6) Rollback/change CORS behavior
- To disable wide-open CORS, set `ALLOW_ALL_ORIGINS=false` in your Render environment variables and redeploy. Then set `FRONTEND_URL` to your exact frontend domain.

7) Troubleshooting
- If messages do not appear:
  - Check Render service logs for errors.
  - Confirm `MONGODB_URI` allows the Render service IP range (Atlas IP access list may need 0.0.0.0/0 for testing).
  - Confirm `VITE_API_URL` is set correctly in Vercel and the frontend was redeployed.

If you want, I can prepare a Render dashboard checklist or update `render.yaml` further — tell me which provider/account you'll use and I can tailor the steps.
