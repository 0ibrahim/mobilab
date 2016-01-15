
Stops = new Mongo.Collection("stops");

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
      //Session.set('counter', Session.get('counter') + 1);    v
    //var stops = Stops.find();
    var icon = {
      url: "../img/bus.png", // url
      scaledSize: new google.maps.Size(30, 30), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    // console.log(markers.length);
    // for( i = 0; i < markers.length; i++ ) {

    //   };

    Stops.find().forEach(function(result){
          var point = {lat: parseFloat(result.stop_lat), lng: parseFloat(result.stop_lon)};
          console.log("Plotting");
          console.log(point);
          newmarker = new google.maps.Marker({
          position: point,
          icon: icon,
          map: map});
    });
    }
  });
 
 Template.hello.rendered = function (markers) {
    var mapOptions = {
      center: new google.maps.LatLng(-23.397, -46.644),
      zoom: 10
    };

    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    console.log("this is running");


    // HTTP.get(Meteor.absoluteUrl("/data/stops.txt"), function(err,result) {
    //     console.log("i am in the isClient");
    //     console.log(result.content);
    //     var stopsData = result.content;
    //     var parsedStopsData = CSVToArray(stopsData, ",");
    //     console.log(parsedStopsData);
    //     parsedStopsData.shift();
        

    // });

  /*
////1015-10-0 5:00:00 5:00:00 301703  R. EnÃ©as De Camargo, 36  1 -23.418553  -46.805319
    HTTP.get(Meteor.absoluteUrl("/data/bus_path.csv"), function(err,result) {
       // console.log(result.content);
        var path_Data = result.content;
        var parsedpath_Data = CSVToArray(path_Data, ",");
        console.log(parsedpath_Data[0]);
        parsedpath_Data.shift();
        //markers = parsedStopsData;
        var prev = 0;
        var busline = [];
        var road = '';
        for (i in parsedpath_Data) {
          if (parsedpath_Data[prev][0] != parsedpath_Data[i][0]){ 
            console.log(road);
            var color = '#'+Math.floor(Math.random()*16777215).toString(16);

    /*        var result = HTTP.call('GET','https://roads.googleapis.com/v1/snapToRoads?path=' + road + '&interpolate=true&key=AIzaSyCMy95QAeFlYo1ZW4I52OhDVLIi3gDfPJg',{},function(err,result){
                  return result;
                    });
            console.log(result);

            prev=i;
            busPath = new google.maps.Polyline({
              path: busline,
              geodesic: true,
              strokeColor: color,
              strokeOpacity: 1.0,
              strokeWeight: 2
              });
            busline=[];
            road=' ';
            busline.push({lat: parseFloat(parsedpath_Data[i][6]), lng: parseFloat(parsedpath_Data[i][7])});
            road = road.concat(parsedpath_Data[i][6]+',' + parsedpath_Data[i][7]);
            busPath.setMap(map);
          }
          else{
            busline.push({lat: parseFloat(parsedpath_Data[i][6]), lng: parseFloat(parsedpath_Data[i][7])});
            road= road.concat(parsedpath_Data[i][6]+',' + parsedpath_Data[i][7])+'|';
          }
        };
    });
  */

  }
}



// while (stops.hasNext()) {
//    print(tojson(stops.next()));
// }
// Stops.each(function(err, item){
//   console.log(item);
//   console.log("this is an item");
// });

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log("this is running");


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
