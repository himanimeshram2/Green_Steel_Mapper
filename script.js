document.addEventListener('DOMContentLoaded', function() {
    // Initialize Leaflet map
    var map = L.map('map').setView([-25.2744, 133.7751], 4);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Example marker
    var marker = L.marker([-25.2744, 133.7751]).addTo(map)
        .bindPopup('Example Marker')
        .openPopup();

    document.getElementById('select-point').addEventListener('click', function() {
        alert('Select Point functionality will be implemented here.');
    });

    // Initialize Cesium viewer
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0N2NkOWMyZS0wNGI5LTQ3ZjQtYWNmMy0wOGY2MDNhMGU3MzAiLCJpZCI6MjI2Nzk4LCJpYXQiOjE3MjAyNzUxNDF9.qOUx_uvZXt1hoTmnrPHerfr1thbJF0nWZb9EZBfRnqc';
    var viewer = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: Cesium.createWorldTerrain(),
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        timeline: false,
        homeButton: false,
        sceneModePicker: false,
        geocoder: false,
        navigationHelpButton: false,
        infoBox: false,
        selectionIndicator: false,
        navigationInstructionsInitiallyVisible: false
    });

    window.switchTo2D = function() {
        document.getElementById('map').classList.remove('hidden');
        document.getElementById('cesiumContainer').classList.add('hidden');
    };

    window.switchTo3D = function() {
        document.getElementById('map').classList.add('hidden');
        document.getElementById('cesiumContainer').classList.remove('hidden');
        viewer.resize();
        viewer.scene.requestRender();
    };
});

function togglePanel() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}
