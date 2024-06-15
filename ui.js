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

    console.log('Initial setup started'); // Debugging

    INITIAL_EMOJIS.forEach(item => {
        const element = document.getElementById(item.id);
        if (item.disabled) {
            element.classList.add('disabled');
            element.setAttribute('draggable', 'false');
            console.log(`Disabled emoji: ${item.id}`); // Debugging
        } else {
            element.setAttribute('draggable', 'true');
            console.log(`Enabled draggable emoji: ${item.id}`); // Debugging
        }
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.emoji);
            console.log('Drag started:', item.emoji); // Debugging
        });
    });

    playArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        console.log('Drag over play area'); // Debugging
    });

    playArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const emoji = e.dataTransfer.getData('text/plain');
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
        emojiElement.classList.add('emoji');

        if (emoji === EMOJIS.TREE) {
            emojiElement.classList.add('tree');
        } else if (emoji === EMOJIS.BUTTERFLY) {
            emojiElement.classList.add('butterfly');
        } else if (emoji === EMOJIS.BIRD) {
            emojiElement.classList.add('bird');
        } else if (emoji === EMOJIS.WORM) {
            emojiElement.classList.add('worm');
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
        console.log('Tree unlocked'); // Debugging
    }

    function butterflyLands() {
        butterflyLanded = true;
        unlockTree();
    }

    console.log('Initial setup completed'); // Debugging
});
