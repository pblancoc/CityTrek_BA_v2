new Vue({
    el: '#app',
    data: {
        categoria: ' ',
        titulo: ' ',
        lugares: []
    },
    created() {
        const urlParams = new URLSearchParams(window.location.search);
        this.categoria = urlParams.get('categoria');
        this.titulo = this.categoria.replace(/_/g, " ");

        switch (this.categoria) {
            case 'Gastronomia':
                this.lugares = [
                    { "id": "gastronomia%7C1626", "nombre": "Siga La Vaca" },
                    { "id": "gastronomia%7C2296", "nombre": "Pizzeria Guerrin" },
                    { "id": "gastronomia%7C2363", "nombre": "Pizzeria Las Cuartetas" },
                    { "id": "sitios_de_interes%7C45", "nombre": "Cafe Tortoni" },
                    { "id": "sitios_de_interes%7C30", "nombre": "Cafe Los Angelitos" }
                ];
                break;

            case 'Museos':
                this.lugares = [
                    { "id": "dependencias_culturales%7C1420", "nombre": "Museo Evita" },
                    { "id": "dependencias_culturales%7C2470", "nombre": "Museo Nacional de Bellas Artes" },
                    { "id": "dependencias_culturales%7C723", "nombre": "Museo de Arte Moderno de Buenos Aires" },
                    { "id": "dependencias_culturales%7C724", "nombre": "Museo de Arte Contemporáneo de Buenos Aires" },
                    { "id": "dependencias_culturales%7C1476", "nombre": "Museo de Arte Latinoamericano de Buenos Aires" }
                ];
                break;

            case 'Sitios_de_Interes':
                this.lugares = [
                    { "id": "sitios_de_interes%7C122", "nombre": "Obelisco" },
                    { "id": "sitios_de_interes%7C132", "nombre": "Caminito" },
                    { "id": "sitios_de_interes%7C2455", "nombre": "Casa Rosada" },
                    { "id": "sitios_de_interes%7C2484", "nombre": "Catedral Metropolitana" },
                    { "id": "sitios_de_interes%7C131", "nombre": "Cementerio Recoleta" }
                ];
                break;

            case 'Entretenimiento':
                this.lugares = [
                    { "id": "dependencias_culturales%7C1896", "nombre": "Teatro Colon" },
                    { "id": "dependencias_culturales%7C2705", "nombre": "Teatro Cervantes" },
                    { "id": "sitios_de_interes%7C43", "nombre": "Teatro Liceo" },
                    { "id": "dependencias_culturales%7C2116", "nombre": "Luna Park" },
                    { "id": "dependencias_culturales%7C2027", "nombre": "Gran Rex" }
                ];
                break;

            default:
                this.lugares = [{ "id": "0", "nombre": "Sin datos" }];
        }
    },
});
