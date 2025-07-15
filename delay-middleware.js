
module.exports = (req, res, next) => {
    try {
        if (req.path.endsWith("timeout")) {
            return;
        }
    } catch(error) {
        return res.status(500).json({
            message: "invalid url"
        });
    }
    next();
};