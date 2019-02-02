
const mapstyle = {
    width: '600px',
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

                contact: '',
                phone: '',
                email: '',

                location: ''
            },

            // skillOptions: ['Programming', 'Development', 'Design', 'Testing'],
            countries : [
                { label: "Česká republika", value: 'CZ' },
                { label: "Slovensko", value: 'SK' },
                { label: "Polsko", value: "PL"}
            ],

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

                location: ''
            },
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

                location: false
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
                    } else {
                        this.setState(prevState => ({ errors :
                                {...prevState.errors, [fieldName]: null}
                        }));
                        console.log('Email validni');
                    }
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Email musí být vyplněn.'}
                    }));
                    console.log('Email prazdny');
                }
                break;
            case 'fullname':
                this.state.validated.fullname = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Fullname vyplnen');
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Název/jméno musí být vyplněno.'}
                    }));
                    console.log('Fullname prazdny');
                }
                break;
            case 'street':
                this.state.validated.street = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Street vyplnen');
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Ulice musí být vyplněna.'}
                    }));
                    console.log('Street prazdny');
                }
                break;
            case 'city':
                this.state.validated.city = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('City vyplnen');
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Město musí být vyplněno.'}
                    }));
                    console.log('City prazdny');
                }
                break;
            case 'zip':
                this.state.validated.zip = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Zip vyplnen');
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'PSČ musí být vyplněno.'}
                    }));
                    console.log('Zip prazdny');
                }
                break;
            case 'contact':
                this.state.validated.contact = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Contact vyplnen');
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Jméno kontaktní osoby musí být vyplněno.'}
                    }));
                    console.log('Contact prazdny');
                }
                break;
            case 'phone':
                this.state.validated.phone = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    console.log('Phone vyplnen');
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Telefon musí být vyplněn.'}
                    }));
                    console.log('Phone prazdny');
                }
                break;
            case 'location':
                this.state.validated.location = true;
                if (value) {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: null}
                    }));
                    this.state.errors[fieldName] = null;
                    console.log('Misto tezby vyplneno');
                } else {
                    this.setState(prevState => ({ errors :
                            {...prevState.errors, [fieldName]: 'Místo těžby musí být vyplněno.'}
                    }));
                    this.state.errors[fieldName] = 'Místo těžby musí být vyplněno.';
                    console.log('Misto tezby prazdne');
                }
                break;
            default:
                break;
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

    // handleFormSubmit(e) {
    //     e.preventDefault();
    //     let demandForm = this.state.demand;
    //
    //     fetch('http://example.com',{
    //         method: "POST",
    //         body: JSON.stringify(demandForm),
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //     }).then(response => {
    //         response.json().then(data =>{
    //             console.log("Successful" + data);
    //         })
    //     })
    // }

    handleSubmit(event) {
        event.preventDefault();
        this.state.demand.location = document.getElementById("location").value;
        let demandForm = this.state.demand;
        for (var demandField in demandForm) {
            this.validateField(demandField, this.state.demand[demandField]);
        }

        let form_valid = true;
        let errors = this.state.errors;
        for (var errorsField in errors) {
            if (this.state.errors[errorsField]) {
                form_valid = false;
                console.log("Nalezen nevalidni vstup s hlaskou: " + this.state.errors[errorsField]);
            }
        }

        if (form_valid) {
            console.log(JSON.stringify(demandForm));

            fetch('https://us-central1-harvestor-f8623.cloudfunctions.net/insertIntoDB/poptavka', {
                method: 'POST',
                body: JSON.stringify(demandForm),
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
                <DemandRegistrationTextInput id={'contact'} text={'Jméno osoby'} mandatory={true}
                                             onchange={(event) => this.handleUserInput(event)}
                                             valid={'Děkujeme za vyplnění'}
                                             invalid={this.state.errors.contact}
                                             classname={this.getClassname('contact')}/>

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




                {/*<Input inputType={'number'}*/}
                       {/*name={'age'}*/}
                       {/*title= {'Age'}*/}
                       {/*value={this.state.newUser.age}*/}
                       {/*placeholder = {'Enter your age'}*/}
                       {/*handleChange={this.handleAge} /> /!* Age *!/*/}


                {/*<Select title={'Gender'}*/}
                        {/*name={'gender'}*/}
                        {/*options = {this.state.genderOptions}*/}
                        {/*value = {this.state.newUser.gender}*/}
                        {/*placeholder = {'Select Gender'}*/}
                        {/*handleChange = {this.handleInput}*/}
                {/*/> /!* Age Selection *!/*/}
                {/*<CheckBox  title={'Skills'}*/}
                           {/*name={'skills'}*/}
                           {/*options={this.state.skillOptions}*/}
                           {/*selectedOptions = { this.state.newUser.skills}*/}
                           {/*handleChange={this.handleCheckBox}*/}
                {/*/> /!* Skill *!/*/}
                {/*<TextArea*/}
                    {/*title={'About you.'}*/}
                    {/*rows={10}*/}
                    {/*value={this.state.newUser.about}*/}
                    {/*name={'currentPetInfo'}*/}
                    {/*handleChange={this.handleTextArea}*/}
                    {/*placeholder={'Describe your past experience and skills'} />/!* About you *!/*/}

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