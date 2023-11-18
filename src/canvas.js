import { Player } from "./player.js"
import { Floor } from "./floor.js"
import { EnemyHandler } from "./enemy_handler.js"
import { GameManager } from "./game.js";
class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');        
        this.pixelRatio = (window.pixelRatio > 1) ? 2 : 1;

        this.input_box = document.getElementById('customTextbox');
        
        
        this.mouse = {
            x: 0,
            y: 0,
            button: 0,
        };
        this.flag_input_mode = false;
        this.text_input_mode = "Mode : No Text Input (Press Esc to Enter Text Input Mode)";
        
        this.set_canvas_info();

        document.addEventListener('click', this.click_mouse.bind(this), false);
        document.addEventListener('keydown', this.key_down.bind(this), false);

        this.tick = 0;
        this.fps = 30;
        this.now;
        this.then = Date.now();
        this.interval = 1000/this.fps;
        this.delta;
        
        this.make_component_game();
        this.make_game();

        window.requestAnimationFrame(this.animate.bind(this));
    }
    set_canvas_info() {
        this.stageWidth = 4 * 200;
        this.stageHeight = 3 * 200;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.canvas.style.width = this.stageWidth + "px";
        this.canvas.style.height = this.stageHeight + "px";
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        this.ctx.lineCap = "round";
        this.ctx.lineWidth = 4;

    }
    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        // set fps : start
        this.now = Date.now();
        this.delta = this.now - this.then;
        if (this.delta <= this.interval) {
            return;
        } 
        this.then = this.now - (this.delta % this.interval);
        // set fps : end

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.floor.draw(this.ctx);
        this.player.draw(this.ctx);
        
        this.game_manager.play(this.ctx, this.player);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(this.text_input_mode, 0, 20);
        this.tick = (this.tick + 1) % 1000;
    }
    make_component_game() {
        this.make_player();
        this.make_floor();
    }
    make_floor() {
        this.floor = new Floor(this.stageWidth, this.stageHeight);
    }
    make_player() {
        this.player = new Player();
    }
    make_game() {
        this.game_manager = new GameManager();
    }
    click_mouse(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouse.button = e.button;
    }
    key_down(e) {
        switch (e.key) {
            case "Escape":
                this.text_input_mode = "Mode : Text Input (Press Enter to Enter Control Light Mode)";
                this.flag_input_mode = true;

                this.input_box.focus();
                break;
            case "Enter":
                this.text_input_mode = "Mode : No Text Input (Press Esc to Enter Text Input Mode)";
                this.flag_input_mode = false;
                this.game_manager.set_user_input_text(this.input_box.innerText);
                this.player.text_balloon_DOM.textContent = this.input_box.innerText;
                this.player.show_text_balloon();
                this.input_box.blur();
                this.input_box.innerText = "";
                break;
        }

        if (this.flag_input_mode == true) {
            return;
        } 

        switch (e.key) {
            case "l":
                this.player.reverse_flag_light_on();
                break;
            case "a":
                this.player.rotate_light(-1);
                break;
            
            case "d":
                this.player.rotate_light(1);
                break;

            default:
                break;

        }
    }
}

window.onload = () => {
    new App();

    const audioElement = new Audio('./src/music/you_can_do_it.ogg');
    audioElement.addEventListener("loadeddata", () => {
        let duration = audioElement.duration;
        audioElement.loop = true;
        audioElement.play();
    });
    audio.play();
    audioElement.loop = true;
}