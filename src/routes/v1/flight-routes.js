const express = require('express');
const { FlightController } = require('../../controller')
const { FlightMiddleware } = require('../../middleware');

const router = express.Router();

// /api/v1/flights POST
router.post('/', 
        FlightMiddleware.validateCreateRequest,
        FlightController.createFlight);

// /api/v1/flights GET
router.get('/', FlightController.getAllFlights);

//get single flight
// /api/v1/flights/:id GET
router.get('/:id', FlightController.getFlight);

//Update seats /api/v1/flights/:id/seats
router.patch('/:id/seats', FlightController.updateSeats);

module.exports = router;