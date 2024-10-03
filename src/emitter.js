const fs = require('fs');

class Emitter{
    constructor(fullPath){
        this.fullPath = fullPath;
        this.code = "";
    }
    
    emit(code){
        this.code += code;
    }

    emitLine(code){
        this.code += code + '\n';
    }

    writeFile() {
        fs.writeFileSync(this.fullPath, this.code);
    }

    clear() {
        this.code = "";
    }

    getCode() {
        return this.code;
    }
}

module.exports = Emitter


