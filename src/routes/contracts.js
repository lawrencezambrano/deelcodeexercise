const {Router} = require('express');
const {getContractByProfileId, getContracts} = require('../controllers/contracts');

const router = Router();

router.get('/:id', getContractByProfileId);
router.get('/', getContracts);

module.exports = router;