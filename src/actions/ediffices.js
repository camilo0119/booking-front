import { edifficePath } from "../constants/endpoints";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const getAllEdiffices = () => {
    return async (dispatch) => {
        const response = await fetchWithToken(edifficePath.getAll);

        const body = await response.json()

        if (body.ok) {            
            dispatch(getAll({
                ediffices: body.listEdiffices
            }))
        }
    }
}

const getAll = (edifficesList) => ({
    type: types.edifficeGetAll,
    payload: edifficesList
})