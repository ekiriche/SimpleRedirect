const express = require('express');
const app = express();
const port = 5000;
const fs = require("fs");

const redirects = fs.readFileSync(__dirname + "/redirects.txt").toString().split(/\r?\n/).reduce((acc, item) => {
    const splitItem = item.split(' ');

    if (splitItem.length !== 2) {
        return acc;
    }

    acc[splitItem[0]] = splitItem[1];

    return acc;
}, {});

app.use((req, res) => {
    const currentPath = req.url.substring(1);

    if (!currentPath) {
        res.redirect(301, 'https://takelessons.com');
        return;
    }

    const redirectUrl = redirects[currentPath];

    res.redirect(301, redirectUrl ?? `https://takelessons.com/with/${currentPath}`);
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
