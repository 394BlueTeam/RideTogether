function autoComplete() {
    autoCompleteStart = new google.maps.places.Autocomplete(
        (document.getElementById('start')),
        { types: [] });
    google.maps.event.addListener(autoCompleteStart, 'place_changed', function() {
        var startPlace = autoCompleteStart.getPlace();
        document.getElementById("startpointlat").value = startPlace.geometry.location.lat();
        document.getElementById("startpointlng").value = startPlace.geometry.location.lng();
    });

    autoCompleteEnd = new google.maps.places.Autocomplete(
       (document.getElementById('end')),
       { types: [] });
    google.maps.event.addListener(autoCompleteEnd, 'place_changed', function() {
        var endPlace = autoCompleteEnd.getPlace();
        endPlace.geometry.location.lat();
        document.getElementById("endpointlat").value = endPlace.geometry.location.lat();
        document.getElementById("endpointlng").value = endPlace.geometry.location.lng();
    });

}

$(document).ready(function() {
    autoComplete();
});
