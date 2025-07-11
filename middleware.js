const fs = require('fs');
const path = require('path');

const readJsonFile = (filePath, folder) => {
    try {
        const fullPath = path.join(__dirname, folder, filePath);
        const data = fs.readFileSync(fullPath, 'utf8');
        return JSON.parse(data);
    } catch(error) {
        console.error(`Error reading JSON file: ${filePath}`, error);
    }
}

module.exports = (req, res, next) => {
    try {
        if (req.method) {
            const file = readJsonFile('config.json', 'config');
            const data = file.find(object => ((object.path === req.path) && object.method === req.method));
            return res.status(data.code).json(readJsonFile(data.file, 'responses'));
        }
    } catch(error) {
        return res.status(500).json({
            message: "invalid url"
        });
    }
    next();
};