"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getImage = (req, res) => {
    console.log(__dirname);
    res.sendFile(`${__dirname}/Images/${req.params.Id}`);
};
exports.default = getImage;
