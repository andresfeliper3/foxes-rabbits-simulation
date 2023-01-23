/**
 * Abstract Class Animal.
 *
 * @class Animal
 */
export class Animal {

    constructor() {
        if (this.constructor == Animal) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    say() {
        throw new Error("Method 'say()' must be implemented.");
    }

    move() {
        console.log("Move");
    }

    setLocation(location) {
        this.location = location;
    }

    getLocation() {
        this.location;
    }
}