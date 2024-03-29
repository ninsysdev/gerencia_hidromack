import { ref } from "vue";

class BorrarDocumentoService {
        
        constructor(){
            this.respuesta = ref('')
        }

        getRespuesta(){
            return this.respuesta
        }

        async fetchBorrarDocumento(urlPpal,headerdata,codigo){
            try{
                const res = await fetch(urlPpal+'documento/borrarguardado',{
                    method : 'POST',
                    headers : headerdata.headers,
                    body : JSON.stringify({
                        codigo : codigo
                    })
                })

                let response = await res.json()
                this.respuesta.value = await response
            }
            catch(error){
                console.log(error)
            }
        }

        async fetchDeleteItemDoc(urlPpal,headerdata,id){
            try{
                const res = await fetch(urlPpal+'documentoguardado/delteitem',{
                    method : 'POST',
                    headers : headerdata.headers,
                    body : JSON.stringify({
                        id : id
                    })
                })

                let response = await res.json()
                this.respuesta.value = await response
            }
            catch(error){
                console.log(error)
            }
        }

        async fetchDelItemOne(urlPpal,headerdata,id){
            try{
                const res = await fetch(urlPpal+'documentoguardado/edititem',{
                    method : 'POST',
                    headers : headerdata.headers,
                    body : JSON.stringify({
                        id : id,
                        codprod : '0',
                        precio : 0,
                        cantidad : 0
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

export default BorrarDocumentoService