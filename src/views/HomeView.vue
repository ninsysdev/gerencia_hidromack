<template>
    <main class="mt-5 pt-3">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <p><b>Estadisticas del mes</b> - dias laborales: {{ $filters.currency(diaslabmes) }} - laborados : {{ $filters.currency(laborados) }} - por laborar: {{ $filters.currency(porlaborar) }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 mb-3">
            <div class="card bg-primary text-white h-100">
              <div class="card-body py-3">{{ datcard1.descripcion }} <br>
              <h6 class="mt-2">{{ $filters.currency(datcard1.monto) }}</h6></div>
              <div class="card-footer d-flex">
                <router-link :to="{ name : 'ventasmes' }" style="text-decoration: none;color: white;">Ver Detalle</router-link> 
                <span class="ms-auto">
                  <i class="bi bi-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="card bg-warning text-dark h-100">
              <div class="card-body py-3">{{ datcard2.descripcion }}<br>
              <h6 class="mt-2">{{ $filters.currency(datcard2.monto) }}</h6>
              <!-- br>costo : {{ $filters.currency(costoinv) }} -->
              </div>
              <div class="card-footer d-flex">
                <router-link :to="{ name : 'inventario' }" style="text-decoration: none;color: black;">Ver Inventario</router-link>
                <span class="ms-auto">
                  <i class="bi bi-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="card bg-success text-white h-100">
              <div class="card-body py-3">{{ datcard3.descripcion }}<br>
              <h6 class="mt-2">{{ $filters.currency(datcard3.monto) }}</h6></div>
              <div class="card-footer d-flex">
                <router-link :to="{ name : 'comprasmes' }" style="text-decoration: none;color: black;">Ver Compras</router-link>
                <span class="ms-auto">
                  <i class="bi bi-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="card bg-danger text-white h-100">
              <div class="card-body py-3">{{ datcard4.descripcion }}<br>
                <h6 class="mt-2">{{ $filters.currency(datcard4.monto) }}</h6>
              </div>
              <div class="card-footer d-flex">
                <router-link :to="{ name : 'porcobrar' }" style="text-decoration: none;color: white;">Ctas Por Cobrar</router-link> 
                <span class="ms-auto">
                  <i class="bi bi-chevron-right"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <CartaProducto/>
        </div>
        <div class="mb-3">
          <TablaProductosVentas dis_table />
        </div>
        <div class="mb-3">
          <ChartVentasMesVendedor dis_chart dis_table />
        </div>
        <div class="mb-3">
          <TablaClientesVentas  dis_table />
        </div>
      </div>
    </main>
</template>

<script setup>
  import{ onMounted,ref } from 'vue';
  import { useGlobalStore } from '../store/global';
  import DatamasterService from '../services/DatamasterService';

  import ChartVentasMesVendedor from '../components/ChartVentasMesVendedor.vue';
  import TablaProductosVentas from '../components/VentasProductosMes.vue';
  import TablaClientesVentas from '../components/VentasClientesMes.vue';
  import CartaProducto from '../components/CartaProducto.vue';

  const store = useGlobalStore();
  
  let diaslabmes = ref(0)
  let laborados = ref(0)
  let porlaborar = ref(0)

  let datcard1 = ref({})
  let datcard2 = ref({})
  let datcard3 = ref({})
  let datcard4 = ref({})

  const datamaster = new DatamasterService()
  const datos_dm =  datamaster.getDatamaster()

  onMounted( async ()=>{
      await datamaster.fetchDatamaster(store.urlPpal,store.headRequest())
      diaslabmes.value = datos_dm.value[1].monto
      laborados.value = datos_dm.value[2].monto
      porlaborar.value = datos_dm.value[3].monto

      datcard1.value = datos_dm.value[6]
      datcard2.value = datos_dm.value[4]
      datcard3.value = datos_dm.value[8]
      datcard4.value = datos_dm.value[16]
  }) 
</script>
