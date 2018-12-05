export default function reducer(state = {
    fetching: false,
    userFromLocation: {},
    userToLocation: {},
}, action) {
    switch (action.type) {
        case "RECEIVED_FROM_LOCATION_DATA":
            return { ...state, fetched: true, userFromLocation: action.payload };
        case "RECEIVED_TO_LOCATION_DATA":

            return { ...state, fetched: true, userToLocation: action.payload };

        case "RECEIVED_FROM_LOCATION_DATA_ERROR":
            return { ...state, fetched: false, error: "ERROR" };
    }
    return state;
}