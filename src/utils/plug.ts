export const  chooseImages = (callback:Function)=>{
    // @ts-ignore
    window.plug.chooseImages();
    // @ts-ignore
    window.plug.chooseImagesCallback = callback;
}
