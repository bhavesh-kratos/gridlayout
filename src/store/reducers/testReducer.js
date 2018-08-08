// import { fetchGitData } from '../../actions/routines';
import { ADD_ARRAY_TO_DATA } from '../../actions/actionTypes';

const initialState = {
    data: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ARRAY_TO_DATA:
            console.log('at reducer', action.payload)
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
