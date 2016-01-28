
Stops = new Mongo.Collection("stops");
Radars = new Mongo.Collection("radars");



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
 
/*
Template.hello.onCreate(function){
GoogleMaps.ready('map', function(map) {

}
*/


 Template.hello.rendered = function (markers) {
    var mapOptions = {
      center: new google.maps.LatLng(-23.397, -46.644),
      zoom: 10
    };

    map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);


//heatmap
/*
HTTP.get(Meteor.absoluteUrl("/data/shapes.txt"), function(err,result) {
        var path_Data = result.content;
        var parsedpath_Data = CSVToArray(path_Data, ",");
        parsedpath_Data.shift();
        
        function getPoints(parsedpath_Data) {
          points=[];
          for (i =0; i<parsedpath_Data.length-2;i++){
          var next = new google.maps.LatLng(parseFloat(parsedpath_Data[i][1]), parseFloat(parsedpath_Data[i][2]));
          points.push(next);
         }
  return points};

        heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(parsedpath_Data),
    radius: 10,
    opacity: .5,
    map: map
  });
      });
*/
//parsing addresses
/*
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
//mongo radars


/*
console.log(allradars);
console.log(allradars.length);

for (point in allradars){
newmarker = new google.maps.Marker({
                position: point,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    strokeOpacity:.5,
                    strokeColor: gradient[Math.floor(Math.random() * 10)]
                },
                label: l4[i],
                map: map});
                }

*/




