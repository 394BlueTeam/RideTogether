//var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
//var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

function calculateDistances(origin, destination, destTime) {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function (response, status){callback(response, status, destTime)});
}

function callback(response, status, destTime) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
    return
  } else {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    var totaltime = 0;
    //deleteOverlays();

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      //addMarker(origins[i], false);
      for (var j = 0; j < results.length; j++) {
        totaltime = totaltime + results[j].duration.value;
        totaltime=totaltime/60;
      }
    }
    drawTimeline(destTime, totaltime);
    $(window).resize(function(){
            drawTimeline(destTime, totaltime);
        });
  }
}



function drawTimeline(destTime, rideTime){
    var timeline = $('.timeline');
    var screenWidth = $(window).width()-10;
    if (screenWidth > 800){
        screenWidth = 800;
    }
    timeline.css('width', screenWidth);
    timeline.css('display', 'block');
    var timeWidth = screenWidth - (35*4);


    var fullTime = destTime + (2*rideTime);            

    var destWidth = destTime/fullTime;
    var driveWidth = rideTime/fullTime;


    $('.line-drive .piece').css('width',  (timeWidth*driveWidth)+10+'px')
    $('.line-dest .piece').css('width',  (destWidth*timeWidth)+10+'px')

    $('.line-drive p').html(""+rideTime+' mins');
    $('.line-dest p').html(""+destTime+' mins');

}


