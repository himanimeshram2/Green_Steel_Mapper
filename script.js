document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    var map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

    // Basemap layers
    var baseLayers = {
        "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        "Esri World Imagery": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }),
        "HERE Satellite": L.tileLayer('https://{s}.sat.traffic.maps.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?apikey=l12M94mMO4GxM0gjVFm5Jmfq9dNDU9DT8Ji5VMbZH3s', {
            attribution: 'Map &copy; 1987-2021 <a href="https://developer.here.com">HERE</a>',
            subdomains: '1234'
        }),
        "Maxar Satellite": L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Maxar, and the GIS User Community'
        })
        // Add other tile providers as needed
    };

    // Add OpenStreetMap layer as the default
    baseLayers["OpenStreetMap"].addTo(map);

    // Layer control
    L.control.layers(baseLayers).addTo(map);

    // Function to create FontAwesome icon markers
    function createFontAwesomeMarker(iconClass, color) {
        return L.divIcon({
            html: `<i class="fa ${iconClass} fa-icon" style="color:${color};"></i>`,
            className: 'myDivIcon',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
    }

    // Example of adding FontAwesome markers
    L.marker([28.6139, 77.2090], {icon: createFontAwesomeMarker('fa-map-marker-alt', 'blue')}).addTo(map)
        .bindPopup("<b>New Delhi</b><br>Capital of India").openPopup();

    L.marker([19.0760, 72.8777], {icon: createFontAwesomeMarker('fa-map-marker-alt', 'green')}).addTo(map)
        .bindPopup("<b>Mumbai</b><br>Financial Capital of India").openPopup();

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
    };
});
