interface Dictionary {
    [key: string]: string;
}

interface StorageResult {
    dictionary?: Dictionary;
}

document.addEventListener('DOMContentLoaded', async (): Promise<void> => {
    const wordInput: HTMLInputElement = document.getElementById('wordInput') as HTMLInputElement;
    const translationInput: HTMLInputElement = document.getElementById('translationInput') as HTMLInputElement;
    const addButton: HTMLButtonElement = document.getElementById('addWord') as HTMLButtonElement;
    const wordList: HTMLDivElement = document.getElementById('wordList') as HTMLDivElement;

    // Load initial dictionary
    await updateWordList();

    // Add word handler
    addButton.addEventListener('click', async (): Promise<void> => {
        const word: string = wordInput.value.trim();
        const translation: string = translationInput.value.trim();
        
        if (word && translation) {
            await chrome.storage.sync.get(['dictionary'], async (result: StorageResult): Promise<void> => {
                const dictionary: Dictionary = result.dictionary || {};
                
                // Add or update the translation
                dictionary[word] = translation;
                
                await chrome.storage.sync.set({ dictionary });
                await updateWordList();
                
                // Clear inputs
                wordInput.value = '';
                translationInput.value = '';
            });
        }
    });

    // Enter key handler
    const handleEnter = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
            addButton.click();
        }
    };
    wordInput.addEventListener('keypress', handleEnter);
    translationInput.addEventListener('keypress', handleEnter);

    async function updateWordList(): Promise<void> {
        const result: StorageResult = await chrome.storage.sync.get(['dictionary']);
        const dictionary: Dictionary = result.dictionary || {};
        
        wordList.innerHTML = '';
        
        Object.entries(dictionary).forEach(([word, translation]: [string, string]): void => {
            const wordElement: HTMLDivElement = document.createElement('div');
            wordElement.className = 'word-item';
            
            const wordPair: HTMLDivElement = document.createElement('div');
            wordPair.className = 'word-pair';
            
            const wordText: HTMLSpanElement = document.createElement('span');
            wordText.textContent = word;
            
            const arrow: HTMLSpanElement = document.createElement('span');
            arrow.textContent = 'translated to:';
            arrow.className = 'arrow';
            
            const translationText: HTMLSpanElement = document.createElement('span');
            translationText.textContent = translation;
            
            const deleteButton: HTMLButtonElement = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-btn';
            deleteButton.onclick = async (): Promise<void> => {
                const { [word]: removed, ...updatedDictionary } = dictionary;
                await chrome.storage.sync.set({ dictionary: updatedDictionary });
                await updateWordList();
            };
            
            wordPair.appendChild(wordText);
            wordPair.appendChild(arrow);
            wordPair.appendChild(translationText);
            wordElement.appendChild(wordPair);
            wordElement.appendChild(deleteButton);
            wordList.appendChild(wordElement);
        });
    }
}); 