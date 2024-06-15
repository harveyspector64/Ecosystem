// gameEngine.js

export class GameEngine {
    constructor() {
        this.bushesPlanted = 0;
        this.treesPlanted = 0;
        this.maxBushes = 5;
        this.maxTrees = 1;
    }

    canPlantBush() {
        return this.bushesPlanted < this.maxBushes;
    }

    canPlantTree() {
        return this.treesPlanted < this.maxTrees;
    }

    plantBush() {
        if (this.canPlantBush()) {
            this.bushesPlanted++;
            return true;
        }
        return false;
    }

    plantTree() {
        if (this.canPlantTree()) {
            this.treesPlanted++;
            return true;
        }
        return false;
    }

    reset() {
        this.bushesPlanted = 0;
        this.treesPlanted = 0;
    }
}
