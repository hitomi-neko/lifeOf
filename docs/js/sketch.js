let flower = [];
let classLoom = [];
var num = 15;
var x1;
var y1;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, WEBGL);
    background(100);//再描画後に背景を再描画する
}

function preload() {
    myFont = loadFont("https://fonts.gstatic.com/ea/notosansjapanese/v6/NotoSansJP-Thin.otf");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');//canvasを後ろに移動する
    canvas.style('position', 'fixed');
    background(0);
    textFont(myFont);

    colorMode(HSB, 360, 100, 100, 100);

    for (var i = 0; i < num; i++) {
        flower[i] = new Flower();
    }

    for (var j = 0; j < 100; j++) {
        classLoom[j] = new ClassLoom();
    }

    // x1 = -width / 4;
    // y1 = heght / 3;
}

function draw() {
    frameRate(60);
    background(100);
    for (let j = 0; j < classLoom.length; j++) {
        classLoom[j].updateMe();
        classLoom[j].drawMe();
    }

    for (let i = 0; i < flower.length; i++) {
        flower[i].updateMe();
        flower[i].drawMe();
    }
}



//降る花のクラス
class Flower {
    constructor() {
        this.r = random(windowHeight / 20, windowHeight / 10);
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(5, 10);
        this.zSpeed = random(-2, 2);
        this.fColor = random(0, 360);
        this.colorNoiser = noise(3);
        this.x = random(-width / 2, width / 2);
        this.y = random(-height, height / 4);
        this.z = random(-800, 800);
        this.step = int(random(6, 12));
        this.step2 = int(random(6, 12));
        //this.sound = sound;
        // this.soundCount = 0;
    }

    drawMe() {
        strokeWeight(2);
        stroke(this.fColor, 10, 100);
        noFill();

        for (var i = 0; i < 360; i += this.step * 12) {
            for (var j = 0; j < 360; j += this.step2 * 12) {
                this.rad1 = i;
                this.rad2 = j;
                this.x2 = this.r * cos(this.rad1) * cos(this.rad2) + this.x;
                this.y2 = this.r * cos(this.rad1) * sin(this.rad2) + this.y;
                this.z2 = this.r * sin(this.rad1) + this.z;
                line(this.x, this.y, this.z, this.x2, this.y2, this.z2);
            }
        }
        point(this.x, this.y, this.z);

    }

    updateMe() {
        strokeWeight(2);
        this.m = (4 * PI) / 3 * pow(this.r, 3);
        this.x = this.x + this.xSpeed;
        this.y = this.y + this.ySpeed;
        this.fColor = this.fColor + this.colorNoiser;

        if (this.fColor > 360) {
            this.colorNoiser = this.colorNoiser * -1;
        }
        if (this.smileColor < 0) {
            this.colorNoiser = this.colorNoiser * -1;
        }


        if (this.x + this.r / 2 > width) {
            this.xSpeed = this.xSpeed * -1;
        }
        if (this.x - this.r / 2 < 0) {
            this.xSpeed = this.xSpeed * -1;
        }
        if (this.y + this.r / 2 > height) {
            this.y = -height / 2 - this.r / 2;
        }
        if (this.y - this.r / 2 < 0) {
            // this.ySpeed = this.ySpeed * -1;
        }

        let touching = false;
        for (let i = 0; i < flower.length; i++) {
            var otherFlower = flower[i];
            if (otherFlower != this) {
                let d = dist(this.x, this.y, otherFlower.x, otherFlower.y);
                if (d - (this.r + otherFlower.r) < 0) {
                    touching = true;
                    // this.r = this.r - 1;
                    // this.soundCount++;
                    // if (this.soundCount % 60 == 1) {
                    //     this.sound.play();
                    //     let temp = map(this.r, -10, 70, 0.0, 2.0);
                    //     let panning = map(this.x, 0, width, -1.0, 1.0);
                    //     this.sound.rate(temp);
                    //     this.sound.amp(0.6);
                    //     this.sound.pan(panning);
                    // }
                    break;
                }
                if (touching == true) {
                    this.xSpeed = ((this.m - otherFlower.m) * this.xSpeed + 2.0 * otherFlower.m * otherFlower.xSpeed) / (this.m + otherFlower.m);
                    this.ySpeed = ((this.m - otherFlower.m) * this.ySpeed + 2.0 * otherFlower.m * otherFlower.ySpeed) / (this.m + otherFlower.m);
                    this.zSpeed = ((this.m - otherFlower.m) * this.zSpeed + 2.0 * otherFlower.m * otherFlower.zSpeed) / (this.m + otherFlower.m);
                }
            }
        }
    }
}

class ClassLoom {
    constructor() {
        // this.x = random(-width / 2, width / 2);
        // this.y = random(-height / 2, height / 6);
        // this.s = random(windowHeight / 6, windowHeight / 2);
        this.sat = random(10, 90);
        // this.tra = random(10, 15);
        this.mode = int(random(1, 4));
        this.mode2 = int(random(1, 5));
        this.c = random(200, 260);
        if (this.mode2 == 1 || this.mode2 == 2) {
            this.y = random(-height / 2, -height / 4);
            this.x = random(-width / 2, width / 2);
            this.s = random(windowHeight / 5, windowHeight / 2);
            this.tra = random(5, 50);
        } else if (this.mode2 == 3) {
            this.y = random(-height / 4 - 20, 20);
            this.x = random(-width / 3, width / 3);
            this.s = random(windowHeight / 10, windowHeight / 4);
            this.tra = random(3, 30);
        } else if (this.mode2 == 4) {
            this.y = random(0, height / 6);
            this.x = random(-width / 5, width / 5);
            this.s = random(windowHeight / 20, windowHeight / 9);
            this.tra = random(1, 10);
        }
        this.a = this.s;
    }

    drawMe() {
        noStroke();
        fill(this.c, this.sat, 80, this.tra);
        //fill(0);
        //ellipse(this.z, this.y, this.s, this.s);
        if (this.mode == 1) {
            // textSize(this.s);
            // textAlign(CENTER);
            // text("教", this.x, this.y);
            noFill();
            strokeWeight(3);
            stroke(this.c, this.sat, 80, this.tra);
            circle(this.x, this.y, this.s * 3);
        } else if (this.mode == 2) {
            // textSize(this.s);
            // textAlign(CENTER);
            // text("室", this.x, this.y);
            noFill();
            strokeWeight(3);
            stroke(this.c, this.sat, 80, this.tra);
            circle(this.x, this.y, this.s * 3);
        } else if (this.mode == 3) {
            // noFill();
            // stroke(this.c, this.sat, 80, this.tra);
            circle(this.x, this.y, this.s * 3);
        }
    }

    updateMe() {
        // this.x = random(-width / 2, width / 2);
        // this.y = random(-height / 2, height / 6);
        // this.y -= random(0.1, 5);
        if (this.s >= 0) {
            this.y += map(this.a, windowHeight / 20, windowHeight / 3, 0.1, 3.0);
            this.s -= map(this.a, windowHeight / 20, windowHeight / 3, 0.1, 0.5);
            this.tra -= map(this.a, windowHeight / 20, windowHeight / 3, 0.01, 0.5);
        }
        if (this.s < 0) {
            this.s = 0;
        }
        if (this.tra < 0) {
            this.tra = 0;
        }
    }
}
