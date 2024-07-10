document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
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
});

function togglePanel() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}
