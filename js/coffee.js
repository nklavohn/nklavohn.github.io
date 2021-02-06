function greeting() {
    var container = document.getElementById("container");

    var startTime = Date.now();
    console.log(startTime);
    var maxTime = 3000;  // milliseconds
    var substantiated = false;
    var id = setInterval(hello, 10);

    var msg, msg2;

    function hello() {
        time = Date.now();
        if(time - startTime > maxTime) {
            clearInterval(id);

            startTime = Date.now();
            substantiated = false;
            id = setInterval(welcome, 10);
        } else {
            if(time - startTime > 1000) {
                if(!substantiated) {
                    msg = document.createElement("h1");
                    msg.textContent = "hello.";
                    msg.classList.add("hello")
                    msg.style.left = 300 + "px";
                    msg.style.bottom = container.clientHeight / 2 + 200 + "px";
                    msg.style.opacity = 0;
                    msg.style.margin = 0;
                    msg.style.marginBottom = -1 * msg.style.height + "px";
                    container.appendChild(msg);
                    substantiated = true;
                }
                var anim = 1/2 * ((time - startTime)/1000 - 1);

                msg.style.opacity = anim;
                msg.style.left = 300 - 200 * Math.sin(anim * 3.14159 / 2) + "px";
            }
        }
    }

    function welcome() {
        time = Date.now();
        if(time - startTime > maxTime) {
            clearInterval(id);

            startTime = Date.now();
            maxTime = 4000;
            substantiated = false;
            id = setInterval(please, 10);
        } else {
            if(time - startTime > 1000) {
                if(!substantiated) {
                    msg = document.createElement("h2");
                    msg.textContent = "welcome to my little corner of the internet";
                    msg.classList.add("welcome");
                    msg.style.left = 350 + "px";
                    msg.style.bottom = container.clientHeight / 2 + 140 + "px";
                    msg.style.opacity = 0;
                    msg.style.margin = 0;
                    msg.style.marginBottom = -1 * msg.style.height + "px";
                    container.appendChild(msg);
                    substantiated = true;
                }
                var anim = 1/2 * ((time - startTime)/1000 - 1);

                msg.style.opacity = anim;
                msg.style.left = 350 - 200 * Math.sin(anim * 3.14159 / 2) + "px";
            }
        }
    }

    function please() {
        time = Date.now();
        if(time - startTime > maxTime) {
            clearInterval(id);
            //
            // startTime = d.getTime()
            // id = setInterval(please, 10);
        } else {
            if(time - startTime > 1000) {
                if(!substantiated) {
                    msg = document.createElement("h2");
                    msg.textContent = "please, ";
                    msg.classList.add("welcome");
                    msg.style.left = 350 + "px";
                    msg.style.bottom = container.clientHeight / 2 + 100 + "px";
                    msg.style.opacity = 0;
                    msg.style.margin = 0;
                    msg.style.marginBottom = -1 * msg.style.height + "px";
                    container.appendChild(msg);

                    msg2 = document.createElement("h2");
                    msg2.textContent = "grab some coffee before coming inside";
                    msg2.classList.add("welcome");
                    msg2.style.left = 460 + "px";
                    msg2.style.bottom = container.clientHeight / 2 + 100 + "px";
                    msg2.style.opacity = 0;
                    msg2.style.margin = 0;
                    msg2.style.marginBottom = -1 * msg.style.height + "px";
                    container.appendChild(msg2);
                    substantiated = true;
                }
                var anim = Math.min(1/2 * ((time - startTime)/1000 - 1), 1);
                var anim2 = Math.max(1/2 * ((time - startTime)/1000 - 2), 0);

                msg.style.opacity = anim;
                msg.style.left = 350 - 200 * Math.sin(anim * 3.14159 / 2) + "px";

                msg2.style.opacity = anim2;
                msg2.style.left = 460 - 200 * Math.sin(anim2 * 3.14159 / 2) + "px";
            }
        }
    }
}



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
