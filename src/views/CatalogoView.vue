<template>
    <main class="mt-5 pt-3">
            <div class="p-2">
                <label class="btn btn-primary">
                    <i class="fa fa-folder-open-o" aria-hidden="true"></i>&nbsp;Seleccionar un archivo
                    <input class="form-control" type="file" id="archivo" name="archivo" accept=".pdf" @change="previewFiles">
                </label>
                <hr>
                <button v-if="!sincroniza" @click="cargarArchivo()" type="button" class="btn btn-primary">Cargar Catalogo PDF</button>
                <button v-else class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    SUBIENDO ARCHIVO...
                </button>
            </div>
    </main>
</template>
<script setup>
    import{ inject,ref } from 'vue'
    import { useGlobalStore } from '../store/global'
    import CatalogoService from '../services/CatalogoService';

    const swal = inject('$swal')

    const store = useGlobalStore()
    const ServCatalogo = new CatalogoService();
    const respCatalago = ServCatalogo.getRespuesta();

    const archivo = ref([])

    let sincroniza = ref(false)

    function previewFiles(event) {
        archivo.value = event.target.files[0] 
    }

    const cargarArchivo = ( async () => {
        sincroniza.value = true;
        await ServCatalogo.fetchArchivoCatalogo(store.urlPpal, store.pictureHeadRequest(),archivo.value);
        await swal.fire({
            icon: respCatalago.value.colormen,
            title: respCatalago.value.message,
            showConfirmButton: false,
            timer: 2500
        })
        sincroniza.value = false;
    })
</script>