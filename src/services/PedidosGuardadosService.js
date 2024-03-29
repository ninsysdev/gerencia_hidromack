import { ref } from 'vue'
class PedidosGuardadosService {
    constructor(){
        this.pedidosguar = ref([]);
    }
    
    getPedidosGuar(){
        return this.pedidosguar;
    }
    
    async fetchPedidosGuardados(urlPpal,headerdata,vendedor){
        try{
            const res = await fetch(urlPpal+'documento/guardados/'+vendedor,{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            this.pedidosguar.value = await response
        }
        catch(error){
            console.log(error)
        }
    }
}

export default PedidosGuardadosService