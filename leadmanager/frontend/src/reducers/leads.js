import { GET_LEADS, DEL_LEAD } from '../actions/types';

const initialState = {
    leads: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LEADS:
            return {
                ...state,
                leads: action.payload
            }
        case DEL_LEAD:
            return {
                ...state,
                leads: state.leads.filter(lead => lead.id !== action.id)
            }
        default:
            return state
    }
}