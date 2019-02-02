
const mapstyle = {
    width: '600px',
    height: '400px'
};

class HarvesterRegistrationSelectBox extends React.Component {
    render() {
        return (
            <div className="row form-group">
                <div className="col-md-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor={this.props.id}>{this.props.text} {this.props.mandatory ? '*' : ''} </label>
                    <select
                        id={this.props.id}
                        name={this.props.id}
                        // value={props.value}
                        className={this.props.classname}
                        onChange={this.props.onchange}
                    >
                        {/*<option value="" disabled>{props.placeholder}</option>*/}
                        {this.props.options.map(option => {
                            return (
                                <option
                                    key={option.value}
                                    value={option.value}
                                    label={option.label}>{option.label}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>)
    }
}


class HarvesterRegistrationTextInput extends React.Component {
    render() {
        return (
            <div className="row form-group">
                <div className="col-md-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor={this.props.id}>{this.props.text} {this.props.mandatory ? '*' : ''} </label>
                    <input type="text" id={this.props.id} name={this.props.id} className={this.props.classname}
                           placeholder={this.props.text} onChange={this.props.onchange}/>
                    <div className="valid-feedback">
                        {this.props.valid}
                    </div>
                    <div className="invalid-feedback">
                        {this.props.invalid}
                    </div>
                </div>
            </div>
        );
    }
}

class HarvesterRegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.mapstyle = {
            width: '600px',
            height: '400px'
        };

        this.state = {
            harvester: {
                fullname: '',
                street: '',
                city: '',
                zip: '',
                country: 'CZ',
                ico: '',
                vat: '',

                contact: '',
                phone: '',
                email: '',

                harvestertype: '',
                headtype: '',

                range: '30',
                location: ''
            },

            countries : [
                { label: "Česká republika", value: 'CZ' },
                { label: "Slovensko", value: 'SK' },
                { label: "Polsko", value: "PL"}
            ],
            ranges : [
                { label: "30 km", value: "30"},
                { label: "50 km", value: "50"},
                { label: "100 km", value: "100"},
                { label: "Neomezeno", value: "Neomezeno"}
            ],

            // slouzi k ulozeni chybove hlasky pro stranku
            errors: {
                fullname: '',
                street: '',
                city: '',
                zip: '',
                country: '',
                ico: '',
                vat: '',

                contact: '',
                phone: '',
                email: '',

                harvestertype: '',
                headtype: '',

                range: '',
                location: ''
            },
            // slouzi i identifikaci zda byl jiz field validovan (rozlisit smazany a nezadany vstup)
            validated: {
                fullname: false,
                street: false,
                city: false,
                zip: false,
                country: false,
                ico: false,
                vat: false,

                contact: false,
                phone: false,
                email: false,

                harvestertype: false,
                headtype: false,

                range: false,
                location: false
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleUserInput (event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => ({ harvester :
                {...prevState.harvester, [name]: value}
        }), () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        console.log("VALIDATION: Field " + fieldName + ": " + value);

        switch(fieldName) {
            case 'email':
                this.state.validated.email = true;
                var emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                if (value) {
                    if (!emailValid) {
                        this.setState(prevState => ({ errors :
                                {...prevState.errors, [fieldName]: 'Email není validní.'}
                        }));
                        console.log('Email nevalidni');
                        return false;
                    } else {
                        this.setState(prevState => ({ errors :
                                {...prevState.errors, [fieldName]: null}
                        }));
                        console.log('Email validni');
                        return true;
                    }
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Email musí být vyplněn.'}
                    }));
                    console.log('Email prazdny');
                    return false;
                }
            case 'fullname':
                this.state.validated.fullname = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Fullname vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Název/jméno musí být vyplněno.'}
                    }));
                    console.log('Fullname prazdny');
                    return false;
                }
            case 'street':
                this.state.validated.street = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Street vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Ulice musí být vyplněna.'}
                    }));
                    console.log('Street prazdny');
                    return false;
                }
            case 'city':
                this.state.validated.city = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('City vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Město musí být vyplněno.'}
                    }));
                    console.log('City prazdny');
                    return false;
                }
            case 'zip':
                this.state.validated.zip = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Zip vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'PSČ musí být vyplněno.'}
                    }));
                    console.log('Zip prazdny');
                    return false;
                }
            case 'contact':
                this.state.validated.contact = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Contact vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Jméno kontaktní osoby musí být vyplněno.'}
                    }));
                    console.log('Contact prazdny');
                    return false;
                }
            case 'phone':
                this.state.validated.phone = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Phone vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Telefon musí být vyplněn.'}
                    }));
                    console.log('Phone prazdny');
                    return false;
                }
            case 'location':
                this.state.validated.location = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    this.state.errors[fieldName] = null;
                    console.log('Misto zajmu vyplneno');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Oblast zájmu musí být vyplněno.'}
                    }));
                    this.state.errors[fieldName] = 'Oblast zájmu musí být vyplněno.';
                    console.log('Misto zajmu prazdne');
                    return false;
                }
            case 'harvestertype':
                this.state.validated.harvestertype = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Harvester type vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Typ harvestoru musí být vyplněn. Můžeme Vám tak nabídnout odpovídající poptávky.'}
                    }));
                    console.log('Harvester type prazdny');
                    return false;
                }
            case 'headtype':
                this.state.validated.headtype = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Head type vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Typ hlavy musí být vyplněn. Můžeme Vám tak nabídnout odpovídající poptávky.'}
                    }));
                    console.log('Head type prazdny');
                    return false;
                }
            default:
                return true;
        }
    }

    // handleCheckBox(e) {
    //
    //     const newSelection = e.target.value;
    //     let newSelectionArray;
    //
    //     if(this.state.newUser.skills.indexOf(newSelection) > -1) {
    //         newSelectionArray = this.state.newUser.skills.filter(s => s !== newSelection)
    //     } else {
    //         newSelectionArray = [...this.state.newUser.skills, newSelection];
    //     }
    //
    //     this.setState( prevState => ({ newUser:
    //                 {...prevState.newUser, skills: newSelectionArray }
    //         })
    //     )
    // }


    handleSubmit(event) {
        event.preventDefault();
        this.state.harvester.location = document.getElementById("location").value;
        let harvesterForm = this.state.harvester;
        let form_valid = true;

        for (var harvesterField in harvesterForm) {
            var field_validation = this.validateField(harvesterField, this.state.harvester[harvesterField]);
            console.log("Validace " + harvesterField + " skoncila: "+ field_validation);
            if (!field_validation) {
                form_valid = false;
            }
        }

        if (form_valid) {
            console.log(JSON.stringify(harvesterForm));

            fetch('https://us-central1-harvestor-f8623.cloudfunctions.net/insertIntoDB/poptavka', {
                method: 'POST',
                body: JSON.stringify(harvesterForm),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log(response.status);
                if (response.status === 200) {
                    // redirect na dekuji stranku
                    window.location.href = 'registration_ok.html';
                } else {
                    // redirect na faild stranku
                    window.location.href = 'registration_nok.html';
                }
            }).catch((error) => {
                // totalni selhani
                window.location.href = 'registration_nok.html';
            });
        }

    }

    getClassname(fieldname) {
        if (this.state.validated[fieldname]) {
            if (this.state.errors[fieldname]) {
                return 'form-control is-invalid';
            } else {
                return 'form-control is-valid';
            }
        } else {
            return 'form-control';
        }
    }

    render() {
        return (

            <form id="harvesterform" onSubmit={this.handleSubmit} className="p-5 bg-white">

                <h3>Těžař</h3>
                <HarvesterRegistrationTextInput id={'fullname'} text={'Jméno/název vlastníka'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.fullname}
                                             classname={this.getClassname('fullname')}/>

                <HarvesterRegistrationTextInput id={'street'} text={'Adresa - ulice a č.p.'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.street}
                                             classname={this.getClassname('street')}/>

                <HarvesterRegistrationTextInput id={'city'} text={'Adresa - město'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.city}
                                             classname={this.getClassname('city')}/>

                <HarvesterRegistrationTextInput id={'zip'} text={'Adresa - PSČ'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.zip}
                                             classname={this.getClassname('zip')}/>

                <HarvesterRegistrationSelectBox id={'country'} text={'Adresa - stát'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             classname={this.getClassname('country')}
                                             options={this.state.countries}/>

                <HarvesterRegistrationTextInput id={'ico'} text={'IČO'}
                                             onchange={(event) => this.handleUserInput(event)}
                                             classname={this.getClassname('ico')}/>

                <HarvesterRegistrationTextInput id={'vat'} text={'DIČ'}
                                             onchange={(event) => this.handleUserInput(event)}
                                             classname={this.getClassname('vat')}/>

                <h3>Kontaktní osoba</h3>
                <HarvesterRegistrationTextInput id={'contact'} text={'Jméno osoby'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.contact}
                                             classname={this.getClassname('contact')}/>

                <HarvesterRegistrationTextInput id={'phone'} text={'Telefon'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.phone}
                                             classname={this.getClassname('phone')}/>

                <HarvesterRegistrationTextInput id={'email'} text={'Email'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Email validní. Děkujeme za vyplnění'}
                                             invalid={this.state.errors.email}
                                             classname={this.getClassname('email')}/>


                <h3>Těžební stroj</h3>
                <HarvesterRegistrationTextInput id={'harvestertype'} text={'Typ harvestera'} mandatory={true}
                                                onchange={(event) => this.handleUserInput(event)}
                                                valid={'Děkujeme za vyplnění'}
                                                invalid={this.state.errors.harvestertype}
                                                classname={this.getClassname('harvestertype')}/>

                <HarvesterRegistrationTextInput id={'headtype'} text={'Typ těžební hlavice'} mandatory={true}
                                                onchange={(event) => this.handleUserInput(event)}
                                                valid={'Děkujeme za vyplnění'}
                                                invalid={this.state.errors.headtype}
                                                classname={this.getClassname('headtype')}/>

                <h3>Lokalita zájmu</h3>
                <HarvesterRegistrationSelectBox id={'range'} text={'Oblast zájmu'} mandatory={true}
                                                onchange={(event) => this.handleUserInput(event)}
                                                classname={this.getClassname('range')}
                                                options={this.state.ranges}/>
                <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="location">Střed oblasti zájmu *</label>
                        <input type="text" id="location" name="location" className={this.getClassname('location')}
                               disabled={true} placeholder="Místo zvolíte kliknutím na mapu"/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.location}
                        </div>


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

ReactDOM.render(<HarvesterRegistrationForm/>, document.getElementById('harvester_registration_form'));

var fullmap = L.map('mapid').setView([50.0871, 14.4175], 7);
var harvestmarker;

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(fullmap);

function onMapClick(e) {
    if (harvestmarker) {
        fullmap.removeLayer(harvestmarker);
    }

    harvestmarker = L.marker(e.latlng).addTo(fullmap);
    harvestmarker.bindPopup("Oblast zájmu.").openPopup();
    $('#location').val(e.latlng);
    document.getElementById("location").className = "form-control is-valid";
}

fullmap.on('click', onMapClick);