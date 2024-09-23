const mongoose = require('mongoose');
const Hospital = require('../models/hospitalModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllHospital = catchAsync(async (req, res, next) => {
  // Create query
  const features = new APIFeatures(Hospital.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // EXECUTE QUERY
  const hospitals = await features.query;

  // Get total count for pagination info
  const totalFeatures = new APIFeatures(Hospital.find(), req.query).filter();
  const total = await Hospital.countDocuments(totalFeatures.query);

  res.status(200).json({
    status: 'success',
    results: hospitals.length,
    total: total,
    page: req.query.page * 1 || 1,
    totalPages: Math.ceil(total / (req.query.limit * 1 || 10)),
    data: {
      hospitals,
    },
  });
});

exports.getHospital = catchAsync(async (req, res, next) => {
  const { hospitalId } = req.params;

  const hospital = await Hospital.findById(hospitalId);

  if (!hospital) {
    return next(new AppError('No Hospital found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      hospital,
    },
  });
});

exports.getNearByHospital = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',').map((coord) => parseFloat(coord));

  if (!lat || !lng) {
    return next(
      new AppError(
        'Please provide Latitude and Longitude in the format lat,lng.',
        400,
      ),
    );
  }

  const distanceKm =
    unit === 'mi' ? parseFloat(distance) * 1.60934 : parseFloat(distance);
  const radiusRad = distanceKm / 6371;

  const hospitals = await Hospital.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radiusRad],
      },
    },
  });

  res.status(200).json({
    status: 'success',
    results: hospitals.length,
    data: {
      data: hospitals,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const mutiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    return next(
      new AppError(
        'Please provide Latitude and Longtitude in the format lat,lng.',
        400,
      ),
    );
  }

  const distances = await Hospital.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: mutiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
