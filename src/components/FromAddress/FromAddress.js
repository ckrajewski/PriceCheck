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
            coordinates: {},
            userAddress:null,
            cachedCoordinates:null,
        };
    }
    componentDidMount() {
        navigator.permissions.query({name:'geolocation'}).then((result) => {
        if(result.state === 'granted') {
        navigator.geolocation.getCurrentPosition((userLocation) => {
            //console.log(this);
            //this.setState({userLocation});
            this.getAddress({lat: userLocation.coords.latitude,lng: userLocation.coords.longitude});
        });
     }
    });
    }
    getAddress = (latlng) => {
        const geocoder = new google.maps.Geocoder;
        geocoder.geocode({'location': latlng}, (results, status) => {
            this.setState({coordinates: latlng, userAddress:results[0].formatted_address.split(',')[0]});
        });

    };

    usingCurrentLocation() {
        return (
            <div> Use CurrentLocation
            <input type="checkbox" />
            </div>
        );
    }
    isEmpty = obj => {
        return Object.keys(obj).length === 0;
    }
    twoCoordinates = () => {
      const {coordinates, cachedCoordinates } = this.state;
      if(cachedCoordinates==null){
        return false;
      }
      return coordinates.lat === cachedCoordinates.lat &&
      coordinates.lng === cachedCoordinates.lng;
    }
    render() {
        const { usingCurrentLocationPermission, cachedUserLocation, coordinates, userAddress } = this.state;
        if(!this.isEmpty(coordinates) && !this.twoCoordinates()) {
          this.props.handleCoordinates(coordinates);
          this.setState({cachedCoordinates: coordinates });
        }
        const renderUseLocationCheckbox = usingCurrentLocationPermission === 'granted' ? this.usingCurrentLocation() : null;
        return (
            <div className="FromAddress">
            {renderUseLocationCheckbox}
            <Address userAddress={userAddress}/>
            </div>
        );
    }
}