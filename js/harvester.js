
const mapstyle = {
    width: '1035px',
    height: '500px'
};


class DemandMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            demand: {
                fullname: '',
                street: '',
                city: '',
                zip: '',
                country: 'CZ',
                ico: '',
                vat: '',

                contactfirst: '',
                contactlast: '',
                phone: '',
                email: '',

                age: '',
                type: '',
                saletype: '',
                quantity_m3: '',
                quantity_ha: '',
                // unit: '',
                priceharvest: '',
                pricesale: '',
                location_lat: '',
                location_lng: '',

                helpsale: '',
                contract: ''
            },

            countries : [
                { label: "Česká republika", value: 'CZ' },
                { label: "Slovensko", value: 'SK' },
                { label: "Polsko", value: "PL"}
            ],
            types : [
                { label: "SM - smrk", value: 'SM' },
                { label: "BO - borovice", value: 'BO' },
                { label: "MD - modřín", value: 'MD' },
                { label: "BK - buk", value: 'BK' },
                { label: "DB - dub", value: 'DB' },
                { label: "DG - douglaska", value: 'DG' }
            ],
            saletypes : [
                // { label: "Jen provést těžbu", value: ''},
                { label: "Prodej nevytěžených stromů", value: 'STOJ' },
                { label: "Mám již vytěženo a chci prodat", value: 'OM' },
            ],
            units : [
                { label: "m3 - objem dřeva", value: 'M3' },
                { label: "ha - plocha pozemku", value: 'HA' },
            ]
        };
    }

    componentDidMount() {
        var fullmap = L.map('mapid').setView([50.0871, 14.4175], 7);
        var treeIcon = L.icon({
            iconUrl: 'images/tree.png',
            iconSize:     [24, 24] // size of the icon
        });

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(fullmap);

        fetch('https://us-central1-harvestor-f8623.cloudfunctions.net/demandListForMap', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors"
        }).then(response=>response.json()
        ).then(data=>{
            for (var index in data) {
                if (data[index].location_lat && data[index].location_lng) {
                    var lat = data[index].location_lat;
                    var lng = data[index].location_lng;

                    var marker = L.marker(L.latLng(lat, lng), {icon: treeIcon}).addTo(fullmap);
                    marker.bindPopup(
                        "<b>Poptávka těžby</b>" +
                        "<br>" + data[index].name +
                        "<br>Typ porostu: " + data[index].type +
                        "<br>Rozsah: " + data[index].quantity_m3 + " m3/" + data[index].quantity_ha + " ha"+
                        "<br>Ověřeno: " + (data[index].verified ? 'ANO' : 'NE')
                    ).openPopup();
                    L.circle([lat, lng], {
                        color: data[index].verified ? 'green' : 'grey',
                        fillColor: data[index].verified ? '#32CD32' : '#D9D9D9',
                        fillOpacity: 0.5,
                        radius: 5000
                    }).addTo(fullmap);
                }
            }
        });
    }

    render() {
        return (
            <div id="mapid" style={mapstyle}/>
        );
    }
}

ReactDOM.render(<DemandMap/>, document.getElementById('demand_map'));


