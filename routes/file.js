let express = require('express');
let router = express.Router();
let upload = require('../util/multer_config.js');
 
//const fileWorker = require('../controllers/file.controller.js');
const fileWorker = require('../controllers/file');


router.post('/upload', upload.single("file"), fileWorker.uploadFile);

router.post('/multiple/upload', upload.array('files', 4), fileWorker.uploadMultipleFiles);
 
router.get('/info', fileWorker.listAllFiles);
 
router.get('/:id', fileWorker.downloadFile);
 
module.exports = router;