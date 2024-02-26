<template>
    <h5 class="mt-2">COMPRAS DEL MES</h5>
    <table class="table" style="font-size: smaller;">
       <thead>
        <tr>
            <th>Numero</th>
            <th>Fecha</th>
            <th>Proveedor</th>
            <th>Total Compra</th>
            <th>Deposito</th>
            <th>Usuario</th>
        </tr>
       </thead> 
       <tbody>
        <tr v-for="compra in comprasData" :key="compra.NumeroD" >
            <td>{{ compra.NumeroD }}</td>
            <td>{{ compra.FechaE }}</td>
            <td>{{ compra.CodProv }} - {{ compra.Descrip }}</td>
            <td style="text-align: right;">{{ $filters.currency(compra.MtoTotal) }}</td>
            <td style="text-align: center;">{{ compra.CodUbic }}</td>
            <td>{{ compra.CodUsua }}</td>
        </tr>
       </tbody>
    </table>
</template>
<script setup>
    import { onMounted } from 'vue';
    import { useGlobalStore } from '../store/global'
    import CompraService from '../services/ComprasService';

    const store = useGlobalStore()
    const comprasMes = new CompraService();
    const comprasData = comprasMes.getComprasmes();

    onMounted(  async ()=>{
        await comprasMes.fetchComprasMes(store.urlPpal,store.headRequest())
    })
</script>