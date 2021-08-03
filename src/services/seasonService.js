const { seasonPath } = require("../constants/endpoints")
const { fetchWithToken } = require("../helpers/fetch")

const seasonService = {}

seasonService.getAll = async () => {
    const response = await fetchWithToken(`${seasonPath.root}`)
    return await response.json();
};

seasonService.save = async (payload) => {
    const response = await fetchWithToken(
        `${seasonPath.root}`,
        payload,
        'POST')
    return await response.json();
}

module.exports = {
    seasonService
}