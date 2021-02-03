function do_coffee_stuff() {
    var button = document.getElementById("btn");

    if(button.value === "empty") {
        button.value = "pouring";

        var streams = [];
        streams[0] = new Stream(40, 2400, 475, 700, 0, document.getElementById("a"));
        streams[1] = new Stream(20, 2000, 525, 700, 40, document.getElementById("b"));
        streams[2] = new Stream(10, 1600, 460, 700, 30, document.getElementById("c"));

        var filling_cover = document.getElementById("filling_cover");
        var cover_height = 265;
        var time = 300;

        var steam = document.getElementById("steam");

        var iter = 0;
        var max_iter = 300;
        var animation_id = setInterval(frame, 10);

        function frame() {
            if(iter == max_iter) {
                clearInterval(animation_id);

                button.value = "full";
                document.getElementById("action").textContent = "Drink"
            } else {
                for(i = 0; i < streams.length; i++) {
                    streams[i].flow(iter);
                }

                filling_cover.style.height = Math.max(cover_height * (1 - iter / time), 0) + "px";
                filling_cover.style.bottom = Math.min(cover_height * (iter / time), cover_height) + "px";

                if(iter > 220) {
                    steam.style.opacity = (iter - 220) / 160;
                }

                iter++;
                // console.log(iter)
            }
        }
    } else if(button.value === "full") {
        button.value = "emptying";

        var filling_cover = document.getElementById("filling_cover")
        var cover_height = 265;
        var time = 200;

        var steam = document.getElementById("steam");

        var iter = 0;
        var max_iter = 200;
        var animation_id = setInterval(frame, 10);

        function frame() {
            if(iter == max_iter) {
                clearInterval(animation_id);

                button.value = "empty";
                document.getElementById("action").textContent = "Pour"
            } else {
                filling_cover.style.height = cover_height * (0.75 * iter / time) + "px";
                filling_cover.style.bottom = cover_height * (0.75 - 0.75*iter / time) + "px";

                steam.style.opacity = Math.max(steam.style.opacity - (1 / max_iter), 0);

                iter++;
                // console.log(iter)
            }
        }
    }
}


class Stream {
    constructor(width, height, xpos, ypos, delay, elem) {
        this.width = width;
        this.height = height;
        this.xpos = xpos;
        this.ypos = ypos;
        this.delay = delay;
        this.elem = elem

        this.elem.style.left = xpos + "px";
        this.elem.style.height = height + "px";
        this.elem.style.bottom = ypos + "px";
        this.elem.style.borderRadius = width/2 + "px";
        this.elem.style.border = width/2 + "px solid #9bbec0";

        this.maxSpeed = 20;
        this.speed = 0;
        this.accel = 0.25;
    }

    flow(iter) {
        if(iter > this.delay) {
            if(this.ypos > 100) {
                this.ypos = Math.max(this.ypos - this.speed, 0);
            } else if(this.height > 0) {
                this.height = Math.max(this.height - this.speed, 0);
            }

            this.elem.style.bottom = this.ypos + 'px';
            this.elem.style.height = this.height + 'px';

            this.speed = Math.min(this.speed + this.accel, this.maxSpeed);
        }
    }
}
