import { ref } from 'vue'

class ComprasService {
     
    constructor(){
        this.comprasmes = ref([])
    }

    getComprasmes(){
        return this.comprasmes
    }

    async fetchComprasMes(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'comprasdelmes',{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            this.comprasmes.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default ComprasService