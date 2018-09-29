import axios from "axios";

export function fetchStuff(){
	return function(dispatch) {
		axios.get("/api/geoCode")
		.then((response) => {
			debugger;
		  dispatch({type: "RECEIVED_STUFF",payload:response.data})
		 })
		 .catch((err) =>{
		 	debugger;
		 	dispatch({type: "RECEIVED_STUFF_ERROR",payload:err})
		 })
	}	
}


