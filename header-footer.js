// header-footer.js

const header = `
<header>
    <h1>CityTrek BA</h1>
    <nav class="sidebar">
    <ul class="menu">
    <li onclick=hideSidebar()><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></li>
        <li><a href="index.html">Página Principal</a></li>
        <li><a href="#">Categorías</a>
                <li class="subCatMobile"><a href="lugares.html?categoria=Gastronomia">Gastronomia</a></li>
                <li class="subCatMobile"><a href="lugares.html?categoria=Museos">Museos</a></li>
                <li class="subCatMobile"><a href="lugares.html?categoria=Sitios_de_Interes">Sitios de Interes</a></li>
                <li class="subCatMobile"><a href="lugares.html?categoria=Entretenimiento">Entretenimiento</a></li>
        </li>
        <li><a href="telefonos.html">Teléfonos Útiles</a></li>
        <li><a href="contacto.html">Contacto</a></li>
        <li><a href="nosotros.html">Nosotros</a></li>
    </ul>
</nav>
      <nav>
        <ul class="menu">
            <li class="hideOnMobile"><a href="index.html">Página Principal</a></li>
            <li class="hideOnMobile"><a href="#">Categorías</a>
                <ul class="submenu">
                    <li><a href="lugares.html?categoria=Gastronomia">Gastronomia</a></li>
                    <li><a href="lugares.html?categoria=Museos">Museos</a></li>
                    <li><a href="lugares.html?categoria=Sitios_de_Interes">Sitios de Interes</a></li>
                    <li><a href="lugares.html?categoria=Entretenimiento">Entretenimiento</a></li>
                </ul>
            </li>
            <li class="hideOnMobile"><a href="telefonos.html">Teléfonos Útiles</a></li>
            <li class="hideOnMobile"><a href="contacto.html">Contacto</a></li>
            <li class="hideOnMobile"><a href="nosotros.html">Nosotros</a></li>
            <li class="menu-button" onclick=showSidebar()><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
        </ul>
    </nav>
</header>
`;

const footer = `
<footer>
  <div class="redes">
    <a href="https://www.instagram.com/" target="_blank"><img src="img/insta.png" alt="Instagram"></a>
    <a href="https://twitter.com/?lang=en" target="_blank"><img src="img/twitter.png" alt="Twitter"></a>
    <a href="https://www.facebook.com/" target="_blank"><img src="img/facebook.png" alt="Facebook"></a>
  </div>

  <p>&copy; 2023 CityTrek BA</p>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
  // Inserta el encabezado en todas las páginas
  const headerContainer = document.querySelectorAll(".header-container");
  headerContainer.forEach((element) => {
    element.innerHTML = header;
  });

  // Inserta el pie de página en todas las páginas
  const footerContainer = document.querySelectorAll(".footer-container");
  footerContainer.forEach((element) => {
    element.innerHTML = footer;
  });
});