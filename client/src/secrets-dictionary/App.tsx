import React, { useState, useEffect } from 'react';
import { Dictionary } from './types/dictionary';

const App: React.FC = () => {
  const [dictionary, setDictionary] = useState<Dictionary>({});
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');

  useEffect(() => {
    loadDictionary();
  }, []);

  const loadDictionary = async () => {
    const result = await chrome.storage.sync.get(['dictionary']);
    setDictionary(result.dictionary || {});
  };

  const handleAddWord = async () => {
    if (word.trim() && translation.trim()) {
      const newDictionary = {
        ...dictionary,
        [word.trim()]: translation.trim()
      };
      
      await chrome.storage.sync.set({ dictionary: newDictionary });
      setDictionary(newDictionary);
      setWord('');
      setTranslation('');
    }
  };

  const handleDeleteWord = async (wordToDelete: string) => {
    const newDictionary = { ...dictionary };
    delete newDictionary[wordToDelete];
    
    await chrome.storage.sync.set({ dictionary: newDictionary });
    setDictionary(newDictionary);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddWord();
    }
  };

  return (
    <div className="container">
      <h2>Secrets Dictionary</h2>
      <div className="input-group">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter word to hide"
        />
        <input
          type="text"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter replacement"
        />
        <button onClick={handleAddWord}>Add</button>
      </div>
      <div className="word-list">
        {Object.keys(dictionary).length === 0 ? (
          <div className="empty-state">
            <h3>No words found</h3>
            <p>Add your first word to get started</p>
          </div>
        ) : (
          Object.entries(dictionary).map(([word, translation]) => (
            <div key={word} className="word-item">
              <div className="word-pair">
                <span className="word-text">{word}</span>
                <span className="arrow">→</span>
                <span className="translation-text">{translation}</span>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDeleteWord(word)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App; 