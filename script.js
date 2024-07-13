document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    var map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

    // Basemap layers
    var baseLayers = {
        "Esri World Imagery": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }),
        "OpenTopoMap": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
        }),
        "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
    };

    // Add Esri World Imagery layer as the default
    baseLayers["Esri World Imagery"].addTo(map);

    // Layer control
    L.control.layers(baseLayers).addTo(map);

    // Ensure the map resizes correctly
    map.invalidateSize();

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

    // Toggle sidebar
    window.togglePanel = function() {
        var sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("collapsed");
        // Adjust the toggle button's left position when sidebar is collapsed/expanded
        var toggleButton = document.getElementById("toggle-button");
        if (sidebar.classList.contains("collapsed")) {
            toggleButton.style.left = "0px";
        } else {
            toggleButton.style.left = "-40px";
        }
        // Trigger map resize to adjust to the new sidebar width
        map.invalidateSize();
    };
});
