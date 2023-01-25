/**
 * Abstract Class Animal.
 *
 * @class Animal
 */

const UP_DIRECTION = 1;
const RIGHT_DIRECTION = 2;
const DOWN_DIRECTION = 3;
const LEFT_DIRECTION = 4;
const DIRECTIONS = [UP_DIRECTION, RIGHT_DIRECTION, DOWN_DIRECTION, LEFT_DIRECTION];
const boxesPerRow = 5;

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
        let randomValidDirection = this.generateRandomValidDirection();
        switch (randomValidDirection) {
            case UP_DIRECTION:
                this.location.y -= 1;
                break;
            case RIGHT_DIRECTION:
                this.location.x += 1;
                break;
            case DOWN_DIRECTION:
                this.location.y += 1;
                break;
            case LEFT_DIRECTION:
                this.location.x -= 1;
                break;
            default:
                throw new Error("Not valid direction");
        }

    }

    generateRandomValidDirection() {
        let randomDirection;
        while (true) {
            randomDirection = this.generateRandomDirection();
            if (this.isValidDirection(randomDirection)) {
                break;
            }
        }
        return randomDirection;
    }

    generateRandomDirection() {
        let amountDirections = DIRECTIONS.length;
        let randomDirection = DIRECTIONS[Math.floor(Math.random() * amountDirections)];
        return randomDirection;
    }

    isValidDirection(randomDirection) {
        //UP
        if (this.location.y == 0 && randomDirection == UP_DIRECTION) {
            return false;
        }
        //RIGHT
        if (this.location.x == boxesPerRow - 1 && randomDirection == RIGHT_DIRECTION) {
            return false;
        }
        //DOWN
        if (this.location.y == boxesPerRow - 1 && randomDirection == DOWN_DIRECTION) {
            return false;
        }
        //LEFT
        if (this.location.x == 0 && randomDirection == LEFT_DIRECTION) {
            return false;
        }
        return true;
    }

    setLocation(location) {
        this.location = location;
    }

    getLocation() {
        this.location;
    }
}