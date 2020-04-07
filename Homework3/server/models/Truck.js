const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const truckSchema = new Schema({
  created_by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  assigned_to: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    default: 'IS',
    enum: ['IS', 'OL'],
  },
  type: {
    type: String,
    required: true,
  },
  params: {
    width: Number,
    height: Number,
    length: Number,
    weight: Number,
  },
});

const Truck = mongoose.model('Truck', truckSchema);
module.exports = Truck;
