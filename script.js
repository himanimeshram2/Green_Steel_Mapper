document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    var map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Slider functionality
    document.getElementById("pv-capex").addEventListener("input", function() {
        document.getElementById("pv-capex-value").textContent = this.value;
    });

    document.getElementById("wind-capex").addEventListener("input", function() {
        document.getElementById("wind-capex-value").textContent = this.value;
    });

    document.getElementById("hybrid-capex").addEventListener("input", function() {
        document.getElementById("hybrid-capex-value").textContent = this.value;
    });

    document.getElementById("iron-ore-price").addEventListener("input", function() {
        document.getElementById("iron-ore-price-value").textContent = this.value;
    });

    document.getElementById("discount-rate").addEventListener("input", function() {
        document.getElementById("discount-rate-value").textContent = this.value;
    });

    // 2D/3D toggle functionality
    var is3D = false;
    var cesiumViewer;

    document.getElementById("toggle-3d-map").addEventListener("click", function() {
        if (!is3D) {
            // Switch to 3D
            if (!cesiumViewer) {
                cesiumViewer = new Cesium.Viewer('map', {
                    imageryProvider: new Cesium.OpenStreetMapImageryProvider({
                        url: 'https://a.tile.openstreetmap.org/'
                    }),
                    baseLayerPicker: false,
                    geocoder: false,
                    homeButton: false,
                    infoBox: false,
                    sceneModePicker: false,
                    selectionIndicator: false,
                    timeline: false,
                    navigationHelpButton: false,
                    animation: false
                });
            } else {
                cesiumViewer.container.style.display = 'block';
            }
            map.remove();
            this.innerHTML = '<i class="fas fa-map"></i> 2D';
        } else {
            // Switch to 2D
            cesiumViewer.container.style.display = 'none';
            map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            this.innerHTML = '<i class="fas fa-globe"></i> 3D';
        }
        is3D = !is3D;

    // Function to update slider value display
    function updateSliderValue(id, value) {
        document.getElementById(id).textContent = value;
    }

    // Toggle panel functionality
    window.togglePanel = function() {
        var sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
    };
});
