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
      //Session.set('counter', Session.get('counter') + 1);
    }
  });
 
 Template.hello.rendered = function (markers) {
    var mapOptions = {
      center: new google.maps.LatLng(-23.397, -46.644),
      zoom: 10
    };

    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    var infoWindow = new google.maps.InfoWindow(), marker, i;
      console.log("this is running");

    HTTP.get(Meteor.absoluteUrl("/data/stops.txt"), function(err,result) {
        console.log("i am in the isClient");
        console.log(result.content);
        var stopsData = result.content;
        var parsedStopsData = CSVToArray(stopsData, ",");
        console.log(parsedStopsData);
        parsedStopsData.shift();
        markers = parsedStopsData;

        console.log(markers.length);
        for( i = 0; i < markers.length; i++ ) {
              var point = {lat: parseFloat(markers[i][3]), lng: parseFloat(markers[i][4])};
              console.log("Plotting");
              console.log(point);
              newmarker = new google.maps.Marker({
              position: point,
              map: map});
          };
    });

    //var markers = [{lat:-23.397, lng:-46.644},{lat:-25.397,lng: -46.644},{lat:-21.397,lng: -46.644}];
   // myLatLng={lat:-23.397, lng:-46.644};
}


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}
