const express = require('express');
const router = express.Router();
const tokenCheck = require('../auth/token-check');
const truckSchema = require('../validation/truckSchema');
const Truck = require('../models/Truck');

const types = {
  'sprinter': {
    width: 170,
    height: 250,
    length: 300,
    weight: 1700,
  },
  'small straight': {
    width: 170,
    height: 250,
    length: 500,
    weight: 2500,
  },

  'large straight': {
    width: 200,
    height: 350,
    length: 700,
    weight: 4000,
  },
};

/**
 * @api {post} /api/trucks Create truck(only driver has access).
 *
 * @apiName PostTruck
 * @apiGroup Truck
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiParam {String} type Truck type(SPRINTER, SMALL STRAIGHT, LARGE STRAIGHT).
 * @apiParamExample {json} Payload example:
 *               { "type": "SPRINTER" }
 *
 * @apiSuccess {String} status Operation status.
 * @apiSuccessExample {json} Success-Response:
 *                 { "status": "Truck created successfully"}
 * @apiSuccess {Object} truck Truck
 *
 *
 * @apiError IncorrectData Input data is incorrect
 * @apiError WrongId TokenId and url's id do not match
 */

router.post('/', tokenCheck, async (req, res) => {
  try {
    if (req.payload.role.toString() !== 'driver') {
      throw Error('Access denied');
    }
    const type = req.body.type.toLowerCase();
    console.log(type);
    const {value, error} = truckSchema.validate({
      type: type,
    });
    if (error) {
      throw Error('Incorrect data');
    }
    await Truck.create(
        {
          created_by: req.payload.id,
          type: type,
          params: types[type],
        },
        (err, truck) => {
          if (err) {
            res.status(500).json({status: 'Truck was not added', err});
          } else {
            res.status(200).send({truck, status: 'Truck created successfully'});
          }
        },
    );
  } catch (err) {
    res.status(500).json({status: 'Truck was not added', err});
  }
});

/**
 * @api {get} /api/trucks Retreive list of trucks(for this driver)
 * @apiName getTruck
 * @apiGroup Truck
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiSuccess {String} status Operation status.
 * @apiSuccess {[Object]} trucks array of trucks
 * @apiSuccessExample {json} Success-Response:
 * {
  "status": "Truck created successfully"
  "trucks": [
     {
         "_id": "fbawfibaw",
         "assigned_to": "",
         "status": "OS",
         "created_by": "fbawfibaw",
         "type": "SPRINTER",
         "...": "..."
     }
  ]
}
 *
 * @apiError AccessDenied Access denied
 */

router.get('/', tokenCheck, async (req, res) => {
  try {
    if (req.payload.role.toString() !== 'driver') {
      throw Error('Access denied');
    }
    const value = await Truck.find({created_by: req.payload.id});
    res.status(200).send(value);
  } catch (err) {
    res.status(500).json({status: 'Access denied', err});
  }
});

/**
 * @api {patch} /api/trucks/:id/assign Assign driver to truck with specified id.
 *
 * @apiName patchTruck
 * @apiGroup Truck
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiSuccess {String} status Operation status.
 * @apiSuccessExample {json} Success-Response:
 * {
  "status": "Truck assigned successfully"
  }
 * @apiError AccessDenied Access denied
 * @apiError DriverIsBusy Driver can not assign trucks
 * @apiError IncorrectId Incorrect truckId
 * @apiError TruckWasNotAssigned Truck was not assigned
 */

router.patch('/:id/assign', tokenCheck, async (req, res) => {
  try {
    if (req.payload.role.toString() !== 'driver') {
      throw Error('Access denied');
    }
    const truckId = req.params.id;
    const userId = req.payload.id;

    const isOnLoad = await Truck.find({
      created_by: userId,
      status: 'OL',
    });
    if (isOnLoad.length) {
      throw Error('Driver can not assign trucks');
    }
    const isUnassigned = await Truck.findOneAndUpdate(
        {created_by: userId, assigned_to: true},
        {
          assigned_to: false,
        },
    );
    const isAssigned = await Truck.findOneAndUpdate(
        {_id: truckId, created_by: userId},
        {
          assigned_to: true,
        },
    );
    if (isUnassigned && isAssigned) {
      res.status(200).json({status: 'Truck assigned successfully'});
    } else {
      throw Error('Incorrect truckId');
    }
  } catch (err) {
    res.status(500).json({status: 'Truck was not assigned', err});
  }
});

/**
 * @api {patch} /api/trucks/:id/update Update truck information
 * @apiName putTruck
 * @apiGroup Truck
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiParam {String} type Truck type(SPRINTER, SMALL STRAIGHT, LARGE STRAIGHT).
 *
 * @apiSuccess {String} status Operation status.
 * @apiSuccessExample {json} Success-Response:
 * {
  "status": "Truck has been updated"}
 *
 * @apiError AccessDenied Access denied
 * @apiError InvalidType Invalid type
 * @apiError TruckRequired TruckId is required
 * @apiError TruckIsAssigned Truck is asigned
 * @apiError TruckWasNotUpdated Truck was not updated
 */

router.patch('/:id/update', tokenCheck, async (req, res) => {
  try {
    if (req.payload.role.toString() !== 'driver') {
      throw Error('Access denied');
    }
    const {value, error} = truckSchema.validate({
      type: req.body.type,
    });
    if (error) {
      throw Error('Invalid type');
    }
    const truckId = req.params.id;
    const userId = req.payload.id;

    if (!truckId) {
      throw Error('TruckId is required');
    }

    const isAssigned = await Truck.find({
      _id: truckId,
      created_by: userId,
      assigned_to: true,
    });

    if (isAssigned.length) {
      throw Error('Truck is asigned');
    }

    const isUpdated = await Truck.findOneAndUpdate(
        {_id: truckId, created_by: userId},
        {
          type: req.body.type,
          params: types[req.body.type],
        },
    );
    if (isUpdated) {
      res.status(200).send({status: 'Truck has been updated'});
    } else {
      res.status(500).json({status: 'Truck was not updated'});
    }
  } catch (err) {
    res.status(500).json({status: 'Truck was not updated', err});
  }
});

/**
 * @api {delete} /api/trucks/:id Delete a truck
 * @apiName deleteTruck
 * @apiGroup Truck
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiSuccess {String} status Operation status.
 * @apiSuccessExample {json} Success-Response:
 * {
  "status": "Truck was deleted with success"}
 *
 *
 * @apiError AccessDenied Access denied
 * @apiError TruckIsOnLoad Truck in on load
 * @apiError TruckIdIsRequired TruckId is required
 * @apiError TruckWasNotDeleted Truck was not deleted
 */

router.delete('/:id', tokenCheck, async (req, res) => {
  try {
    if (req.payload.role.toString() !== 'driver') {
      throw Error('Access denied');
    }

    const truckId = req.params.id;
    const userId = req.payload.id;

    if (!truckId) {
      throw Error('TruckId is required');
    }
    const isOnLoad = await Truck.find({
      _id: truckId,
      created_by: userId,
      status: 'OL',
    });
    if (isOnLoad.length) {
      throw Error('Truck in on load');
    }
    const isDeleted = await Truck.findByIdAndDelete(truckId);
    if (isDeleted) {
      res.status(200).send({status: 'Truck was deleted with success'});
    } else {
      res
          .status(500)
          .send({status: 'Truck was not deleted', err: 'Incorrect truckId'});
    }
  } catch (err) {
    res.status(500).json({status: 'Truck was not deleted', err});
  }
});
module.exports = router;
