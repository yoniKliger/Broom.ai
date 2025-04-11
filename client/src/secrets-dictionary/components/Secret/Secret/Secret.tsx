interface SecretProps {
  word: string;
  translation: string;
  onDelete: (word: string) => void;
}

function Secret({ word, translation, onDelete }: SecretProps) {
  return (
    <div className="word-item">
      <div className="word-pair">
        <span className="word-text">{word}</span>
        <span className="arrow">→</span>
        <span className="translation-text">{translation}</span>
      </div>
      <button
        className="delete-btn"
        onClick={() => onDelete(word)}
      >
        Delete
      </button>
    </div>
  );
}

export default Secret; 