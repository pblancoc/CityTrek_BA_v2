new Vue({
    el: '#app',
    data: {
        id: ' ',
        nombre: ' ',
        telefono: ' ',
        dirreccion: ' ',
        categoria: ' ',
        datos: [],
        mapas: [],
        mapa: 'pepe',
        esAgregar: true,
        id_edit: ' ',
        urlAPI:'https://pblancoc.pythonanywhere.com/comentarios',
        comentarios: [],
        getComentarios: {
            comentarios: []
        },
        comentario: {
            comentario: '',
            fecha_hora: '',
            id: 0,
            lugar_id: '',
            puntuacion: 0,
            usuario: ''
        }, 
        nuevoComentario: {
            comentario: '',
            fecha_hora: '',
            lugar_id: '',
            puntuacion: 0,
            usuario: ''
        }        
    },
    methods: {
        enviarComentario(){
            const fechaHoraActual = new Date().toISOString();
            const fechaHoraFormateada = fechaHoraActual.slice(0, -5);
            const id_decodificado = this.id.replace('|', '%7C');

            let newComentario = {
                lugar_id: this.id,                         
                usuario: this.nuevoComentario.usuario,     
                fecha_hora: fechaHoraFormateada,               
                comentario: this.nuevoComentario.comentario,    
                puntuacion: this.nuevoComentario.puntuacion
            }
            var options = {
                body:JSON.stringify(newComentario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch('https://pblancoc.pythonanywhere.com/comentarios', options)
                .then(function () {
                    location.reload();
                    //alert("Registro grabado")
                    //window.location.href = `datosLugar.html?id=${id_decodificado}`;  // recarga productos.html
                    //<a :href="'datosLugar.html?id=' + lugar.id">
                    //`https://datosabiertos-catastro-apis.buenosaires.gob.ar/getObjectContent?id=${itemId}`
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
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
        const urlParams = new URLSearchParams(window.location.search);
        const itemId = urlParams.get('id');
        this.id = urlParams.get('id');

        this.mapas = [
            {
                id: 'gastronomia|1626',
                map: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13133.703114557555!2d-58.3651279!3d-34.6186791!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334d6ab8083d3%3A0x2cac9651b36b5f22!2sSiga%20La%20Vaca!5e0!3m2!1ses-419!2sar!4v1697558973494!5m2!1ses-419!2sar'
            },
            {
                id: 'gastronomia|2296',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.001781617086!2d-58.38855692505056!3d-34.60411645751782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac42dabce9b%3A0xbaa2d156dbe4138d!2zUGl6emVyw61hIEfDvGVycsOtbg!5e0!3m2!1ses-419!2sar!4v1697560371929!5m2!1ses-419!2sar'
            },
            {
                id: 'gastronomia|2363',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0209598086058!2d-58.38319662533313!3d-34.603631497701585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccace8dbdb4b7%3A0x83419753029f142b!2sLas%20Cuartetas!5e0!3m2!1ses-419!2sar!4v1697560420775!5m2!1ses-419!2sar'
            },
            {
                id: 'sitios_de_interes|45',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8225401275813!2d-58.380787025050324!3d-34.60864865775728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccad19d1e5cd3%3A0x520b8220bc17c42d!2sCaf%C3%A9%20Tortoni!5e0!3m2!1ses-419!2sar!4v1697560446319!5m2!1ses-419!2sar'
            },
            {
                id: 'sitios_de_interes|30',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.7839856125897!2d-58.398707825050266!3d-34.6096234578088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc9c865b35301%3A0xafded52fd6f86945!2sCaf%C3%A9%20de%20los%20Angelitos!5e0!3m2!1ses-419!2sar!4v1697560494086!5m2!1ses-419!2sar'
            },
            {
                id: 'dependencias_culturales|1420',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.929880290301!2d-58.417272025052014!3d-34.58064075627836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb598cc745299%3A0xbcc7a0946a015d8f!2sMuseo%20Evita!5e0!3m2!1ses-419!2sar!4v1697560549451!5m2!1ses-419!2sar'
            },
            {
                id: 'dependencias_culturales|2470',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.797705255898!2d-58.39761782533944!3d-34.58398489667981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaa199c2f643%3A0x49e543b8331abe7d!2sMuseo%20Nacional%20de%20Bellas%20Artes!5e0!3m2!1ses-419!2sar!4v1697560585782!5m2!1ses-419!2sar'
            },
            {
                id: 'dependencias_culturales|723',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.2926764392814!2d-58.373116425049645!3d-34.62204345846494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334d2dee93c85%3A0xd209b8d51c3521b5!2sMuseo%20Moderno!5e0!3m2!1ses-419!2sar!4v1697560649476!5m2!1ses-419!2sar'
            },
            {
                id: 'dependencias_culturales|724',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.2984567459116!2d-58.3727859250497!3d-34.62189735845714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334d2e0936d0f%3A0xe15768b6f49dbb52!2sMACBA%20-%20Museo%20de%20Arte%20Contempor%C3%A1neo%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1697560690368!5m2!1ses-419!2sar'
            },
            {
                id: 'dependencias_culturales|1476',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.078318504032!2d-58.405972925052225!3d-34.57688480608025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb564f74f69c3%3A0xeea87be2795e86d2!2sMuseo%20de%20Arte%20Latinoamericano%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1697560730471!5m2!1ses-419!2sar'
            },
            {
                id: 'sitios_de_interes|122',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168881864174!2d-58.38414532505066!3d-34.603734457497694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11bead4e234e558b!2sObelisco!5e0!3m2!1ses-419!2sar!4v1697560777164!5m2!1ses-419!2sar'
            },
            {
                id: 'sitios_de_interes|132',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.6089502465024!2d-58.3652556250486!3d-34.639321159377886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334b0f8639693%3A0x9ee9f7e4b5eeaf14!2sCaminito%2C%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1697560813553!5m2!1ses-419!2sar'
            },
            {
                id: 'sitios_de_interes|2455',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8310692166215!2d-58.37246272505039!3d-34.608433007745816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3352cbe276f75%3A0xe16921ef0545f86d!2sCasa%20Rosada!5e0!3m2!1ses-419!2sar!4v1697560838493!5m2!1ses-419!2sar'
            },
            {
                id: 'sitios_de_interes|2484',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8654006530915!2d-58.37583232505044!3d-34.60756495770004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb9c134355bc3%3A0xe7611c1602820d34!2sCatedral%20Metropolitana%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1697560859217!5m2!1ses-419!2sar'
            },
            {
                id: 'sitios_de_interes|131',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.664316564747!2d-58.395530425051675!3d-34.587359456633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaa2f10791b3%3A0xa1180ac6dc17a5c3!2sCementerio%20de%20la%20Recoleta!5e0!3m2!1ses-419!2sar!4v1697560883888!5m2!1ses-419!2sar'
            },
            {
                id: 'dependencias_culturales|1896',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.120826916702!2d-58.3861108250508!3d-34.60110605735899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac630121623%3A0x53386f2ac88991a9!2sTeatro%20Col%C3%B3n!5e0!3m2!1ses-419!2sar!4v1697560915411!5m2!1ses-419!2sar'
            },
            {
                id: 'dependencias_culturales|2705',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.206664878497!2d-58.386477725051044!3d-34.598935257244335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac7e0ec09bd%3A0xcd28f7743d27629c!2sTeatro%20Nacional%20Cervantes!5e0!3m2!1ses-419!2sar!4v1697595617134!5m2!1ses-419!2sar'
            },
            {
                id: 'sitios_de_interes|43',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8166351942627!2d-58.39012062505038!3d-34.60879795776516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac4b69ad5cf%3A0x9c60dd9663f59a45!2sLiceo!5e0!3m2!1ses-419!2sar!4v1697595691605!5m2!1ses-419!2sar'
            },
            {
                id: 'dependencias_culturales|2116',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0859889934627!2d-58.37149272505077!3d-34.601987057405495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a335325f19f9a3%3A0xfd34b93fba734a98!2sLuna%20Park!5e0!3m2!1ses-419!2sar!4v1697595741210!5m2!1ses-419!2sar'
            },
            {
                id: 'dependencias_culturales|2027',
                map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.030792428545!2d-58.38144152505073!3d-34.60338285747922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaceed5746b9%3A0xf933ab84305babc0!2sTeatro%20Gran%20Rex!5e0!3m2!1ses-419!2sar!4v1697595790085!5m2!1ses-419!2sar'
            }                                    
        ];

        lugarEncontrado = this.mapas.find((lugar) => lugar.id === this.id);
        if (lugarEncontrado) {
            this.mapa = lugarEncontrado.map;
        } else {
            this.mapa = '';
        };

        // Realiza una solicitud a la API para obtener los detalles del ítem por su ID
        fetch(`https://datosabiertos-catastro-apis.buenosaires.gob.ar/getObjectContent?id=${itemId}`)
            .then(response => response.json())
            .then(data => {
                this.item = data;
                this.nombre = data.contenido[0].valor;
                this.telefono = data.contenido[6].valor;
                this.dirreccion = data.direccionNormalizada;
                this.datos = data.contenido;
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // Realiza una solicitud a la API para comentarios
        fetch(`https://pblancoc.pythonanywhere.com/comentarios/lugar/${itemId}`)
            .then(response => response.json())
            .then(data => {
                this.getComentarios = data;
                this.comentarios = this.getComentarios.comentarios;
                console.log('Comentarios:');
                console.log(this.comentarios);
            })
            .catch(error => {
                console.error('Error:', error);
            });            
    },
});