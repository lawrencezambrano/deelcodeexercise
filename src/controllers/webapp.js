const {Response} = require('express');

const webApp = (req, res = Response) => {
	let customDirName = __dirname.substring(0, __dirname.length - 11);
	console.log("CustomDir = " + customDirName);
	res.sendFile(customDirName + '/public/index.html');
}

module.exports = {webApp}