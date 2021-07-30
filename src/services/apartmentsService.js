const { apartmentsPath } = require("../constants/endpoints")
const { fetchWithToken } = require("../helpers/fetch")

const apartmentService = {}

apartmentService.getAllApartments = () => {
    return fetchWithToken(`${apartmentsPath.getAll}`)
}

apartmentService.getApartmentByEdiffice = async (edifficeId) => {
    const response = await fetchWithToken(`${apartmentsPath.getAll}${edifficeId}`)
    return await response.json()
}

module.exports = {
    apartmentService
}