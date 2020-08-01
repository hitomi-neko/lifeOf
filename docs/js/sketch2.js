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

function init() {
    // サイズを指定
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーを作成
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
    camera.position.set(0, 0, +1000);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.BoxBufferGeometry(50, 50, 50);
    const material = new THREE.MeshStandardMaterial();

    for (let i = 0; i < 1000; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 2000;
        mesh.position.y = (Math.random() - 0.5) * 2000;
        mesh.position.z = (Math.random() - 0.5) * 2000;
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;

        group.add(mesh);
    }

    scene.add(new THREE.DirectionalLight(0xff0000, 2)); // 平行光源
    scene.add(new THREE.AmbientLight(0x00ffff)); // 環境光源

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        group.rotateY(0.01);

        // レンダリング
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }
}