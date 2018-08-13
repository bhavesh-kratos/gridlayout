import * as actionTypes from './actionTypes';

// please note that routines helps in creating action creators of 4 types for a given actionType(string): request, success, failure and completed 

// normal action creators
export const addArrayToData = (data) => {
    console.log('at action', data)
    return { 'type': actionTypes.ADD_ARRAY_TO_DATA, 'payload': data }
};

/*
data: {'item-name': 'operation-name'}, sets opertion for particular item
*/
export const addItemOperation = (data) => {
    console.log('at operation action', data)
    return { 'type': actionTypes.ITEMS_OPERATION, 'payload': data }
};
