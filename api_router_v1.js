var express          = require('express');
var themeController    = require('./api/v1/theme');

var router           = express.Router();



// 主题活动
router.get('/theme/:areaId', themeController.list); //列表
router.post('/theme/apply', themeController.apply);

module.exports = router;
