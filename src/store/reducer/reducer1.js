import actionType from "../action/actionType";

export default (state = {
	addnum: 0
}, action) => {
	switch (action.type) {
		
		case actionType.TOTALNUM:
			
			return {...state,addnum:action.payload+1}
		default:
			return state;
	}
}