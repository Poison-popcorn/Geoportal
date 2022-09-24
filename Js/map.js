
//Initialize map
var map = L.map('map').setView([7.0, -1.09], 7);

//Add Osm Tile
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);



//add street
var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//add hybrid
var googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
//add terrain
var googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//add google satelite
var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});



//adding marker: the little guy pointing location 
var marker = L.marker([7, -1.09])
//.addTo(map)


//styling of region
var regionStyle = {

color : 'red',
opacity: 0.1,
weight: 1,
}

//health facility style

var healthFacilitystyle = {

    radius:5,
    fillColor:'green',
    color : 'red',
    weight : 1
}

//railwaystyle
var railwaystyle = {
    color: 'black',
    weight: 2
}

//Add Geojson layers
var regionlayer = L.geoJson(region, {
    style:regionStyle,
    onEachFeature: function (feature, layer) {

//add area
        area = (turf.area(feature)/1000000).toFixed(3)
        // add center
        center_lng = turf.center(feature).geometry.coordinates[0].toFixed(2)
        center_lat = turf.center(feature).geometry.coordinates[1].toFixed(2)

  

        label = `Name: ${feature.properties.region}<br>`
        label+= `Area: ${area}<br>`
        label+= `Center: ${center_lng}, ${center_lat} <br>`






        layer.bindPopup(label)
    }



})
.addTo(map)



var healthfacilitieslayer = L.geoJson(healthfacilities, {

    pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, healthFacilitystyle);
},

onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name)
    }
})
//.addTo(map)


var railwaylayer = L.geoJson(railway, {style: railwaystyle,

    onEachFeature: function(feature, layer) {
     layer.bindPopup(feature.properties.name)
    }


 })
//.addTo(map)


//Add WMS Layers

//load river
var RiverWms = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:Rivers',
    format: 'image/png',
    transparent: true,
    attribution: ""
}).addTo(map)

//load treecover
var TreecoverWms = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:Tree Cover',
    format: 'image/png',
    transparent: true,
    attribution: ""
})
//.addTo(map)

//load railwayline

var RailwaylineWms = L.tileLayer.wms("http://localhost:8080/geoserver/geospatial/wms", {
    layers: 'geospatial:RailwayLine',
    format: 'image/png',
    transparent: true,
    attribution: ""
}).addTo(map)


// Basemaps
var baseLayers = {
    "OpenStreetMap": osm,
    "Google Streets Map": googleStreets,
    "Google Hybrid Map": googleHybrid,
    "Google Terrain Map": googleTerrain,
    "Google Satellite Map": googleSat,
};


//layers
var overlays = {
    //"Marker": marker,
    "Region Layer": regionlayer,
    "Health Facilities" : healthfacilitieslayer,
    "Railway Lines" : railwaylayer,
    "River Wms" : RiverWms,
    "Tree Cover Wms" : TreecoverWms,
    "Railway Line Wms" : RailwaylineWms,





};

//Add layer control: For navigation
L.control.layers(baseLayers, overlays).addTo(map);



// add leaflet browser print control to map

L.control.browserPrint({position: 'topleft'}).addTo(map);
//add scale bar
L.control.scale().addTo(map)

//Add mousemove Coordinate Tool
map.on('mousemove',function(e) {
	
	$('#coordinate').html(`Lat:${e.latlng.lat.toFixed(3)}, lng:${e.latlng.lng.toFixed(3)}`)
})