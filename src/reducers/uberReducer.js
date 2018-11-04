export default function reducer(state={
	fetching: false,
	uberData:{}
}, action){
	switch(action.type){
		case "RECEIVED_UBER_DATA":{
			return {...state,fetched:true,uberData:action.payload};	
		}
		case "RECEIVED_WEATHER_STUFF_ERROR":{
		}	
	}
	return state;
}

