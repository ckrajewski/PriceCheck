import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchUberData } from "../../actions/action";
import Address from "../Address/Address";
import FromAddress from "../FromAddress/FromAddress";
import "./PriceCheck.css";

class PriceCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usingCurrentLocationPermission: 'pending',
            usingCurrentLocation: false,
            userCoordinates: {},
            toCoordinates:{},
            cachedUserLocation:null,
            cachedToLocation:null,
        };
    }
    handleToCoordinates = toCoordinates => {
        this.setState({toCoordinates});
    };
    handleUserCoordinates = userCoordinates => {
        this.setState({userCoordinates});
    };
    isEmpty = obj => {
        return Object.keys(obj).length === 0;
    }
    isCachedEqual= () => {

      const {userCoordinates, toCoordinates, cachedUserLocation, cachedToLocation } = this.state;
      if(cachedUserLocation==null || cachedToLocation == null){
        return false;
      }
      return userCoordinates.lat === cachedUserLocation.lat &&
      userCoordinates.lng === cachedUserLocation.lng &&
      toCoordinates.lat === cachedToLocation.lat && 
      cachedToLocation.lng === cachedToLocation.lng;
    }
    render() {
        const {userCoordinates, toCoordinates, cachedUserLocation, cachedToLocation} = this.state;
        const {uberData} = this.props;
        let uberPrices=[];
        debugger;
        if(!this.isEmpty(uberData)){
            uberPrices = uberData.prices.reduce((result,route) => {
                if(route.display_name==="UberX" || route.display_name==="UberPool"){
                    result.push(route);
                }
                return result;
            },[]);
        }
        if(!this.isEmpty(userCoordinates) && !this.isEmpty(toCoordinates) && !this.isCachedEqual()) {
            this.props.fetchUberData(userCoordinates, toCoordinates);
            this.setState({cachedToLocation: toCoordinates, cachedUserLocation: userCoordinates});
        }
        return (
            <div className="PriceCheckContainer">
            {uberPrices.map( uberPrice => 
                uberPrice.estimate 
            )}
                <div className="FromAddress">
                    <div className="Header"> From Address </div>
                    <FromAddress handleCoordinates={this.handleUserCoordinates} />
                </div>
                <div className="ToAddress">
                    <Address handleCoordinates={this.handleToCoordinates}  />
                </div>
            </div>
        );
    }
}
 const mapToStateProps = (state) => {
    return {
      uberData: state.uber.uberData
    };
  };

const mapDispatchToProps = dispatch => ({
  fetchUberData: (userCoordinates, toCoordinates) => dispatch(fetchUberData(userCoordinates, toCoordinates))
});
export default connect(mapToStateProps,mapDispatchToProps)(PriceCheck);