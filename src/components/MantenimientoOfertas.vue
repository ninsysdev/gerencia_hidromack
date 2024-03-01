<template>
    <table class="table table-success table-striped">
        <tbody>
        <tr v-for="producto in ofertas" :key="producto.CodProd">
            <td>
                <img v-if="producto.ImgProd" width="100px" :src="'https://catalogohidromack.geincca.com/img/'+producto.imagen" alt="...">
                <br>{{ producto.CodProd }}
            </td>
            <td>
              <img v-if="producto.ImgProd" width="100px" :src="'https://catalogohidromack.geincca.com/img/ofrt/'+producto.ImgOfer" alt="...">
              <br>Oferta
            </td>
            <td>
                {{ producto.Descrip }} <br>
                <small>{{ producto.Descripcion }}</small>
                <br>
                <div v-if="producto.ImgProd==1">Usa Imagen del Producto</div>
                <div v-else>Usa Imagen de Oferta</div>
                <hr>
                <button class="btn btn-primary" @click="editarOferta(producto)" data-bs-toggle="modal" data-bs-target="#editarModal"><i class="bi bi-pencil-fill"></i></button>
                <button class="btn btn-danger" @click="confirmaQuitarOferta(producto.CodProd)"><i class="bi bi-trash3-fill"></i></button>
                <button class="btn btn-warning" @click="editarImagen(producto.CodProd)"  data-bs-toggle="modal" data-bs-target="#editarImagen"><i class="bi bi-image"></i></button>
            </td>
        </tr>
        </tbody>
    </table>
<!-- Modal -->
<div class="modal fade" id="editarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editar Oferta</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
            <h5>CODIGO:{{ datosOferta.CodProd }}</h5>
            Descripcion:
            <input type="text" class="form-control" v-model="datosOferta.Descripcion">
            <select class="form-select" v-model="datosOferta.ImgProd"> 
                <option value="1">Imagen del Producto</option>
                <option value="0">Imagen Oferta</option>
            </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button @click="guardarOferta()" type="button" class="btn btn-primary">Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>
<!-- END MODAL-->
<!-- Modal -->
<div class="modal fade" id="editarImagen" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Cargar Imagen</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <input class="form-control" type="file" id="picture" name="picture" accept="image/jpeg" @change="previewFiles" required/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button @click="imagenOferta()" type="button" class="btn btn-primary">Cargar Imagen</button>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
    import{ onMounted,inject,ref } from 'vue'
    import { useGlobalStore } from '../store/global'
    import ProductosOfertasService from '../services/ProductosService';
    import OfertasService from '../services/OfertasService';

    const swal = inject('$swal')

    const store = useGlobalStore()
    const productosofertas = new ProductosOfertasService();
    const ofertas = productosofertas.getProductosOfertas();

    const ServOfertas = new OfertasService();
    const respOferta = ServOfertas.getRespuesta();

    const datosOferta = ref({});

    const imgprod = ref('')
    const picture = ref([])

    onMounted( async ()=>{
        await productosofertas.fetchProductosOfertas(store.urlPpal,store.headRequest())
    })

    const editarOferta=((oferta)=>{
        datosOferta.value = oferta;
    })

    const guardarOferta = ( async ()=>{
        await ServOfertas.fetchActualizarOferta(store.urlPpal, store.headRequest(),datosOferta.value)
        if(respOferta.response == 'ok'){
            swal("Oferta Actualizada");
        }
        else{
            swal(respOferta.message)
        }
        await productosofertas.fetchProductosOfertas(store.urlPpal,store.headRequest())
    })

    const confirmaQuitarOferta=((producto)=>{
    swal.fire({
        title: "Confirmacion",
        text: "¿ Desea quitar la oferta ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quitar oferta"
        }).then((result) => {
        if (result.isConfirmed) {
            ServOfertas.fetchQuitarOferta(store.urlPpal, store.headRequest(),producto);
            swal.fire({
            title: respOferta.response,
            text: respOferta.message,
            icon: "success"
            });
            productosofertas.fetchProductosOfertas(store.urlPpal,store.headRequest())
        }
        });
})

function previewFiles(event) {
    picture.value = event.target.files[0] 
}

const editarImagen = ((producto)=>{
    imgprod.value = producto
})

const imagenOferta = ( async ()=>{
    await ServOfertas.fetchImagenOferta(store.urlPpal, store.pictureHeadRequest(),imgprod.value,picture.value);
    //await userregister.fetchRegisterUser(store.new_url,store.pictureHeadRequest(),firstname.value,lastname.value,email.value,picture.value,password.value)
    
    await swal.fire({
        icon: respOferta.value.colormen,
        title: respOferta.value.message,
        showConfirmButton: false,
        timer: 2500
      })
  })
</script>