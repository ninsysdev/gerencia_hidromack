<template>
    <div class="row">
          <div v-if="dis_table">
            <div class="card">
              <div class="card-header">
                <span><i class="bi bi-table me-2"></i></span> 10 CLIENTES MAS VENDIDOS
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table
                    id="example"
                    class="table table-striped data-table"
                    style="width: 100%"
                  >
                    <tbody>
                        <tr>
                            <td>Codigo</td>
                            <td>Nombre</td>
                            <td>Monto Venta</td>
                        </tr>
                      <tr v-for="cliente in ventasmes" :key="cliente.CodClie">
                        <td>{{ cliente.CodClie }}</td>
                        <td>{{ cliente.Descrip }}</td>
                        <td style="text-align: right;">{{ $filters.currency(cliente.Monto) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
    </div>
</template>
<script setup>
  import{ onMounted,defineProps } from 'vue'
  import { useGlobalStore } from '../store/global'
  import VentasMesVendedorService from '../services/VentasService';

  const store = useGlobalStore()

  defineProps({
        dis_table : Boolean
  })

  const datavenmes = new VentasMesVendedorService();
  const ventasmes= datavenmes.getClientesVentasMes();

  onMounted( async ()=>{
      await datavenmes.fetchClientesVentasMes(store.urlPpal,store.headRequest())
  })
</script>