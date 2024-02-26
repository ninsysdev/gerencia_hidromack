import { ref } from 'vue';

class PorCobrarService {
     
    constructor(){
        this.analisisvencimiento = ref([])
    }

    getAnalisisVencimiento(){
        return this.analisisvencimiento
    }

    async fetchAnalisisVencimiento(urlPpal,headerdata){
        try{
            const res = await fetch(urlPpal+'analisisvencimiento',{
                method : 'GET',
                headers : headerdata.headers
            })
            const json = await res.json()
            this.analisisvencimiento.value = await json
        }
        catch(error){
            console.log(error)
        }
    }
}

export default PorCobrarService