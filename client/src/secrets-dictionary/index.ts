import { Dictionary, StorageResult } from './types/dictionary';

function handleEnter(e: KeyboardEvent, addButton: HTMLButtonElement): void {
    if (e.key === 'Enter') {
        addButton.click();
    }
}

async function handleAddWord(
    wordList: HTMLDivElement,
    wordInput: HTMLInputElement,
    translationInput: HTMLInputElement,
    currentDictionary: Dictionary
): Promise<void> {
    const word: string = wordInput.value.trim();
    const translation: string = translationInput.value.trim();
    
    if (word && translation) {
        // Add or update the translation
        currentDictionary[word] = translation;
        
        await chrome.storage.sync.set({ dictionary: currentDictionary });
        await updateWordList(currentDictionary, wordList);
        
        // Clear inputs
        wordInput.value = '';
        translationInput.value = '';
        wordInput.focus();
    }
}

// Dictionary management
async function loadDictionary(wordList: HTMLDivElement): Promise<Dictionary> {
    const result: StorageResult = await chrome.storage.sync.get(['dictionary']);
    const dictionary = result.dictionary || {};
    updateWordList(dictionary, wordList);
    return dictionary;
}

// UI updates
function createEmptyState(): HTMLDivElement {
    const emptyState: HTMLDivElement = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
        <h3>No words found</h3>
        <p>Add your first word to get started</p>
    `;
    return emptyState;
}

function createWordElement(
    word: string,
    translation: string,
    currentDictionary: Dictionary,
    wordList: HTMLDivElement
): HTMLDivElement {
    const wordElement: HTMLDivElement = document.createElement('div');
    wordElement.className = 'word-item';
    
    const wordPair: HTMLDivElement = document.createElement('div');
    wordPair.className = 'word-pair';
    
    const wordText: HTMLSpanElement = document.createElement('span');
    wordText.textContent = word;
    wordText.className = 'word-text';
    
    const arrow: HTMLSpanElement = document.createElement('span');
    arrow.textContent = '→';
    arrow.className = 'arrow';
    
    const translationText: HTMLSpanElement = document.createElement('span');
    translationText.textContent = translation;
    translationText.className = 'translation-text';
    
    const deleteButton: HTMLButtonElement = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = async (): Promise<void> => {
        // Remove the word from the dictionary
        delete currentDictionary[word];
        
        // Update storage and UI
        await chrome.storage.sync.set({ dictionary: currentDictionary });
        updateWordList(currentDictionary, wordList);
    };
    
    wordPair.appendChild(wordText);
    wordPair.appendChild(arrow);
    wordPair.appendChild(translationText);
    wordElement.appendChild(wordPair);
    wordElement.appendChild(deleteButton);
    
    return wordElement;
}

function updateWordList(currentDictionary: Dictionary, wordList: HTMLDivElement): void {
    wordList.innerHTML = '';
    
    if (Object.keys(currentDictionary).length === 0) {
        wordList.appendChild(createEmptyState());
        return;
    }

    Object.entries(currentDictionary).forEach(([word, translation]: [string, string]): void => {
        const wordElement = createWordElement(word, translation, currentDictionary, wordList);
        wordList.appendChild(wordElement);
    });
}

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
    const wordInput: HTMLInputElement = document.getElementById('wordInput') as HTMLInputElement;
    const translationInput: HTMLInputElement = document.getElementById('translationInput') as HTMLInputElement;
    const addButton: HTMLButtonElement = document.getElementById('addWord') as HTMLButtonElement;
    const wordList: HTMLDivElement = document.getElementById('wordList') as HTMLDivElement;

    let currentDictionary: Dictionary = await loadDictionary(wordList);

    addButton.addEventListener('click', () => handleAddWord(wordList, wordInput, translationInput, currentDictionary));
    wordInput.addEventListener('keypress', (e) => handleEnter(e, addButton));
    translationInput.addEventListener('keypress', (e) => handleEnter(e, addButton));
});