let map;
let marker;

function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                map.setCenter(pos);


                marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: "You are here!",
                });

            
                saveLocation(pos);
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );

        
        navigator.geolocation.watchPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
            
                marker.setPosition(pos);
                
                map.setCenter(pos);

                
                saveLocation(pos);
            },
            (error) => {
                console.error("Error watching position: ", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    } else {
        
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, pos) {
    alert(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
}

async function saveLocation(pos) {
    try {
        const response = await fetch('/save-location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pos)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Location saved successfully');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
