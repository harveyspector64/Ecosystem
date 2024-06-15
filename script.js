document.addEventListener('DOMContentLoaded', () => {
    const playArea = document.getElementById('play-area');
    const floweringBush = document.getElementById('flowering-bush');
    const tree = document.getElementById('tree');
    
    // Handle drag and drop for flowering bush
    floweringBush.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', '🌺');
    });

    playArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    playArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const emoji = e.dataTransfer.getData('text/plain');
        const x = e.clientX - playArea.offsetLeft;
        const y = e.clientY - playArea.offsetTop;
        addEmojiToPlayArea(emoji, x, y);
    });

    function addEmojiToPlayArea(emoji, x, y) {
        const emojiElement = document.createElement('div');
        emojiElement.textContent = emoji;
        emojiElement.classList.add('emoji');
        emojiElement.style.position = 'absolute';
        emojiElement.style.left = `${x}px`;
        emojiElement.style.top = `${y}px`;
        playArea.appendChild(emojiElement);

        if (emoji === '🌺') {
            // Placeholder for butterfly behavior
            addButterflies(x, y);
            // Unlock tree emoji after placing a few bushes
            if (playArea.querySelectorAll('.emoji:contains("🌺")').length >= 3) {
                tree.classList.remove('disabled');
                tree.setAttribute('draggable', 'true');
            }
        } else if (emoji === '🌳') {
            // Placeholder for bird behavior
            addBird(x, y);
        }
    }

    function addButterflies(x, y) {
        // Placeholder for butterfly behavior implementation
        console.log('Butterflies should appear around:', x, y);
    }

    function addBird(x, y) {
        // Placeholder for bird behavior implementation
        console.log('Bird should appear around:', x, y);
    }
});
