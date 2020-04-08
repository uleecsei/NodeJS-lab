const express = require('express');
const router = express.Router();
const tokenCheck = require('../auth/token-check');
const loadSchema = require('../validation/loadSchema');
const Load = require('../models/Load');
const Truck = require('../models/Truck');

/**
 * @api {post} /api/loads Create load(only shipper has access).
 * @apiName PostLoad
 * @apiGroup Load
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiParam {Object} dimensions Load dimensions.
 * @apiParam {Number} payload Load weight.
 * @apiParamExample {json} Payload example:
 *               { "payload": 100, "dimensions": {length: 100, width: 100, height: 100} }
 *
 * @apiSuccess {String} status Operation status.
 * @apiSuccess {String} load Load.
 * @apiSuccessExample {json} Success-Response:
 * {
  "status": "Load created successfully",
  "load": {
    "assigned_to": null,
    "status": "NEW",
    "name": "Load",
    "state": null,
    "_id": "5e8dd07ca51abaac2b0583f4",
    "dimensions": {
        "width": 100,
        "height": 100,
        "length": 100
    },
    "payload": 100,
    "..." : ...
}
}
 *
 *
 * @apiError AccessDenied Access denied
 * @apiError IncorrectData Incorrect data
 * @apiError WrongId TokenId and url's id do not match
 * @apiError LoadWasNotCreated Load was not created
 */

router.post('/', tokenCheck, async (req, res) => {
  try {
    if (req.payload.role.toString() !== 'shipper') {
      throw Error('Access denied');
    }

    const {value, error} = loadSchema.validate({
      name: req.body.name || 'Load',
      dimensions: {
        width: req.body.dimensions.width,
        height: req.body.dimensions.height,
        length: req.body.dimensions.length,
      },
      payload: req.body.payload,
    });
    if (error) {
      throw Error('Incorrect data');
    }

    await Load.create(
        {
          name: req.body.name,
          dimensions: {
            width: Number(req.body.dimensions.width),
            height: Number(req.body.dimensions.height),
            length: Number(req.body.dimensions.length),
          },
          payload: req.body.payload,
          logs: [
            {
              message: `url: ${req.url},
            method: ${req.method},
            params: ${req.params},
            body: ${req.body}`,
              date: Date.now(),
            },
          ],
          created_by: req.payload.id,
        },
        (err, load) => {
          if (err) {
            res.status(500).json({status: 'Load was not created', err});
          }
          res.status(200).json({load, status: 'Load created successfully'});
        },
    );
  } catch (err) {
    res.status(500).json({status: 'Load was not created', err});
  }
});

/**
 * @api {patch} /api/loads/:id Update load info(only if the load is NEW)
 * @apiName PatchLoad
 * @apiGroup Load
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiParam {Object} dimensions Load dimensions.
 * @apiParam {Number} payload Load weight.
 * @apiParamExample {json} Payload example:
 *               { "payload": 100, "dimensions": {length: 100, width: 100, height: 100} }
 *
 * @apiSuccess {String} Load was updated.
 * @apiSuccess {String} load Load.
 * @apiSuccessExample {json} Success-Response:
 * {
  "status": "Load created successfully",
  "load": {
    "assigned_to": null,
    "status": "NEW",
    "name": "Load",
    "state": null,
    "_id": "5e8dd07ca51abaac2b0583f4",
    "dimensions": {
        "width": 100,
        "height": 100,
        "length": 100
    },
    "payload": 100,
    "..." : ...
}
}
 *
 *
 * @apiError AccessDenied Access denied
 * @apiError IncorrectData Server can not find a load
 * @apiError LoadNotUpdated Load was not updated
 * @apiError IncorrectData Incorrect data
 */

