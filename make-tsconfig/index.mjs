#!/usr/bin/env zx

let tsConfigTemp = path.join(__filename, '../tsconfig.template.json');
$`cat ${tsConfigTemp}`.pipe(await fs.createWriteStream(`./tsconfig.json`));
