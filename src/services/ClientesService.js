import { ref } from 'vue';

class ClientesService {
    constructor(){
        this.clientes = ref([])
    }

    getClientes(){
        return this.clientes
    }

    async fetchClientes(urlPpal,headerdata,vendedor){
        try{
            const res = await fetch(urlPpal+'clientesvendedor/V00001',{
                method : 'GET',
                headers : headerdata.headers
            })
            const json = await res.json()
            this.clientes.value = await json
        }
        catch(error){
            console.log(error)
        }
    }
}

export default ClientesService