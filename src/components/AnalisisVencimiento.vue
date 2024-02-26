<template>
    Analisis de Vencimiento
    <div class="row mb-3">
        <div class="col-6">
            <input class="form-control" type="text" placeholder="Buscar" v-model="filtro">
        </div>
        <div class="col-3">
            <select v-model="buscarPor" class="form-select">
                <option value="Descrip" selected>Cliente</option>
                <option value="vendedor">Vendedor</option>
                <option value="NumeroD">Factura</option>
            </select>
        </div>
        <div class="col-1">
            <button class="btn btn-primary" @click="buscarDato"><i class="bi bi-search"></i></button>
        </div>
        <div class="col-1">
            <download-excel class="btn btn-success" :data="datosFiltrados" name="cuentasporcobrar.xls">
            <i class="bi bi-file-earmark-excel"></i>
            </download-excel>
        </div>
    </div>
    <table class="table table-sm">
        <thead>
            <tr>
            <th>Fact</th>
            <th>Fecha</th>
            <th>Saldo</th>
            <th>Venc</th>
            <th>Dias</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="reg in datosFiltrados" :key="nrounico">
            <td>{{ reg.NumeroD }}</td>
            <td>{{ reg.FechaE }}</td>
            <td  class="ad">{{ reg.Saldo }}</td>
            <td  class="ad">{{ reg.Abono }}</td>
            <td>{{ reg.FechaV }}</td>
            <td  class="ad">{{ reg.Dias }}</td>
            <td>{{ reg.Descrip }}</td>
            <td>{{ reg.vendedor }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    import { onMounted,ref } from 'vue';
    import { useGlobalStore } from '../store/global'
    import PorCobrarService from '../services/PorCobrarService';

    const store = useGlobalStore()
    const PorCobrar = new PorCobrarService()
    const AnalisisVenc = PorCobrar.getAnalisisVencimiento()

    const buscarPor = ref('')
    const filtro = ref('');
    const datosFiltrados = ref([])

    onMounted( async () => {
        await PorCobrar.fetchAnalisisVencimiento(store.urlPpal,store.headRequest())
        datosFiltrados.value = AnalisisVenc.value
    })

    const buscarDato = () => {
        if(filtro.value == ''){
            datosFiltrados.value = AnalisisVenc.value
        }
        else{
            if(buscarPor.value == 'Descrip'){
                datosFiltrados.value = AnalisisVenc.value.filter(item => item.Descrip.toLowerCase().includes(filtro.value.toLowerCase()))
            }
            else if(buscarPor.value == 'vendedor'){
                datosFiltrados.value = AnalisisVenc.value.filter(item => item.vendedor.toLowerCase().includes(filtro.value.toLowerCase()))
            }
            else{
                datosFiltrados.value = AnalisisVenc.value.filter(item => item.NumeroD.toLowerCase().includes(filtro.value.toLowerCase()))
            }
        }
    }
</script>
<style scoped>
.ad{
    text-align: right;
}
</style>