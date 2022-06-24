const fs = require("fs");
const path = require("path");
const config = require("../kata.config")
const dsa = require("./dsa")

// Determine day name
const src_path = path.join(__dirname, "..", "src");
let day = 1;

try {
    day = +fs.readdirSync(src_path).
        filter(i => i.includes("day")).
        sort((a, b) => {
            return +b.substring(3) - a.substring(3);
        })[0].substring(3) + 1;
    if (isNaN(day)) {
        console.log("day is nan");
        day = 1;
    }
} catch (e) {
    console.log("error", e.message);
    console.log("day is 1");
    day = 1;
}

const day_name = `day${day}`; 
// -----
const day_path = path.join(src_path, day_name);
try { fs.unlinkSync(day_path); } catch (e) {}
try { fs.mkdirSync(day_path); } catch (e) {}

const create_class = (name, item) => {
    fs.writeFileSync(path.join(day_path, `${name}.ts`), `export default class ${item.className} {
    constructor() {

    }
}`);
}

const create_function = (name, item) => {
    fs.writeFileSync(path.join(day_path, `${name}.ts`), `export default const ${item.fn} = (${item.ars}): ${item.return} => {
    
}`);
}

config.dsa.forEach(ds => {
    const item = dsa[ds];
    if (item.type == "class") {
        create_class(ds, item);
    } else {
        create_function(ds, item);
    }
});

const align = require("./align-configs");
// align.jest(day_name);
align.ts_config(day_name);
align.package_json(config);
