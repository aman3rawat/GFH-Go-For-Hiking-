const Tours = require('./../Models/tourModel');
const APIFeatures = require(`${__dirname}/../utils/apiFeatures`);

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary';
    next();
};

exports.getAllTours = async (req, res) => {

    try {
        //Executed Query
        console.log('hello', req.query);
        const features = new APIFeatures(Tours.find(), req.query)
            .filter()
            .sort()
            .fields()
            .paginate();

        const tour = await features.query;
        res.json({
            status: 'sucess',
            results: tour.length,
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.json({
            status: 'success',
            requestTime: req.requestTime,
            time: req.time,
            results: tour
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: 'Not Found!'
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        console.log('inside createTour', req.body);
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'sucess',
            data: {
                tour: newTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        console.log(req.params.id);
        const deletedTour = await Tour.findByIdAndDelete(req.params.id);
        console.log(deletedTour);
        res.status(204).json({
            status: 'success',
            requestTime: req.requestTime,
            time: req.time,
            results: deletedTour
        })
    } catch (err) {
        console.log('err in delete');
        res.status(404).json({
            status: 'failed',
            message: err
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tours.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true
            })
        res.json({
            status: 'success',
            tour
        });
        console.log(tour)
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }
}
