const express = require('express');
const router = express.Router();
const tokenCheck = require('../auth/token-check');
const truckSchema = require('../validation/truckSchema');
const Truck = require('../models/Truck');

const types = {
  'Sprinter': {
    width: 170,
    height: 250,
    length: 300,
    weight: 1700,
  },
  'Small straight': {
    width: 170,
    height: 250,
    length: 500,
    weight: 2500,
  },

  'Large straight': {
    width: 200,
    height: 350,
    length: 700,
    weight: 4000,
  },
};

/**
 * @api {post} /api/truck/:id create a truck
 * @apiName PostTruck
 * @apiGroup Truck
 *
 * @apiParam {String} type type of truck
 *
 * @apiSuccess {String} message truck was added
 *
 * @apiError IncorrectData Input data is incorrect
 * @apiError WrongId TokenId and url's id do not match
 */

router.post('/:id', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Incorrect id';
    }
    const {value, error} = truckSchema.validate({
      type: req.body.type,
    });
    if (error) {
      throw 'Incorrect data';
    }
    await Truck.create(
        {
          created_by: req.params.id,
          type: req.body.type,
          params: types[req.body.type],
        },
        (err, truck) => {
          if (err) {
            res.status(500).json({message: 'Truck was not added', err});
          } else {
            res.status(200).send(truck);
          }
        },
    );
  } catch (err) {
    res.status(500).json({message: 'Truck was not added', err});
  }
});

/**
 * @api {get} /api/truck/:id get existing trucks
 * @apiName getTruck
 * @apiGroup Truck
 *
 * @apiSuccess {Object} truck
 *
 * @apiError WrongId TokenId and url's id do not match
 */

router.get('/:id', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Incorrect id';
    }
    const value = await Truck.find({created_by: req.params.id});
    res.status(200).send(value);
  } catch (err) {
    res.status(500).json({message: 'Access denied', err});
  }
});

/**
 * @api {put} /api/truck/:id/assign assign truck to his owner
 * @apiName putTruck
 * @apiGroup Truck
 *
 * @apiParam {Object} truck object with truck data
 *
 * @apiSuccess {Object} message Truck has been assigned
 * @apiError WrongId TokenId and url's id do not match
 * @apiError DriverIsBusy Driver can not assign trucks
 */

router.put('/:id/assign', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Incorrect id';
    }
    const truckId = req.body._id;
    const userId = req.params.id;

    const isOnLoad = await Truck.find({
      created_by: userId,
      status: 'OL',
    });
    if (isOnLoad.length) {
      throw 'Driver can not assign trucks';
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
      res.status(200).json({message: 'Truck has been assigned'});
    } else {
      throw 'Incorrect truckId';
    }
  } catch (err) {
    res.status(500).json({message: 'Truck was not assigned', err});
  }
});

/**
 * @api {put} /api/truck/:id/assign assign truck to his owner
 * @apiName putTruck
 * @apiGroup Truck
 *
 * @apiParam {Object} truck object with truck data
 *
 * @apiSuccess {Object} message Truck has been assigned
 * @apiError WrongId TokenId and url's id do not match
 * @apiError DriverIsBusy Driver can not assign trucks
 */

router.put('/:id/update', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Incorrect id';
    }
    const {value, error} = truckSchema.validate({
      type: req.body.type,
    });
    if (error) {
      throw 'Invalid type';
    }
    const truckId = req.body._id;
    const userId = req.params.id;

    if (!truckId) {
      throw 'TruckId is required';
    }

    const isAssigned = await Truck.find({
      _id: truckId,
      created_by: userId,
      assigned_to: true,
    });

    if (isAssigned.length) {
      throw 'Truck is asigned';
    }

    const isUpdated = await Truck.findOneAndUpdate(
        {_id: truckId, created_by: userId},
        {
          type: req.body.type,
          params: types[req.body.type],
        },
    );
    if (isUpdated) {
      res.status(200).send({message: 'Truck has been updated'});
    } else {
      res.status(500).json({message: 'Truck was not updated'});
    }
  } catch (err) {
    res.status(500).json({message: 'Truck was not updated', err});
  }
});

/**
 * @api {delete} /api/truck/:id delete a truck
 * @apiName deleteTruck
 * @apiGroup Truck
 *
 * @apiParam {Object} truck object with truck data
 *
 * @apiSuccess {Object} message Truck has been deleted
 *
 * @apiError WrongId TokenId and url's id do not match
 * @apiError TruckIsOnLoad Truck in on load
 */

router.delete('/:id', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Incorrect id';
    }

    const truckId = req.body._id;
    const userId = req.params.id;

    if (!truckId) {
      throw 'TruckId is required';
    }
    const isOnLoad = await Truck.find({
      _id: truckId,
      created_by: userId,
      status: 'OL',
    });
    if (isOnLoad.length) {
      throw 'Truck in on load';
    }
    const isDeleted = await Truck.findByIdAndDelete(truckId);
    if (isDeleted) {
      res.status(200).send({message: 'Truck was deleted with success'});
    } else {
      res
          .status(500)
          .send({message: 'Truck was not deleted', err: 'Incorrect truckId'});
    }
  } catch (err) {
    res.status(500).json({message: 'Truck was not updated', err});
  }
});
module.exports = router;
