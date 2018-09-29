import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchStuff } from "../../actions/action";
import PlacesAutocomplete from 'react-places-autocomplete';
class HelloWorld extends React.Component {
    constructor() {
        super();
        this.state = {
            'value': null
        };
    }
    handleChange(address, placeId) {
        debugger;
    }

    handleSelect(address, placeId) {
        debugger;
    }
    render() {
        return (
            <div>
            <PlacesAutocomplete
            value={this.state.value}
            onChange={this.handleChange}
            onSelect={this.handleSelect}/>
          </div>
        );
    }
}

const mapToStateProps = (state) => {
    return {
        data: state.weather
    };
};

const mapDispatchToProps = dispatch => ({
    fetchStuff: () => dispatch(fetchStuff())
});


export default connect(mapToStateProps, mapDispatchToProps)(HelloWorld);