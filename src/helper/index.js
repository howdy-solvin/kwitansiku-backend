const { Blob, atob } = require("node:buffer");

class mainHelper {
  b64toBlob = (b64Data, contentType, sliceSize = 512) => {
    // const byteCharacters = atob(b64Data);
    // const byteArrays = [];

    // for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    //   const slice = byteCharacters.slice(offset, offset + sliceSize);

    //   const byteNumbers = new Array(slice.length);
    //   for (let i = 0; i < slice.length; i++) {
    //     byteNumbers[i] = slice.charCodeAt(i);
    //   }

    //   const byteArray = new Uint8Array(byteNumbers);
    //   byteArrays.push(byteArray);
    // }

    // const blob = new Blob(byteArrays, { type: contentType });
    // console.log(b64Data);
    // console.log("blob", blob);
    // return blob;
    const buffer = Buffer.from(b64Data, "base64");
    return buffer;
  };

  bufferToBase64 = (buffer) => buffer.toString('base64');

  isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }
}

module.exports = mainHelper;
