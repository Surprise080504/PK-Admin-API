const crypto = require("crypto");

module.exports={
    encrypt: (algorithm, buffer, key, iv) => {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const encrypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
        return encrypted;
    },
    
    decrypt: (algorithm, buffer, key, iv) => {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
        return decrypted;
    }
}
