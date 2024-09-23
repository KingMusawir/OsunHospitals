/**
 * @swagger
 * components:
 *   schemas:
 *     Hospital:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the hospital
 *         name:
 *           type: string
 *           description: The name of the hospital
 *         operatingHours:
 *           type: string
 *           description: The operating hours of the hospital
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Point]
 *               description: The type of the geolocation point
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               description: The coordinates [longitude, latitude] of the hospital
 *             address:
 *               type: string
 *               description: The address of the hospital
 *             lga:
 *               type: string
 *               description: The Local Government Area of the hospital
 *         phone:
 *           type: string
 *           description: The contact phone number of the hospital
 */

/**
 * @swagger
 * /hospitals:
 *   get:
 *     summary: Retrieve a list of hospitals
 *     description: Retrieve a paginated list of hospitals. Can be filtered, sorted, and paginated.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of hospitals.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 results:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     hospitals:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Hospital'
 */

/**
 * @swagger
 * /hospitals/{hospitalId}:
 *   get:
 *     summary: Get a hospital by ID
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         schema:
 *           type: string
 *         description: The hospital ID
 *     responses:
 *       200:
 *         description: Details of a hospital.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     hospital:
 *                       $ref: '#/components/schemas/Hospital'
 *       404:
 *         description: Hospital not found.
 */

/**
 * @swagger
 * /hospitals/hospital-nearby/{distance}/center/{latlng}/unit/{unit}:
 *   get:
 *     summary: Get nearby hospitals
 *     parameters:
 *       - in: path
 *         name: distance
 *         required: true
 *         schema:
 *           type: number
 *         description: The radius to search within
 *       - in: path
 *         name: latlng
 *         required: true
 *         schema:
 *           type: string
 *         description: Latitude and longitude (comma-separated)
 *       - in: path
 *         name: unit
 *         required: true
 *         schema:
 *           type: string
 *           enum: [mi, km]
 *         description: Unit of distance (miles or kilometers)
 *     responses:
 *       200:
 *         description: List of nearby hospitals.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 results:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Hospital'
 *       400:
 *         description: Invalid input.
 */

/**
 * @swagger
 * /hospitals/distances/{latlng}/unit/{unit}:
 *   get:
 *     summary: Get distances to hospitals
 *     parameters:
 *       - in: path
 *         name: latlng
 *         required: true
 *         schema:
 *           type: string
 *         description: Latitude and longitude (comma-separated)
 *       - in: path
 *         name: unit
 *         required: true
 *         schema:
 *           type: string
 *           enum: [mi, km]
 *         description: Unit of distance (miles or kilometers)
 *     responses:
 *       200:
 *         description: List of hospitals with distances.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           distance:
 *                             type: number
 *       400:
 *         description: Invalid input.
 */

module.exports = {};
