import { checkScreenSize, changeViewport } from './js/changeViewport.js';

const requireAsset = require.context('./assets', false, /\.(png|svg)$/);
const assetFiles = requireAsset.keys();
const assets = {};

assetFiles.forEach((file) => {
  const assetName = file.replace('./', '');
  assets[assetName] = requireAsset(file);
});

const loadMobileSass = () => {
  if (window.innerWidth <= 1340) {
    import('./sass/responsive.sass')
      .then(() => {})
      .catch(error => {
        console.error('Error al cargar mobile.sass:', error);
      });
  }
};

const loadAllSass = () => {
  const requireSass = require.context('./sass', false, /\.(sass)$/);
  const sassFiles = requireSass.keys();

  sassFiles.forEach((file) => {
    requireSass(file);
  });
};

const loadAnimationSearch = () => {
  if (window.innerWidth > 670) {
    import('./js/animationSeach.js')
      .then(animationsModule => {
        console.log('Se ha cargado el modulo animation Search')
        const clickSearch = animationsModule.default;
        document.addEventListener('click', clickSearch);
      })
      .catch(error => {
        console.error('Error al cargar el modulo animationSearch:', error);
      });
  }
};

document.addEventListener('DOMContentLoaded', () => {    
    loadAllSass();
    loadMobileSass();

    window.addEventListener("load", checkScreenSize);
    window.addEventListener("resize", checkScreenSize);

    const botonNavigate = document.getElementById('navegacionVistas');
    botonNavigate.addEventListener('click', changeViewport);

    loadAnimationSearch();
})

