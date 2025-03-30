import './style.css'



// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color("lightblue")

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000)
camera.position.setZ(30)
camera.position.setY(20)

//renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg") })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.shadowMap.enabled = true

//light & lightHelper
const light = new THREE.SpotLight(0xeeeeee, 19999999, 10000)
scene.add(light)
light.castShadow = true
light.position.set(1000, 1030, 1000)

//scene.add(lightHelper)
light.shadow.mapSize.width = 5548; // Set a higher resolution for the shadow map
light.shadow.mapSize.height = 500000548; // This will make the shadow smoother

//player controls
document.addEventListener("keydown", (e) => {
    if (e.key === "W" || e.key === "w") {
        playerMesh.position.z -= 1
    } else if (e.key === "S" || e.key === "s") {
        playerMesh.position.z += 1
    } else if (e.key === "A" || e.key === "a") {
        playerMesh.position.x -= 1
    } else if (e.key === "D" || e.key === "d") {
        playerMesh.position.x += 1
    }
})

//planet 
const planetGeometry = new THREE.BoxGeometry(25, 25, 25)
const planetMaterial = new THREE.MeshPhongMaterial({ color: "gray" })
const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial)
scene.add(planetMesh)
planetMesh.position.setY(40)
planetMesh.position.setZ(20)
planetMesh.position.setX(20)
planetMesh.castShadow = true


//controls
const controls = new OrbitControls(camera, renderer.domElement)

//[player]
const playerGeometry = new THREE.CylinderGeometry(3, 3, 10, 20)
const playerMaterial = new THREE.MeshPhongMaterial({ color: "blue" })
const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial)
playerMesh.castShadow = true
playerMesh.receiveShadow = true
scene.add(playerMesh)
playerMesh.position.setY(5)


//ground 
const groundGeometry = new THREE.PlaneGeometry(100, 100)
const groundMaterial = new THREE.MeshPhongMaterial({ color: "darkGreen", side: THREE.DoubleSide })
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
scene.add(groundMesh)
groundMesh.rotation.x = -Math.PI / 2
groundMesh.receiveShadow = true


//animate
function animate() {
    requestAnimationFrame(animate)
    planetMesh.rotation.y += 0.003
    planetMesh.rotation.z += 0.003
    planetMesh.rotation.x += 0.003
    renderer.render(scene, camera)
}
animate()
