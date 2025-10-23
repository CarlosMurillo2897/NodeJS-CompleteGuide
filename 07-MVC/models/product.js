const fs = require('fs');
const rootDir = require('../utils/path');

const products = [];

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        const p = path.join(rootDir, 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if(!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products));
        });
    }

    static fetchAll() {
        return products;
    }
};