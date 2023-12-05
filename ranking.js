new Vue({
    el: '#app',
    data: {
        urlAPI: 'https://pblancoc.pythonanywhere.com/comentarios',
        opcion: '',
        lugares: [],
        lugaresMapeados: [],
        getTop: {
            ranking: []
        },
        nombres_gastronomia: [] = [
            { "id": "gastronomia%7C1626", "nombre": "Siga La Vaca" },
            { "id": "gastronomia%7C2296", "nombre": "Pizzeria Guerrin" },
            { "id": "gastronomia%7C2363", "nombre": "Pizzeria Las Cuartetas" },
            { "id": "sitios_de_interes%7C45", "nombre": "Cafe Tortoni" },
            { "id": "sitios_de_interes%7C30", "nombre": "Cafe Los Angelitos" }
        ],     
        nombres_museos: [] = [
            { "id": "dependencias_culturales%7C1420", "nombre": "Museo Evita" },
            { "id": "dependencias_culturales%7C2470", "nombre": "Museo Nacional de Bellas Artes" },
            { "id": "dependencias_culturales%7C723", "nombre": "Museo de Arte Moderno de Buenos Aires" },
            { "id": "dependencias_culturales%7C724", "nombre": "Museo de Arte Contemporáneo de Buenos Aires" },
            { "id": "dependencias_culturales%7C1476", "nombre": "Museo de Arte Latinoamericano de Buenos Aires" }
        ], 
        nombres_interes: [] = [
            { "id": "sitios_de_interes%7C122", "nombre": "Obelisco" },
            { "id": "sitios_de_interes%7C132", "nombre": "Caminito" },
            { "id": "sitios_de_interes%7C2455", "nombre": "Casa Rosada" },
            { "id": "sitios_de_interes%7C2484", "nombre": "Catedral Metropolitana" },
            { "id": "sitios_de_interes%7C131", "nombre": "Cementerio Recoleta" }
        ],  
        nombres_entretenimiento: [] = [
            { "id": "dependencias_culturales%7C1896", "nombre": "Teatro Colon" },
            { "id": "dependencias_culturales%7C2705", "nombre": "Teatro Cervantes" },
            { "id": "sitios_de_interes%7C43", "nombre": "Teatro Liceo" },
            { "id": "dependencias_culturales%7C2116", "nombre": "Luna Park" },
            { "id": "dependencias_culturales%7C2027", "nombre": "Gran Rex" }
        ]                        
    },
    methods: {
        getRanking() {
            // Aquí llamas a la función correspondiente según la opción seleccionada
            let urlTop =  '';
            let tabla_nombres = [];

            if (this.opcion === 'gastronomia') {
                urlTop = this.urlAPI + '/top_gastronomia';
                tabla_nombres = this.nombres_gastronomia;
            } else if (this.opcion === 'museo') {
                urlTop = this.urlAPI + '/top_museos';
                tabla_nombres = this.nombres_museos;
            } else if (this.opcion === 'entretenimiento') {
                urlTop = this.urlAPI + '/top_entretenimiento';
                tabla_nombres = this.nombres_entretenimiento;
            } else if (this.opcion === 'sitios_interes') {
                urlTop = this.urlAPI + '/top_interes';
                tabla_nombres = this.nombres_interes;
            } else {
                this.lugares = [];
            }

            console.log(urlTop);

            if (urlTop) {
                // Realiza una solicitud a la API para comentarios
                fetch(urlTop)
                    .then(response => response.json())
                    .then(data => {
                        this.getTop = data;
                        this.lugares = this.getTop.ranking;
                        console.log('Top:');
                        console.log(this.lugares);

                        // Mapear los lugar_id con sus respectivos nombres
                        this.lugaresMapeados = this.lugares.map(item => {
                            let descripcion = tabla_nombres.find(desc => desc.id === item.lugar_id);
                            let puntuacionFormateada = parseFloat(item.puntuacion_promedio).toFixed(1);
                            return {
                                lugar_id: descripcion ? descripcion.nombre : item.lugar_id,
                                puntuacion_promedio: puntuacionFormateada
                            };
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    },
});