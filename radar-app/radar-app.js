
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



//shapes
/*
    HTTP.get(Meteor.absoluteUrl("/data/shapes.txt"), function(err,result) {
       // console.log(result.content);
        var path_Data = result.content;
        console.log(path_Data[3]);
        var parsedpath_Data = CSVToArray(path_Data, ",");
        parsedpath_Data.shift();
        //markers = parsedStopsData;
        var prev = 0;
        var busline = [];
        var road = '';
        for (i in parsedpath_Data) {
          if (parsedpath_Data[prev][0] != parsedpath_Data[i][0]){ 
            var color = '#'+Math.floor(Math.random()*16777215).toString(16);
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
            busline.push({lat: parseFloat(parsedpath_Data[i][1]), lng: parseFloat(parsedpath_Data[i][2])});
            busPath.setMap(map);
          }
          else{
            busline.push({lat: parseFloat(parsedpath_Data[i][1]), lng: parseFloat(parsedpath_Data[i][2])});
          }
        };
    });*/


//parsing addresses

  HTTP.get(Meteor.absoluteUrl("/data/addresses.csv"), function(err,result) {
         // console.log(result.content);
          var addr_Data = result.content;
          var parsedaddr_Data = CSVToArray(addr_Data, ",");
          console.log(parsedaddr_Data[30]);
          console.log(addressTOstring(parsedaddr_Data[30]));
          /*
          HTTP.call('GET','https://maps.googleapis.com/maps/api/geocode/json?address=' + addressTOstring(parsedaddr_Data[30])+'&key=AIzaSyA_2Qi3MVVByu9nwkBPNt2hYUn7SHooP10',{},function(err,result){
                console.log(result.content);
                  });
  });
  HTTP.get(Meteor.absoluteUrl("/data/addresses2.csv"), function(err,result) {
         // console.log(result.content);
          var addr_Data = result.content;
          var parsedaddr_Data = CSVToArray(addr_Data, ",");
          console.log(parsedaddr_Data[38]);
          console.log(address2TOstring(parsedaddr_Data[38]));
          /*
          HTTP.call('GET','https://maps.googleapis.com/maps/api/geocode/json?address=' + address2TOstring(parsedaddr_Data[38])+'&key=AIzaSyA_2Qi3MVVByu9nwkBPNt2hYUn7SHooP10',{},function(err,result){
                console.log(result.content);
                  });

  });
*/
//addresses3

  HTTP.get(Meteor.absoluteUrl("/data/all_addresses.csv"), function(err,result) {
         // console.log(result.content);
          var addr_Data2 = result.content;
          var parsedaddr_Data2 = CSVToArray(addr_Data2, ",");
          parsedaddr_Data2.shift();
          console.log(parsedaddr_Data2[30]);
          /* 
          HTTP.call('GET','https://maps.googleapis.com/maps/api/geocode/json?address=' + address3TOstring(parsedaddr_Data2[30])+'&key=AIzaSyA_2Qi3MVVByu9nwkBPNt2hYUn7SHooP10',{},function(err,result){
                console.log(result.content);
                  });*/

  });

    //radars
  /*
HTTP.get(Meteor.absoluteUrl("/data/Latitude e Longitude.csv"), function(err,result) {
        var radarData = result.content;
        var parsedradarData = CSVToArray(radarData, ",");
        console.log(parsedradarData[2]);
        parsedradarData.shift();
        var icon = {
          url: "../img/car.png", // url
          scaledSize: new google.maps.Size(30, 30), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        };

        console.log(parsedradarData.length);
        for( i = 0; i < parsedradarData.length; i++ ) {
              var point = {lat: parseFloat(parsedradarData[i][2]), lng: parseFloat(parsedradarData[i][3])};
              newmarker = new google.maps.Marker({
              position: point,
              icon: icon,
              map: map});
          };

    });
*/





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

function addressTOstring(loc_array){
  var add_string = '';
  for(i =2; i <= loc_array.length; i++){
 
    if (loc_array[i].includes('n0'))
    {
      //do not add
    }
    else if (loc_array[i].includes('('))
    {
      add_string = add_string.concat('sau+paulo');
      console.log(add_string);
      return add_string;
    }
    else
    {
      add_string = add_string.concat(loc_array[i] + '+');

    }

  }

return add_string;
}

function address2TOstring(loc_array){
  var add_string = '';
  for(i =2; i <= loc_array.length; i++){
 
    if (loc_array[i].includes('n0'))
    {
      //do not add
    }
    else if (loc_array[i].includes('/'))
    {
      add_string = add_string.concat('sau+paulo');
      console.log(add_string);
      return add_string;
    }
    else
    {
      add_string = add_string.concat(loc_array[i] + '+');

    }

  }

return add_string;
}

function address3TOstring(loc_array){
  var add_string = '';
  for(i =11; i <= loc_array.length; i++){
 
    if (loc_array[i].includes('n0'))
    {
      //do not add
    }
    else if (loc_array[i].includes(','))
    {
      add_string = add_string.concat(loc_array[i].substring(0,loc_array[i].indexOf(",")));
      add_string = add_string.concat('+sau+paulo');
      for (j=i;j<loc_array.length;j++)
      {
        if(parseInt(loc_array[j]) == loc_array[j]){
          add_string=loc_array[j].concat('+' + add_string);
        }
      }
      console.log(add_string);
      return add_string;
    }
    else
    {
      add_string = add_string.concat(loc_array[i] + '+');

    }

  }

return add_string;
}
