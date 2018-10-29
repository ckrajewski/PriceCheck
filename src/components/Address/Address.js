import React from "react";
import './Address.css';
import PlacesAutocomplete, {
    getInputProps,
    getSuggestionItemProps,
    suggestions,
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
export default class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            errorMessage: '',
            latitude: null,
            longitude: null,
            isGeocoding: false,
            coordinates:{},
            cachedCoordinates:null,
        };
    }

    handleChange = address => {
        this.setState({
            address,
            latitude: null,
            longitude: null,
            errorMessage: '',
        });
    };
   
    handleCloseClick = () => {
        this.setState({
            address: '',
            latitude: null,
            longitude: null,
        });
    };
    handleSelect = selected => {
       // this.setState({ isGeocoding: true, address: selected });
        geocodeByAddress(selected)
            .then(res => getLatLng(res[0]))
            .then(({ lat, lng }) => {
                const coordinates={lng:lng,lat:lat};
                this.setState({
                    latitude: lat,
                    longitude: lng,
                    isGeocoding: false,
                    userAddress: selected,
                    coordinates:coordinates,
                    address: selected,
                });
            })
            .catch(error => {
                this.setState({ isGeocoding: false });
                console.log('error', error); // eslint-disable-line no-console
            });
    };
    handleError = (status, clearSuggestions) => {
        console.log('Error from Google Maps API', status); // eslint-disable-line no-console
        this.setState({ errorMessage: status }, () => {
            clearSuggestions();
        });
    };
    isEmpty = obj => {
        return Object.keys(obj).length === 0;
    }
    twoCoordinates = () => {
      const {coordinates, cachedCoordinates } = this.state;
      if(cachedCoordinates == null) {
        return false;
      }
      return coordinates.lat === cachedCoordinates.lat &&
      coordinates.lng === cachedCoordinates.lng;
    }
    render() {
        const {
            address,
            errorMessage,
            latitude,
            longitude,
            isGeocoding,
            coordinates,
            userAddress
        } = this.state;
        let currentUserAddress = userAddress;
        const propsUserAddress=this.props.userAddress;
        if(propsUserAddress) {
          currentUserAddress=propsUserAddress;
        }
        if(!this.isEmpty(coordinates) && !this.twoCoordinates()) {
          this.props.handleCoordinates(coordinates);
          this.setState({cachedCoordinates: coordinates });
        }
        return (
            <div className="searchComponent">
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 2}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <input
                    {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'Demo__search-input',
                    })}
                   value={currentUserAddress}/>
                  {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion)} className="Demo__suggestion-item"
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    <div className="Demo__dropdown-footer">
                      <div>
                    
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}
      </div>
        );
    }
}


