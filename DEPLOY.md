# Deploy this site so others can see it

Easiest option: **Vercel** (free, one command or GitHub connect).

## Option A: Deploy with Vercel (recommended)

### 1. Push your project to GitHub

If you haven’t already:

```bash
cd /path/to/pechakucha
git init
git add .
git commit -m "Initial commit"
```

Create a new repo on [github.com](https://github.com/new), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in (e.g. with GitHub).
2. Click **“Add New…” → “Project”**.
3. **Import** your GitHub repo.
4. Leave the settings as-is (Vercel detects Next.js). Click **Deploy**.
5. In about a minute you’ll get a URL like `https://your-project.vercel.app`. Share that link so others can see the site.

---

## Option B: Deploy from your computer (no GitHub)

1. Install the Vercel CLI:  
   `npm i -g vercel`
2. In the project folder run:  
   `vercel`
3. Log in when asked and follow the prompts. You’ll get a live URL at the end.

### Updating the live site when you make changes (no GitHub)

Whenever you change the code and want the public URL to show the updates:

1. Save your changes in the project folder.
2. In the terminal, from the project folder, run:
   ```bash
   vercel --prod
   ```
   (Or the short form: `vercel -p`.)
3. Wait for the build to finish. Your **same public URL** will then serve the new version.

You don’t need to push to GitHub or do anything else—just run `vercel --prod` after you’re happy with your changes and want to go live.

---

## After deploying

- **Music:** The “Play music” button only works if the file `public/music/coffee-shop.mp3` is in the repo. Add that file and push, or the button will do nothing (no error).
- **Updates:** With GitHub, push to your repo and Vercel redeploys automatically. Without GitHub, run `vercel --prod` from the project folder whenever you want to update the live site.
