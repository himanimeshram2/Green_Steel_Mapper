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

    // Iron mines data
    var ironMines = [
        { metallogenesis: "BABABUDAN RANGE", locality: "ATTIGUNDI-GALLIKERA", lat: 13.41666667, lon: 75.75, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "BABABUDAN RANGE", locality: "KEMMANAGUNDI", lat: 13.53333333, lon: 75.75, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "BAILADILA BELT", locality: "BAILADILA", lat: 18.66666667, lon: 81.18333333, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "BELLARY (SANDUR SCHIST BELT)", locality: "OBULAPURAM", lat: 15.07083333, lon: 76.83888889, hostrock: "SHALE,PHYLLITE,BHQ", morphogenesis: "BEDDED" },
        { metallogenesis: "BONAI-BADAMPAHAR BELT", locality: "BADAMGARH", lat: 21.8, lon: 85.26666667, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-BADAMPAHAR BELT", locality: "BALIA-KHEJURDARI", lat: 21.83333333, lon: 85.26666667, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-BADAMPAHAR BELT", locality: "FULIHARI-KURMITAR-SILJORA", lat: 21.75, lon: 85.15, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-BADAMPAHAR BELT", locality: "KALTA", lat: 21.85, lon: 85.13333333, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-BADAMPAHAR BELT", locality: "MANKAMACHA", lat: 21.8, lon: 85.3, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-KEONJHAR RANGE BELT", locality: "KHANDBAND", lat: 21.95, lon: 85.4, hostrock: "BHQ,SHALE", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-KEONJHAR RANGE BELT", locality: "NAOGOWN", lat: 22, lon: 85.11666667, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA BELT", locality: "BARAIBURU", lat: 22.16666667, lon: 85.16666667, hostrock: "BFQ,SHALE", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA BELT", locality: "KARAMPADA", lat: 22, lon: 85.16666667, hostrock: "BHQ,SHALE", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA PROVINCE", locality: "AJITBURU", lat: 22.21666667, lon: 85.38333333, hostrock: "BHQ,SHALE-INTERLAYERED WITH LAVA", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA PROVINCE", locality: "BARAJAMDA", lat: 22.08333333, lon: 85.33333333, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA FLOW", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA PROVINCE", locality: "GHATKURI", lat: 22.25, lon: 85.41666667, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA PROVINCE", locality: "ITAR-BALIJODI", lat: 22.33333333, lon: 85.58333333, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA FLOWS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA PROVINCE", locality: "JODA", lat: 22.01666667, lon: 85.43333333, hostrock: "BHJ,SHALE", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA PROVINCE", locality: "KANTORIA", lat: 22.16666667, lon: 85.41666667, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA FLOWS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA PROVINCE", locality: "KUMITRA", lat: 22.16666667, lon: 85.5, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA FLOWS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA PROVINCE", locality: "MERALGORA", lat: 22.11666667, lon: 85.55, hostrock: "BHQ,SHALE,BHQ", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA PROVINCE", locality: "NOAMUNDI", lat: 22.15, lon: 85.48333333, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA FLOWS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "BONAI-NOAMUNDI-JAMDA PROVINCE", locality: "THAKURANI", lat: 22.13583333, lon: 85.5, hostrock: "BHQ,SHALE INTERLAYERED WITH LAVA FLOWS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "CHIRIA-MANOHARPUKUR SECTOR", locality: "NOTABURU", lat: 22.3, lon: 85.36666667, hostrock: "SHALE,BHQ", morphogenesis: "BEDDED-SEDIMENTARY" },
        { metallogenesis: "CHIRIA-MANOHARPUKUR SECTOR", locality: "CHIRIA", lat: 22.3, lon: 85.28333333, hostrock: "BHJ,QTZT,QTZ.SCHIST,PHYLLITE", morphogenesis: "BEDDED-SEDIMENTARY" },
        { metallogenesis: "CHIRIA-MANOHARPUKUR SECTOR", locality: "NOTABURU", lat: 22.3, lon: 85.36666667, hostrock: "BHJ,QTZT,PHYLLITE", morphogenesis: "STRATIFORM-SEDIMENTARY" },
        { metallogenesis: "CHITRADURGA BELT", locality: "BELLENAHALLI", lat: 13.4, lon: 76.65, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "CHITRADURGA BELT", locality: "BHIMA-SAMUDRA", lat: 14.21666667, lon: 76.23333333, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "CHITRADURGA BELT", locality: "CHIKANYAKANAHALLI", lat: 13.4, lon: 76.61666667, hostrock: "BHQ,METAVOLCANICS,METABASICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "CHITRADURGA BELT", locality: "KADALAGUDDA", lat: 14.16666667, lon: 76.20833333, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "CHITRADURGA BELT", locality: "MEDIKERIPURA", lat: 14.08333333, lon: 76.58333333, hostrock: "BHQ,PHYLLITE,METAVLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "DALLI-RAJHARA BELT", locality: "DALLI-RAJHARA", lat: 20.55972222, lon: 81.0125, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "DALLI-RAJHARA BELT", locality: "MAHAMAYA-KAUCHAR", lat: 20.47472222, lon: 80.99166667, hostrock: "METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "GARUMAHISANI PROVINCE", locality: "BHITARAMDA", lat: 22.13333333, lon: 86.20833333, hostrock: "BHQ,PHYLLITE WITH VOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "GARUMAHISANI PROVINCE", locality: "BHIYABASA", lat: 22.11666667, lon: 86.18333333, hostrock: "BHQ,PHYLLITE WITH VOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "GARUMAHISANI PROVINCE", locality: "DUBLABERA", lat: 22.45, lon: 86.25, hostrock: "METAVOLCANICS-METASEDIMENTS", morphogenesis: "-" },
        { metallogenesis: "GARUMAHISANI PROVINCE", locality: "PURNAPANI", lat: 22.13333333, lon: 86.2, hostrock: "BHQ,PHYLLITE WITH VOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "GARUMAHISANI PROVINCE", locality: "SULAIPET", lat: 22.13333333, lon: 86.2, hostrock: "BHQ,PHYLLITE WITH VOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "GARUMAHISANI PROVINCE (RAIRANGPUR BELT)", locality: "BETJHARAN", lat: 22.16666667, lon: 86.41666667, hostrock: "GABBRO-ANORTHOSITE", morphogenesis: "CONCORDANT" },
        { metallogenesis: "GARUMAHISANI PROVINCE (RAIRANGPUR BELT)", locality: "BISAI", lat: 22.16666667, lon: 86.33333333, hostrock: "GABBRO-ANORTHSITE", morphogenesis: "INTRUSSIVE-MAGMATIC" },
        { metallogenesis: "GARUMAHISANI PROVINCE (RAIRANGPUR BELT)", locality: "KUMARDHUBI", lat: 22.25, lon: 86.25, hostrock: "GABBRO-ANORTHOSITE", morphogenesis: "CONCORDANT-MAGMATIC" },
        { metallogenesis: "GARUMAHISANI PROVINCE (RAIRANGPUR BELT)", locality: "RAIRANGPUR", lat: 22.25, lon: 86.08333333, hostrock: "GABBRO-ANORTHOSITE", morphogenesis: "MAGMATIC" },
        { metallogenesis: "KANJAMALLAI-ATTUR  BELT", locality: "ALAMBADI", lat: 12.11666667, lon: 78.65, hostrock: "BMQ", morphogenesis: "BEDDED-SEDIMENTARY ( TAMILNADU TYPE)" },
        { metallogenesis: "KANJAMALLAI-ATTUR  BELT", locality: "ATTUR", lat: 11.58333333, lon: 78.58333333, hostrock: "BMQ", morphogenesis: "BEDDED-SEDIMENTARY ( TAMILNADU TYPE)" },
        { metallogenesis: "KANJAMALLAI-ATTUR  BELT", locality: "CHITTORI-TAINANDAMALAI", lat: 11.83333333, lon: 78.5, hostrock: "BMQ", morphogenesis: "BEDDED-SEDIMENTARY ( TAMILNADU TYPE)" },
        { metallogenesis: "KANJAMALLAI-ATTUR  BELT", locality: "KANJAMALAI", lat: 11.65, lon: 78.16666667, hostrock: "BMQ IN CHARNOCKITE", morphogenesis: "BEDDED-SEDIMENTARY ( TAMILNADU TYPE)" },
        { metallogenesis: "KANJAMALLAI-ATTUR  BELT", locality: "VALAYAPATHI-TATTAYANGIPETTAI", lat: 11.17083333, lon: 78.2, hostrock: "BMQ INTERBEDDED WITH PYROXENE GNEISS", morphogenesis: "BEDDED-SEDIMENTARY ( TAMILNADU TYPE)" },
        { metallogenesis: "KAPPALGUDDA (SHIMOGA SCHIST) BELT", locality: "KAPPALGUDDA", lat: 15.23333333, lon: 74.71666667, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "NEB (SANDUR SCHIST BELT)", locality: "KARINAGUR", lat: 15.23416667, lon: 76.43805556, hostrock: "METASEDIMENTS-METAVOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "NEB (SANDUR SCHIST BELT)", locality: "MADERAHALLI", lat: 15.2, lon: 76.46666667, hostrock: "METASEDIMENTS,METAVOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "NEB (SANDUR SCHIST BELT)", locality: "PAPINAYAKANAHALLI", lat: 15.21666667, lon: 76.425, hostrock: "METASEDIMENTS,METAVOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "NEB RANGE (SANDUR SCHIST BELT)", locality: "INGILIGI", lat: 15.20611111, lon: 76.44166667, hostrock: "PHYLLITE,SCHIST,METAVOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "NEB RANGE(SANDUR BELT)", locality: "JAISINGPUR", lat: 15.18333333, lon: 76.45, hostrock: "METASEDIMENT AND METAVOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "NEB(SANDUR SCHIST BELT)", locality: "KARADIKOLLA", lat: 15.21666667, lon: 76.46666667, hostrock: "METASEDIMENT,METAVOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "NEB(SANDUR SCHIST BELT)", locality: "SANDUR", lat: 15.20833333, lon: 76.45833333, hostrock: "METASEDIMENT,METAVOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "NEB(SANDUR SCHIST BELT)", locality: "SANKALAPURAM", lat: 15.2375, lon: 76.41666667, hostrock: "METASEDIMENT,METAVOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "NELLORE BELT", locality: "VENUMBAKA-RASANUR", lat: 14.07222222, lon: 79.91111111, hostrock: "PHYLLITE,SCHIST", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "NOAMUNDI-JAMDA SECTOR", locality: "MALANGTOLI", lat: 22.08333333, lon: 85.33333333, hostrock: "BHJ,SHALE", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "NOAMUNDI-JAMDA SECTOR", locality: "NUIA", lat: 22.15833333, lon: 85.33333333, hostrock: "SHALE,BMQ,TUFF,META VOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "NUGGIHALLI BELT", locality: "NUGGIHALLI", lat: 13.0125, lon: 76.43333333, hostrock: "ULTRABASICS", morphogenesis: "CONCORDANT-MAGMATIC" },
        { metallogenesis: "RAMANDURG RANGE(SHIMOGA SCHIST) BELT", locality: "RAMANDURG", lat: 15.18666667, lon: 76.4, hostrock: "METASEDIMENTS-METAVOLCANICS", morphogenesis: "STRATABOUND-CONCORDANT" },
        { metallogenesis: "ROWGHAT BELT", locality: "ROWGHAT", lat: 19.9, lon: 81.16666667, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "SANDUR BELT-BELLARY SECTOR", locality: "HALKUNDI-HONNAHALI", lat: 15.1, lon: 76.86666667, hostrock: "BHQ,METAVOLCANICS,METAARGILLITE", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "SANDUR BELT-BTV RANGE", locality: "BELEGAL-HARAGONDONA", lat: 15.1, lon: 76.73333333, hostrock: "BHQ,METAVOLCANICS,METAPELITE", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "SANDUR BELT-BTV RANGE", locality: "VITTALPURAM", lat: 15.16666667, lon: 76.5, hostrock: "BHQ,METAVLCANICS,METAPELITE", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "SANDUR BELT-KUMARSWAMI-DONIMAL", locality: "DONIMALAI", lat: 15.05, lon: 76.61666667, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "BEDDED" },
        { metallogenesis: "SANDUR SCHIST BELT-NEB RANGE", locality: "KALLAHALLI", lat: 15.21666667, lon: 76.41666667, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "SANDUR-KUMARSWAMI-DONIMALAI RANGE", locality: "KUMARSWAMI", lat: 14.91666667, lon: 76.91666667, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "BEDDED" },
        { metallogenesis: "SANDUR-KUMARSWAMI-DONIMALAI RANGE", locality: "NAVALUTTI", lat: 15.41666667, lon: 76.63333333, hostrock: "BHQ,METAPELITE,METAVOLCANICS(SANDUR SCH)", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "SANDUR-UBBALAGUNDI RANGE", locality: "NARAYANPURA", lat: 15.5, lon: 76.75, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "BEDDED-VOLCANOSEDIMENTARY" },
        { metallogenesis: "SATYAMANGALAM-AJJUR(GRANULITE) BELT", locality: "AJJUR", lat: 11.43333333, lon: 76.8, hostrock: "BMQ", morphogenesis: "CONCORDANT" },
        { metallogenesis: "SATYAMANGALAM-AJJUR(GRANULITE) BELT", locality: "DEVALA", lat: 11.46666667, lon: 76.63333333, hostrock: "BMQ IN CHARNOCKITE", morphogenesis: "CONCORDANT" },
        { metallogenesis: "SATYAMANGLAM-AJJUR BELT", locality: "SATYAMANGALAM", lat: 11.45, lon: 77.16666667, hostrock: "PYROXENITE-DUNITE-AMPHIBOLITE", morphogenesis: "CONCORDANT" },
        { metallogenesis: "SHIMOGA BELT", locality: "DONI", lat: 15.3, lon: 74.73333333, hostrock: "BHQ,METAPELITE,METAVOLCANICS", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "SHIMOGA BELT", locality: "KOTEBARA", lat: 13.88333333, lon: 74.81666667, hostrock: "METAPELITE,METAVOLCANICS,BFQ", morphogenesis: "VOLCANOSEDIMENTARY-BEDDED" },
        { metallogenesis: "SHIMOGA SCHIST BELT", locality: "JAYAPURA", lat: 13.46666667, lon: 75.4, hostrock: "BMQ IN METAVOLCANICS - METASEDIMENTS", morphogenesis: "CONCORDANT" },
        { metallogenesis: "WESTERN GHAT BELT", locality: "BALLALAYAYANADURG", lat: 13.26666667, lon: 75.4, hostrock: "METASEDIMENTS-METAVOLCANICS", morphogenesis: "CONCORDANT" },
        { metallogenesis: "WESTERN GHAT BELT", locality: "KUDERMUKH", lat: 13.28333333, lon: 75.25, hostrock: "BMQ IN METASEDIMENTS- METAVOLCANICS", morphogenesis: "CONCORDANT" },
        { metallogenesis: "WURRYA HILL RANGE", locality: "SURJAGARH", lat: 19.61666667, lon: 80.35, hostrock: "BMQ,QUARTZITE,PHYLLITE", morphogenesis: "BEDDED" },
        { metallogenesis: "WESTERN GHAT BELT", locality: "SAKKEREBAIL", lat: 13.8, lon: 75.46666667, hostrock: "METAVOLCANICS,METASEDIMENTS", morphogenesis: "STRATIFORM-MAGMATIC" }
    ];

    // Add markers for iron mines
    ironMines.forEach(function(mine) {
        var marker = L.marker([mine.lat, mine.lon]).addTo(map);
        marker.on('click', function() {
            document.getElementById('mine-metallogenesis').textContent = mine.metallogenesis;
            document.getElementById('mine-locality').textContent = mine.locality;
            document.getElementById('mine-hostrock').textContent = mine.hostrock;
            document.getElementById('mine-morphogenesis').textContent = mine.morphogenesis;
        });
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
            toggleButton.style.left = "0px";
        } else {
            toggleButton.style.left = "-40px";
        }
    };

    // Show manual coordinate inputs if 'Manual' option is selected
    document.getElementById("option-manual").addEventListener("change", function() {
        document.getElementById("manual-coordinates").style.display = this.checked ? "block" : "none";
    });

    // Add manual marker
    document.getElementById("add-manual-marker").addEventListener("click", function() {
        var lat = document.getElementById("manual-lat").value;
        var lon = document.getElementById("manual-lon").value;
        if (lat && lon) {
            var marker = L.marker([lat, lon]).addTo(map);
            map.setView([lat, lon], 10); // Zoom in to the newly added marker
        }
    });
});
