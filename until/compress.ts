export const compress = async (base64: any[]) => {
  let compressImg: any[] = [];
  if (base64) {
    for (let i = 0; i < base64.length; i++) {
      const ifCompress = (base: any, quality?: number) => {
        return new Promise<Blob>((resolve, reject) => {
          const base64Img = new Image();
          base64Img.src = base;
          base64Img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx: any = canvas.getContext("2d");
            const w = base64Img.width;
            const h = base64Img.height;
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(base64Img, 0, 0, w, h);

            canvas.toBlob(
              (blob) => {
                if (blob === null) {
                  reject("Conversion failed");
                  return;
                }
                resolve(blob);
              },
              "image/jpeg",
              quality
            );
          }
        })
      };
      let compressBlob = await ifCompress(base64[i], 0.8);

      while (Number(compressBlob.size) >= 204800) {
        console.log(compressBlob.size);

        compressBlob = await ifCompress(URL.createObjectURL(compressBlob), 0.7);
      }
      compressImg.push(compressBlob);
    }
    return compressImg;
  }
};


export const replacePath = (content: string, base64: string | any[], compressImgs: any[]) => {
  let htmlContent = content;
  for (let i = 0; i < base64.length; i++) {
    htmlContent = htmlContent.replace(base64[i], compressImgs[i]);
  }
  return htmlContent
}
