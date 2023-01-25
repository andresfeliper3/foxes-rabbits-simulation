import { Animal } from "./Animal.js";
import { copyObject } from "./Functions.js";

const HUNGER_LIMIT = 5;

export class Fox extends Animal {
    constructor(initialLocation, name) {
        super();
        this.location = initialLocation;
        this.name = name;
        this.hunger = 0;
    }

    eatRabbit() {
        this.hunger = 0;
    }

    increaseHunger() {
        this.hunger++;
    }

    isHungerDead() {
        if (this.hunger >= HUNGER_LIMIT) {
            return true;
        }
        return false;
    }

    reproduce(fox) {
        return new Fox(copyObject(this.location), `{${this.name},${fox.getName()}}`);
    }

    getLocation() {
        return this.location;
    }

    getName() {
        return this.name;
    }

}

