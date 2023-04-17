export const  chooseImages = (callback:Function)=>{
    // @ts-ignore
    window.plus.chooseImages();
    // @ts-ignore
    window.plug.chooseImagesCallback = callback;
}
