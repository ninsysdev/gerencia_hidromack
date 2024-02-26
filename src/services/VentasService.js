import { ref } from 'vue'

class VentasService {
     
    constructor(){
        this.ventasmes = ref([])
        this.vendedorventasmes = ref([])
        this.productosventasmes = ref([])
        this.clientesventasmes = ref([])
    }

    getVentasMes(){
        return this.ventasmes
    }

    getVendedorVentasMes(){
        return this.vendedorventasmes
    }

    getProductosVentasMes(){
        return this.productosventasmes
    }

    getClientesVentasMes(){
        return this.clientesventasmes
    }

    async fetchVentasMes(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'ventasdelmes',{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            this.ventasmes.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchVendedorVentasMes(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'vendedorventasmes',{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            this.vendedorventasmes.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchProductosVentasMes(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'productosventames',{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            this.productosventasmes.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchClientesVentasMes(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'clientesventames',{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            this.clientesventasmes.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default VentasService