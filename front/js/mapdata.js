function initMap() {
    const mapOptions = {
        zoom: 6,
        center: { lat: 31.7917, lng: -7.0926 }, // center on Morocco for this example
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    { "visibility": "off" }
                ]
            },
            {
                featureType: 'administrative.country',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    };
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Initialize InfoWindow
    const infoWindow = new google.maps.InfoWindow();

    fetch('/api/locations')
        .then(response => response.json())
        .then(data => {
            data.forEach(location => {
                let marker = new google.maps.Marker({
                    position: { lat: parseFloat(location.Latitude), lng: parseFloat(location.Longitude) },
                    map: map,
                    title: location.nom_fr
                });

                // Mouseover Event
                google.maps.event.addListener(marker, 'mouseover', function() {
                    // Content to display on hover
                    let content = `<div>
                                     
                                     <strong>Region:</strong> ${location.region_fr}<br>
                                     <strong>Province:</strong> ${location.province_fr}<br>
                                     <strong>Commune:</strong> ${location.commune_fr}<br>
                                     <strong>Douar:</strong> ${location.nom_fr}<br>
                                     <strong>Population:</strong> ${location.population}<br>
                                     <strong>Address:</strong> ${location.full_address}
                                   </div>`;
                                   
                    infoWindow.setContent(content);
                    infoWindow.open(map, marker);
                });

                // Mouseout Event to close InfoWindow
                google.maps.event.addListener(marker, 'mouseout', function() {
                    infoWindow.close();
                });

                // Click Event
                google.maps.event.addListener(marker, 'click', function() {
                    window.open(location["Google Maps Link"], '_blank');
                });
            });
        });
}