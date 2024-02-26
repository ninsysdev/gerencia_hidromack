<template>
    <div class="row">
          <div v-if="dis_chart" class="col-md-8 mb-3">
            <div class="card h-100">
              <div class="card-header">
                <span class="me-2"><i class="bi bi-bar-chart-fill"></i></span>
                Ventas del Mes por Vendedor
              </div>
              <div class="card-body">
                <div>
                  <apexchart type="bar" :options="options" :series="series"></apexchart>
                </div>
              </div>
            </div>
          </div>
          <div v-if="dis_table" class="col-md-4 mb-3">
            <div class="card">
              <div class="card-header">
                <span><i class="bi bi-table me-2"></i></span> Ventas por Vendedor
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
                            <td>Vendedor</td>
                            <td>Venta Mes</td>
                        </tr>
                      <tr v-for="vendedor in ventasmes" :key="vendedor.Codvend">
                        <td>{{ vendedor.CodVend }}</td>
                        <td style="text-align: right;">{{ $filters.currency(vendedor.Monto) }}</td>
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
  import{ onMounted,ref,defineProps } from 'vue'
  import { useGlobalStore } from '../store/global'
  import VentasMesVendedorService from '../services/VentasService';

  const store = useGlobalStore()
  let series = ref([])
  let options = ref({})
  let datosy1 = []
  let datosx = []

  defineProps({
        dis_chart : Boolean,
        dis_table : Boolean
  })

  const datavenmes = new VentasMesVendedorService();
  const ventasmes= datavenmes.getVendedorVentasMes();

  onMounted( async ()=>{
      await datavenmes.fetchVendedorVentasMes(store.urlPpal,store.headRequest())
      
      
      ventasmes.value.map(elem => datosy1.push(elem.Monto))
      ventasmes.value.map(elem => datosx.push(elem.CodVend))
     
      series.value = [{
        name: 'Ventas Mes',
        data: datosy1,
        color : '#ff5732'
      }]

      options.value = {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
            bar: {
            borderRadius: 5,
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: datosx,
        },
        yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              }
            
        },
      }
  })
</script>