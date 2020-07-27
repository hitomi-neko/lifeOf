window.addEventListener('load', init);

function init() {
    // サイズを指定
    const width = window.innerWidth;
    const height = window.innerHeight;
    let rot = 0; // 角度
    let mouseX;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, 1000);

    const controls = new THREE.OrbitControls(camera);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);

    const geometry = new THREE.SphereGeometry(300, 30, 30);
    // 画像を読み込む
    const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    // 3D空間にメッシュを追加
    scene.add(mesh);

    document.addEventListener('mousemove', event => {
        mouseX = event.pageX;
    });


    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        mesh.rotation.y += 0.01;
        // レンダリング
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }
}