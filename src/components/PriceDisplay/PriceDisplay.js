import React from "react";
import "./PriceDisplay.css";

export default class PriceDisplay extends React.Component {

    componentDidMount() {
       
    }
    render() {
        
        const {rideService, price} = this.props;
        if(!rideService) {
            return;
        }
        return (
            <div className="FromAddress">
                <div className="rideService"> {rideService}
                </div>
                <div className="price"> {price}
                </div>
            </div>
        );
    }
}