import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  async function handleSumbit(event) {
    event.preventDefault();

    setError("");
    setShortUrl("");

    try {
      const response = await fetch("http://localhost:8001/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setShortUrl(`http://localhost:8001/${data.id}`);
      setUrl("");
    } catch {
      setError("Could not connect to server");
    }

  }

  return (
    <>
      <main className='page'>
        <section className='card'> 
          <h1>URL-Shortner</h1>
          <p>Paste a long link and get a short one.</p>

          <form onSubmit={handleSumbit}>
            <input 
              type="url" 
              placeholder='https://example.com/very-long-url'
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              required
            />

            <button type="sumbit">Shorten URL</button>
          </form>

          {shortUrl && (
            <div className='result'>
              <span>Your Short URL: </span>
              <a href={shortUrl} target='_blank' rel='noreferrer'>
                {shortUrl}
              </a>
            </div>
          )}

          {error && <p className='error'>{error}</p>}
        </section>
      </main>
    </>
  )
}

export default App
