import React, { useState, useEffect } from "react";

const quotes = [
  // Motivational
  {
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "Motivational"
  },
  {
    quote: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero",
    category: "Motivational"
  },
  {
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Motivational"
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: "Motivational"
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Motivational"
  },

  // Philosophy
  {
    quote: "Two things are infinite: the universe and human stupidity.",
    author: "Albert Einstein",
    category: "Philosophy"
  },
  {
    quote: "The unexamined life is not worth living.",
    author: "Socrates",
    category: "Philosophy"
  },
  {
    quote: "He who thinks great thoughts, often makes great errors.",
    author: "Martin Heidegger",
    category: "Philosophy"
  },
  {
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    category: "Philosophy"
  },
  {
    quote: "Happiness depends upon ourselves.",
    author: "Aristotle",
    category: "Philosophy"
  },

  // Humor
  {
    quote: "So many books, so little time.",
    author: "Frank Zappa",
    category: "Humor"
  },
  {
    quote: "I can resist everything except temptation.",
    author: "Oscar Wilde",
    category: "Humor"
  },
  {
    quote: "If you think nobody cares if you're alive, try missing a couple of payments.",
    author: "Steven Wright",
    category: "Humor"
  },
  {
    quote: "People say nothing is impossible, but I do nothing every day.",
    author: "A. A. Milne",
    category: "Humor"
  },
  {
    quote: "I'm not arguing, I'm just explaining why I'm right.",
    author: "Unknown",
    category: "Humor"
  }
];


const colors = [
  "#FF6F61",
  "#6B5B95",
  "#88B04B",
  "#F7CAC9",
  "#92A8D1",
  "#955251"
];

// Get unique categories from quotes
const categories = ["All", ...new Set(quotes.map(q => q.category))];

function App() {
  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState(colors[0]);
  const [fade, setFade] = useState(true);
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // When index changes, fade in
  useEffect(() => {
    setFade(true);
  }, [index]);

  // Get filtered quotes based on category
  const filteredQuotes = category === "All" ? quotes : quotes.filter(q => q.category === category);

  const getRandomIndex = () => Math.floor(Math.random() * filteredQuotes.length);

  const handleNewQuote = () => {
    setFade(false);
    setTimeout(() => {
      const newIndex = getRandomIndex();
      setIndex(newIndex);
      setBgColor(colors[Math.floor(Math.random() * colors.length)]);
      setFade(true);
    }, 500);
  };

  const currentQuote = filteredQuotes[index] || filteredQuotes[0];

  const tweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${currentQuote.quote}" - ${currentQuote.author}`)}`;

  const copyQuote = () => {
    const text = `"${currentQuote.quote}" - ${currentQuote.author}`;
    navigator.clipboard.writeText(text);
    alert("Quote copied to clipboard!");
  };

  const toggleFavorite = () => {
    const isFav = favorites.some(fav => fav.quote === currentQuote.quote && fav.author === currentQuote.author);
    if (isFav) {
      setFavorites(favorites.filter(fav => fav.quote !== currentQuote.quote));
    } else {
      setFavorites([...favorites, currentQuote]);
    }
  };

  const isFavorite = favorites.some(fav => fav.quote === currentQuote.quote);

  const removeFavorite = (quote) => {
    setFavorites(favorites.filter(fav => fav.quote !== quote));
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        transition: "background-color 1s ease"
      }}
    >
      <div
        id="quote-box"
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "600px",
          boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
          textAlign: "center",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.5s ease",
          width: "100%"
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>Random Quote Generator</h1>
        
        {/* Category selector */}
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setIndex(0); }}
          style={{ marginBottom: "20px", padding: "8px", fontSize: "16px" }}
          aria-label="Select quote category"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <h2 id="text" style={{ fontFamily: "'Georgia', serif", fontWeight: "600" }}>
          "{currentQuote.quote}"
        </h2>
        <p id="author" style={{ fontStyle: "italic", marginBottom: "20px", color: "#555" }}>
          - {currentQuote.author}
        </p>

        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "10px" }}>
          <a
            id="tweet-quote"
            href={tweetLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#1DA1F2",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "30px",
              textDecoration: "none",
              fontWeight: "600",
              minWidth: "80px",
              textAlign: "center"
            }}
            aria-label="Tweet this quote"
          >
            Tweet
          </a>

          <button
            id="copy-quote"
            onClick={copyQuote}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f39c12",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontWeight: "600",
              cursor: "pointer",
              minWidth: "80px"
            }}
            aria-label="Copy quote to clipboard"
          >
            Copy
          </button>

          <button
            id="fav-quote"
            onClick={toggleFavorite}
            style={{
              padding: "10px 20px",
              backgroundColor: isFavorite ? "#e74c3c" : "#95a5a6",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontWeight: "600",
              cursor: "pointer",
              minWidth: "80px"
            }}
            aria-label={isFavorite ? "Remove quote from favorites" : "Add quote to favorites"}
          >
            {isFavorite ? "❤️ Remove" : "♡ Favorite"}
          </button>

          <button
            id="new-quote"
            onClick={handleNewQuote}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontWeight: "600",
              cursor: "pointer",
              minWidth: "80px"
            }}
            aria-label="Get new quote"
          >
            New Quote
          </button>
        </div>
      </div>

      {/* Favorites list */}
      {favorites.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "12px",
            maxWidth: "600px",
            width: "100%",
            boxShadow: "0 8px 15px rgba(0,0,0,0.1)"
          }}
          aria-label="Favorite quotes list"
        >
          <h2>Favorites</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {favorites.map((fav, i) => (
              <li
                key={i}
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <span style={{ fontStyle: "italic" }}>"{fav.quote}" - {fav.author}</span>
                <button
                  onClick={() => removeFavorite(fav.quote)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                  aria-label="Remove from favorites"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
