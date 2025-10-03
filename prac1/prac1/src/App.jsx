import React, { useState } from 'react';
import './App.css';

const languages = ['JavaScript', 'Python', 'Java', 'C++'];

function App() {
  const [votes, setVotes] = useState({
    JavaScript: 0,
    Python: 0,
    Java: 0,
    'C++': 0
  });
  const [userClicks, setUserClicks] = useState(0);

  // Handle user vote
  const vote = (language) => {
    setVotes(prev => ({
      ...prev,
      [language]: prev[language] + 1
    }));
    setUserClicks(prev => prev + 1);
  };

  return (
    <div className="poll-container">
      <div className="poll-title">Which is your favorite programming language?</div>
      <div className="poll-options">
        {languages.map(lang => (
          <button
            key={lang}
            className="poll-btn"
            onClick={() => vote(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
      <div className="results">
        {languages.map(lang => (
          <div key={lang} className="result-row">
            <span className="language">{lang}</span>
            <span className="votes">{votes[lang]}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1.5em', textAlign: 'center', color: '#007bff', fontWeight: 'bold' }}>
        Your total votes: {userClicks}
      </div>
    </div>
  );
}

export default App;