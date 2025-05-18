import React from "react";

const quotes = [
  {
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde"
  },
  {
    quote: "Two things are infinite: the universe and human stupidity.",
    author: "Albert Einstein"
  },
  {
    quote: "So many books, so little time.",
    author: "Frank Zappa"
  },
  {
    quote: "A room without books is like a body without a soul.",
    author: "Marcus Tullius Cicero"
  }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      backgroundColor: "#ffffff"
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
  }

  componentDidMount() {
    this.getRandomQuote();
  }

  getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 90%)`;

    this.setState({
      quote: randomQuote.quote,
      author: randomQuote.author,
      backgroundColor: randomColor
    });
  }

  render() {
    const { quote, author, backgroundColor } = this.state;
    const tweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;

    return (
      <div
        style={{
          backgroundColor,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "background-color 0.5s ease"
        }}
      >
        <div
          id="quote-box"
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "8px",
            maxWidth: "600px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          <h2 id="text">"{quote}"</h2>
          <p id="author" style={{ textAlign: "right", fontStyle: "italic" }}>
            - {author}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px"
            }}
          >
            <a
              id="tweet-quote"
              href={tweetLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "#1DA1F2",
                color: "#fff",
                padding: "10px 15px",
                textDecoration: "none",
                borderRadius: "5px"
              }}
            >
              Tweet Quote
            </a>
            <button
              id="new-quote"
              onClick={this.getRandomQuote}
              style={{
                padding: "10px 15px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "5px"
              }}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
