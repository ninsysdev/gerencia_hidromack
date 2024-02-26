<template>
    <div v-for="producto in ofertas" :key="producto.CodProd" class="col-md-3 mb-3">
        <div class="card h-100">
            <div class="card-header">{{ producto.CodProd }}</div>
            <img v-if="producto.ImgProd" width="´100px" :src="'https://catalogohidromack.geincca.com/img/'+producto.imagen" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title" style="text-align: right;">{{ $filters.currency(producto.Precio3)  }}</h5>
                <p class="card-text">{{ producto.Descrip }}</p>
                <small>{{ producto.Descripcion }}</small>
            </div>
            <div class="card-footer">
                <small class="text-muted">{{ $filters.currency(producto.Existen) }} {{ producto.Unidad }}</small>
            </div>
        </div>
    </div>
</template>
<script setup>
  import{ onMounted } from 'vue'
  import { useGlobalStore } from '../store/global'
  import ProductosOfertasService from '../services/ProductosService';

  const store = useGlobalStore()


  const productosofertas = new ProductosOfertasService();
  const ofertas = productosofertas.getProductosOfertas();

  onMounted( async ()=>{
      await productosofertas.fetchProductosOfertas(store.urlPpal,store.headRequest())
  })
</script>

<style scoped>
    .card{
        border-radius: 10px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        margin: 10px;
    }
</style>