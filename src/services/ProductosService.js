import { ref } from 'vue';

class ProductosService {
     
    constructor(){
        this.respuesta = ref([])
        this.productosofertas = ref([])
    }

    getRespuesta(){
        return this.respuesta
    }

    getProductosOfertas(){
        return this.productosofertas
    }

    async fetchActualizarProducto(urlPpal,headerdata,producto){
        try{
            //catalogodeproductos
            const res = await fetch(urlPpal+'editprodlist',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    CodProd : producto.CodProd,
                    Precio1 : producto.Precio1,
                    Precio2 : producto.Precio2,
                    Precio : producto.Precio
                })
            })

            let response = await res.json()
            this.respuesta.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchProductosOfertas(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'productosofertas',{
                method : 'GET',
                headers : headerdata.headers
            })

            let response = await res.json()
            this.productosofertas.value = await response

        }
        catch(error){
            console.log(error)
        }
    }
}

export default ProductosService