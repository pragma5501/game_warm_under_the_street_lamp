

export class Player {
    constructor() {
        this.max_hp = 10;
        this.cur_hp = 10;
        this.hps = 1;
        
        this.text = "";
        this.score = 0;

        this.make_structure();
        this.make_light();
        this.make_hp_bar();
        this.make_text_balloon();
    }   
    set_text(text) {
        this.text = text;
    }
    get_text(text) {
        return this.text;
    }
    draw(ctx) {
        // pillar
        ctx.fillStyle = "white";
        this.draw_pillar(ctx);
        this.draw_roof(ctx);
        this.draw_bulb(ctx);
        this.draw_light(ctx);
        this.draw_hp_bar(ctx);
        this.draw_score(ctx);
    }   


    draw_pillar(ctx) {
        ctx.beginPath();
        ctx.rect(this.pillar.x, this.pillar.y, this.pillar.w, this.pillar.h);
        ctx.fill();
    }
    draw_roof(ctx) {
        ctx.beginPath();
        ctx.rect(this.roof.x, this.roof.y, this.roof.w, this.roof.h);
        ctx.fill();
    }
    draw_bulb(ctx) {
        ctx.beginPath();
        ctx.arc(this.bulb.x, this.bulb.y, this.bulb.r, 0, Math.PI * 2, false);
        ctx.fill();
    }
    draw_light(ctx) {
        if (this.flag_light_on == false) {
            return;
        }
        ctx.fillStyle = this.light.color;
        ctx.beginPath();
        ctx.moveTo(this.light.x1, this.light.y1);
        ctx.lineTo(this.light.x3, this.light.y3);
        ctx.lineTo(this.light.x4, this.light.y4);
        ctx.lineTo(this.light.x2, this.light.y2);
        //ctx.moveTo(this.light.x1, this.light.y1);
        ctx.fill();
    }
    draw_hp_bar(ctx) {
        const ratio = this.cur_hp / this.max_hp;

        ctx.fillStyle = 'grey';
        ctx.fillRect(this.hp_bar.x, this.hp_bar.y, this.hp_bar.w, this.hp_bar.h);

        ctx.fillStyle = 'white';
        ctx.fillRect(this.hp_bar.x, this.hp_bar.y, this.hp_bar.w * ratio, this.hp_bar.h);

        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText("Life " + this.cur_hp + ' / ' + this.max_hp, this.hp_bar.x, this.hp_bar.y - 10);
    }
    draw_score(ctx) {
        ctx.fillStyle = 'black';
        ctx.fillText("score : "+this.score, 700, 580)
    }
    make_structure() {
        const h_pil = 500;
        this.pillar = {
            x: 600, 
            y: 600 - h_pil,
            w: 20,
            h: h_pil,
            color: "white",
        };

        const w_rf = 200;
        this.roof = {
            x: this.pillar.x - w_rf,
            y: this.pillar.y + 50,
            w: w_rf,
            h: 20,
            color: "white",
        };

        const r_bulb = 20;
        this.bulb = {
            x: this.roof.x + 30,
            y: this.roof.y + this.roof.h/2 + r_bulb,
            r: r_bulb,
            color: "white",
        }
    }
    make_light() {
        this.flag_light_on = true;
        const delta = 30;
        const y_floor = 500;
        this.light = {
            // top of shape
            x1: this.bulb.x - this.bulb.r,
            y1: this.bulb.y,
            x2: this.bulb.x + this.bulb.r,
            y2: this.bulb.y,
            
            // bottom of shape
            x3: this.bulb.x - this.bulb.r - delta,
            y3: y_floor,
            x4: this.bulb.x + this.bulb.r + delta,
            y4: y_floor,

            color: "rgba(255, 255, 255, 0.5)",
        }
    }
    make_hp_bar() {
        const delta = 20;
        this.hp_bar = {
            x: this.roof.x + delta,
            y: this.roof.y - 40,
            w: this.roof.w - delta*2,
            h: 20
        };
    }
    make_text_balloon() {
        this.text_balloon = {
            displayed_time: 3000,
        };

        this.text_balloon_DOM = document.getElementById('textBalloon');
        this.text_balloon_DOM.textContent = "";
        this.text_balloon_DOM.style.display = 'none';

    }
    show_text_balloon() {
        this.text_balloon_DOM.style.display = 'block';
        setTimeout(function() {
            this.text_balloon_DOM.style.display = 'none';
        }, this.text_balloon.displayed_time);
    }
    unshow_text_ballon() {
        this.text_balloon_DOM.style.display = 'none';
    }
    // dir = 1 or -1
    // 1 is right, -1 is left
    rotate_light(dir) {
        const delta = 10;
        this.light.x3 += delta * dir;
        this.light.x4 += delta * dir;
    }
    reverse_flag_light_on() {
        this.flag_light_on = !(this.flag_light_on && true);
    }

    decrease_hp() {
        this.cur_hp -= 1;
    }
    increase_score() {
        this.score += 1;
    }
}