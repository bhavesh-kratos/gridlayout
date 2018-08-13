// import { fetchGitData } from '../../actions/routines';
/*
as of now saving item's operations data only in this reducer
*/
import { ITEMS_OPERATION } from '../../actions/actionTypes';

const initialState = {
    operationData: {},  // {'item-name': 'operation-name'} , or  can choose maps over object
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ITEMS_OPERATION:
            return {...state, operationData:{...state.operationData, ...action.payload}};
        default:
            return state;
    }
};

export default reducer;
