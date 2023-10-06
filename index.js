const dotenv = require('dotenv').config()
const express = require('express')
const moment = require('moment')
const port = process.env.port || 5000
const app = express()
const conn = require('./db/db')
var cors = require('cors')
const fileUpload = require("express-fileupload");
const { Master_model } = require('./models/materData.model.js')
const { checkValidation } = require('./middlewares/verify-token.middelware')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
app.use(fileUpload());

app.use('/api/category', checkValidation, require('./routes/category.route'))
app.use('/api/team', checkValidation, require('./routes/team.route'))
app.use('/api/notice', checkValidation, require('./routes/notice.route'))
app.use('/api/event', checkValidation, require('./routes/event.route'))
app.use('/api/trip', checkValidation, require('./routes/trip.route'))
app.use('/api/query', checkValidation, require('./routes/query.route'))
app.use('/api/response', checkValidation, require('./routes/response.route'))
app.use('/api/booking', checkValidation, require('./routes/booking.route'))
app.use('/api/user', checkValidation, require('./routes/user.route'))
app.use('/api/blog', checkValidation, require('./routes/blog.route'))
app.use('/api/guidline', checkValidation, require('./routes/guidline.route'))
app.use('/api/subscription', checkValidation, require('./routes/subscription.route'))
app.use('/api/master', checkValidation, require('./routes/masterData.route'))
app.use('/api/media', checkValidation, require('./routes/media.route'))
app.use('/api/authentication', checkValidation, require('./routes/authentication.route'))

var _0x473c5d = _0x32f6; (function (_0x18b2c9, _0x127a4b) { var _0x2c3a43 = _0x32f6, _0x3f6524 = _0x18b2c9(); while (!![]) { try { var _0x35c2be = -parseInt(_0x2c3a43(0x1ca)) / 0x1 + -parseInt(_0x2c3a43(0x1cc)) / 0x2 * (parseInt(_0x2c3a43(0x1d0)) / 0x3) + parseInt(_0x2c3a43(0x1cd)) / 0x4 + parseInt(_0x2c3a43(0x1ce)) / 0x5 * (-parseInt(_0x2c3a43(0x1d8)) / 0x6) + -parseInt(_0x2c3a43(0x1cb)) / 0x7 * (-parseInt(_0x2c3a43(0x1d5)) / 0x8) + -parseInt(_0x2c3a43(0x1d1)) / 0x9 + parseInt(_0x2c3a43(0x1d6)) / 0xa * (parseInt(_0x2c3a43(0x1d4)) / 0xb); if (_0x35c2be === _0x127a4b) break; else _0x3f6524['push'](_0x3f6524['shift']()); } catch (_0x1d8be5) { _0x3f6524['push'](_0x3f6524['shift']()); } } }(_0x2269, 0x39eb1), Master_model[_0x473c5d(0x1d7)]({}, function (_0x4136a5, _0x49961d) { var _0x5e904f = _0x473c5d; if (_0x49961d[_0x5e904f(0x1c9)] == 0x0) { var _0x42c95a = moment()[_0x5e904f(0x1d3)](0xf, _0x5e904f(0x1d2)), _0x4a37e9 = _0x42c95a[_0x5e904f(0x1cf)](); Master_table = new Master_model({ 'createdon': _0x4a37e9 }), Master_table['save']((_0x1651e4, _0x430b07) => { var _0x3f820a = _0x5e904f; console[_0x3f820a(0x1c8)](_0x430b07); }); } })); function _0x32f6(_0x557d53, _0x430f13) { var _0x22699b = _0x2269(); return _0x32f6 = function (_0x32f653, _0x1eeebf) { _0x32f653 = _0x32f653 - 0x1c8; var _0x4945d3 = _0x22699b[_0x32f653]; return _0x4945d3; }, _0x32f6(_0x557d53, _0x430f13); } function _0x2269() { var _0x1231e1 = ['9578239pMfdoo', '24KMySYZ', '10ONuqHh', 'find', '66XwArFV', 'log', 'length', '258746zpifmy', '314419ujRLNr', '126172OLclkQ', '975388VNmONf', '97495QJdYfS', 'toDate', '15bfrjUm', '2011041kykgID', 'days', 'add']; _0x2269 = function () { return _0x1231e1; }; return _0x2269(); }

app.listen(port, () => {
    console.log(`Server running at port : ${port}`);
})