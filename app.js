const { createApp } = Vue
const url = 'https://hp-api.onrender.com/api/characters/students'
const app = createApp( {
    data(){
        return {
            personajes : [],
            casas : [],
            personajesFiltrados : [],
            valorBusqueda : '',
            checked : [],
            personaje: undefined,
            titulo: ''
        }
    },
     created(){
      this.getData()
    },
    methods: {
        /*filtro(){
           this.personajesFiltrados = this.personajes.filter( personaje => 
            (this.checked.includes(personaje.house) || this.checked.length === 0) 
            && personaje.name.toLowerCase().includes(this.valorBusqueda.toLowerCase()))
        }*/
        async getData(){
            try {
                const response = await fetch(url)
                const data = await response.json()
                if( document.title.includes('Detalle') ){
                    let aux = location.search
                    let params = new URLSearchParams(aux)
                    let id = params.get('id')
                    this.personaje = data.find( personaje => personaje.id === id )
                    this.titulo = this.personaje.name
                }else{
    
                    const fn = personaje => personaje.house
                    this.personajes = data.filter( fn )
                    this.personajesFiltrados = this.personajes
                    this.casas = [ ...new Set(this.personajes.map( fn )) ]
                } 
                return data           
           } catch (error) {
                console.log( error )
           }
        }
    },
    computed: {
        filtro(){
            this.personajesFiltrados = this.personajes.filter( personaje => 
             (this.checked.includes(personaje.house) || this.checked.length === 0) 
             && personaje.name.toLowerCase().includes(this.valorBusqueda.toLowerCase()))
         }
    }


} )
app.mount("#app")
