
class HarvesterListComp extends React.Component {
    render() {
        return (
            <ul className={'list-group'}>
                {this.props.harvesters.map(function(harvester){
                    return <li className={'list-group-item'}>{harvester.name} - Hodnocení: {harvester.rank ? harvester.rank : 'zatím nehodnocen'}</li>;
                })}
            </ul>
        )
    }
}

class HarvesterList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            harvesters: []
        };
    }

    componentDidMount() {
        fetch('https://us-central1-harvestor-f8623.cloudfunctions.net/harvesterList', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors"
        }).then(response=>response.json()
        ).then(data=>{
            console.log("Jsem tu");
            console.log(data);
            // this.state.harvesters = data;
            this.setState({harvesters : data});
            console.log('data z ' + this.state.harvesters);
            });
    }

    render() {
        return (
            <div className="col-md-12 mb-3 mb-md-0">
                <h3>Seznam registrovaných těžařů</h3>

                <HarvesterListComp harvesters={this.state.harvesters}/>
            </div>

        );
    }
}

ReactDOM.render(<HarvesterList/>, document.getElementById('harvester_list'));