/*

HTTP.get(Meteor.absoluteUrl("/data/result.csv"), function(err,result) {
          var gradient = ["#00F5F5", "#02D6F6", "#05B7F7", "#0799F8", "#0A7AFA", "#0D5BFB", "#0F3DFC", "#121EFD", "#1500FF"]
          var addr_Data2 = result.content;
          var parsedaddr_Data2 = CSVToArray(addr_Data2, ",");
          parsedaddr_Data2.shift();
          console.log(parsedaddr_Data2[0]);
          for (i =0; i<parsedaddr_Data2.length; i++){
            var point = {lat: parseFloat(parsedaddr_Data2[i][1]), lng: parseFloat(parsedaddr_Data2[i][2])};
              console.log(point);
                newmarker = new google.maps.Marker({
                position: point,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    strokeOpacity:.5,
                    strokeColor: gradient[Math.floor(Math.random() * 10)]
                },
                map: map
              });
                  }

          });

*/
//addresses3
/*
  HTTP.get(Meteor.absoluteUrl("/data/all_addresses.csv"), function(err,result) {
         // console.log(result.content);
         l4=['0136', '1200', '1540', '2489', '2486', '2487', '0424', '2328', '2483', '0636', '2402', '2403', '2400', '2401', '2014', '0304', '0124', '1202', '1312', '0121', '0120', '2490', '0840', '1704', '0724', '2491', '1824', '2493', '1624', '4400', '2411', '2410', '2413', '2412', '2415', '2414', '2417', '2416', '2419', '1411', '0336', '0112', '0113', '0110', '0924', '0116', '0117', '1324', '0115', '1120', '0052', '1328', '0119', '1124', '0109', '4800', '4801', '4803', '1716', '0524', '0916', '1856', '0756', '0208', '1404', '2443', '2440', '1336', '2446', '0108', '1232', '0105', '0104', '0107', '0106', '0101', '0100', '2484', '2449', '2418', '0908', '2460', '0356', '0948', '2485', '0456', '1004', '0452', '2461', '1224', '2459', '2458', '2457', '1320', '0111', '2802', '2800', '2801', '2804', '2200', '0340', '2204', '1504', '0118', '2815', '2429', '3601', '0000', '2810', '0002', '2420', '2421', '2422', '2423', '2424', '2426', '2427', '1203', '2140', '3204', '3200', '0804', '0800', '0802', '1101', '2104', '2428', '2439', '2438', '0013', '3602', '1205', '2437', '2436', '2435', '2434', '0123', '0122', '1616', '4001', '4002', '0154', '1756', '0024', '0324', '0224', '2492', '5200', '2120', '0417', '2124', '1600', '1602', '0824', '2236', '2002', '2000', '2001', '0816', '2224',   '4238', '4242', '4243', '4240', '4239', '4225', '4224', '0000', '4220', '4221', '4222', '4223','5178', '5148', '5149', '5147', '5145', '5142', '5140', '5141', '5267', '5266', '5188', '5159', '5220', '5151', '5152', '5154', '5156', '5098', '5099', '5093', '5094', '5126', '5127', '5120', '5121', '5122', '5083', '5082', '5081', '5080', '5086', '5243', '5084', '5137', '5136', '5133', '5132', '5238', '5231', '5233', '5234', '0000', '5108', '5102', '5103', '5100', '5107', '5186', '5187', '5223', '5221', '5189', '5227', '5115', '5117', '5116', '5111', '5112', '5119', '5216', '5217', '5212', '5085', '5210', '5211', '5199', '5198', '5195', '5194', '5197', '5196', '5160', '5161', '5162', '5163', '5166', '5168', '5201', '5200', '5203', '5202', '5205', '5204', '5206', '5209', '5639','6659', '6658', '6660', '6640', '6600', '6626', '6616', '6614', '6608', '6609', '6624', '6625', '6622', '6620', '6621' 
];
         var gradient = ["#00F53D", "#1FD635", "#3FB82E", "#5F9A27", "#7F7C20", "#9F5D18", "#BF3F11", "#DF210A", "#FF0303"];
   

          var addr_Data2 = result.content;
          var parsedaddr_Data2 = CSVToArray(addr_Data2, ",");
          parsedaddr_Data2.shift();
          /*
          var icon = {
          url: "../img/car.png", // url
          scaledSize: new google.maps.Size(30, 30), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        };
        
        var radarids = parsedaddr_Data2.map(function(x) { return x[1] });
        var radarids2 = parsedaddr_Data2.map(function(x) { return x[0] });
        console.log(radarids)
        datapoints = [];
        console.log(l4.length);
          var i = 250;
          while(i < 272) {
          //parseFloat(l4[i])
          var index = radarids.indexOf(l4[i]);
          var index2 = radarids2.indexOf(l4[i]);
          if (index != -1){
            console.log(index);
            console.log(parsedaddr_Data2[index]);
            HTTP.call('GET','https://maps.googleapis.com/maps/api/geocode/json?address=' + address3TOstring(parsedaddr_Data2[index])+'&key=AIzaSyA_2Qi3MVVByu9nwkBPNt2hYUn7SHooP10',{},function(err,result){
                bigdata = JSON.parse(result.content);
                console.log(bigdata.results);
                if(isEmpty(bigdata.results)){
                  console.log(address3TOstring(parsedaddr_Data2[index]));
                }
                //console.log(bigdata.results[0].geometry.location.lat);
                // console.log(result.content.location);
                // console.log(result["location"]);
                // console.log(result.content[0]);
                console.log(i);
                console.log(l4)
                console.log(l4[i]);

                var point = {lat: parseFloat(bigdata.results[0].geometry.location.lat), lng: parseFloat(bigdata.results[0].geometry.location.lng)};
                Radars.insert({lat: parseFloat(bigdata.results[0].geometry.location.lat), lng: parseFloat(bigdata.results[0].geometry.location.lng)});
                //datapoints.push(point);
                var infowindow = new google.maps.InfoWindow({
                    content: l4[i]
                  });

                newmarker = new google.maps.Marker({
                position: point,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    strokeOpacity:.5,
                    strokeColor: gradient[Math.floor(Math.random() * 10)]
                },
                label: l4[i],
                map: map});
                  });
                i = i + 1;
                
          }
          else if (index2 != -1)
          {
            HTTP.call('GET','https://maps.googleapis.com/maps/api/geocode/json?address=' + addressTOstring(parsedaddr_Data2[index2])+'&key=AIzaSyA_2Qi3MVVByu9nwkBPNt2hYUn7SHooP10',{},function(err,result){
                bigdata = JSON.parse(result.content);
                //console.log(bigdata.keys);
                 if(isEmpty(bigdata.results)){
                  console.log('index2');
                  console.log(addressTOstring(parsedaddr_Data2[index2]));
                }
                //console.log(bigdata.results[0].geometry.location.lat);
                // console.log(result.content.location);
                // console.log(result["location"]);
                // console.log(result.content[0]);
                var point = {lat: parseFloat(bigdata.results[0].geometry.location.lat), lng: parseFloat(bigdata.results[0].geometry.location.lng)};
                Radars.insert({lat: parseFloat(bigdata.results[0].geometry.location.lat), lng: parseFloat(bigdata.results[0].geometry.location.lng)});
                newmarker = new google.maps.Marker({
                position: point,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillcolor: 'yellow',
                    fillOpacity: .5, 
                    strokeColor: 'yellow'
                },
                label: l4[i],
                map: map});
                  });
                i = i + 1;
          }
          else{
            //do nothing
            i = i + 1;
            console.log("Cant find addresss");
          }




          
          };

  });
*/

