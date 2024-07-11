document.addEventListener('DOMContentLoaded', (event) => {
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

    // Function to update slider value display
    function updateSliderValue(slider, displayElement) {
        displayElement.textContent = slider.value;
    }

    // Initial display
    updateSliderValue(pvCapexSlider, pvCapexValue);
    updateSliderValue(windCapexSlider, windCapexValue);
    updateSliderValue(hybridCapexSlider, hybridCapexValue);
    updateSliderValue(ironOrePriceSlider, ironOrePriceValue);
    updateSliderValue(discountRateSlider, discountRateValue);

    // Event listeners
    pvCapexSlider.addEventListener('input', () => updateSliderValue(pvCapexSlider, pvCapexValue));
    windCapexSlider.addEventListener('input', () => updateSliderValue(windCapexSlider, windCapexValue));
    hybridCapexSlider.addEventListener('input', () => updateSliderValue(hybridCapexSlider, hybridCapexValue));
    ironOrePriceSlider.addEventListener('input', () => updateSliderValue(ironOrePriceSlider, ironOrePriceValue));
    discountRateSlider.addEventListener('input', () => updateSliderValue(discountRateSlider, discountRateValue));
});
