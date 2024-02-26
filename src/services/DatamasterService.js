import { ref } from 'vue';

class DatamasterService {
        
        constructor(){
            this.respuesta = ref('')
        }

        getDatamaster(){
            return this.respuesta
        }

        async fetchDatamaster(urlPpal,headerdata){
            try{
                const res = await fetch(urlPpal+'datamaster',{
                    method : 'GET',
                    headers : headerdata.headers
                })

                let response = await res.json()
                this.respuesta.value = await response
                //console.log(this.respuesta.value)
            }
            catch(error){
                console.log(error)
            }
        }
}

export default DatamasterService