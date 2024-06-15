// constants.js

const EMOJIS = {
    BUSH: '🌺',
    TREE: '🌳',
    BUTTERFLY: '🦋',
    BIRD: '🐦',
    WORM: '🐛'  // Using caterpillar emoji to represent worms
};

const INITIAL_EMOJIS = [
    { id: 'flowering-bush', emoji: EMOJIS.BUSH },
    { id: 'tree', emoji: EMOJIS.TREE, disabled: true }
];

export { EMOJIS, INITIAL_EMOJIS };
