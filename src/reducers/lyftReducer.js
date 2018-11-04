export default function reducer(state={
	fetching: false,
	lyftData:{}
}, action){
	switch(action.type){
		case "RECEIVED_LYFT_DATA":{
			return {...state,fetched:true,lyftData:action.payload};	
		}
		case "RECEIVED_LYFT_DATA_ERROR":{
		}	
	}
	return state;
}

