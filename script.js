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

    // Add markers for iron mines in India
    var ironMines = [
        { name: "Mine A", lat: 21.1702, lon: 79.0750 },
        { name: "Mine B", lat: 22.5726, lon: 88.3639 },
        { name: "Mine C", lat: 23.8103, lon: 86.7111 },
        { name: "Mine D", lat: 22.3511, lon: 78.6677 }
    ];

    ironMines.forEach(function(mine) {
        L.marker([mine.lat, mine.lon]).addTo(map)
            .bindPopup("<b>" + mine.name + "</b><br>Latitude: " + mine.lat + "<br>Longitude: " + mine.lon);
    });

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
            toggleButton.style.left = "50px";
        } else {
            toggleButton.style.left = "310px";
        }
        // Trigger map resize to adjust to the new sidebar width
        setTimeout(function() {
            map.invalidateSize();
        }, 300); // Timeout matches the sidebar transition duration
    };
});
