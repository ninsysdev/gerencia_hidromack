import { ref } from 'vue';


class CatalogoService {
     
    constructor(){
        this.respuesta = ref([])
    }

    getRespuesta(){
        return this.respuesta
    }

    async fetchArchivoCatalogo(urlPpal,headerdata,archivo){
            const formData = new FormData();
            formData.append('archivo', archivo);
            console.log(formData)
            try{
                const res = await fetch(urlPpal+'archivocatalogopdf',{
                    method : 'POST',
                    headers: headerdata.headers,
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

export default CatalogoService