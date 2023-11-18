import { Enemy } from "./enemy.js";

export class EnemyHandler {
    constructor() {
        this.enemies = [];   
        this.make_enemies();
    }
    draw(ctx) {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].draw(ctx);
        }
    }
    make_enemies() {
        for (let i = 0; i < 2; i++) {
            this.push_enemy();
        }
    }
    push_enemy() {
        this.enemies.push(new Enemy(10, 10, 1));
    }
}