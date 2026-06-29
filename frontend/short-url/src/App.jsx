import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "https://localhost:8001";


  async function handleSumbit(event) {
    event.preventDefault();

    setError("");
    setShortUrl("");

    try {
      const response = await fetch(`${API_URL}/url`, {
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

      setShortUrl(`${API_URL}/${data.id}`);
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

            <button type="submit">Shorten URL</button>
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
