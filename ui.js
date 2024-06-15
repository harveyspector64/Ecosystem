// ui.js

document.addEventListener('DOMContentLoaded', () => {
    const playArea = document.getElementById('play-area');
    const sidebar = document.getElementById('sidebar');
    let draggedEmoji = null;
    let activeEmoji = null;

    INITIAL_EMOJIS.forEach(item => {
        const element = document.getElementById(item.id);
        if (item.disabled) {
            element.classList.add('disabled');
            element.setAttribute('draggable', 'false');
        }

        // Mouse events
        element.addEventListener('dragstart', (e) => {
            draggedEmoji = item.emoji;
        });

        // Touch events
        element.addEventListener('touchstart', (e) => {
            e.preventDefault();
            draggedEmoji = item.emoji;
            activeEmoji = document.createElement('div');
            activeEmoji.textContent = draggedEmoji;
            activeEmoji.classList.add('emoji');
            activeEmoji.style.position = 'absolute';
            activeEmoji.style.left = `${e.touches[0].clientX}px`;
            activeEmoji.style.top = `${e.touches[0].clientY}px`;
            document.body.appendChild(activeEmoji);
        });

        element.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (activeEmoji) {
                activeEmoji.style.left = `${e.touches[0].clientX}px`;
                activeEmoji.style.top = `${e.touches[0].clientY}px`;
            }
        });

        element.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (activeEmoji) {
                activeEmoji.remove();
                activeEmoji = null;
                const touch = e.changedTouches[0];
                const x = touch.clientX - playArea.offsetLeft;
                const y = touch.clientY - playArea.offsetTop;
                addEmojiToPlayArea(draggedEmoji, x, y);
                draggedEmoji = null;
            }
        });
    });

    // Prevent default touch actions on play area
    playArea.addEventListener('touchstart', (e) => {
        e.preventDefault();
    });

    // Mouse events
    playArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    playArea.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedEmoji) {
            const x = e.clientX - playArea.offsetLeft;
            const y = e.clientY - playArea.offsetTop;
            addEmojiToPlayArea(draggedEmoji, x, y);
            draggedEmoji = null;
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