/*
//radars
HTTP.get(Meteor.absoluteUrl("/data/radarl4.csv"), function(err,result) {
        var radarData = result.content;
        var parsedradarData = CSVToArray(radarData, ",");
        var icon = {
          url: "../img/car.png", // url
          scaledSize: new google.maps.Size(30, 30), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        };

        console.log(parsedradarData.length);
        for( i = 0; i < parsedradarData[0].length; i++ ) {
              var point = {lat: parseFloat(parsedradarData[i][2]), lng: parseFloat(parsedradarData[i][3])};
              newmarker = new google.maps.Marker({
              position: point,
              icon: icon,
              map: map});
          };

    });
*/

//https://roads.googleapis.com/v1/snapToRoads?path=-35.27801,149.12958|-35.28032,149.12907|-35.28099,149.12929|-35.28144,149.12984|-35.28194,149.13003|-35.28282,149.12956|-35.28302,149.12881|-35.28473,149.12836&interpolate=true&key=YOUR_API_KEY

//busline = [{lat: , lng: }, {lat: , lng: }]

HTTP.call('GET','https://roads.googleapis.com/v1/snapToRoads?path=-23.581390,-46.584950|-23.5597046,-46.6699925|-23.5676098,-46.6836783&interpolate=true&key=AIzaSyBL02i2Sny71qfP7PYV1Gg7DJ1WiigiYBs',{},function(err,result){
bigdata = JSON.parse(result.content);
console.log(bigdata);
busline = [];
console.log(parseFloat(bigdata.snappedPoints[0].location.latitude));
for (i =0; i<bigdata.snappedPoints.length; i++)
{
  
  busline.push({lat: parseFloat(bigdata.snappedPoints[i].location.latitude),lng: parseFloat(bigdata.snappedPoints[i].location.longitude)}); 
}
console.log(busline);
busPath = new google.maps.Polyline({
              path: busline,
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 5
              });
busPath.setMap(map);
});




HTTP.call('GET','https://roads.googleapis.com/v1/snapToRoads?path=-23.6176772,-46.6817542|-23.5848247,-46.6756099|-23.5514809,-46.6652497|-23.5410369,-46.7193649|-23.5383998,-46.7082337&interpolate=true&key=AIzaSyBL02i2Sny71qfP7PYV1Gg7DJ1WiigiYBs',{},function(err,result){
bigdata = JSON.parse(result.content);
console.log(bigdata);
busline = [];
console.log(parseFloat(bigdata.snappedPoints[0].location.latitude));
for (i =0; i<bigdata.snappedPoints.length; i++)
{
  
  busline.push({lat: parseFloat(bigdata.snappedPoints[i].location.latitude),lng: parseFloat(bigdata.snappedPoints[i].location.longitude)}); 
}
console.log(busline);
busPath = new google.maps.Polyline({
              path: busline,
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 5
              });
busPath.setMap(map);
});


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
//}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log("this is running");
   // infowindow.open(map, newmarker);

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
    if (typeof loc_array == undefined)
    {
      console.log('help');
      console.log(add_string);
    }
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
  if (typeof loc_array === "undefined")
    {
      console.log('help');
      console.log(add_string);
      console.log(loc_array);
    }
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
function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

