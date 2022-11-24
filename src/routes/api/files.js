const express = require('express');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const path = require('path');

const FILE_DIR = path.resolve('./src/public/avatars');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_DIR);
    },
    filename: (req, file, cb) => {
        const [filename, extension] = file.originalname.split('.');
        cb(null, `${uuid()}.${extension}`);
    },
});

const { authMiddleware } = require('../../middlewares/authMiddleware');

const uploadMiddleware = multer({ storage });

// const { subscriptionSchema } = require('../../schemas/validationUserSchema');

// const { validationBody } = require('../../middlewares/validationBody');

const {
    uploadController,
    downloadController,
} = require('../../controllers/filesController');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

// router.use(authMiddleware);

router.post(
    '/:filename',
    uploadMiddleware.single('avatar'),
    ctrlWrapper(uploadController)
);

router.post(
    '/:filename',
    downloadMiddleware.single('avatar'),
    ctrlWrapper(downloadController)
);

module.exports = router;
