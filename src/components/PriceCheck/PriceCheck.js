import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchUberData, fetchLyftData } from "../../actions/action";
import Address from "../Address/Address";
import FromAddress from "../FromAddress/FromAddress";
import PriceDisplay from "../PriceDisplay/PriceDisplay";
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
        const {uberData, lyftData} = this.props;
        const lyftColor = {color:"#ff00bf"};
        let uberPrices=[];
        let lyftPrices=[];        
        let uberTitle=null;
        let lyftTitle=null;
        if(!this.isEmpty(uberData)){
            uberPrices = uberData.prices.reduce((result,route) => {
                if(route.display_name==="UberX" || route.display_name==="UberPool"){
                    result.push(route);
                }
                return result;
            },[]);
            uberTitle="Uber";
        }
        if(!this.isEmpty(lyftData)){
            lyftPrices = lyftData.cost_estimates.reduce((result,route) => {
                if(route.display_name==="Shared" || route.display_name==="Lyft"){
                    result.push(route);
                }
                return result;
            },[]);
            lyftTitle="Lyft";
        }
        if(!this.isEmpty(userCoordinates) && !this.isEmpty(toCoordinates) && !this.isCachedEqual()) {
            this.props.fetchUberData(userCoordinates, toCoordinates);
            this.props.fetchLyftData(userCoordinates, toCoordinates);
            this.setState({cachedToLocation: toCoordinates, cachedUserLocation: userCoordinates});
        }
        return (
            <div className="PriceCheckContainer">
            
                <div className="FromAddress">
                    <div className="Header"> From Address </div>
                    <FromAddress handleCoordinates={this.handleUserCoordinates} />
                </div>
                
                <div className="ToAddress">
                    <div className="Header"> To Address </div>
                    <Address handleCoordinates={this.handleToCoordinates}  />
                </div>
                <div className="center">
                <div className="rideService">
                    {uberTitle}
                </div>
                {uberPrices.map( uberPrice => 
                    <PriceDisplay color="black" rideService="Uber" rideOption={uberPrice.display_name} price={uberPrice.estimate} />
                 )}
                </div>
                <div className="center">
                <div className="rideService" style={lyftColor}>
                    {lyftTitle}
                </div>
                 {lyftPrices.map( lyftPrice => 
                    <PriceDisplay color="#ff00bf" rideService="Lyft" rideOption={lyftPrice.display_name} price={"$"+(lyftPrice.estimated_cost_cents_min/100) + '-' + (lyftPrice.estimated_cost_cents_max/100) } />
                 )}
                 </div>
            </div>
        );
    }
}
 const mapToStateProps = (state) => {
    return {
      uberData: state.uber.uberData,
      lyftData: state.lyft.lyftData
    };
  };

const mapDispatchToProps = dispatch => ({
  fetchUberData: (userCoordinates, toCoordinates) => dispatch(fetchUberData(userCoordinates, toCoordinates)),
  fetchLyftData: (userCoordinates, toCoordinates) => dispatch(fetchLyftData(userCoordinates, toCoordinates))
});
export default connect(mapToStateProps,mapDispatchToProps)(PriceCheck);