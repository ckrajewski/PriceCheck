import axios from "axios";

export function fetchUberData(userCoordinates, toCoordinates){
	debugger;
	return function(dispatch) {
		axios.post("/api/fetchUberData", {
			userCoordinates:userCoordinates,
			toCoordinates:toCoordinates
		})
		.then((response) => {
			debugger;
		  dispatch({type: "RECEIVED_UBER_DATA",payload:response.data})
		 })
		 .catch((err) =>{
		 	debugger;
		 	dispatch({type: "RECEIVED_STUFF_ERROR",payload:err})
		 })
	}	
}


