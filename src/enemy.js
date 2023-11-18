
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Enemy {
    constructor(x, max_hp , speed) {
        this.load_text_set();
        this.init_enemy(x, max_hp, speed);
        
        
        this.make_thought_bubble();
    }
    init_enemy(x, max_hp, speed) {
        this.r = 20;
        this.x = x;
        this.y = 500 - this.r + 5;
        
        this.time_count = 5;

        this.speed = speed;
        this.max_hp = max_hp;
        this.cur_hp = max_hp;

        this.flag_happy = false;
        this.flag_update = true;
        this.cur_answer_text = undefined;

        this.flag_unstoppable = false;
        this.flag_on_light = false;
        this.make_hp_bar();
    }
    draw(ctx) {
        this.update();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();

        this.draw_hp_bar(ctx);
    }
    draw_hp_bar(ctx) {
        const ratio = this.cur_hp / this.max_hp;

        ctx.fillStyle = 'grey';
        ctx.fillRect(this.hp_bar.x, this.hp_bar.y, this.hp_bar.w, this.hp_bar.h);

        ctx.fillStyle = 'white';
        ctx.fillRect(this.hp_bar.x, this.hp_bar.y, this.hp_bar.w * ratio, this.hp_bar.h);

        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText("Sadness " + this.cur_hp + ' / ' + this.max_hp, this.hp_bar.x, this.hp_bar.y - 10);
    }
    update() {
        if (this.flag_update == false) {
            return;
        }
        this.x += this.speed;
        this.hp_bar.x += this.speed;
        this.update_thought_bubble();
    }
    make_hp_bar() {

        this.hp_bar = {
            x: this.x - this.r * 2,
            y: this.y - this.r * 2,
            w: this.r * 4,
            h: 10,
        };
    }
    make_thought_bubble() {

        this.thought_bubble = document.getElementById('thoughtBubble');        
        setInterval(this.set_random_text_thought_bubble.bind(this), 4000);
        this.update_thought_bubble();
        
    }
    update_thought_bubble() {
        
        const x = this.x - 120;
        const y = this.y - 120;

        this.thought_bubble.style.left = `calc(50% + ${(x - 400)}px)`;
        this.thought_bubble.style.top = `calc(50% + ${(y - 300)}px)`;;
        console.log()

    }
    set_random_text_thought_bubble() {
        const idx = getRandomInt(0, 8);
        this.cur_answer_text = this.answer_text[idx];

        this.thought_bubble.innerText = this.cur_answer_text;
    }
    reverse_flag_update() {
        this.flag_update = !(this.flag_update && true);
    }
    turn_off_flag_update() {
        if (this.flag_on_light == false) {
            this.flag_on_light = true;
            setTimeout(this.turn_on_flag_unstoppable.bind(this), 1*1000);
        }
        if (this.flag_unstoppable == true) {
            this.flag_update = true;
            return;
        }
        
        this.flag_update = false;
    }
    turn_on_flag_update() {
        this.flag_update = true;
    }
    turn_on_flag_unstoppable() {
        this.speed = 3;
        this.flag_unstoppable = true;
    }
    load_text_set() {
        this.answer_text = {};
        fetch('./src/answer_text/answer.json')
            .then(response => response.json())
            .then(data => {
                this.answer_text = data;
            })
            .catch(error => {
                console.error('JSON 파일 읽기 실패:', error);
            });
        
    }
    fill_happy() {
        if (this.flag_on_light == true) {
            this.cur_hp -= 2;
            return;
        }
        this.cur_hp -= 1;
    }
}