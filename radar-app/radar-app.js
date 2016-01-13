if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
   Template.hello.rendered = function () {
      var mapOptions = {
        center: new google.maps.LatLng(-23.397, -46.644),
        zoom: 10
      };

      var map = new google.maps.Map(document.getElementById("map-canvas"),
          mapOptions);
      var infoWindow = new google.maps.InfoWindow(), marker, i;
      var markers = [{lat:-23.397, lng:-46.644},{lat:-24.397,lng: -46.644},{lat:-22.397,lng: -46.644}];
      //var image = "images/bus.png";
     // myLatLng={lat:-23.397, lng:-46.644};
      for( i = 0; i < markers.length; i++ ) {
            newmarker = new google.maps.Marker({
            position: markers[i],
            map: map
            });
        };

  }


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
