import { Animal } from "./Animal.js";
import { copyObject } from "./Functions.js";


export class Fox extends Animal {
    constructor(initialLocation, name, hungerLimit) {
        super();
        this.location = initialLocation;
        this.name = name;
        this.hunger = 0;
        this.hungerLimit = hungerLimit;
    }

    eatRabbit() {
        this.hunger = 0;
    }

    increaseHunger() {
        this.hunger++;
    }

    isHungerDead() {
        if (this.hunger >= this.hungerLimit) {
            return true;
        }
        return false;
    }

    reproduce(fox) {
        return new Fox(copyObject(this.location), `{${this.name},${fox.getName()}}`, this.hungerLimit);
    }

    getLocation() {
        return this.location;
    }

    getName() {
        return this.name;
    }

}

