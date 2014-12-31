var XLSX = require('xlsx');
var path = require('path');

exports.pdf = function(req, res) {
	//TODO: implement
	res.status(501);
	res.send('Not implemented yet!');
};

exports.xls = function(req, res) {
	var workbook = XLSX.readFile('template/report_template.xlsx');
	XLSX.writeFile(workbook, 'tmp/report.xlsx');
	var filepath = path.resolve('tmp/report.xlsx');
	res.sendFile(filepath);
};