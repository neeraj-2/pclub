const winston = require('winston');
const expressWinston = require('express-winston');

const logger = winston.createLogger({
	format: winston.format.combine(winston.format.prettyPrint()),
	transports: [new winston.transports.Console()],
});

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
module.exports = expressWinston.logger({
	winstonInstance: logger,
	meta: true, // optional: log meta data about request (defaults to true)
	msg:
		'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
	colorStatus: true, // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
	headerBlacklist: ['Authorization'], //	Omit the heavy token header from logger
});
