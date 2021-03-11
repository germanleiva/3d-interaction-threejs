// Our Javascript will go here.
let renderer, camera, scene
let cameraControls

function init() {
    let canvasWidth = window.innerWidth
    let canvasHeight = window.innerHeight

    // RENDERER
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvasWidth, canvasHeight);

    // CAMERA
    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 40000);
    camera.position.set(-700, 500, -1600);

    // CONTROLS
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0, 600, 0);

    fillScene()

    document.body.appendChild(renderer.domElement);
}

function fillScene() {
    // SCENE
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x808080, 3000, 6000);

    // LIGHTS
    var ambientLight = new THREE.AmbientLight(0x222222);
    var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(200, 400, 500);

    var light2 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light2.position.set(-400, 200, -300);

    scene.add(ambientLight);
    scene.add(light);
    scene.add(light2);

    createCup();
    var stairs = createStairs();
    scene.add(stairs);
}

function createStairs() {

    // MATERIALS
    var stepMaterialVertical = new THREE.MeshLambertMaterial({
        color: 0xA85F35
    });
    var stepMaterialHorizontal = new THREE.MeshLambertMaterial({
        color: 0xBC7349
    });

    var stepWidth = 500;
    var stepSize = 200;
    var stepThickness = 50;
    // height from top of one step to bottom of next step up
    var verticalStepHeight = stepSize;
    var horizontalStepDepth = stepSize * 2;

    var stepHalfThickness = stepThickness / 2;

    // +Y direction is up
    // Define the two pieces of the step, vertical and horizontal
    // THREE.BoxGeometry takes (width, height, depth)
    var stepVertical = new THREE.BoxGeometry(stepWidth, verticalStepHeight, stepThickness);
    var stepHorizontal = new THREE.BoxGeometry(stepWidth, stepThickness, horizontalStepDepth);
    var stepMesh;

    for (let index = 0; index < 6; index++) {

        let yDisplacement = (verticalStepHeight + stepThickness) * index
        let zDisplacement = (horizontalStepDepth - stepThickness) * index

        // Make and position the vertical part of the step
        stepMesh = new THREE.Mesh(stepVertical, stepMaterialVertical);
        // The position is where the center of the block will be put.
        // You can define position as THREE.Vector3(x, y, z) or in the following way:
        stepMesh.position.x = 0;			// centered at origin
        stepMesh.position.y = verticalStepHeight / 2 + yDisplacement;	// half of height: put it above ground plane
        stepMesh.position.z = zDisplacement;			// centered at origin
        scene.add(stepMesh);

        // Make and position the horizontal part
        stepMesh = new THREE.Mesh(stepHorizontal, stepMaterialHorizontal);
        stepMesh.position.x = 0;
        // Push up by half of horizontal step's height, plus vertical step's height
        stepMesh.position.y = stepThickness / 2 + verticalStepHeight + yDisplacement;
        // Push step forward by half the depth, minus half the vertical step's thickness
        stepMesh.position.z = horizontalStepDepth / 2 - stepHalfThickness + zDisplacement;
        scene.add(stepMesh);
    }
}

function createCup() {
    var cupMaterial = new THREE.MeshLambertMaterial({ color: 0xFDD017 });
    // THREE.CylinderGeometry takes (radiusTop, radiusBottom, height, segmentsRadius)
    var cupGeo = new THREE.CylinderGeometry(200, 50, 400, 32);
    var cup = new THREE.Mesh(cupGeo, cupMaterial);
    cup.position.x = 0;
    cup.position.y = 1725;
    cup.position.z = 1925;
    scene.add(cup);
    cupGeo = new THREE.CylinderGeometry(100, 100, 50, 32);
    cup = new THREE.Mesh(cupGeo, cupMaterial);
    cup.position.x = 0;
    cup.position.y = 1525;
    cup.position.z = 1925;
    scene.add(cup);
}

function update() {
    requestAnimationFrame(update)
    cameraControls.update()
    renderer.render(scene, camera);
}

init()
update()

