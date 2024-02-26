<template>
    <div class="row mb-3">
        <div class="col-6">
            <input class="form-control" type="text" placeholder="Buscar" v-model="filtro">
        </div>
        <div class="col-6">
            <select v-model="buscarPor" class="form-select">
                <option value="Descrip" selected>Descripcion</option>
                <option value="CodProd">Codigo</option>
                <option value="Refere">Referencia</option>
                <option value="Marca">Marca</option>
            </select>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col-6">
            <download-excel class="btn btn-success" :data="datosFiltrados" name="inventario.xls">
                <i class="bi bi-file-earmark-excel"></i>
            </download-excel>
        </div>
        <div class="col-6" style="text-align: right;">
            <button class="btn btn-primary" @click="buscarDato"><i class="bi bi-search"></i></button>
        </div>
    </div>
    <table id="tabla1" class="table table-sm">
        <tbody>
            <tr v-for="producto in datosFiltrados" :key="producto.CodProd">
                <td>
                    <div v-for="imagen in producto.img" :key="imagen.file">
                        <img style="width: 100px;" :src="'https://catalogohidromack.geincca.com/img/' + imagen.file"
                            alt="..." />
                    </div>
                </td>
                <td>
                    <div class="text-primary">{{ producto.CodProd }} - {{ producto.Descrip }} <br>
                        <small>{{ producto.Descrip2 }} {{ producto.Descrip3 }} </small>
                    </div>
                    <small>
                        Ref: {{ producto.Refere }} <br>
                        Marca : {{ producto.Marca }} <br>
                        Costo: {{ producto.CostAct }} <br>
                        Precio1 : {{ producto.Precio1 }} <br>
                        Precio2 : {{ producto.Precio2 }} <br>
                        Precio: {{ producto.Precio }} <br>
                        Cantidad : {{ $filters.currency(producto.Exinten) }} {{ producto.Unidad }}
                    </small>
                    <div style="text-align: right;">
                        <button type="button" @click="datosEditar(producto)" class="btn btn-warning" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Editar
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ editarproducto.CodProd }} - {{ editarproducto.Descrip }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Precio1 : <input v-model="editarproducto.Precio1" type="text" class="form-control"> <br>
                    Precio2 : <input v-model="editarproducto.Precio2" type="text" class="form-control"> <br>
                    Precio : <input v-model="editarproducto.Precio" type="text" class="form-control"> <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="actualizarProducto()" type="button" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->
</template>
<script setup>
import { onMounted, ref , inject } from 'vue';
import { useGlobalStore } from '../store/global'
import ExistenciasProductosService from '../services/ExistenciasProductos';
import ProductosService from '../services/ProductosService';

const swal = inject('$swal')

const store = useGlobalStore()
const ExistenciasProductos = new ExistenciasProductosService();
const todosProductos = ExistenciasProductos.getExistenciasProd();

const ProducServ= new ProductosService()
const ResponseUpdate = ProducServ.getRespuesta()

const datosFiltrados = ref([]);
const buscarPor = ref('CodProd')
const filtro = ref('');

const editarproducto = ref({})

onMounted(async () => {
    await ExistenciasProductos.fetchExistenciasProd(store.urlPpal, store.headRequest())
})

const buscarDato = () => {
    if (filtro.value == '') {
        datosFiltrados.value = todosProductos.value
    }
    else {
        if (buscarPor.value == 'Descrip') {
            datosFiltrados.value = todosProductos.value.filter(item => item.Descrip.toLowerCase().includes(filtro.value.toLowerCase()))
        }
        else if (buscarPor.value == 'CodProd') {
            datosFiltrados.value = todosProductos.value.filter(item => item.CodProd.toLowerCase().includes(filtro.value.toLowerCase()))
        }
        else if (buscarPor.value == 'Refere') {
            datosFiltrados.value = todosProductos.value.filter(item => item.Refere.toLowerCase().includes(filtro.value.toLowerCase()))
        }
        else {
            datosFiltrados.value = todosProductos.value.filter(item => item.Marca.toLowerCase().includes(filtro.value.toLowerCase()))
        }
    }
}

function datosEditar(producto) {
    editarproducto.value = producto;
}

const actualizarProducto = ( async ()=>{
    await ProducServ.fetchActualizarProducto(store.urlPpal, store.headRequest(),editarproducto.value)
    if (ResponseUpdate.value.response=='ok'){
        swal("Registro Actualizado");
    }
    else{
        swal(ResponseUpdate.value.message);
    }
})
</script>