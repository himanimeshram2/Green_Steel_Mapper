// Initialize Leaflet map
const map = L.map('map').setView([20.5937, 78.9629], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Initialize Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.OpenStreetMapImageryProvider({
        url : 'https://a.tile.openstreetmap.org/'
    }),
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false
});
viewer.scene.mode = Cesium.SceneMode.SCENE2D;

function switchTo2D() {
    viewer.scene.mode = Cesium.SceneMode.SCENE2D;
    document.getElementById('cesiumContainer').style.display = 'block';
    document.getElementById('map').style.display = 'none';
}

function switchTo3D() {
    viewer.scene.mode = Cesium.SceneMode.SCENE3D;
    document.getElementById('cesiumContainer').style.display = 'block';
    document.getElementById('map').style.display = 'none';
}

// Slider event listeners to display values
document.getElementById('pv-capex').addEventListener('input', function() {
    document.getElementById('pv-capex-value').innerText = this.value;
});
document.getElementById('wind-capex').addEventListener('input', function() {
    document.getElementById('wind-capex-value').innerText = this.value;
});
document.getElementById('hybrid-capex').addEventListener('input', function() {
    document.getElementById('hybrid-capex-value').innerText = this.value;
});
document.getElementById('iron-ore-price').addEventListener('input', function() {
    document.getElementById('iron-ore-price-value').innerText = this.value;
});
document.getElementById('discount-rate').addEventListener('input', function() {
    document.getElementById('discount-rate-value').innerText = this.value;
});

// Toggle sidebar visibility
function togglePanel() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}
