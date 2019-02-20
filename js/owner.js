
const mapstyle = {
    width: '635px',
    height: '400px'
};

class DemandRegistrationSelectBox extends React.Component {
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


class DemandRegistrationTextInput extends React.Component {
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

class DemandRegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.mapstyle = {
            width: '600px',
            height: '400px'
        };

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
                quantity: '',
                unit: '',
                priceharvest: '',
                pricesale: '',
                location: '',

                contract: ''
            },

            countries : [
                { label: "Česká republika", value: 'CZ' },
                { label: "Slovensko", value: 'SK' },
                { label: "Polsko", value: "PL"}
            ],
            types : [
                { label: "SM", value: 'SM' },
                { label: "BO", value: 'BO' },
                { label: "MD", value: 'MD' },
                { label: "BK", value: 'BK' },
                { label: "DB", value: 'DB' },
                { label: "DG", value: 'DG' }
            ],
            saletypes : [
                { label: "Nepoptávám prodej", value: ''},
                { label: "Prodej nastojato", value: 'STOJ' },
                { label: "Prodej na odvozním místě", value: 'OM' },
            ],
            units : [
                { label: "m3 - objem dřeva", value: 'M3' },
                { label: "m2 - plocha pozemku", value: 'M2' },
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

                contactfirst: '',
                constatlast: '',
                phone: '',
                email: '',

                age: '',
                type: '',
                saletype: '',
                quantity: '',
                unit: '',
                priceharvest: '',
                pricesale: '',
                location: '',

                contract: ''
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

                contactfirst: false,
                contactlast: false,
                phone: false,
                email: false,

                age: false,
                type: false,
                saletype: false,
                quantity: false,
                unit: false,
                priceharvest: false,
                pricesale: false,
                location: false,

                contract: false
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleUserInput (event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => ({ demand :
                {...prevState.demand, [name]: value}
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
            case 'contactfirst':
                this.state.validated.contactfirst = true;
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
            case 'contactlast':
                this.state.validated.contactlast = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Contact vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Příjmení kontaktní osoby musí být vyplněno.'}
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
                    console.log('Misto tezby vyplneno');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Místo těžby musí být vyplněno.'}
                    }));
                    this.state.errors[fieldName] = 'Místo těžby musí být vyplněno.';
                    console.log('Misto tezby prazdne');
                    return false;
                }
            case 'age':
                this.state.validated.age = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Age vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Věk porostu musí být vyplněn. Alespoň orientačně.'}
                    }));
                    console.log('Age prazdny');
                    return false;
                }
            case 'type':
                this.state.validated.type = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Typ porostu vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Typ porostu musí být vyplněn.'}
                    }));
                    console.log('Typ porostu prazdny');
                    return false;
                }
            // case 'saletype':
            //     this.state.validated.saletype = true;
            //     if (value) {
            //         this.setState(prevState => ({ errors :
            //                 {...prevState.errors, [fieldName]: null}
            //         }));
            //         console.log('Typ prodeje vyplnen');
            //         return true;
            //     } else {
            //         this.setState(prevState => ({ errors :
            //                 {...prevState.errors, [fieldName]: 'Způsob prodeje musí být vyplněn.'}
            //         }));
            //         console.log('Typ prodeje prazdny');
            //         return false;
            //     }
            case 'quantity':
                this.state.validated.quantity = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('quantity vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Objem musí být vyplněn, alespoň orientačně.'}
                    }));
                    console.log('quantity prazdny');
                    return false;
                }
            case 'unit':
                this.state.validated.unit = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('unit vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Jednotky objemu těžby musí být vyplněny.'}
                    }));
                    console.log('unit prazdny');
                    return false;
                }
            case 'contract':
                this.state.validated.contract = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('contract vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Pro zadání poptávky je potřeba souhlasit se smluvníma podmínkama.'}
                    }));
                    console.log('contract prazdny');
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
        this.state.demand.location = document.getElementById("location").value;
        let demandForm = this.state.demand;
        let form_valid = true;

        for (var demandField in demandForm) {
            var field_validation = this.validateField(demandField, this.state.demand[demandField]);
            console.log("Validace " + demandField + " skoncila: "+ field_validation);
            if (!field_validation) {
                form_valid = false;
            }
        }

        if (form_valid) {
            console.log(JSON.stringify(demandForm));

            fetch('https://us-central1-harvestor-f8623.cloudfunctions.net/demandRegistration', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: "cors",
                body: JSON.stringify(demandForm)
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

    getClassnameCheckbox(fieldname) {
        if (this.state.validated[fieldname]) {
            if (this.state.errors[fieldname]) {
                return 'form-check-input is-invalid';
            } else {
                return 'form-check-input is-valid';
            }
        } else {
            return 'form-check-input';
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

            <form id="demandform" onSubmit={this.handleSubmit} className="p-5 bg-white">

                <h3>Vlastník lesa</h3>
                <DemandRegistrationTextInput id={'fullname'} text={'Jméno/název vlastníka'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.fullname}
                                             classname={this.getClassname('fullname')}/>

                <DemandRegistrationTextInput id={'street'} text={'Adresa - ulice a č.p.'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.street}
                                             classname={this.getClassname('street')}/>

                <DemandRegistrationTextInput id={'city'} text={'Adresa - město'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.city}
                                             classname={this.getClassname('city')}/>

                <DemandRegistrationTextInput id={'zip'} text={'Adresa - PSČ'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.zip}
                                             classname={this.getClassname('zip')}/>

                <DemandRegistrationSelectBox id={'country'} text={'Adresa - stát'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             classname={this.getClassname('country')}
                                             options={this.state.countries}/>

                <DemandRegistrationTextInput id={'ico'} text={'IČO'}
                                             onchange={(event) => this.handleUserInput(event)}
                                             classname={this.getClassname('ico')}/>

                <DemandRegistrationTextInput id={'vat'} text={'DIČ'}
                                             onchange={(event) => this.handleUserInput(event)}
                                             classname={this.getClassname('vat')}/>

                <h3>Kontaktní osoba</h3>
                <div className="row form-group">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="contactfirst">Jméno osoby *</label>
                        <input type="text" id="contactfirst" name="contactfirst" className={this.getClassname('contactfirst')}
                               placeholder="Jméno osoby" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.contactfirst}
                        </div>
                    </div>

                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="contactlast">Příjmení osoby *</label>
                        <input type="text" id="contactlast" name="contactlast" className={this.getClassname('contactlast')}
                               placeholder="Příjmení osoby" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.contactlast}
                        </div>
                    </div>
                </div>

                <DemandRegistrationTextInput id={'phone'} text={'Telefon'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.phone}
                                             classname={this.getClassname('phone')}/>

                <DemandRegistrationTextInput id={'email'} text={'Email'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Email validní. Děkujeme za vyplnění'}
                                             invalid={this.state.errors.email}
                                             classname={this.getClassname('email')}/>


                <h3>Údaje o lese</h3>
                <div className="row form-group">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="age">Věk porostu *</label>
                        <input type="text" id="age" name="age" className={this.getClassname('age')}
                               placeholder="Věk porostu" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.age}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="type">Typ porostu *</label>
                        <select id="type" name="type"
                                className={this.getClassname('type')}
                                onChange={(event) => this.handleUserInput(event)}>
                            <option value="" disabled selected>Zvolte typ porostu</option>
                            {this.state.types.map(option => {
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
                            {this.state.errors.type}
                        </div>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="quantity">Objem těžby *</label>
                        <input type="text" id="quantity" name="quantity" className={this.getClassname('quantity')}
                               placeholder="Objem těžby" onChange={(event) => this.handleUserInput(event)}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.quantity}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="unit">Jednotky *</label>
                        <select id="unit" name="unit"
                                className={this.getClassname('unit')}
                                onChange={(event) => this.handleUserInput(event)}>
                            <option value="" disabled selected>Zvolte jednotku množství</option>
                            {this.state.units.map(option => {
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
                            {this.state.errors.unit}
                        </div>
                    </div>
                </div>


                <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="saletype">Chcete pomoci s prodejem?</label>
                        <select id="saletype" name="saletype"
                                className={this.getClassname('saletype')}
                                onChange={(event) => this.handleUserInput(event)}>
                            <option value="" disabled selected>Zvolte způsob prodeje</option>
                            {this.state.saletypes.map(option => {
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
                            {this.state.errors.saletype}
                        </div>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="priceharvest">Kolik nabízím za těžbu (maximálně)</label>
                        <input type="text" id="priceharvest" name="priceharvest" className={this.getClassname('priceharvest')}
                               placeholder="Cena těžby (za m3)" onChange={(event) => this.handleUserInput(event)}
                               disabled={this.state.demand.saletype === 'STOJ'}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.priceharvest}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="pricesale">Kolik požaduji při prodeji</label>
                        <input type="text" id="pricesale" name="pricesale" className={this.getClassname('pricesale')}
                               placeholder="Cena za prodej (m3)" onChange={(event) => this.handleUserInput(event)}
                               disabled={this.state.demand.saletype === ''}/>
                        <div className="valid-feedback">
                            Děkujeme za vyplnění
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.pricesale}
                        </div>
                    </div>
                </div>


                <div className="row form-group">
                    <div className="col-md-12 mb-3 mb-md-0">
                        <label className="font-weight-bold" htmlFor="location">Místo těžby *</label>
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
                    <div className="col-md-12 mb-3 mb-md-0">
                        <input type="checkbox" id="contract" name="contract" className={this.getClassnameCheckbox('contract')}
                               onChange={(event) => this.handleUserInput(event)}/>
                        <label className="font-weight-bold form-check-label" htmlFor="contract">Souhlasím se smluvníma podmínkama serveru Můj les</label>
                        <div className="valid-feedback">
                            Děkujeme za souhlas
                        </div>
                        <div className="invalid-feedback">
                            {this.state.errors.contract}
                        </div>
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

ReactDOM.render(<DemandRegistrationForm/>, document.getElementById('demand_registration_form'));

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
    harvestmarker.bindPopup("Místo k těžbě.").openPopup();
    $('#location').val(e.latlng);
    document.getElementById("location").className = "form-control is-valid";
}

fullmap.on('click', onMapClick);