Parse.initialize("b0jfwJsQkNWPdoKnDgd8KJLufCLWNJpmc5vBTkqr", "X90Jzs3gzKceNOdkFmCle8ZiwsE0HGhyNF4N3Wcj");
var counter = 0;


var query = new Parse.Query('Ride');
var date = new Date(Date.now());
query.greaterThan("Date", date);
query.ascending("Date");
query.find({
  success: function(results) {
    var q = $('#query');
    for (var i=0;i < results.length;i++){
      var date = results[i].get('Date');
      date = String(date);
      date = date.substr(0, 15);
      var time = results[i].get('TravelTime');
      var driver = results[i].get('Name');
      var seats = results[i].get('OpenSeats');
      counter += 1;
      var btn1 = "<a href='#'><i class='fa fa-link btn-email'>  connect with driver</i></a>";
      var btn2 = "<a href='#' id='join' onclick='badgesystem();'><i class='fa fa-plus-square btn-sign'>  join ride</i></a>";
      // var DateTime = date + " " + results[i].get('TravelTime');
      q.append('<div class="ride" data-attribute="'+results[i].id+ '"><div class="count">'+counter+'</div><div class="content-shown"><p class="end">'+results[i].get('Destination')+'<span>'+btn1 + btn2+'</span></p><p class="start"><span>Leaving From: </span>'+results[i].get('StartAddress')+'</p><p class="date"><span>Trip Date: </span>'+date+'</p><p class="time"><span>Time: </span>'+time+'</p><p class="driver"><span>Driver: </span>'+driver+'</p><p class="seats"><span>Available seats: </span>'+seats+'</p><p class="more">click to display more info</p></div><div class="content-hidden"></div></div>');
    }

    $('.ride').click( function(){
      var id = $(this).attr('data-attribute');
      var info = $(this).find('.content-hidden');
      var more = $(this).find('.more');
      
      //if for some reason we end up with undefined variables
      if(!id || !info) {
        console.log("Error: could not set id or info variables.");
        return;
      }

      //check to see if it is empty,
      //if empty -> add data
      //if non empty and visible -> 'collapse' div. hide div
      //if non empty and hidden -> 'uncollapse' div and show it
      //saves us from refetching already fetched data
      if(info.is(':empty')) {
        //$(this).css('background-color', 'white');
        query.get(id, {
          success: function(object) {
            insertInfo(more, object.get('Name'), object.get('Email'), object.get('OpenSeats'), object.get('StartAddress'), object.get('EndAddress'), object.get('Date'), object.get('TravelTime'), object.get('Destination'));
          },
          error: function(object, error) {
            console.log('error')
          }
        });
      }

      else if(more.is(':visible')) {
        more.hide();
        //$(this).css('background-color', 'transparent');
      }

      else {
        more.show();
      }
    })
  },

  error: function(error) {
    console.log('error')
  }
});

//adds the chosen information into the appropriate div
//error checking should be
function insertInfo(more, driver, email, seats, sAdd, eAdd, date, TravelTime, Destination){
  var truncDate = String(date);
  truncDate = truncDate.substr(0, 15);
  var message="Hi "+driver+",%0D%0DI'd like to join your ride from "+sAdd+" to "+eAdd+" ("+Destination+"), on "+truncDate +
  " from " + TravelTime + ". Please let me know if I can join.%0D%0DThanks,%0D";
  more.html('<a class="join-button" href="mailto:'+email+'?subject=I\'d like to join your ride!&body='+message+'">Join this ride</a>');
  // info.html('<p class="driverName">Driver: ' + driver +'</p><p class="seats">Open Seats: '
  //           +seats +'</p><a class="join-button" href="mailto:'+email+'?subject=I\'d like to join your ride!&body='+message+'">Join this ride</a>');
  return 0;
}


// function for when "join this ride" is clicked;
// it will update the badge count number
var count = 0;
function badgesystem() {
  count += 1;
  $('.bdge').show();
  $('.bdge').empty();
  $('.bdge').append(count);
}

// function for when the rides icon in the header
// is clicked; it will display info about the ride
// that was added
function notify() {
  $('#submit').toggle();
}




