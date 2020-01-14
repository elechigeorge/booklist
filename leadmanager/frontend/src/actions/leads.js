import axios from 'axios';
import { GET_LEADS, DEL_LEAD } from './types';


export const getLeads = () => dispatch => {
    axios.get('/api/leads/').then(res => {
        dispatch({
            type: GET_LEADS,
            payload: res.data
        })
    }).catch(error => console.error(error))
}

export const removeLead = (id) => dispatch => {
    axios.delete(`/api/leads/${id}/`).then(res => {
        dispatch({
            type: DEL_LEAD,
            payload: id
        })
    }).catch(error => console.error(error))
}