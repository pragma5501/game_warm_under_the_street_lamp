import { CollisionHandler } from "./collision_detector.js";
import { Enemy } from "./enemy.js";


export class GameManager{
    constructor() {
        this.flag_play = true;
        this.make_enemy();
        this.make_collision_handler();
    }
    
    play(ctx, player) {
        if (this.flag_play == false) {
            this.show_gameover(ctx);    
        }
        this.enemy.draw(ctx);
        
        if (this.collision_handler.light_enemy(player, this.enemy)) {
            this.enemy.turn_off_flag_update();
        } else {
            this.enemy.turn_on_flag_update();
        }
        
        if (this.collision_handler.enemy_died(this.enemy)) {
            
            this.enemy.init_enemy(-20, 5, 1);
            player.decrease_hp();
        }
        if (this.enemy.cur_hp <= 0) {
            this.enemy.init_enemy(-20, 5, 1);
            player.increase_score();
        }
        if (player.cur_hp <= 0) {
            this.flag_play = false;
        }
    }
    make_enemy() {
        this.enemy = new Enemy(-20, 5, 1);
    }
    make_collision_handler() {
        this.collision_handler = new CollisionHandler();
    }
    show_gameover(ctx) {
        
    }
    set_user_input_text(text, player) {
        this.user_input_text = text;
        this.match_user_input_and_answer();
        
    }
    match_user_input_and_answer() {
        if (this.user_input_text == this.enemy.cur_answer_text) {
            this.enemy.fill_happy();
        }
        
    }

}