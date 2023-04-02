const {response} = require('express');
const {Op} = require('sequelize');
const {Job, Contract} = require('../models/model');
const {getProfile} = require('../middlewares/getProfile');

const getAllUnpaidJobs = async(req, res = response) => {
	const {profileid} = req.headers;

	await getProfile(profileid)
	.then(async profileResponse => {
		if (!profileResponse) {
			res.status(401).json("Unauthorized");
		} else {
			const unpaidJobs = await Contract.findAll({
				where: {
					'$Jobs.paid$': null,
					[Op.or]: [{ContractorId: profileid}, {ClientId: profileid}],
				},
				include: [{model: Job, required: true}]
			});
			
			if(!unpaidJobs) {
				res.json({"message": "No unpaid jobs found"});
			} else {
				res.json(unpaidJobs);
			}
		}
	})
	.catch(error => {
		res.json(error.message);
	});
}

module.exports = {
    getAllUnpaidJobs
}