const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios')

var server_port = process.env.PORT || 3000

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/api', (req, res) => {
	const year = req.query.year
	const month = req.query.month
	const day = req.query.day

	axios.get(`https://www.metaweather.com/api/location/44418/${year}/${month}/${day}/`)
		.then(resp => {
			res.send({status: 'ok', records: resp.data})
		})
		.catch(error => {
			res.send({status: 'error'})
		});
})

app.listen(server_port, function () {
  console.log( "Listening on port " + server_port )
});