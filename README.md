<h1 align="center">Live Year</h1>

<p align="center">
  A tiny Cloudflare Worker that returns the current year, and a footer template that shows it on your site. Your copyright year stays right without you ever touching it again.
</p>

> [!IMPORTANT]
> The Worker only says what year it is. It stores nothing, needs no database, and works on Cloudflare's free plan.

<br>

## Features

- **Live year**
  - Worked out on every request, so it changes over at midnight on New Year's
- **Time zones**
  - Optional `?tz=` for any IANA zone, with UTC as the default
- **Works from any site**
  - CORS is on, so any page can fetch it
- **Never shows a blank**
  - If the Worker can't be reached, the footer uses the visitor's own clock instead
- **Copy-paste footer**
  - `template.html` is ready to drop into any page

<br>

## What's in the repo

| File | What it does |
| --- | --- |
| `worker.js` | The Cloudflare Worker. Returns the year as plain text, like `2026`. |
| `template.html` | A footer that fetches the year and shows **Copyright © 2026**. |

<br>

## Create the Worker

You'll need a free Cloudflare account. There are two ways to set it up.

### In the Cloudflare dashboard

1. Log in to the Cloudflare dashboard and open **Workers & Pages**.
2. Choose **Create**, then create a Worker from the **Hello World** starter.
3. Give it a name, such as `live-year`, and select **Deploy**.
4. Select **Edit code**, delete everything in the editor, and paste in the contents of `worker.js`.
5. Select **Deploy** again.

Your Worker is now live at an address like:

```
https://live-year.your-subdomain.workers.dev
```

Open it in a browser. You should see just the year.

### With Wrangler

If you'd rather use the command line, you'll need Node.js installed. From the folder with `worker.js`:

```sh
npx wrangler login
npx wrangler deploy worker.js --name live-year --compatibility-date 2026-11-01
```

Wrangler prints your Worker's address when it finishes.

> [!TIP]
> To use your own domain instead of `workers.dev`, open the Worker in the dashboard, go to **Settings > Domains & Routes**, and add a custom domain. The domain has to be on your Cloudflare account.

<br>

## Add it to your site

1. Open `template.html` and copy everything in it.
2. Paste it into your page where the footer should go, usually just before `</body>`.
3. Replace `https://your-worker.workers.dev/` with your Worker's address.

That's it. The footer looks like this:

```
Copyright © 2026
```

### Using it in more than one place

Any element with `data-live-year` gets the year, so you can put it anywhere on the page:

```html
<p>Built in 2024, still going in <span data-live-year></span>.</p>
```

### Changing the wording

Edit the `<p>` in the footer. Keep the `<span data-live-year></span>` wherever the year should appear:

```html
<p>&copy; <span data-live-year></span> Your Name. All rights reserved.</p>
```

### Styling

The footer has the class `site-footer`, so you can style it from your own CSS:

```css
.site-footer {
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
}
```

<br>

## Configuration

Add these to the Worker's address as query parameters:

| Parameter | Default | What it does |
| --- | --- | --- |
| `tz` | `UTC` | The time zone to use, like `Europe/London` or `America/New_York`. An unknown zone falls back to UTC. |

For example:

```
https://live-year.your-subdomain.workers.dev/?tz=Europe/London
```

This only matters in the few hours around New Year, when it's already the new year in some places and not in others.

<br>

## Limits

- **Requests:** each page view makes one request to the Worker. The free plan has a daily request limit, which is plenty for most personal sites. If you go over it, the footer falls back to the visitor's clock.
- **Fallback:** if the Worker is down or blocked, the year comes from the visitor's device. That's almost always right, but it trusts their clock.
- **JavaScript:** the year is filled in by a script, so visitors with JavaScript turned off see `Copyright ©` with no year.

<br>

## Disclaimer

This project is not associated with Cloudflare, Inc. Cloudflare's dashboard and Wrangler may change over time, so if a step above doesn't match what you see, check Cloudflare's Workers documentation.
