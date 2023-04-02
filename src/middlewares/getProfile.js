const {Profile} = require('../models/model');

const getProfile = async (profileId) => {
    const profile = await Profile.findOne({where: {id: profileId || 0}});
    return profile;
}

module.exports = {getProfile}