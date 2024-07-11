document.addEventListener('DOMContentLoaded', function() {
    // Initialize Leaflet map
    const map = L.map('map').setView([20.5937, 78.9629], 5); // Centered around India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
        draw: {
            polygon: true,
            polyline: true,
            rectangle: true,
            circle: true,
            marker: true,
            circlemarker: true,
        },
        edit: {
            featureGroup: drawnItems
        }
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (event) {
        const layer = event.layer;
        const type = event.layerType;

        if (type === 'polygon') {
            const coordinates = layer.getLatLngs()[0].map(latlng => [latlng.lng, latlng.lat]);
            fetch('/calculate_area', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ coordinates: coordinates }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    layer.bindPopup('Area: ' + data.area_sq_km.toFixed(2) + ' sq km').openPopup();
                } else {
                    layer.bindPopup('Error calculating area').openPopup();
                }
            })
            .catch((error) => {
                layer.bindPopup('Error calculating area').openPopup();
                console.error('Error:', error);
            });
        }

        drawnItems.addLayer(layer);
    });

    // Add a scalebar to the map
    L.control.scale().addTo(map);

    // Handle point selection
    document.getElementById('option-select-point').addEventListener('click', () => {
        map.once('click', function(e) {
            const lat = e.latlng.lat;
            const lon = e.latlng.lng;
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`Latitude: ${lat}<br>Longitude: ${lon}`)
                .openPopup();
        });
    });

    // Handle manual coordinate entry
    document.getElementById('add-manual-marker').addEventListener('click', () => {
        const lat = parseFloat(document.getElementById('manual-lat').value);
        const lon = parseFloat(document.getElementById('manual-lon').value);
        if (!isNaN(lat) && !isNaN(lon)) {
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`Latitude: ${lat}<br>Longitude: ${lon}`)
                .openPopup();
        } else {
            alert('Please enter valid coordinates.');
        }
    });

    // Show/Hide manual coordinate input based on selected option
    document.querySelectorAll('input[name="method"]').forEach((radio) => {
        radio.addEventListener('change', function() {
            const manualCoordinates = document.getElementById('manual-coordinates');
            if (document.getElementById('option-manual').checked) {
                manualCoordinates.style.display = 'block';
            } else {
                manualCoordinates.style.display = 'none';
            }
        });
    });

    // Handle form buttons
    document.querySelector('.btn.clear').addEventListener('click', () => {
        document.querySelectorAll('input').forEach(input => input.value = '');
        drawnItems.clearLayers();
    });

    document.querySelector('.btn.run').addEventListener('click', () => {
        const email = document.getElementById('email').value;
        if (email) {
            fetch('/run_assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            })
            .then(response => response.json())
            .then(data => {
                alert('Assessment is being processed. Results will be sent to your email.');
            })
            .catch((error) => {
                alert('Error running assessment. Please try again.');
                console.error('Error:', error);
            });
        } else {
            alert('Please enter a valid email address.');
        }
    });

    document.querySelector('.btn.menu').addEventListener('click', () => {
        window.location.href = '/';
    });

    function showTabContent(event) {
        const selectedValue = event.target.value;
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(selectedValue).classList.add('active');
    }

    // Update slider values dynamically
    const pvCapexSlider = document.getElementById('pv-capex');
    const pvCapexValue = document.getElementById('pv-capex-value');
    pvCapexValue.innerText = pvCapexSlider.value + ' ₹/kW';
    pvCapexSlider.addEventListener('input', function() {
        pvCapexValue.innerText = pvCapexSlider.value + ' ₹/kW';
    });

    const windCapexSlider = document.getElementById('wind-capex');
    const windCapexValue = document.getElementById('wind-capex-value');
    windCapexValue.innerText = windCapexSlider.value + ' ₹/kW';
    windCapexSlider.addEventListener('input', function() {
        windCapexValue.innerText = windCapexSlider.value + ' ₹/kW';
    });

    const hybridCapexSlider = document.getElementById('hybrid-capex');
    const hybridCapexValue = document.getElementById('hybrid-capex-value');
    hybridCapexValue.innerText = hybridCapexSlider.value + ' ₹/kW';
    hybridCapexSlider.addEventListener('input', function() {
        hybridCapexValue.innerText = hybridCapexSlider.value + ' ₹/kW';
    });

    const ironOrePriceSlider = document.getElementById('iron-ore-price');
    const ironOrePriceValue = document.getElementById('iron-ore-price-value');
    ironOrePriceValue.innerText = ironOrePriceSlider.value + ' ₹/tonne';
    ironOrePriceSlider.addEventListener('input', function() {
        ironOrePriceValue.innerText = ironOrePriceSlider.value + ' ₹/tonne';
    });

    const discountRateSlider = document.getElementById('discount-rate');
    const discountRateValue = document.getElementById('discount-rate-value');
    discountRateValue.innerText = discountRateSlider.value + ' %';
    discountRateSlider.addEventListener('input', function() {
        discountRateValue.innerText = discountRateSlider.value + ' %';
    });

    // Toggle between 2D and 3D view
    const cesiumContainer = document.getElementById('cesiumContainer');
    const toggle3DButton = document.getElementById('toggle-3d');
    let is3DView = false;
    const viewer = new Cesium.Viewer(cesiumContainer, {
        terrainProvider: Cesium.createWorldTerrain(),
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
    });

    toggle3DButton.addEventListener('click', () => {
        if (is3DView) {
            cesiumContainer.style.display = 'none';
            map._container.style.display = 'block';
        } else {
            const center = map.getCenter();
            viewer.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(center.lng, center.lat, 1000000.0)
            });
            cesiumContainer.style.display = 'block';
            map._container.style.display = 'none';
        }
        is3DView = !is3DView;
    });

    // Example marker
    var exampleMarker = L.marker([28.7041, 77.1025]).addTo(map)
        .bindPopup('Example Marker')
        .openPopup();

    document.getElementById('select-point').addEventListener('click', function() {
        alert('Select Point functionality will be implemented here.');
    });
});

function togglePanel() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}
