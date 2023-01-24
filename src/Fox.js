import { Animal } from "./Animal.js";

export class Fox extends Animal {
    constructor(initialLocation, name) {
        super();
        this.location = initialLocation;
        this.name = name;
    }


    eatRabbit() {

    }

    getLocation() {
        return this.location;
    }

    getName() {
        return this.name;
    }

}