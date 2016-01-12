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
  };


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
