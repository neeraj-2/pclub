const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const expressLogger = require('./winston');
const helmet = require('helmet');
const path = require('path');
const routes = require('../index.route');
const config = require('./config');
const APIError = require('../server/helpers/APIError');

const app = express();

/* istanbul ignore if */
if (config.env === 'development') {
	app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing for development port 3000
const corsWhitelist = config.cors
	? config.cors.split(',')
	: /* istanbul ignore next */ [];
app.use(
	cors({
		origin: corsWhitelist,
		credentials: true,
	}),
);

/* istanbul ignore if */
// enable detailed API logging in dev env
if (config.env === 'development') {
	app.use(expressLogger);
}

// mount all routes on /api path
app.use('/api', routes);

// react client
app.use(express.static('build'));
// fallback to index.html
app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
	if (err instanceof expressValidation.ValidationError) {
		// validation error contains errors which is an array of error each containing message[]
		const unifiedErrorMessage = err.details.body
			.map((error) => error.message)
			.join('. and');
		const error = new APIError(unifiedErrorMessage, err.statusCode, true);
		return next(error);
	} else if (!(err instanceof APIError)) {
		const apiError = new APIError(err.message, err.status, err.isPublic);
		return next(apiError);
	}
	return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new APIError('API not found', httpStatus.NOT_FOUND);
	return next(err);
});

// error handler, send stacktrace only during development
app.use((
	err,
	req,
	res,
	next, // eslint-disable-line no-unused-vars
) =>
	res.status(err.status).json({
		message: err.isPublic ? err.message : httpStatus[err.status],
		stack:
			config.env === 'development' ? /* istanbul ignore next */ err.stack : {},
	}),
);

module.exports = app;
