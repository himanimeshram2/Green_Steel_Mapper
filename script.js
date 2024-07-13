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
        }),
        "Stamen Toner": L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under ODbL.'
        }),
        "Stamen Terrain": L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under ODbL.'
        }),
        "Stamen Watercolor": L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under ODbL.'
        }),
        "CartoDB Voyager": L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
        }),
        "CartoDB Positron": L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
        }),
        "CartoDB Dark Matter": L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/dark_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
        }),
        "USGS National Map": L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Map data courtesy USGS'
        }),
        "Thunderforest Transport": L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=YOUR_API_KEY', {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abc'
        }),
        "Thunderforest Landscape": L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=YOUR_API_KEY', {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abc'
        }),
        "Thunderforest Outdoors": L.tileLayer('https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=YOUR_API_KEY', {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abc'
        }),
        "Thunderforest Pioneer": L.tileLayer('https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=YOUR_API_KEY', {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abc'
        }),
        "Thunderforest Mobile Atlas": L.tileLayer('https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=YOUR_API_KEY', {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            subdomains: 'abc'
        }),
        "OpenTopoMap": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
        })
    };

    // Add OpenStreetMap layer as the default
    baseLayers["Esri World Imagery"].addTo(map);

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
