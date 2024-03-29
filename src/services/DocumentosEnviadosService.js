import { ref } from 'vue';

class DocumentosEnviadosService {

    constructor(){
        this.respuestaEnv = ref([])
        this.respuestaPen = ref([])
    }

    getDocumentosEnviados(){
        return this.respuestaEnv
    }

    getDocumentosPendientes(){
        return this.respuestaPen
    }

    async fetchPedidosPendientes(urlPpal,headerdata,vendedor){
        try{
            const res = await fetch(urlPpal+'documento/pendientes/'+vendedor,{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            this.respuestaPen.value = await response
        }
        catch(error){
            console.log(error)
        }
    }

    async fetchPedidos(urlPpal,headerdata,vendedor){
        try{
            const res = await fetch(urlPpal+'documento/ultimospedgen/'+vendedor,{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            this.respuestaEnv.value = await response
        }
        catch(error){
            console.log(error)
        }
    }
}

export default DocumentosEnviadosService

