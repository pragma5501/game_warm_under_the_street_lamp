export class CollisionHandler {
    constructor() {

    }
    light_enemy(player, enemy) {
        if (player.flag_light_on == false) {
            return false;
        }
        const light = player.light;
        if (light.x3 <= enemy.x && enemy.x <= light.x4) {
            return true;
        }
        return false;
    }
    enemy_died(enemy) {
        if (enemy.x >= 800) {
            return true;
        }
    }
}