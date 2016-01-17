
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
    console.log("larissa run");

//heatmap
HTTP.get(Meteor.absoluteUrl("/data/stops.txt"), function(err,result) {
        var path_Data = result.content;
        var parsedpath_Data = CSVToArray(path_Data, ",");
        parsedpath_Data.shift();
        
        function getPoints(parsedpath_Data) {
          points=[];
          for (i =0; i<parsedpath_Data.length-2;i++){
          var next = new google.maps.LatLng(parseFloat(parsedpath_Data[i][3]), parseFloat(parsedpath_Data[i][4]));
          points.push(next);
         }
  return points};

        heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(parsedpath_Data),
    map: map
  });
      });
}

  // HTTP.get(Meteor.absoluteUrl("/data/all_addresses.csv"), function(err,result) {
  //        l4=['0136', '1200', '1540', '2489', '2486', '2487', '0424', '2328', '2483', '0636', '2402', '2403', '2400', '2401', '2014', '0304', '0124', '1202', '1312', '0121', '0120', '2490', '0840', '1704', '0724', '2491', '1824', '2493', '1624', '4400', '2411', '2410', '2413', '2412', '2415', '2414', '2417', '2416', '2419', '1411', '0336', '0112', '0113', '0110', '0924', '0116', '0117', '1324', '0115', '1120', '0052', '1328', '0119', '1124', '0109', '4800', '4801', '4803', '1716', '0524', '0916', '1856', '0756', '0208', '1404', '2443', '2440', '1336', '2446', '0108', '1232', '0105', '0104', '0107', '0106', '0101', '0100', '2484', '2449', '2418', '0908', '2460', '0356', '0948', '2485', '0456', '1004', '0452', '2461', '1224', '2459', '2458', '2457', '1320', '0111', '2802', '2800', '2801', '2804', '2200', '0340', '2204', '1504', '0118', '2815', '2429', '3601', '0000', '2810', '0002', '2420', '2421', '2422', '2423', '2424', '2426', '2427', '1203', '2140', '3204', '3200', '0804', '0800', '0802', '1101', '2104', '2428', '2439', '2438', '0013', '3602', '1205', '2437', '2436', '2435', '2434', '0123', '0122', '1616', '4001', '4002', '0154', '1756', '0024', '0324', '0224', '2492', '5200', '2120', '0417', '2124', '1600', '1602', '0824', '2236', '2002', '2000', '2001', '0816', '2224'];
  //         var addr_Data2 = result.content;
  //         var parsedaddr_Data2 = CSVToArray(addr_Data2, ",");
  //         parsedaddr_Data2.shift();
  //         var icon = {
  //         url: "../img/car.png", // url
  //         scaledSize: new google.maps.Size(30, 30), // scaled size
  //         origin: new google.maps.Point(0,0), // origin
  //         anchor: new google.maps.Point(0, 0) // anchor
  //       };
  //         for( i = 1; i < 6; i++ ) {

  //         var index = parsedaddr_Data2.indexOf(l4[i]);
  //         console.log(parsedaddr_Data2[index]);
  //         console.log(address3TOstring(parsedaddr_Data2[index]));
  //         HTTP.call('GET','https://maps.googleapis.com/maps/api/geocode/json?address=' + address3TOstring(parsedaddr_Data2[index])+'&key=AIzaSyA_2Qi3MVVByu9nwkBPNt2hYUn7SHooP10',{},function(err,result){
  //             bigdata = JSON.parse(result.content);
  //             var point = {lat: parseFloat(bigdata.results[0].geometry.location.lat), lng: parseFloat(bigdata.results[0].geometry.location.lng)};
  //             newmarker = new google.maps.Marker({
  //             position: point,
  //             icon: icon,
  //             map: map});
  //         console.log(parsedaddr_Data2[parseFloat(l4[i])]);
  //         console.log(address3TOstring(parsedaddr_Data2[parseFloat(l4[i])]));
  //                 });
  //         };

  // });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log("this is running");
  });
}

function CSVToArray( strData, strDelimiter ){
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
    else if (loc_array[i].includes('('))
    {
      add_string = add_string.concat('+sau+paulo');
      for (j=i;j<loc_array.length;j++)
      {
        if(parseInt(loc_array[j]) == loc_array[j]){
          add_string=loc_array[j].concat('+' + add_string);
        }
      }
      return add_string;
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
      return add_string;
    }
    else
    {
      add_string = add_string.concat(loc_array[i] + '+');

    }

  }

return add_string;
}