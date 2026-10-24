# Solar Performance Report Generator

Client launcher for the Triforce and Puresky report generators.

```
index.html        page markup
style.css         all styles
script.js         launcher behaviour
triforce.html     Triforce report app
puresky.html      Puresky report app
favicon.png, background.jpg
```

## Publish on GitHub Pages

1. Push these files to a repository (keep `index.html` at the root).
2. In the repository go to **Settings -> Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. The site appears at `https://<your-username>.github.io/<repo-name>/`.

To run locally, serve the folder (for example `python3 -m http.server`) and open `http://localhost:8000`.

## Adding another client

Put its page in the same folder, then add it to `APPS` and `NAMES` in `script.js`, and add a card in `index.html`.
