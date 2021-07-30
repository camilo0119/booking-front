import { types } from "../types/types";

const initialState = {
    ediffices: []
}

export const edifficeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.edifficeGetAll:
            return {
                ediffices: state
            }
        
        default: 
            return state
    }
}