function greeting() {
    var container = document.getElementById("container");
    var bigger_container = document.getElementById("bigger_container");

    var startTime = Date.now();
    var maxTime = 3000;  // milliseconds
    var substantiated = false;
    var id = setInterval(hello, 10);

    var floater = new Floater(15);
    var floatID = setInterval(float, 10);

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
                    msg.style.bottom = bigger_container.clientHeight / 2 + 200 + "px";
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
                    msg.style.bottom = bigger_container.clientHeight / 2 + 120 + "px";
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
                    msg.style.bottom = bigger_container.clientHeight / 2 + 70 + "px";
                    msg.style.opacity = 0;
                    msg.style.margin = 0;
                    msg.style.marginBottom = -1 * msg.style.height + "px";
                    container.appendChild(msg);

                    msg2 = document.createElement("h2");
                    msg2.textContent = " grab some coffee before coming inside";
                    msg2.classList.add("welcome");
                    msg2.classList.add("preserve_whitespace");
                    msg2.style.left = 350 + msg.offsetWidth + "px";
                    msg2.style.bottom = bigger_container.clientHeight / 2 + 70 + "px";
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
                msg2.style.left = 350 + msg.offsetWidth - 200 * Math.sin(anim2 * 3.14159 / 2) + "px";
            }
        }
    }

    function float() {
        floater.update();

        // container.style.marginTop = floater.getOffset()[1] + "px";
        container.style.height = bigger_container.offsetHeight + floater.getOffset()[1] + "px";
    }
}

class Floater {
    constructor(maxOffset) {
        this.offset = [0, 0];
        this.limit = maxOffset;

        this.startTime = Date.now();
    }

    update() {
        time = Date.now();
        this.offset[1] = this.limit * (-1 + Math.sin((time - this.startTime) / 1000));
    }

    getOffset() {
        return this.offset;
    }
}
