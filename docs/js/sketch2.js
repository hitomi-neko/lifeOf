window.addEventListener('load', init);

document.getElementById("button").onclick = function () {
    let Button = document.getElementById("button");
    let ButtonClass = Button.getAttribute("class");
    let Button1 = document.getElementById("button1");
    let n1 = document.getElementById("num1");
    //ボタンで言葉の切り替え（英語）
    if (ButtonClass == "open") {
        Button.classList.remove('open');
        Button.classList.add('close');
        Button.style.display = "none";
        Button1.classList.remove('open');
        Button1.classList.add('close');
        Button1.style.display = "block";
        n1.classList.remove('item');
        n1.classList.add('col1');
    }
};
document.getElementById("button1").onclick = function () {
    let Button = document.getElementById("button");
    let Button1 = document.getElementById("button1");
    let Button1Class = Button1.getAttribute("class");
    let n1 = document.getElementById("num1");
    if (Button1Class == "close") {
        Button.classList.remove('close');
        Button.classList.add('open');
        Button.style.display = "block";
        Button1.classList.remove('close');
        Button1.classList.add('open');
        Button1.style.display = "none";
        n1.classList.add('item');
        n1.classList.remove('col1');
    }
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