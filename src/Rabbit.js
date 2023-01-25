import { Animal } from "./Animal.js";
import { copyObject } from "./Functions.js";

export class Rabbit extends Animal {
    constructor(initialLocation, name) {
        super();
        this.location = initialLocation;
        this.name = name;
    }

    reproduce(rabbit) {
        return new Rabbit(copyObject(this.location), `{${this.name},${rabbit.getName()}}`);
    }

    getLocation() {
        return this.location;
    }

    getName() {
        return this.name;
    }
} 