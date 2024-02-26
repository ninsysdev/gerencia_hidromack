<template>
    <div class="row">
          <div v-if="dis_table">
            <div class="card">
              <div class="card-header">
                <span><i class="bi bi-table me-2"></i></span> 10 PRODUCTOS MAS VENDIDOS
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
                            <td>Descripcion</td>
                            <td>Cantidad</td>
                        </tr>
                      <tr v-for="producto in ventasmes" :key="producto.CodItem">
                        <td>{{ producto.CodItem }}</td>
                        <td>{{ producto.Descrip }}</td>
                        <td style="text-align: right;">{{ $filters.currency(producto.Cantidad) }}</td>
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
  const ventasmes= datavenmes.getProductosVentasMes();

  onMounted( async ()=>{
      await datavenmes.fetchProductosVentasMes(store.urlPpal,store.headRequest())
  })
</script>