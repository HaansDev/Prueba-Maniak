const botonNavigate = document.getElementById('navegacionVistas');

const checkScreenSize = () => {
    if (window.innerWidth <= 768) {
        botonNavigate.classList.add("nav-Desktop");
        botonNavigate.classList.remove("nav-Mobile");
    } else {
        botonNavigate.classList.add("nav-Mobile");
        botonNavigate.classList.remove("nav-Desktop");
    }
};

const changeViewport = () => {
    const dimensiones = {
        "nav-Desktop": { width: 1440, height: 900 },
        "nav-Mobile": { width: 375, height: 800 },
    };

    const claseBoton = [...botonNavigate.classList].find(clase => dimensiones.hasOwnProperty(clase));

    if (claseBoton) {
        const { width, height } = dimensiones[claseBoton];
        window.open('index.html', '_blank', `width=${ width },height=${ height }`);
        window.close();
    }
};
  
export { checkScreenSize, changeViewport };
