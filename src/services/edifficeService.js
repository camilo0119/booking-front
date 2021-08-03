import { edifficePath } from "../constants/endpoints"
import { fetchWithToken } from "../helpers/fetch"

export const edifficeService = {}

edifficeService.getAll = async () => {
    const response = await fetchWithToken(edifficePath.root)
    return await response.json()
}
