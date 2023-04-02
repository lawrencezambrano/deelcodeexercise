const {Router} = require('express');
const {getAllUnpaidJobs} = require('../controllers/jobs');

const router = Router();

router.get('/unpaid', getAllUnpaidJobs);

module.exports = router;