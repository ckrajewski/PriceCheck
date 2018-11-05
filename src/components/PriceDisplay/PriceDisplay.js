import React from "react";
import "./PriceDisplay.css";

export default class PriceDisplay extends React.Component {

    componentDidMount() {
       
    }
    render() {
        
        const {rideService, price, rideOption,color} = this.props;
        if(!rideService) {
            return;
        }
        const currentColor={color:color};
        return (
            <div className="PriceContainer">
                <div className="rideOption" style={currentColor}> {rideOption}
                </div>
                <div className="price"> {price}
                </div>
            </div>
        );
    }
}