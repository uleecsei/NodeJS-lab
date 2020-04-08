const express = require('express');
const router = express.Router();
const tokenCheck = require('../auth/token-check');
const loadSchema = require('../validation/loadSchema');
const Load = require('../models/Load');
const Truck = require('../models/Truck');

/**
 * @api {post} /api/load/:id create load.
 * @apiName PostLoad
 * @apiGroup Load
 *
 * @apiHeader {String} payload User's jwt from local storage.
 * @apiParam {Object} dimensions load's dimensions.
 * @apiParam {Number} dimensions.weight load's payload.
 * @apiParam {Number} dimensions.width load's width.
 * @apiParam {Number} dimensions.height load's height.
 * @apiParam {Number} dimensions.length load's length.
 * @apiParam {String} name load's name.
 *
 * @apiSuccess {Object} load Load was successfully created.
 *
 * @apiError UserIsUnAuthorized User is not authorized.
 * @apiError LoadWasNotCreated Load wasn\'t created.
 * @apiError WrongId TokenId and url's id do not match
 */

router.post('/:id', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Incorrect id';
    }

    const {value, error} = loadSchema.validate({
      name: req.body.name,
      dimensions: {
        width: req.body.width,
        height: req.body.height,
        length: req.body.length,
        weight: req.body.weight,
      },
    });
    if (error) {
      throw 'Incorrect data';
    }

    await Load.create(
        {
          name: req.body.name,
          dimensions: {
            width: Number(req.body.width),
            height: Number(req.body.height),
            length: Number(req.body.length),
            weight: Number(req.body.weight),
          },
          logs: [
            {
              message: `url: ${req.url},
            method: ${req.method},
            params: ${req.params},
            body: ${req.body}`,
              date: Date.now(),
            },
          ],
          created_by: req.params.id,
        },
        (err, load) => {
          if (err) {
            res.status(500).json({message: 'Load was not created', err});
          }
          res.status(200).send(load);
        },
    );
  } catch (err) {
    res.status(500).json({message: 'Load was not created', err});
  }
});

/**
 * @api {put} /api/load/:id update load info
 * @apiName PutLoad
 * @apiGroup Load
 *
 * @apiHeader {String} payload User's jwt from local storage.
 * @apiParam {Object} dimensions load's dimensions.
 * @apiParam {Number} dimensions.weight load's payload.
 * @apiParam {Number} dimensions.width load's width.
 * @apiParam {Number} dimensions.height load's height.
 * @apiParam {Number} dimensions.length load's length.
 * @apiParam {String} name load's name.
 *
 * @apiSuccess {Object} response Load was updated.
 *
 * @apiError UserIsUnAuthorized User is not authorized.
 * @apiError LoadWasNotUpdated Load wasn\'t updated.
 * @apiError WrongId TokenId and url's id do not match
 *
 */

router.put('/:id', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Incorrect id';
    }

    const loadId = req.body._id;

    const isNew = await Load.findOne({_id: loadId, status: 'NEW'});
    if (isNew) {
      const logs = isNew.logs;
      Load.findByIdAndUpdate(
          loadId,
          {
            ...req.body.updates,
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
              res.status(500).json({message: 'Load was not updated', err});
            }
            res.status(200).json(response);
          },
      );
    } else {
      throw 'Server can not find a load';
    }
  } catch (err) {
    res.status(500).json({message: 'Load was not updated', err});
  }
});

/**
 * @api {delete} /api/load/:id deleting load by id and status NEW
 * @apiName DeleteLoad
 * @apiGroup Load
 *
 * @apiHeader {String} payload User's jwt from local storage.
 *
 * @apiSuccess {String} message Load was deleted with success.
 *
 * @apiError UserIsUnAuthorized User is not authorized.
 * @apiError LoadWasnotNew Load wasn't deleted.
 * @apiError WrongId TokenId and url's id do not match
 */

router.delete('/:id', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Incorrect id';
    }
    const loadId = req.body._id;

    if (!loadId) {
      throw 'LoadId is required';
    }
    const isNew = await Load.findOne({
      _id: loadId,
      status: 'NEW',
    });
    if (isNew) {
      const isDeleted = await Load.findByIdAndDelete(loadId);
      if (isDeleted) {
        res.status(200).send({message: 'Load was deleted with success'});
      } else {
        res
            .status(500)
            .send({message: 'Truck was not deleted', err: 'Incorrect loadId'});
      }
    } else {
      throw 'Server can not find a load';
    }
  } catch (err) {
    res.status(500).json({message: 'Load was not deleted', err});
  }
});

/**
 * @api {put} /api/load/:id/post finding truck with fitting demensions
 * @apiName PutLoad
 * @apiGroup Load
 *
 * @apiHeader {String} payload User's jwt from local storage.
 *
 * @apiSuccess {String} truckAssigned Returning truck data.
 *
 * @apiError UserIsUnAuthorized User is not authorized.
 * @apiError LoadWasntAssigned Server can not assign truck or/and load.
 * @apiError LoadDoesntExist Server can not find a load
 * @apiError TruckDoesntExist No trucks to ship founded.
 * @apiError WrongId TokenId and url's id do not match
 */

router.put('/:id/post', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Incorrect id';
    }

    const loadId = req.body._id;
    if (!loadId) {
      throw 'LoadId is required';
    }

    const load = await Load.findById(loadId);
    if (!load) {
      throw 'Server can not find a load';
    }
    await Load.findByIdAndUpdate(loadId, {status: 'POSTED'});
    const fittingTruck = await Truck.where('assigned_to')
        .equals(true)
        .where('status')
        .equals('IS')
        .where('params.weight')
        .gt(load.dimensions.weight)
        .where('params.width')
        .gt(load.dimensions.width)
        .where('params.length')
        .gt(load.dimensions.length)
        .where('params.height')
        .gt(load.dimensions.height)
        .findOne();

    if (!fittingTruck) {
      throw 'No trucks to ship founded';
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
      res.status(200).json(truckAssigned);
    } else {
      throw 'Server can not assign truck or/and load';
    }
  } catch (err) {
    res.status(500).json({message: 'Load was not posted', err});
  }
});

/**
 * @api {put} /api/load/:id/shipped driver set load status to shipped
 * @apiName PutLoad
 * @apiGroup Load
 *
 * @apiHeader {String} payload User's jwt from local storage.
 *
 * @apiSuccess {String} message Load successfuly shipped.
 *
 * @apiError UserIsUnAuthorized User is not authorized.
 * @apiError LoadWasntAssigned Load wasn't shipped.
 * @apiError LoadDoesntExist Load doesn't exist.
 * @apiError TruckDoesntExist Truck was not found.
 * @apiError WrongId TokenId and url's id do not match
 */

router.put('/:id/shipped', tokenCheck, async (req, res) => {
  try {
    if (req.params.id != req.payload.id.toString()) {
      throw 'Incorrect id';
    }

    const loadId = req.body._id;
    const load = await Load.findOne({
      _id: loadId,
      assigned_to: req.params.id,
    });
    if (!load) {
      throw 'Server can not find the load';
    }

    const truck = await Truck.findOne({
      created_by: load.assigned_to,
      assigned_to: true,
    });

    if (!truck) {
      throw 'Server can not find the truck';
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
      res.status(200).json({message: 'Load successfuly shipped'});
    } else {
      throw 'Load was not shipped or/and truck still has status OL';
    }
  } catch (err) {
    res.status(500).json({message: 'Load was not posted', err});
  }
});

module.exports = router;
