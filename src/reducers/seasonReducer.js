import { types } from "../types/types";

const initialState = {
    seasonList: []
};

export const seasonReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.season:
            return {
                ...action.payload
            }
        
        default: 
            return state
    }
}