router.patch('/:id', tokenCheck, async (req, res) => {
  try {
    if (req.payload.role.toString() !== 'shipper') {
      throw Error('Access denied');
    }
    const {value, error} = loadSchema.validate({
      name: req.body.name || 'Load',
      dimensions: {
        width: req.body.dimensions.width,
        height: req.body.dimensions.height,
        length: req.body.dimensions.length,
      },
      payload: req.body.payload,
    });
    if (error) {
      throw Error('Incorrect data');
    }

    const loadId = req.params.id;

    const isNew = await Load.findOne({_id: loadId, status: 'NEW'});
    if (isNew) {
      const logs = isNew.logs;
      Load.findByIdAndUpdate(
          loadId,
          {
            ...req.body,
            logs: [
              ...logs,
              {
                message: `url: ${req.url},
      method: ${req.method},
      params: ${req.params},
      body: ${req.body}`,
                date: Date.now(),
              },
            ],
          },
          (err, response) => {
            if (err) {
              res.status(500).json({status: 'Load was not updated', err});
            }
            res.status(200).json({status: 'Load was updated', load: response});
          },
      );
    } else {
      throw Error('Server can not find a load');
    }
  } catch (err) {
    res.status(500).json({status: 'Load was not updated', err});
  }
});

/**
 * @api {delete} /api/loads/:id Delete load(only if the load is NEW)
 * @apiName DeleteLoad
 * @apiGroup Load
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiSuccess {String} message Load was deleted with success.
 * @apiSuccessExample {json} Success-Response:
 *  {"status": 'Load was deleted with success'}
 *
 * @apiError AccessDenied Access denied.
 * @apiError LoadWasnotNew Load wasn't deleted.
 * @apiError WrongId TokenId and url's id do not match
 * @apiError LoadNotFound Server can not find a load
 */

router.delete('/:id', tokenCheck, async (req, res) => {
  try {
    if (req.payload.role.toString() !== 'shipper') {
      throw Error('Access denied');
    }
    const loadId = req.params.id;

    if (!loadId) {
      throw Error('LoadId is required');
    }
    const isNew = await Load.findOne({
      _id: loadId,
      status: 'NEW',
    });
    if (isNew) {
      const isDeleted = await Load.findByIdAndDelete(loadId);
      if (isDeleted) {
        res.status(200).send({status: 'Load was deleted with success'});
      } else {
        res
            .status(500)
            .send({status: 'Load was not deleted', err: 'Incorrect loadId'});
      }
    } else {
      throw Error('Server can not find a load');
    }
  } catch (err) {
    res.status(500).json({status: 'Load was not deleted', err});
  }
});

/**
 * @api {patch} /api/loads/:id/post Post load(only shippers has access).
 * @apiName PatchLoad
 * @apiGroup Load
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 *
 * @apiSuccess {String} status Operation status.
 * @apiSuccess {String} assigned_to Truck which ship a load.
 * @apiSuccessExample {json} Success-Response:
 *  {
  "status": "Load posted successfully",
  "assigned_to": "fiwanfoianw"
}
* @apiSuccessExample {json} Success-Response no drivers found:
 *  {
  "status": "No drivers found",
}
 *
 * @apiError AccessDenied Access denied.
 * @apiError LoadIdIsRequired LoadId is required
 * @apiError LoadDoesntExist Server can not find a load
 * @apiError LoadNotFound No trucks to ship founded.
 * @apiError NoTrucksToShip No trucks to ship founded
 * @apiError LoadNotAssigned Server can not assign truck or/and load
 */

router.patch('/:id/post', tokenCheck, async (req, res) => {
  try {
    if (req.payload.role.toString() !== 'shipper') {
      throw Error('Access denied');
    }

    const loadId = req.params.id;
    if (!loadId) {
      throw Error('LoadId is required');
    }

    const load = await Load.findById(loadId);
    if (!load) {
      throw Error('Server can not find a load');
    }
    await Load.findByIdAndUpdate(loadId, {status: 'POSTED'});
    const fittingTruck = await Truck.where('assigned_to')
        .equals(true)
        .where('status')
        .equals('IS')
        .where('params.weight')
        .gt(load.payload)
        .where('params.width')
        .gt(load.dimensions.width)
        .where('params.length')
        .gt(load.dimensions.length)
        .where('params.height')
        .gt(load.dimensions.height)
        .findOne();

    if (!fittingTruck) {
      throw res.status(200).json({
        status: 'No drivers found',
      });
    }

    const truckAssigned = await Truck.findByIdAndUpdate(fittingTruck._id, {
      status: 'OL',
    });
    const logs = load.logs;
    const loadAssigned = await Load.findByIdAndUpdate(loadId, {
      assigned_to: fittingTruck.created_by,
      status: 'ASSIGNED',
      state: 'En route to Pick up',
      logs: [
        ...logs,
        {
          message: `url: ${req.url},
      method: ${req.method},
      params: ${req.params},
      body: ${req.body}`,
          date: Date.now(),
        },
      ],
    });
    if (truckAssigned && loadAssigned) {
      res.status(200).json({
        status: 'Load posted successfully',
        assigned_to: truckAssigned._id,
      });
    } else {
      throw Error('Server can not assign truck or/and load');
    }
  } catch (err) {
    res.status(500).json({status: 'Load was not posted', err});
  }
});

