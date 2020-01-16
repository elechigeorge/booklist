import axios from 'axios';
import { GET_LEADS, DEL_LEAD, ADD_LEAD, GET_ERRORS } from './types';
import { createMessage, returnErrors } from './messages'
import { tokenConfig } from './auth'
export const getLeads = () => (dispatch, getState) => {

    axios.get('/api/leads/', tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_LEADS,
            payload: res.data
        })
    }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)))
}

export const removeLead = (id) => dispatch => {
    axios.delete(`/api/leads/${id}/`).then(res => {
        dispatch(createMessage({ leadRemoved: "Lead Removed" }))
        dispatch({
            type: DEL_LEAD,
            payload: id
        })
    }).catch(error => console.error(error))
}


export const addLead = (lead) => (dispatch, getState) => {
    axios.post('/api/leads/', lead, tokenConfig(getState)).then(res => {
        dispatch(createMessage({ addLead: "Lead Added" }))
        dispatch({
            type: ADD_LEAD,
            payload: res.data
        })
    }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)))
}