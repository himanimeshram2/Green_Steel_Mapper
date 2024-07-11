document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    var map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Function to switch to 2D map
    window.switchTo2D = function() {
        map.setView([20.5937, 78.9629], 5);
    };

    // Function to switch to 3D map
    window.switchTo3D = function() {
        alert("3D map view is not yet implemented.");
    };

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

    // 3D Map toggle button
    document.getElementById("toggle-3d-map").addEventListener("click", function() {
        window.switchTo3D();
    
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
