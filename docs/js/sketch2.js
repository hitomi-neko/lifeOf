var showloading = document.getElementById('showloading');
var contents = document.getElementById('main');
window.addEventListener('load', stopload);
function stopload() {
    showloading.classList.add('fadeout-bg');
    contents.classList.remove('hidden');
}
window.addEventListener('load', init);

var styleSheet = document.getElementById("style");
function onload() {
    styleSheet.href = '../style/style.css';
}

document.getElementById("button").onclick = function () {
    let Button = document.getElementById("button");
    let ButtonClass = Button.getAttribute("class");
    let Button1 = document.getElementById("button1");
    if (ButtonClass == "open") {
        Button.classList.remove('open');
        Button.classList.add('close');
        Button.style.display = "none";
        Button1.classList.remove('open');
        Button1.classList.add('close');
        Button1.style.display = "block";
        styleSheet.href = 'style/style2.css';
        for (let i = 0; i < 2; i++) {
            document.getElementById('mono' + (i + 1).toString()).style.display = "none";
            document.getElementById('col' + (i + 1).toString()).style.display = "flex";
        }
    }
};
document.getElementById("button1").onclick = function () {
    let Button = document.getElementById("button");
    let Button1 = document.getElementById("button1");
    let Button1Class = Button1.getAttribute("class");
    if (Button1Class == "close") {
        Button.classList.remove('close');
        Button.classList.add('open');
        Button.style.display = "block";
        Button1.classList.remove('close');
        Button1.classList.add('open');
        Button1.style.display = "none";
        styleSheet.href = 'style/style.css';
        for (let i = 0; i < 2; i++) {
            document.getElementById('mono' + (i + 1).toString()).style.display = "flex";
            document.getElementById('col' + (i + 1).toString()).style.display = "none";
        }
    }
};

document.getElementById("button1").onmouseover = function () {
    let Button1 = document.getElementById("button1");
    Button1.style.opacity = "0.5";
};
document.getElementById("button1").onmouseout = function () {
    let Button1 = document.getElementById("button1");
    Button1.style.opacity = "1.0";
};
document.getElementById("button").onmouseover = function () {
    let Button1 = document.getElementById("button");
    Button1.style.opacity = "0.5";
};
document.getElementById("button").onmouseout = function () {
    let Button1 = document.getElementById("button");
    Button1.style.opacity = "1.0";
};
for (let i = 1; i < 50; i++) {
    document.getElementById('num' + i).onclick = function () {
        let modal = document.getElementById('modal' + i);
        let mcon = document.getElementById('mcon' + i);
        let mtitle = document.getElementById('title' + i);
        let mimage = document.getElementById('image' + i);
        let mimagec = document.getElementById('cimage' + i);
        let mtext = document.getElementById('text' + i);
        let mtextc = document.getElementById('ctext' + i);
        let closeBtn = document.getElementById('closeBtn' + i);
        let body = document.body;
        let main = document.getElementById('main');
        let button = document.getElementById('button');
        let button1 = document.getElementById('button1');
        modal.classList.remove('modalWrap');
        modal.classList.add('modalOpen');
        mcon.classList.add('modalCon');
        mcon.classList.remove('modalWrap');
        mtitle.classList.add('modalTtl');
        mtitle.classList.remove('modalWrap');
        mimage.classList.add('modalCover');
        mimage.classList.remove('modalWrap');
        mimagec.classList.add('modalCoverCol');
        mimage.classList.remove('modalWrap');
        mtext.classList.add('modalText');
        mtext.classList.remove('modalWrap');
        mtextc.classList.add('modalTextCol');
        mtextc.classList.remove('modalWrap');
        closeBtn.classList.add('modalCloseBtn');
        closeBtn.classList.remove('modalWrap');
        body.style.overflow = 'hidden';
        main.style.opacity = '0.5';
        main.style.filter = 'blur(3px)';
        button.style.opacity = '0.5';
        button.style.filter = 'blur(3px)';
        button1.style.opacity = '0.5';
        button1.style.filter = 'blur(3px)';
        closePopUp(closeBtn);
        function closePopUp(elem) {
            if (!elem) return;
            elem.addEventListener('click', function () {
                modal.classList.remove('modalOpen');
                modal.classList.add('modalWarp');
                mcon.classList.remove('modalCon');
                mcon.classList.add('modalWrap');
                mtitle.classList.remove('modalTtl');
                mtitle.classList.add('modalWrap');
                mimage.classList.remove('modalCover');
                mimage.classList.add('modalWrap');
                mimagec.classList.remove('modalCoverCol');
                mimagec.classList.add('modalWrap');
                mtext.classList.remove('modalText');
                mtext.classList.add('modalWrap');
                mtextc.classList.remove('modalTextCol');
                mtextc.classList.add('modalWrap');
                closeBtn.classList.remove('modalCloseBtn');
                closeBtn.classList.add('modalWrap');
                body.style.overflow = 'visible';
                main.style.opacity = '1.0';
                main.style.filter = 'blur(0px)';
                button.style.opacity = '1.0';
                button.style.filter = 'blur(0px)';
                button1.style.opacity = '1.0';
                button1.style.filter = 'blur(0px)';
            })
        }
    };
}

