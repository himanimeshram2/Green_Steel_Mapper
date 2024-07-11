document.addEventListener('DOMContentLoaded', (event) => {
    // Slider value display
    const pvCapexSlider = document.getElementById('pv-capex');
    const pvCapexValue = document.getElementById('pv-capex-value');

    const windCapexSlider = document.getElementById('wind-capex');
    const windCapexValue = document.getElementById('wind-capex-value');

    const hybridCapexSlider = document.getElementById('hybrid-capex');
    const hybridCapexValue = document.getElementById('hybrid-capex-value');

    const ironOrePriceSlider = document.getElementById('iron-ore-price');
    const ironOrePriceValue = document.getElementById('iron-ore-price-value');

    const discountRateSlider = document.getElementById('discount-rate');
    const discountRateValue = document.getElementById('discount-rate-value');

    function updateSliderValue(slider, displayElement) {
        displayElement.textContent = slider.value;
    }

    updateSliderValue(pvCapexSlider, pvCapexValue);
    updateSliderValue(windCapexSlider, windCapexValue);
    updateSliderValue(hybridCapexSlider, hybridCapexValue);
    updateSliderValue(ironOrePriceSlider, ironOrePriceValue);
    updateSliderValue(discountRateSlider, discountRateValue);

    pvCapexSlider.addEventListener('input', () => updateSliderValue(pvCapexSlider, pvCapexValue));
    windCapexSlider.addEventListener('input', () => updateSliderValue(windCapexSlider, windCapexValue));
    hybridCapexSlider.addEventListener('input', () => updateSliderValue(hybridCapexSlider, hybridCapexValue));
    ironOrePriceSlider.addEventListener('input', () => updateSliderValue(ironOrePriceSlider, ironOrePriceValue));
    discountRateSlider.addEventListener('input', () => updateSliderValue(discountRateSlider, discountRateValue));

    // Leaflet map initialization
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Cesium map initialization
    const viewer = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: Cesium.createWorldTerrain()
    });

    function switchTo2D() {
        document.getElementById('map').style.display = 'block';
        document.getElementById('cesiumContainer').style.display = 'none';
    }

    function switchTo3D() {
        document.getElementById('map').style.display = 'none';
        document.getElementById('cesiumContainer').style.display = 'block';
    }

    document.getElementById('toggle-3d').addEventListener('click', switchTo3D);
    document.getElementById('toggle-2d').addEventListener('click', switchTo2D);
});
