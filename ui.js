// ui.js

document.addEventListener('DOMContentLoaded', () => {
    const playArea = document.getElementById('play-area');
    
    INITIAL_EMOJIS.forEach(item => {
        const element = document.getElementById(item.id);
        if (item.disabled) {
            element.classList.add('disabled');
            element.setAttribute('draggable', 'false');
        }
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.emoji);
        });
        element.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.dataTransfer = { setData: (type, data) => e.dataTransferData = data };
            e.dataTransfer.setData('text/plain', item.emoji);
        });
    });

    playArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    playArea.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.id === 'play-area') {
            e.clientX = touch.clientX;
            e.clientY = touch.clientY;
            e.preventDefault();
        }
    });

    playArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const emoji = e.dataTransfer.getData('text/plain');
        const x = e.clientX - playArea.offsetLeft;
        const y = e.clientY - playArea.offsetTop;
        addEmojiToPlayArea(emoji, x, y);
    });

    playArea.addEventListener('touchend', (e) => {
        e.preventDefault();
        const touch = e.changedTouches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.id === 'play-area') {
            e.clientX = touch.clientX;
            e.clientY = touch.clientY;
            const emoji = e.dataTransferData;
            const x = e.clientX - playArea.offsetLeft;
            const y = e.clientY - playArea.offsetTop;
            addEmojiToPlayArea(emoji, x, y);
        }
    });

    function addEmojiToPlayArea(emoji, x, y) {
        const emojiElement = document.createElement('div');
        emojiElement.textContent = emoji;
        
        // Apply specific classes for styling
        if (emoji === EMOJIS.TREE) {
            emojiElement.classList.add('emoji', 'tree');
        } else if (emoji === EMOJIS.BUTTERFLY) {
            emojiElement.classList.add('emoji', 'butterfly');
        } else if (emoji === EMOJIS.BIRD) {
            emojiElement.classList.add('emoji', 'bird');
        } else if (emoji === EMOJIS.WORM) {
            emojiElement.classList.add('emoji', 'worm');
        } else {
            emojiElement.classList.add('emoji');
        }

        emojiElement.style.position = 'absolute';
        emojiElement.style.left = `${x}px`;
        emojiElement.style.top = `${y}px`;
        playArea.appendChild(emojiElement);

        if (emoji === EMOJIS.BUSH) {
            addButterflies(x, y);
            unlockTree();
        } else if (emoji === EMOJIS.TREE) {
            addBird(x, y);
        }
    }

    function unlockTree() {
        const tree = document.getElementById('tree');
        tree.classList.remove('disabled');
        tree.setAttribute('draggable', 'true');
    }
});
