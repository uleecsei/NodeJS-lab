const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loadSchema = new Schema({
  created_by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  logs: [
    {
      message: {type: String, required: true},
      date: {type: Date, default: Date.now},
    },
  ],
  assigned_to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  status: {
    type: String,
    default: 'NEW',
    enum: ['NEW', 'POSTED', 'ASSIGNED', 'SHIPPED'],
  },
  name: {
    type: String,
    default: 'Load',
  },
  dimensions: {
    width: {type: String, required: true},
    length: {type: String, required: true},
    height: {type: String, required: true},
    weight: {type: String, required: true},
  },
  state: {
    type: String,
    enum: [
      'En route to Pick Up',
      'Arrived to Pick Up',
      'En route to Delivery',
      'Arrived to Delivery',
    ],
    default: null,
  },
});

const Load = mongoose.model('Load', loadSchema);
module.exports = Load;
