import { KeyboardEvent } from 'react';

interface SecretCreationFormProps {
  word: string;
  translation: string;
  onWordChange: (word: string) => void;
  onTranslationChange: (translation: string) => void;
  onAdd: () => void;
}

function SecretCreationForm({ 
  word, 
  translation, 
  onWordChange, 
  onTranslationChange, 
  onAdd 
}: SecretCreationFormProps) {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAdd();
    }
  };

  return (
    <div className="input-group">
      <input
        type="text"
        value={word}
        onChange={(e) => onWordChange(e.target.value)}
        onKeyUp={handleKeyPress}
        placeholder="Enter word to hide"
      />
      <input
        type="text"
        value={translation}
        onChange={(e) => onTranslationChange(e.target.value)}
        onKeyUp={handleKeyPress}
        placeholder="Enter replacement"
      />
      <button onClick={onAdd}>Add</button>
    </div>
  );
}

export default SecretCreationForm; 