import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchStuff } from "../../actions/action";
import Address from "../Address/Address";

export default class FromAddress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usingCurrentLocationPermission: 'pending',
            usingCurrentLocation: false,
            userLocation: {},
            userAddress:null,
        };
    }
    componentDidMount() {
       // this.getCurrentPosition;
        /*
        navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
            debugger;
            console.log(result.state);
        });
        */
        //console.log(this);
        navigator.geolocation.getCurrentPosition((userLocation) => {
            //console.log(this);
            //this.setState({userLocation});
            this.getAddress({lat: userLocation.coords.latitude,lng: userLocation.coords.longitude});
        });

    }
    getAddress(latlng){
        const geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': latlng}, (results, status) => {
            this.setState({userLocation: latlng, userAddress:results[0].formatted_address.split(',')[0]});
        });

    }
    usingCurrentLocation() {
        return (
            <div> Use CurrentLocation
            <input type="checkbox" />
            </div>
        );
    }
    render() {
        const { usingCurrentLocationPermission,userLocation, userAddress } = this.state;
        debugger;
        const renderUseLocationCheckbox = usingCurrentLocationPermission === 'granted' ? this.usingCurrentLocation() : null;
        return (
            <div className="FromAddress">
            {renderUseLocationCheckbox}
            <Address userAddress={userAddress}/>
            </div>
        );
    }
}