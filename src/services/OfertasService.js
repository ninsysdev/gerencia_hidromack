import { ref } from 'vue';


class OfertasService {
     
    constructor(){
        this.respuesta = ref([])
    }

    getRespuesta(){
        return this.respuesta
    }

    async fetchNuevaOferta(urlPpal,headerdata,producto){
        try{
            //catalogodeproductos
            const res = await fetch(urlPpal+'nuevaoferta',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    CodProd : producto
                })
            })

            let response = await res.json()
            this.respuesta.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchActualizarOferta(urlPpal,headerdata,producto){
        try{
            //catalogodeproductos
            const res = await fetch(urlPpal+'editaroferta',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    CodProd : producto.CodProd,
                    Descripcion : producto.Descripcion,
                    ImgProd : producto.ImgProd
                })
            })

            let response = await res.json()
            this.respuesta.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchQuitarOferta(urlPpal,headerdata,producto){
        try{
            //catalogodeproductos
            const res = await fetch(urlPpal+'eliminaroferta',{
                method : 'POST',
                headers : headerdata.headers,
                body : JSON.stringify({
                    CodProd : producto
                })
            })

            let response = await res.json()
            this.respuesta.value = await response

        }
        catch(error){
            console.log(error)
        }
    }

    async fetchImagenOferta(urlPpal,headerdata,producto,imagen){
            const formData = new FormData();
            formData.append('CodProd', producto);
            formData.append('picture', imagen);
            console.log(formData)
            try{
                const res = await fetch(urlPpal+'ofertaimagen',{
                    method : 'POST',
                    headers : headerdata.headers,
                    body : formData
                })

                const response = await res.json()
                this.respuesta.value = await response
            }
            catch(error){
                console.log(error)
            }
    }
}

export default OfertasService