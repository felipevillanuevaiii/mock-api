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
};

const readTemplateFile = (filePath, folder) => {
    try {
        const fullPath = path.join(__dirname, folder, filePath);
        return fs.readFileSync(fullPath, 'utf8');
    } catch(error) {
        console.error(`Error reading template file: ${filePath}`, error);
    }
};

module.exports = (req, res, next) => {
    try {
        if (req.method) {
            const config = readJsonFile('config.json', 'config');

            //console.log(req.query);
            const data = config.find(object => {
                const isPathAndMethodMatch = (object.path === req.path) && (object.method === req.method);
                
                // Simplified query comparison for demonstration
                const isQueryMatch = Object.keys(object.query).every(key => key in req.query);
                
                return isPathAndMethodMatch && isQueryMatch;
            });

            if (data) {
                let responseContent = readTemplateFile(data.file, 'responses');
                
                // Replace placeholders with query parameters
                for (const key in req.query) {
                    const placeholder = `{{${key}}}`;
                    if (responseContent.includes(placeholder)) {
                        responseContent = responseContent.replace(new RegExp(placeholder, 'g'), req.query[key]);
                    }
                }
                
                // Parse the final content and send the response
                const jsonResponse = JSON.parse(responseContent);
                return res.status(data.code).json(jsonResponse);
            }
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "invalid url"
        });
    }
    next();
};