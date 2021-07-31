const { seasonPath } = require("../constants/endpoints")
const { fetchWithToken } = require("../helpers/fetch")

const seasonService = {}

seasonService.getAll = async () => {
    const response = await fetchWithToken(`${seasonPath.getAll}`)
    return await response.json();
};

module.exports = {
    seasonService
}