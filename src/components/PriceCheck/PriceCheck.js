import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchStuff } from "../../actions/action";
import Address from "../Address/Address";
import FromAddress from "../FromAddress/FromAddress";
import "./PriceCheck.css";

export default class PriceCheck extends React.Component {
    render() {
        return (
            <div className="PriceCheckContainer">
                <div className="FromAddress">
                    <div className="Header"> From Address </div>
                    <FromAddress />
                </div>
                <div className="ToAddress">
                    <Address />
                </div>
            </div>
        );
    }
}