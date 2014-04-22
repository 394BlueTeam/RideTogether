Parse.initialize("b0jfwJsQkNWPdoKnDgd8KJLufCLWNJpmc5vBTkqr", "X90Jzs3gzKceNOdkFmCle8ZiwsE0HGhyNF4N3Wcj");
var counter = 0;


var query = new Parse.Query('Ride');
var date = new Date(Date.now());
query.greaterThan("TimeStamp", Date.now());
query.ascending("TimeStamp");
query.find({
  success: function(results) {
    var q = $('#query');
    for (var i=0;i < results.length;i++){
      var tripdate = results[i].get('Date');
      tripdate.setHours(tripdate.getHours()+5);
      console.log(tripdate);
      tripdate = String(tripdate);
      tripdate = tripdate.substr(0, 15);
      var time = results[i].get('TravelTime');
      var am_pm = results[i].get('DepartureAMPM');
      time = time.concat(" " + am_pm);
      console.log(time);
      var driver = results[i].get('Name');
      var seats = results[i].get('OpenSeats');
      counter += 1;
      // var btn1 = "<a href='#'><i class='fa fa-link btn-email'>  connect with driver</i></a>";
      var btn2 = "<a href='#' id='join' onclick='badgesystem();'><i class='fa fa-plus-square btn-sign'>  join ride</i></a>";
      // var DateTime = date + " " + results[i].get('TravelTime');
q.append('<div class="ride"  data-start="'+results[i].get('StartAddress')+'" data-end="'+results[i].get('EndAddress')+'" data-attribute="'+results[i].id+ '"><div class="count">'+counter+'</div><div class="content-shown"><p class="end">'+results[i].get('Destination')+'<span>'+btn2+'</span></p><p class="start"><span>Leaving From: </span>'+results[i].get('StartAddress')+'</p><p class="date"><span>Trip Date: </span>'+tripdate+'</p><p class="time"><span>Time: </span>'+time+'</p><p class="driver"><span>Driver: </span>'+driver+'</p><p class="seats"><span>Available seats: </span>'+seats+'</p><a class="more">click to display more info</a></div><div class="timeline"><div class="waypoint"><div class="circle"></div><p>Start</p></div><div class="line line-drive"><div class="piece"></div><p></p></div><div class="waypoint"><div class="circle"></div><p>Arrive</p></div><div class="line line-dest"><div class="piece"></div><p></p></div><div class="waypoint"><div class="circle"></div><p>Leave</p></div><div class="line line-drive"><div class="piece"></div><p></p></div><div class="waypoint"><div class="circle"></div><p>End</p></div></div></div>');  
          }


    $('.ride').click( function(){
      var id = $(this).attr('data-attribute');
      var info = $(this).find('.content-hidden');
      var more = $(this).find('.more');
      var s = $(this).attr('data-start');
      var e = $(this).attr('data-end');
      console.log(s)
      console.log(e)
      console.log('#######')
      //if for some reason we end up with undefined variables
      if(!id || !info) {
        console.log("Error: could not set id or info variables.");
        return;
      }

      // check to see if it is empty,
      // if empty -> add data
      // if non empty and visible -> 'collapse' div. hide div
      // if non empty and hidden -> 'uncollapse' div and show it
      // saves us from refetching already fetched data
      // if(info.is(':empty')) {
        //$(this).css('background-color', 'white');
        query.get(id, {
          success: function(object) {
            insertInfo(more, object.get('Name'), object.get('Email'), object.get('OpenSeats'), object.get('StartAddress'), object.get('EndAddress'), object.get('Date'), object.get('TravelTime'), object.get('Destination'));
          },
          error: function(object, error) {
            console.log('error')
          }
        });
      // }

<<<<<<< HEAD
      if (s != 'undefined'){
        if (e != 'undefined'){
          calculateDistances(s,e,30)
          $(this).find('.timeline').toggle();
        }
        else{
          console.log('fail');
        }
      }
      else{
        console.log('fail')
      }

=======
      // if (s && e){
      //     calculateDistances(s,e,30)
      //     $(this).find('.timeline').toggle();
      // }
>>>>>>> afa2422a89d5607d03d4b9ac7d394ceafb0e637b

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


// function for populating the sidebar profile
// with the pertinent information

$(document).ready(function() {
    var currentUser = Parse.User.current();
    // console.log(currentUser);
    if(currentUser) {
      var tag = $('#profile');
      var links = $('.links');
      var name = currentUser.get('Name');
      var email = currentUser.get('email');
      var rating = Number(currentUser.get('DriverRating'));
      var home = currentUser.get('HomeAddress');

      var one = '<h3 class="profile-name">'+name+'</h3>';
      var two = '<div class="rating">'+star(rating)+'</div>';
      var three = '<p class="sub-title">'+home+'</p>';
      var four = '<p class="sub-title">'+email+'</p>';
      tag.append(one+three+two);
    }

    else if(!currentUser) {
      $('.avatar').hide();
      $('#profile').append('<p class="prompt">please login</p>');
      $('.links').hide();
    }
});

// to automatically display the rating in stars
function star(x) {
    var empty = '<span><i class="fa fa-star-o"></i></span>';
    var full = '<span><i class="fa fa-star"></i></span>';
    var half = '<span><i class="fa fa-star-half-o"></i></span>';
    var score;

    if(x == 0) {
      score = empty+empty+empty+empty;
      return score;
    }

    if(x == 1) {
      score = full+empty+empty+empty;
      return score;
    }

    if(x == 2) {
      score = full+full+empty+empty;
      return score;
    }

    if(x == 3) {
      score = full+full+full+empty;
      return score;
    }

    if(x == 4) {
      score = full+full+full+full;
      return score;
    }
}
