import './sass/main.sass';
import './sass/mobile.sass';
import clickSearch from './js/animationSeach.js';
import { checkScreenSize, changeViewport } from './js/changeViewport.js';

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', clickSearch)
    
    window.addEventListener("load", checkScreenSize);
    window.addEventListener("resize", checkScreenSize);

    const botonNavigate = document.getElementById('navegacionVistas');
    botonNavigate.addEventListener('click', changeViewport);
})

const requireAsset = require.context('./assets', false, /\.(png|svg)$/);
const assetFiles = requireAsset.keys();
const assets = {};

assetFiles.forEach((file) => {
  const assetName = file.replace('./', '');
  assets[assetName] = requireAsset(file);
});