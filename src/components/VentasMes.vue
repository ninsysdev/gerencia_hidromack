<template>
    <h5 class="mt-2">VENTAS DEL MES</h5>
    <div class="row mb-3">
        <div class="col-6">
            <input class="form-control" type="text" placeholder="Buscar" v-model="filtro">
        </div>
        <div class="col-3">
            <select v-model="buscarPor" class="form-select">
                <option value="Descrip" selected>Cliente</option>
                <option value="CodVend">Vendedor</option>
                <option value="Documento">Factura</option>
            </select>
        </div>
        <div class="col-1">
            <button class="btn btn-primary" @click="buscarDato"><i class="bi bi-search"></i></button>
        </div>
        <div class="col-1">
            <download-excel class="btn btn-success" :data="datosFiltrados" name="ventas.xls">
            <i class="bi bi-file-earmark-excel"></i>
            </download-excel>
        </div>
    </div>
    <table class="table" style="font-size: smaller;">
       <thead>
        <tr>
            <th>Documento</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Deposito</th>
            <th>Vendedor</th>
        </tr>
       </thead> 
       <tbody>
        <tr v-for="venta in datosFiltrados" :key="venta.NroUnico" >
            <td>{{ venta.Documento }}</td>
            <td>{{ venta.FechaE }}</td>
            <td>{{ venta.CodClie }} - {{ venta.Descrip }}</td>
            <td style="text-align: right;">{{ $filters.currency(venta.Monto) }}</td>
            <td style="text-align: center;">{{ venta.CodUbic }}</td>
            <td>{{ venta.CodVend }}</td>
        </tr>
       </tbody>
    </table>
</template>
<script setup>
    import { onMounted,ref } from 'vue';
    import { useGlobalStore } from '../store/global'
    import VentasService from '../services/VentasService';

    const buscarPor = ref('Descrip')
    const filtro = ref('');
    const datosFiltrados = ref([])

    const store = useGlobalStore()
    const ventasMes = new VentasService();
    const ventasData = ventasMes.getVentasMes();

    onMounted(  async ()=>{
        await ventasMes.fetchVentasMes(store.urlPpal,store.headRequest());
        datosFiltrados.value = ventasData.value;
    })

    const buscarDato = () => {
        if(filtro.value == ''){
            datosFiltrados.value = ventasData.value
        }
        else{
            if(buscarPor.value == 'Descrip'){
                datosFiltrados.value = ventasData.value.filter(item => item.Descrip.toLowerCase().includes(filtro.value.toLowerCase()))
            }
            else if(buscarPor.value == 'vendedor'){
                datosFiltrados.value = ventasData.value.filter(item => item.CodVend.toLowerCase().includes(filtro.value.toLowerCase()))
            }
            else{
                datosFiltrados.value = ventasData.value.filter(item => item.Documento.toLowerCase().includes(filtro.value.toLowerCase()))
            }
        }
    }
</script>