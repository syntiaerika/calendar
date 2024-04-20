import fs from 'node:fs';
import os from 'node:os';

class Repository
{
    storagePath;

    constructor(storagePath)
    {
        this.storagePath = storagePath;
        fs.openSync(storagePath, 'a');
    }

    readAllRows()
    {
        return fs.readFileSync(this.storagePath, 'utf8').split(os.EOL).filter(row => row.length > 0);
    }
}

export default Repository;