new Vue({
    el: '#app',
    data: {
        urlAPI: 'https://pblancoc.pythonanywhere.com/comentarios',
        lugares: [],
        lugaresMapeados: [],
        getComent: [],
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
        getComentarios() {
            let tabla_nombres = [];

            // Agregar los arrays a tabla_nombres utilizando concat()
            tabla_nombres = tabla_nombres.concat(this.nombres_gastronomia, this.nombres_museos, this.nombres_interes, this.nombres_entretenimiento);

            if (this.urlAPI) {
                // Realiza una solicitud a la API para comentarios
                fetch(this.urlAPI)
                    .then(response => response.json())
                    .then(data => {
                        this.getComent = data;
                        this.lugares = this.getComent;
                        console.log('Top:');
                        console.log(this.lugares);

                        // Mapear los lugar_id con sus respectivos nombres
                        this.lugaresMapeados = this.lugares.map(item => {
                            let descripcion = tabla_nombres.find(desc => desc.id === item.lugar_id);
                            //let puntuacionFormateada = parseFloat(item.puntuacion_promedio).toFixed(1);
                            return {
                                id: item.id,
                                lugar_id: descripcion ? descripcion.nombre : item.lugar_id,
                                usuario: item.usuario,
                                comentario: item.comentario,
                                fecha_hora: item.fecha_hora,
                                puntuacion: item.puntuacion
                            };
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        },
        eliminarComentario(id) {
            const url = this.urlAPI+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        editarComentario(comentario) {
            this.id_edit = comentario.id;
            this.nuevoComentario.usuario = comentario.usuario;
            this.nuevoComentario.comentario = comentario.comentario;
            this.nuevoComentario.puntuacion = comentario.puntuacion;
            
            this.esAgregar = false;

            // Hacer scroll hasta el div agregar-comentario
            const agregarComentarioDiv = document.querySelector('.agregar-comentario');
            if (agregarComentarioDiv) {
                agregarComentarioDiv.scrollIntoView({
                    behavior: 'smooth'
                });
            }            
        },  
        cancelar() {
            location.reload();
        },
        modificarComentario() {
            const url = this.urlAPI+'/' + this.id_edit;
            const fechaHoraActual = new Date().toISOString();
            const fechaHoraFormateada = fechaHoraActual.slice(0, -5);
            console.log(url);
            let editComentario = {
                lugar_id: this.id,                         
                usuario: this.nuevoComentario.usuario,     
                fecha_hora: fechaHoraFormateada,               
                comentario: this.nuevoComentario.comentario,    
                puntuacion: this.nuevoComentario.puntuacion
            }
            console.log(editComentario);
            var options = {
                body: JSON.stringify(editComentario),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            
            fetch(url, options)
                .then(function () {
                    alert("Registro modificado")
                    location.reload();          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }         
    },
    created() {
        this.getComentarios();
    },    
});