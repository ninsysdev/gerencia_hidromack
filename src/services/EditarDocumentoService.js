import { ref } from "vue";

class EditarDocumentoService {
        
        constructor(){
            this.respuesta = ref('')
        }

        getRespuesta(){
            return this.respuesta
        }

        async fetchAddItemDocumento(urlPpal,headerdata,codigo,codprod,precio,cantidad){
            try{
                const res = await fetch(urlPpal+'documentoguardado/additem',{
                    method : 'POST',
                    headers : headerdata.headers,
                    body : JSON.stringify({
                        codigo : codigo,
                        codprod : codprod,
                        precio : precio,
                        cantidad : cantidad
                    })
                })

                let response = await res.json()
                this.respuesta.value = await response
            }
            catch(error){
                console.log(error)
            }
        }

        async fetchAddItemOneDoc(urlPpal,headerdata,id,codprod,precio,cantidad){
            try{
                const res = await fetch(urlPpal+'documentoguardado/edititem',{
                    method : 'POST',
                    headers : headerdata.headers,
                    body : JSON.stringify({
                        id : id,
                        codprod : codprod,
                        precio : precio,
                        cantidad : cantidad
                    })
                })

                let response = await res.json()
                //console.log(response)
                this.respuesta.value = await response
            }
            catch(error){
                console.log(error)
            }
        }
}

export default EditarDocumentoService