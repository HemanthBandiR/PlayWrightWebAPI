
const add = (a, b) => {
    return (a + b);
}


const additi = add(4, 5);
console.log(additi)


const car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}

car.prototype.accelerate = function () {
    this.speed += 5;
    console.log(`${this.make} is going at a speed of ${this.speed}`);

}
car.prototype.brake = function () {
    this.brake -= 10;
    console.log(`${this.make} is going at a speed of ${this.speed}`);

}


const ev = function (make, speed, charge) {
    car.call(this, make, speed);
    this.charg = charge;
}

ev.prototype = Object.create(car.prototype);

ev.prototype.accelerate = function () {
    this.speed += 5;
    this.charg -= 10;
    console.log(`${this.make} is going at ${this.speed} Km/h, with a chage of ${this.charge}`);

}
ev.prototype.brake = function () {
    this.brake -= 10;
    console.log(`${this.make} is going at a speed of ${this.speed}`);

}


const Tesla = new ev('Tesla', 100, 23);
Tesla.accelerate();
Tesla.brake();


