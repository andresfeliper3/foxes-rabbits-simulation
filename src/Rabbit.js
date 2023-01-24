import { Animal } from "./Animal.js";

export class Rabbit extends Animal {
    constructor(initialLocation, name) {
        super();
        this.location = initialLocation;
        this.name = name;
    }

    escape() {

    }

    getLocation() {
        return this.location;
    }

    getName() {
        return this.name;
    }
} 