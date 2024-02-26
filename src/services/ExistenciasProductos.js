import { ref } from 'vue';


class ExistenciasProductosService {
     
    constructor(){
        this.existenciasProd = ref([])
    }

    getExistenciasProd(){
        return this.existenciasProd
    }

    async fetchExistenciasProd(urlPpal,headerdata){
        try{
            //catalogodeproductos
            const res = await fetch(urlPpal+'exproductos',{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            this.existenciasProd.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default ExistenciasProductosService