
const mapstyle = {
    width: '1015px',
    height: '600px'
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

                harvester_type: '',
                harvester_size: '',
                harvester_year: '',
                harvester_odo: '',
                forwarder_type: '',
                forwarder_size: '',
                forwarder_year: '',
                forwarder_odo: '',

                range: '30',
                location_lat: '',
                location_lng: ''
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
                { label: "Neomezeno", value: "250"}
            ],
            years : [
                { label: "2000 a starší", value: 'OLD' },
                { label: "2001", value: '2001' },
                { label: "2002", value: '2002' },
                { label: "2003", value: '2003' },
                { label: "2004", value: '2004' },
                { label: "2005", value: '2005' },
                { label: "2006", value: '2006' },
                { label: "2007", value: '2007' },
                { label: "2008", value: '2008' },
                { label: "2009", value: '2009' },
                { label: "2010", value: '2010' },
                { label: "2011", value: '2011' },
                { label: "2012", value: '2012' },
                { label: "2013", value: '2013' },
                { label: "2014", value: '2014' },
                { label: "2015", value: '2015' },
                { label: "2016", value: '2016' },
                { label: "2017", value: '2017' },
                { label: "2018", value: '2018' },
                { label: "2019", value: '2019' },
            ],
            harvester_sizes : [
                { label: "Malý", value: "MALY"},
                { label: "Střední", value: "STREDNI"},
                { label: "Velký", value: "VELKY"}
            ],
            forwarder_sizes : [
                { label: "I.a - velmi malé - 10-30 kW a <3 t", value: "VELMI_MALE"},
                { label: "I.b - malé - 31-60 kW a <6 t", value: "MALE"},
                { label: "II. - střední - 61-90 kW a 6-11 t", value: "STREDNI"},
                { label: "III.a - velké - 91-120 kW a 11-14 t", value: "VELKE"},
                { label: "III.b - velmi velké - 130+ kW a 14-17 t", value: "VELMI_VELKE"}
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

                harvester_type: '',
                harvester_size: '',
                harvester_year: '',
                harvester_odo: '',
                forwarder_type: '',
                forwarder_size: '',
                forwarder_year: '',
                forwarder_odo: '',

                range: '',
                location_lat: '',
                location_lng: ''
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

                harvester_type: false,
                harvester_size: false,
                harvester_year: false,
                harvester_odo: false,
                forwarder_type: false,
                forwarder_size: false,
                forwarder_year: false,
                forwarder_odo: false,

                range: false,
                location_lat: false,
                location_lng: false
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

        if (name === 'range') {
            if (harvestmarker) {
                fullmap.removeLayer(harvestcircle);
                var km = value * 1000;

                harvestcircle = L.circle(harvestmarker.getLatLng(), {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.2,
                    radius: km
                }).addTo(fullmap);
            }
        }
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
            case 'location_lng':
                this.state.validated.location_lng = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    this.state.errors[fieldName] = null;
                    console.log('Oblast zájmu vyplneno');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Oblast zájmu musí být vyplněno. Prosím zvolte oblast kliknutím na mapě.'}
                    }));
                    this.state.errors[fieldName] = 'Oblast zájmu musí být vyplněno. Prosím zvolte oblast kliknutím na mapě.';
                    console.log('Oblast zájmu prazdne');
                    return false;
                }
            case 'location_lat':
                this.state.validated.location_lat = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    this.state.errors[fieldName] = null;
                    console.log('Oblast zájmu vyplneno');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Oblast zájmu musí být vyplněno Prosím zvolte oblast kliknutím na mapě..'}
                    }));
                    this.state.errors[fieldName] = 'Oblast zájmu musí být vyplněno. Prosím zvolte oblast kliknutím na mapě.';
                    console.log('Oblast zájmu prazdne');
                    return false;
                }
            case 'harvester_type':
                this.state.validated.harvester_type = true;
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
            case 'forwarder_type':
                this.state.validated.forwarder_type = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Forwarder type vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Typ vyvážečky musí být vyplněn. Můžeme Vám tak nabídnout odpovídající poptávky.'}
                    }));
                    console.log('Forwarder type prazdny');
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
        this.state.harvester.location_lat = document.getElementById("location_lat").value;
        this.state.harvester.location_lng = document.getElementById("location_lng").value;
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

            fetch('https://us-central1-harvestor-f8623.cloudfunctions.net/harvesterRegistration', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: "cors",
                body: JSON.stringify(harvesterForm)
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

                <div className="row form-group">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="street">Adresa - ulice a č.p. *</label>
                        <input type="text" id="street" name="street" className={this.getClassname('street')}
                               placeholder="Adresa - ulice a č.p." onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.street}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="city">Adresa - město *</label>
                        <input type="text" id="city" name="city" className={this.getClassname('city')}
                               placeholder="Adresa - město" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.city}
                        </div>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="zip">Adresa - PSČ *</label>
                        <input type="text" id="zip" name="zip" className={this.getClassname('zip')}
                               placeholder="Adresa - PSČ" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.zip}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="country">Adresa - stát *</label>
                        <select
                            id="country" name="country"
                            defaultValue="CZ"
                            className={this.getClassname('country')}
                            onChange={(event) => this.handleUserInput(event)}>
                            {this.state.countries.map(option => {
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
                </div>

                <div className="row form-group">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="ico">IČO</label>
                        <input type="text" id="ico" name="ico" className={this.getClassname('ico')}
                               placeholder="IČO" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.ico}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="vat">DIČ</label>
                        <input type="text" id="vat" name="vat" className={this.getClassname('vat')}
                               placeholder="DIČ" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.vat}
                        </div>
                    </div>
                </div>

                <h3>Kontaktní osoba</h3>
                <HarvesterRegistrationTextInput id={'contact'} text={'Jméno osoby'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.contact}
                                             classname={this.getClassname('contact')}/>

                <div className="row form-group">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="phone">Telefon *</label>
                        <input type="text" id="phone" name="phone" className={this.getClassname('phone')}
                               placeholder="Telefon" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.phone}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="email">Email *</label>
                        <input type="text" id="email" name="email" className={this.getClassname('email')}
                               placeholder="Email" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Email validní. Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.email}
                        </div>
                    </div>
                </div>


                <h3>Těžební stroj</h3>
                <HarvesterRegistrationTextInput id={'harvester_type'} text={'Značka výrobce harvestora'} mandatory={true}
                                                onchange={(event) => this.handleUserInput(event)}
                                                valid={'Děkujeme za vyplnění'}
                                                invalid={this.state.errors.harvester_type}
                                                classname={this.getClassname('harvester_type')}/>

                <div className="row form-group">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="harvester_year">Rok výroby</label>
                        <select id="harvester_year" name="harvester_year"
                                className={this.getClassname('harvester_year')}
                                onChange={(event) => this.handleUserInput(event)}
                                defaultValue={''}>
                            <option value="" disabled>Zvolte rok výroby</option>
                            {this.state.years.map(option => {
                                return (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        label={option.label}>{option.label}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.harvester_year}
                        </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="harvester_size">Velikost harvestera</label>
                        <select id="harvester_size" name="harvester_size"
                                className={this.getClassname('harvester_size')}
                                onChange={(event) => this.handleUserInput(event)}
                                defaultValue={''}>
                            <option value="" disabled>Zvolte velikost (dle popisu níže)</option>
                            {this.state.harvester_sizes.map(option => {
                                return (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        label={option.label}>{option.label}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.harvester_size}
                        </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="harvester_odo">Stav motohodin</label>
                        <input type="text" id="harvester_odo" name="harvester_odo" className={this.getClassname('harvester_odo')}
                               placeholder="Stav motohodin" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.harvester_odo}
                        </div>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="card-deck mb-3 text-center">
                            <div className="card md-4 box-shadow">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Malý</h4>
                                </div>
                                <div className="card-body">
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Výkon motoru: do 70 kW</li>
                                        <li>Hmotnost: 4-8 t</li>
                                        <li>Šířka: 160-200 cm</li>
                                        <li>Dosah jeřábu: do 8.5 m</li>
                                        <li>Hmotnotost: do 0.15 m3/strom</li>
                                        <li>Max průměr na úřezu: 20-35 cm</li>
                                        <li>Výkon: 3-5 m3/mth</li>
                                        <li>Roční výkon: 7-8 tis m3/rok</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="card-deck mb-3 text-center">
                            <div className="card md-4 box-shadow">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Střední</h4>
                                </div>
                                <div className="card-body">
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Výkon motoru: 70-140 kW</li>
                                        <li>Hmotnost: 9-13 t</li>
                                        <li>Šířka: 240-280 cm</li>
                                        <li>Dosah jeřábu: 8.5-10 m</li>
                                        <li>Hmotnotost: do 0.35 m3/strom</li>
                                        <li>Max průměr na úřezu: 35-45 cm</li>
                                        <li>Výkon: 4-8 m3/mth</li>
                                        <li>Roční výkon: 12 tis m3/rok</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="card-deck mb-3 text-center">
                            <div className="card mb-4 box-shadow">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Velký</h4>
                                </div>
                                <div className="card-body">
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Výkon motoru: nad 140 kW</li>
                                        <li>Hmotnost: 13-18 t</li>
                                        <li>Šířka: 260-290 cm</li>
                                        <li>Dosah jeřábu: 10-11 m</li>
                                        <li>Hmotnotost: nad 0.35 m3/strom</li>
                                        <li>Max průměr na úřezu: 45-65 cm</li>
                                        <li>Výkon: 5-15 m3/mth</li>
                                        <li>Roční výkon: 18 tis m3/rok</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <HarvesterRegistrationTextInput id={'forwarder_type'} text={'Značka výrobce vyvážečky'} mandatory={true}
                                                onchange={(event) => this.handleUserInput(event)}
                                                valid={'Děkujeme za vyplnění'}
                                                invalid={this.state.errors.forwarder_type}
                                                classname={this.getClassname('forwarder_type')}/>

                <div className="row form-group">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="forwarder_year">Rok výroby</label>
                        <select id="forwarder_year" name="forwarder_year"
                                className={this.getClassname('forwarder_year')}
                                onChange={(event) => this.handleUserInput(event)}
                                defaultValue={''}>
                            <option value="" disabled>Zvolte rok výroby</option>
                            {this.state.years.map(option => {
                                return (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        label={option.label}>{option.label}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.forwarder_year}
                        </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="forwarder_size">Velikost vyvážečky</label>
                        <select id="harvester_size" name="forwarder_size"
                                className={this.getClassname('forwarder_size')}
                                onChange={(event) => this.handleUserInput(event)}
                                defaultValue={''}>
                            <option value="" disabled>Zvolte velikost</option>
                            {this.state.forwarder_sizes.map(option => {
                                return (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        label={option.label}>{option.label}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.forwarder_size}
                        </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="forwarder_odo">Stav motohodin</label>
                        <input type="text" id="forwarder_odo" name="forwarder_odo" className={this.getClassname('forwarder_odo')}
                               placeholder="Stav motohodin" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.forwarder_odo}
                        </div>
                    </div>
                </div>


                <h3>Lokalita zájmu</h3>
                <HarvesterRegistrationSelectBox id={'range'} text={'Oblast zájmu'} mandatory={true}
                                                onchange={(event) => this.handleUserInput(event)}
                                                classname={this.getClassname('range')}
                                                options={this.state.ranges}/>
                <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="location_lng">Střed oblasti zájmu *</label>
                        <input type="text" id="location_lat" name="location_lat" className={this.getClassname('location_lat')}
                               disabled={true} placeholder="Místo zvolíte kliknutím na mapu"/>
                        <input type="text" id="location_lng" name="location_lng" className={this.getClassname('location_lng')}
                               disabled={true} placeholder="Místo zvolíte kliknutím na mapu"/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.location_lng}
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
var harvestcircle;

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
        fullmap.removeLayer(harvestcircle);
    }

    harvestmarker = L.marker(e.latlng).addTo(fullmap);
    harvestmarker.bindPopup("Oblast zájmu.").openPopup();
    $('#location_lat').val(e.latlng.lat);
    $('#location_lng').val(e.latlng.lng);
    document.getElementById("location_lat").className = "form-control is-valid";
    document.getElementById("location_lng").className = "form-control is-valid";

    var km = $('#range').val() * 1000;
    harvestcircle = L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2,
        radius: km
    }).addTo(fullmap);
}

fullmap.on('click', onMapClick);