const {request, response} = require('express');
const {Op} = require('sequelize');
const {Profile, Contract} = require('../models/model');
const {getProfile} = require('../middlewares/getProfile');

const getContractByProfileId = async(req = request, res = response) => {
	const {profileid} = req.headers;
	const {id} = req.params;
	const contractId = id;

	await getProfile(profileid)
		.then(async profileResponse => {
			if (!profileResponse) {
				res.status(401).json("Unauthorized");
			} else {
				const contract = await Contract.findOne({
					where: {
						[Op.or]: [{ContractorId: profileid}, {ClientId: profileid}],
						[Op.and]: [{id: contractId}]
					},
				});
				if (!contract) {
					res.json({"message": "Contract doesn't belong to specified profile"});
				} else {
					res.json(contract);
				}
			}
		})
		.catch(error => {
			res.json(error);
		});
}

const getContracts = async(req, res = response) => {
	const {profileid} = req.headers;

	await getProfile(profileid)
	.then(async profileResponse => {
		if (!profileResponse) {
			res.status(401).json("Unauthorized");
		} else {
			const allActiveContracts = await Contract.findAll({
				where: {
					[Op.or]: [{ContractorId: profileid}, {ClientId: profileid}],
					[Op.and]: [{status: {[Op.not]: 'terminated'}}]
				}});
			if(!allActiveContracts) {
				res.json({"message": "No contracts found"});
			} else {
				res.json(allActiveContracts);
			}
		}
	})
	.catch(error => {
		res.json(error);
	});
}

module.exports = {
	getContractByProfileId,
	getContracts
}