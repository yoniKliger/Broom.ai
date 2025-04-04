class FloatingButton {
    private button: HTMLButtonElement;

    constructor() {
        this.button = this.createButton();
        this.initialize();
    }

    private createButton(): HTMLButtonElement {
        const button = document.createElement('button');
        button.textContent = 'Click Me';
        button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
    `;

        return button;
    }

    private initialize(): void {
        document.body.appendChild(this.button);

        this.button.addEventListener('click', () => {
            this.handleClick();
        });
    }

    private handleClick(): void {
        alert('Button clicked!');
    }
}

export default FloatingButton;