/**
 * @api {patch} /api/loads/:id/state Change load state(only driver has access, for only active load).
 * @apiName PatchLoad
 * @apiGroup Load
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiSuccess {String} status Load successfuly shipped.
 * @apiSuccessExample {json} Success-Response:
 * {
  "status": "Load status changed successfully",
}
 *
 * @apiError UserIsUnAuthorized User is not authorized.
 * @apiError LoadWasntAssigned Load wasn't shipped.
 * @apiError LoadDoesntExist Load doesn't exist.
 * @apiError TruckDoesntExist Truck was not found.
 * @apiError NotShipped Load was not shipped or/and truck still has status OL
 */

router.patch('/:id/state', tokenCheck, async (req, res) => {
  try {
    if (req.payload.role.toString() !== 'driver') {
      throw Error('Access denied');
    }

    const loadId = req.params.id;
    const load = await Load.findOne({
      _id: loadId,
      assigned_to: req.payload.id,
    });
    if (!load) {
      throw Error('Server can not find the load');
    }

    const truck = await Truck.findOne({
      created_by: load.assigned_to,
      assigned_to: true,
    });

    if (!truck) {
      throw Error('Server can not find the truck');
    }

    const logs = load.logs;

    const isShipped = await Load.findByIdAndUpdate(loadId, {
      status: 'Arrived to Delivery',
      state: 'SHIPPED',
      logs: [
        ...logs,
        {
          message: `url: ${req.url},
    method: ${req.method},
    params: ${req.params},
    body: ${req.body}`,
          date: Date.now(),
        },
      ],
    });
    const isInService = await Truck.findByIdAndUpdate(truck._id, {
      status: 'IS',
    });
    if (isShipped && isInService) {
      res.status(200).json({status: 'Load status changed successfully'});
    } else {
      throw Error('Load was not shipped or/and truck still has status OL');
    }
  } catch (err) {
    res.status(500).json({status: 'Load was not shipped', err});
  }
});

/**
 * @api {get} /api/loads Retreive active for this driver loads.
 * @apiName getLoad
 * @apiGroup Load
 *
 * @apiHeader {String} content-type Payload content type.
 * @apiHeader {String} authorization Authorization value.
 *
 * @apiHeaderExample {json} Content-type header example
 *               { "Content-type": "application/json" }
 * @apiHeaderExample {json} Authorization header example
 *               { "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe" }
 *
 * @apiSuccess {String} status Load successfuly shipped.
 * @apiSuccess {Object} loads Array of loads.
 * @apiSuccessExample {json} Success-Response:
 * {
  "status": "Success"
  "loads": [
     {
         "_id": "fbawfibaw",
         "assigned_to": "noifawnfoian",
         "created_by": "jfnaikfna",
         "status": "ASSIGNED",
         "state": "En route to Pick Up",
         "logs": [{"message": "Load created", time: 12312}],
         "payload": 100,
         "dimensions": {length: 100, width: 100, height: 100}
         "...": "..."
     }
  ]
}
 *
 * @apiError LoadNotFound Server can not find any load
 * @apiError InvalidRole Invalid role
 */

router.get('/', tokenCheck, async (req, res) => {
  try {
    if (req.payload.role.toString() == 'driver') {
      const loads = await Load.find({assigned_to: req.payload.id});
      if (loads) {
        res.status(200).json({status: 'Success', loads});
      } else {
        throw Error('Server can not find any load');
      }
    } else if (req.payload.role.toString() == 'shipper') {
      const loads = await Load.find({created_by: req.payload.id});
      if (loads) {
        res.status(200).json({status: 'Success', loads});
      } else {
        throw Error('Server can not find any load');
      }
    } else {
      throw Error('Invalid role');
    }
  } catch (err) {
    res.status(500).json({status: 'No data', err});
  }
});
module.exports = router;
