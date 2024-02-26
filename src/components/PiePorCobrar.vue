<template>
    <div class="row">
        <div v-if="dis_pie" class="col-md-12">
            <div class="card h-100">
              <div class="card-header">
                <span class="me-2"><i class="bi bi-bar-chart-fill"></i></span>
                Cuentas por cobrar
              </div>
              <div class="card-body">
                <div id="chart1">
                  <apexchart type="pie"   :options="pieChartOptions" :series="pieSeries"></apexchart>
                </div>
              </div>
            </div>
        </div>
        <div v-if="dis_table" class="col-md-12">
            <div class="card">
              <div class="card-header">
                <span><i class="bi bi-table me-2"></i></span> Cuentas por Cobrar
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table
                    id="example"
                    class="table table-striped data-table"
                    style="width: 100%"
                  >
                    <tbody>
                      <tr v-for="cxc in datos_cxc" :key="cxc.codigo">
                        <td>{{ cxc.descripcion }}</td>
                        <td style="text-align: right;">{{ $filters.currency(cxc.monto) }}</td>
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
    import { onMounted,ref,defineProps } from 'vue';
    import { useGlobalStore } from '../store/global'
    import DatamasterService from '../services/DatamasterService'

    defineProps({
        dis_pie : Boolean,
        dis_table : Boolean
    })

    const store = useGlobalStore()
    const datamaster = new DatamasterService()
    const datos_dm =  datamaster.getDatamaster()

    let pieSeries = ref([])
    let pieChartOptions = ref({})
    
    let datos = [];
    let labels = [];
    let datos_cxc = [];

     onMounted( async ()=>{
        await datamaster.fetchDatamaster(store.urlPpal,store.headRequest())

        datos.push( parseFloat(datos_dm.value[10].monto));
        datos.push( parseFloat(datos_dm.value[11].monto));
        datos.push( parseFloat(datos_dm.value[12].monto));
        datos.push( parseFloat(datos_dm.value[13].monto));

        labels.push( datos_dm.value[10].descripcion);
        labels.push( datos_dm.value[11].descripcion);
        labels.push( datos_dm.value[12].descripcion);
        labels.push( datos_dm.value[13].descripcion);

        datos_cxc.push({"codigo" : datos_dm.value[10].codigo,"descripcion" : datos_dm.value[10].descripcion,"monto" : datos_dm.value[10].monto})
        datos_cxc.push({"codigo" : datos_dm.value[11].codigo,"descripcion" : datos_dm.value[11].descripcion,"monto" : datos_dm.value[11].monto})
        datos_cxc.push({"codigo" : datos_dm.value[12].codigo,"descripcion" : datos_dm.value[12].descripcion,"monto" : datos_dm.value[12].monto})
        datos_cxc.push({"codigo" : datos_dm.value[13].codigo,"descripcion" : datos_dm.value[13].descripcion,"monto" : datos_dm.value[13].monto})
        datos_cxc.push({"codigo" : datos_dm.value[14].codigo,"descripcion" : datos_dm.value[14].descripcion,"monto" : datos_dm.value[14].monto})
        datos_cxc.push({"codigo" : datos_dm.value[15].codigo,"descripcion" : datos_dm.value[15].descripcion,"monto" : datos_dm.value[15].monto})
        datos_cxc.push({"codigo" : datos_dm.value[16].codigo,"descripcion" : datos_dm.value[16].descripcion,"monto" : datos_dm.value[16].monto})
        datos_cxc.push({"codigo" : datos_dm.value[17].codigo,"descripcion" : datos_dm.value[17].descripcion,"monto" : datos_dm.value[17].monto})

        pieSeries.value = datos
        pieChartOptions.value = {
                chart: {
                width: 600,
                type: 'pie',
                },
                labels: labels,
                responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                    width: 200
                    },
                    legend: {
                    position: 'bottom'
                    }
                }
                }]
        }
     })

</script>