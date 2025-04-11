import { useState, useEffect } from 'react';
import { Dictionary } from './types/dictionary';
import Secret from './components/Secret/Secret/Secret';
import SecretCreationForm from './components/SecretCreationForm/SecretCreationForm';

const App = () => {
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

  return (
    <div className="container">
      <h2>Secrets Dictionary</h2>
      <SecretCreationForm
        word={word}
        translation={translation}
        onWordChange={setWord}
        onTranslationChange={setTranslation}
        onAdd={handleAddWord}
      />
      <div className="word-list">
        {Object.keys(dictionary).length === 0 ? (
          <div className="empty-state">
            <h3>No words found</h3>
            <p>Add your first word to get started</p>
          </div>
        ) : (
          Object.entries(dictionary).map(([word, translation]) => (
            <Secret
              key={word}
              word={word}
              translation={translation}
              onDelete={handleDeleteWord}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App; 