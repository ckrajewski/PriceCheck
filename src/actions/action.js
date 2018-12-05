import axios from "axios";

export function fetchUberData(userCoordinates, toCoordinates) {
    return function(dispatch) {
        axios.post("/api/fetchUberData", {
                userCoordinates: userCoordinates,
                toCoordinates: toCoordinates
            })
            .then((response) => {
                dispatch({ type: "RECEIVED_UBER_DATA", payload: response.data })
            })
            .catch((err) => {
                dispatch({ type: "RECEIVED_STUFF_ERROR", payload: err })
            })
    }
}
export function fetchLyftData(userCoordinates, toCoordinates) {
    return function(dispatch) {
        axios.post("/api/fetchLyftData", {
                userCoordinates: userCoordinates,
                toCoordinates: toCoordinates
            })
            .then((response) => {
                dispatch({ type: "RECEIVED_LYFT_DATA", payload: response.data })
            })
            .catch((err) => {
                dispatch({ type: "RECEIVED_LYFT_ERROR", payload: err })
            })
    }
}

export function fetchLocationData(addressType, userCoordinates) {
    return function(dispatch) {
        let type = "";
        debugger;
        if (addressType === "toAddress") {
            type = "RECEIVED_TO_LOCATION_DATA";
        }
        if (addressType === "fromAddress") {
            type = "RECEIVED_FROM_LOCATION_DATA";
        }

        dispatch({ type: type, payload: userCoordinates });
    }
}