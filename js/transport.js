
class TransportRegistrationSelectBox extends React.Component {
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


class TransportRegistrationTextInput extends React.Component {
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

class TransportRegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transport: {
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

                trucktype: '',
                truckcapacity: ''
            },

            countries : [
                { label: "Česká republika", value: 'CZ' },
                { label: "Slovensko", value: 'SK' },
                { label: "Polsko", value: "PL"}
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

                trucktype: '',
                truckcapacity: ''
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

                trucktype: false,
                truckcapacity: false
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleUserInput (event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(prevState => ({ transport :
                {...prevState.transport, [name]: value}
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
            case 'trucktype':
                this.state.validated.trucktype = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Truck type vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Typ vozu musí být vyplněn. Máte-li jich více, prosím uveďtě ten největší.'}
                    }));
                    console.log('Truck type prazdny');
                    return false;
                }
            case 'truckcapacity':
                this.state.validated.truckcapacity = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Truck capacity vyplnen');
                    return true;
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Kapacita vozu musí být vyplněna. Máte-li jich více, prosím uveďtě ten největší.'}
                    }));
                    console.log('Truck capacity prazdny');
                    return false;
                }
            default:
                return true;
        }
    }


    handleSubmit(event) {
        event.preventDefault();
        let transportForm = this.state.transport;
        let form_valid = true;

        for (var transportField in transportForm) {
            var field_validation = this.validateField(transportField, this.state.transport[transportField]);
            console.log("Validace " + transportField + " skoncila: "+ field_validation);
            if (!field_validation) {
                form_valid = false;
            }
        }

        if (form_valid) {
            console.log(JSON.stringify(transportForm));

            fetch('https://us-central1-harvestor-f8623.cloudfunctions.net/transportRegistration', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: "cors",
                body: JSON.stringify(transportForm)
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

            <form id="transportform" onSubmit={this.handleSubmit} className="p-5 bg-white">

                <h3>Přepravce</h3>
                <TransportRegistrationTextInput id={'fullname'} text={'Jméno/název vlastníka'} mandatory={true}
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
                <TransportRegistrationTextInput id={'contact'} text={'Jméno osoby'} mandatory={true}
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

                <h3>Přeprava</h3>
                <TransportRegistrationTextInput id={'trucktype'} text={'Typ vozu'} mandatory={true}
                                                onchange={(event) => this.handleUserInput(event)}
                                                valid={'Děkujeme za vyplnění'}
                                                invalid={this.state.errors.trucktype}
                                                classname={this.getClassname('trucktype')}/>

                <TransportRegistrationTextInput id={'truckcapacity'} text={'Kapacita vozu (m3)'} mandatory={true}
                                                onchange={(event) => this.handleUserInput(event)}
                                                valid={'Děkujeme za vyplnění'}
                                                invalid={this.state.errors.truckcapacity}
                                                classname={this.getClassname('truckcapacity')}/>


                <div className="row form-group">
                    <div className="col-md-12">
                        <input type="submit" value="Send" className="btn btn-primary  py-2 px-4 rounded-0"/>
                    </div>
                </div>

            </form>

        );
    }
}

ReactDOM.render(<TransportRegistrationForm/>, document.getElementById('transport_registration_form'));