function init() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    var y = 0;
    var a = 5400;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
        antialias: true,
        devicePixelRatio: window.devicePixelRatio
    });
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 50, 2000);

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +a);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.BoxBufferGeometry(50, 50, 50);
    const material = new THREE.MeshStandardMaterial();

    var lines = new THREE.Group();
    const line_material = new THREE.LineBasicMaterial({ color: 0xff379b });
    for (let i = 0; i < 500; i++) {
        var line_geometry = new THREE.Geometry();
        line_geometry.vertices.push(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3((Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000),
            new THREE.Vector3((Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000),
            new THREE.Vector3((Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000),
            new THREE.Vector3((Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000),
            new THREE.Vector3((Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000),
            new THREE.Vector3((Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000, (Math.random() - 0.5) * 8000)
        );
        var newline = new THREE.Line(line_geometry, line_material);
        lines.add(newline);
    }
    scene.add(lines);


    for (let i = 0; i < 4000; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 6000;
        mesh.position.y = (Math.random() - 0.5) * 6000;
        mesh.position.z = (Math.random() - 0.5) * 6000;
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;

        group.add(mesh);
    }

    scene.add(new THREE.DirectionalLight(0xff0000, 2));
    scene.add(new THREE.AmbientLight(0x00ffff));

    window.addEventListener('resize', resize);
    tick();

    function tick() {
        if (y >= 13000) {
            group.rotateY(0.007);
            // lines.rotateY(0.007);
        }
        if (y < 13000 && y >= 12000) {
            group.rotateY(0.006);
            // lines.rotateY(0.006);
        }
        if (y < 12000 && y >= 11000) {
            group.rotateY(0.005);
            // lines.rotateY(0.005);
        }
        if (y < 11000 && y >= 10000) {
            group.rotateY(0.004);
            // lines.rotateY(0.004);
        }
        if (y < 10000 && y >= 8000) {
            group.rotateY(0.003);
            // lines.rotateY(0.003);
        }
        if (y < 8000 && y >= 4000) {
            group.rotateY(0.002);
            // lines.rotateY(0.002);
        }
        if (y < 4000) {
            group.rotateY(0.001);
            // lines.rotateY(0.001);
        }

        y = 14000 - window.scrollY;
        if (a > 1000) {
            a -= y * 0.00007;
        } else {
            a = 1000;
        }
        camera.position.set(0, 0, +a);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // レンダリング
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }

    function resize() {
        const widthR = window.innerWidth;
        const heightR = window.innerHeight;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(widthR, heightR);

        camera.aspect = widthR / heightR;
        camera.updateProjectionMatrix();
    }
}