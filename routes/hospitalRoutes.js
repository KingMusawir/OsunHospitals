const express = require('express');
const hospitalController = require('../controllers/hospitalController');

const router = express.Router();

router.route('/').get(hospitalController.getAllHospital);
router.route('/:hospitalId').get(hospitalController.getHospital);

router
  .route('/hospital-nearby/:distance/center/:latlng/unit/:unit')
  .get(hospitalController.getNearByHospital);

router
  .route('/distances/:latlng/unit/:unit')
  .get(hospitalController.getDistances);

module.exports = router;
