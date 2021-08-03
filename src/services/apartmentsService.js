const { apartmentsPath } = require("../constants/endpoints")
const { fetchWithToken } = require("../helpers/fetch")

const apartmentService = {}

apartmentService.getAllApartments = () => {
    return fetchWithToken(`${apartmentsPath.root}`)
}

apartmentService.getApartmentByEdiffice = async (edifficeId) => {
    const response = await fetchWithToken(`${apartmentsPath.root}/ediffice/${edifficeId}`)
    return await response.json()
}

apartmentService.save = async (payload) => {
    const response = await fetchWithToken(
        `${apartmentsPath.root}`,
        payload,
        'POST')
    return await response.json()
}

module.exports = {
    apartmentService
}