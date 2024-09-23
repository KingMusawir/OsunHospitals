const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hospital must have a name'],
    trim: true,
  },
  operatingHours: {
    type: String,
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: [true, 'Hospital must have coordinates'],
      validate: {
        validator: function (v) {
          return (
            v.length === 2 &&
            v[0] >= -180 &&
            v[0] <= 180 &&
            v[1] >= -90 &&
            v[1] <= 90
          );
        },
        message: 'Invalid coordinates',
      },
    },
    address: {
      type: String,
      trim: true,
    },
    lga: {
      type: String,
      required: [true, 'Hospital must have an LGA'],
      trim: true,
    },
  },
  phone: {
    type: String,
    trim: true,
  },
});

// Create index for geospatial queries and LGA
hospitalSchema.index({ location: '2dsphere' });
// hospitalSchema.index({ 'location.coordinates': '2dsphere' });
hospitalSchema.index({ 'location.lga': 1 });

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
