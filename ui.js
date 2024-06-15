// ui.js

import { addButterflies } from './butterfly.js';
import { addBird } from './bird.js';
import { EMOJIS, INITIAL_EMOJIS } from './constants.js';
import { GameEngine } from './gameEngine.js';

document.addEventListener('DOMContentLoaded', () => {
    const playArea = document.getElementById('play-area');
    const treeElement = document.getElementById('tree');
    const gameEngine = new GameEngine();
    let butterflyLanded = false;

    INITIAL_EMOJIS.forEach(item => {
        const element = document.getElementById(item.id);
        if (item.disabled) {
            element.classList.add('disabled');
            element.setAttribute('draggable', 'false');
        }
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', item.emoji);
        });
    });

    playArea.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    playArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const emoji = e.dataTransfer.getData('text');
        const x = e.clientX - playArea.offsetLeft;
        const y = e.clientY - playArea.offsetTop;
        console.log('Drop event:', emoji, x, y); // Debugging
        addEmojiToPlayArea(emoji, x, y);
    });

    function addEmojiToPlayArea(emoji, x, y) {
        console.log('Adding emoji:', emoji, 'at position:', x, y); // Debugging
        if (emoji === EMOJIS.TREE && !butterflyLanded) {
            console.log('Tree is locked'); // Debugging
            return;
        }
        if (emoji === EMOJIS.BUSH && !gameEngine.plantBush()) {
            console.log('Max bushes reached'); // Debugging
            return;
        }
        if (emoji === EMOJIS.TREE && !gameEngine.plantTree()) {
            console.log('Max trees reached'); // Debugging
            return;
        }

        const emojiElement = document.createElement('div');
        emojiElement.textContent = emoji;

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
            addButterflies(x, y, butterflyLands);
        } else if (emoji === EMOJIS.TREE) {
            addBird(x, y);
        }
    }

    function unlockTree() {
        treeElement.classList.remove('disabled');
        treeElement.setAttribute('draggable', 'true');
    }

    function butterflyLands() {
        butterflyLanded = true;
        unlockTree();
    }
});
