class LottoDisplay extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .lotto-balls {
                    display: flex; /* Always display balls in a row */
                    flex-wrap: wrap; /* Allow wrapping on smaller screens */
                    justify-content: center; /* Center the balls */
                    gap: 1rem;
                }
                .ball {
                    width: var(--ball-size, 50px);
                    height: var(--ball-size, 50px);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--text-color, #333);
                    background-color: var(--white, #fff);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                }
            </style>
            <div class="lotto-balls"></div>
        `;
    }

    displayNumbers(numbers) {
        const container = this.shadowRoot.querySelector('.lotto-balls');
        container.innerHTML = '';
        numbers.forEach(number => {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = number;
            container.appendChild(ball);
        });
    }
}

customElements.define('lotto-display', LottoDisplay);


document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const lottoDisplay = document.querySelector('lotto-display');

    generateBtn.addEventListener('click', () => {
        const numbers = generateLottoNumbers();
        lottoDisplay.displayNumbers(numbers);
    });

    // Initial generation
    lottoDisplay.displayNumbers(generateLottoNumbers());
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNum = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNum);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}
