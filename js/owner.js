// import React from 'react';
// import ReactDOM from 'react-dom';

const mapstyle = {
    width: '600px',
    height: '400px'
};

class DemandRegistrationTextInput extends React.Component {
    render() {
        return (
            <div className="row form-group">
                <div className="col-md-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor={this.props.id}>{this.props.text} {this.props.mandatory ? '*' : ''} </label>
                    <input type="text" id={this.props.id} name={this.props.id} className="form-control"
                           placeholder={this.props.text} />
                </div>
            </div>
        );
    }
}

class DemandRegistrationForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        const formToJSON = elements => [].reduce.call(elements, (data2, element) => {
            data2[element.name] = element.value;
            return data2;
        }, {});
        console.log(JSON.stringify(formToJSON(event.target.elements)));

        fetch('https://us-central1-harvestor-f8623.cloudfunctions.net/insertIntoDB/poptavka', {
            method: 'POST',
            body: JSON.stringify(formToJSON(event.target.elements)),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="p-5 bg-white">

                <h3>Vlastník lesa</h3>
                <DemandRegistrationTextInput id={'fullname'} text={'Jméno/název vlastníka'} mandatory={true}/>
                <DemandRegistrationTextInput id={'street'} text={'Adresa - ulice a č.p.'} mandatory={true}/>
                <DemandRegistrationTextInput id={'city'} text={'Adresa - město'} mandatory={true}/>
                <DemandRegistrationTextInput id={'zip'} text={'Adresa - PSČ'} mandatory={true}/>
                <DemandRegistrationTextInput id={'country'} text={'Adresa - stát'} mandatory={true}/>
                <DemandRegistrationTextInput id={'ico'} text={'IČO'}/>
                <DemandRegistrationTextInput id={'vat'} text={'DIČ'}/>

                <h3>Kontaktní osoba</h3>
                <DemandRegistrationTextInput id={'contact'} text={'Jméno osoby'} mandatory={true}/>
                <DemandRegistrationTextInput id={'telephone'} text={'Telefon'} mandatory={true}/>
                <DemandRegistrationTextInput id={'email'} text={'Email'} mandatory={true}/>

                <h3>Údaje o lese</h3>
                <div className="row form-group">
                    <div className="col-md-12">
                        <label className="font-weight-bold" htmlFor="location">Location *</label>
                        <input id="location" name="location" type="hidden" value=""/>

                        <div id="mapid" style={mapstyle}></div>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-md-12">
                        <input type="submit" value="Send" className="btn btn-primary  py-2 px-4 rounded-0"/>
                    </div>
                </div>

            </form>
        );
    }
}

ReactDOM.render(<DemandRegistrationForm/>, document.getElementById('demand_registration_form')
);

var mymap = L.map('mapid').setView([50.0871, 14.4175], 7);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

function onMapClick(e) {
    // alert("You clicked the map at " + e.latlng);
    var marker = L.marker(e.latlng).addTo(mymap);
    marker.bindPopup("Místo k těžbě.").openPopup();
    $('#location').val(e.latlng);
}

mymap.on('click', onMapClick);