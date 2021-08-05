import { seasonService } from "../services/seasonService";
import { types } from "../types/types";

export const getSeason = () => {
    return async (dispatch) => {
        const response = await seasonService.getAll();
        
        if (response?.seasonsList) {  
            dispatch(saveSeason({
                seasonList: response.seasonsList
            }))
        }
    }
}

const saveSeason = (seasonsList) => ({
    type: types.season,
    payload: seasonsList
})