<template>
    <div class="main-content">
      <Loader v-if="isLoading" key="load" />
      <div class="content">
        <Panel header="Producto" class="shadow-lg">
          <div class="p-1">
            <div>
              <b-row>
                <b-col class="d-flex justify-content-between align-content-between mb-3">
                  <span class="p-input-icon-right">
                    <i class="pi pi-search custom" @click="changeSearch()" />
                    <InputText type="text" :placeholder="searchBy()" />
                  </span>
                  <Button
                    class="button-options"
                    label="Nuevo producto"
                    iconPos="right"
                    icon="pi pi-user-plus"
                    @click="openSaveModal"
                  />
                </b-col>
              </b-row>
            </div>
            <div>
              <DataTable
                class="custom-datatable"
                :value="products"
                selectionMode="single"
                @row-select="onProductSelect"
              >
                <Column :headerStyle="config" class="ctm-name" field="product_key" header="Clave" />
                <Column :headerStyle="config" class="ctm-name" field="product" header="Producto" />
                <Column :headerStyle="config" class="ctm-name" field="dimensions" header="Medidas" />
                <Column :headerStyle="config" header="Acciones" :bodyStyle="{ 'text-align': 'center', overflow: 'visible' }">
                  <template #body="slotProps">
                    <Button icon="pi pi-folder-open" class="p-button-rounded button-style" v-tooltip.top="'Historial'" />
                    <Button
                      icon="pi pi-trash"
                      v-tooltip.top="'Eliminar'"
                      class="p-button-rounded p-button-secondary"
                      @click="deleteProduct(slotProps.data)"
                      style="margin-right: .5em; margin-left: .5em;"
                    />
                    <Button icon="pi pi-pencil" class="p-button-rounded button-style" @click="editProduct(slotProps.data)" v-tooltip.top="'Editar'" />
                  </template>
                </Column>
              </DataTable>
              <div>
                <b-col cols="1" :style="{ marginTop: '20px' }">
                  <small>Registros: </small> {{ totalRecords }}
                </b-col>
                <Paginator
                  :rows="pageable.size"
                  :totalRecords="totalRecords"
                  :rowsPerPageOptions="[2, 3, 5, 10, 15, 20, 30, 100]"
                  :currentPage="totalRecords > 0 ? pageable.page : 0"
                  :first="pageable.page * pageable.size"
                  :pageLinkSize="1"
                  :style="{ marginTop: '20px' }"
                  @page="onPageChange"
                />
              </div>
            </div>
          </div>
        </Panel>
      </div>
      <!-- <ModalProductInfo :product="selectedProduct" :visible.sync="displayModal" />
      <ModalSaveProduct :visible.sync="displaySaveModal" /> -->
    </div>
  </template>
  
  <script>
  import Panel from "primevue/panel";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  // import ModalProductInfo from "@/modules/products/components/ModalProductInfo.vue";
  // import ModalSaveProduct from "@/modules/products/components/ModalSaveProduct.vue";
  import Paginator from 'primevue/paginator';
  import { onError } from "@/kernel/alerts";
  import Loader from "@/components/Loader.vue";
  import service from "@/modules/products/services/ProductService";
  
  export default {
    name: "Products",
    components: {
      Panel,
      DataTable,
      Column,
      Paginator,
      Loader
    },
    data() {
      return {
        isLoading: false,
        products: [],
        selectedProduct: null,
        config: {
          background: "#333",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
        },
        pageable: {
          page: 0,
          size: 2
        },
        totalRecords: 0,
      };
    },
    mounted() {
      this.getProducts();
    },
    methods: {
      async getProducts() {
        try {
          this.isLoading = true;
          const response = await service.get_products(this.pageable);
          if (response.status === 200 || response.status === 201) {
            this.totalRecords = response.data.data.totalElements;
            this.products = response.data.data.content;
          } else {
            await onError('Ha ocurrido un error', 'No se pudieron obtener los productos');
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          await onError('Ha ocurrido un error', 'No se pudieron obtener los productos');
        } finally {
          this.isLoading = false;
        }
      },
      onPageChange(event) {
        this.pageable.page = event.page;
        this.pageable.size = event.rows;
        this.getProducts();
      },
      onProductSelect(event) {
        this.displayModal = true;
        if (event.data) {
          this.selectedProduct = event.data;
        }
      },
      changeSearch() {
        this.searchByName = !this.searchByName;
      },
      searchBy() {
        return this.searchByName ? "Buscar por nombre..." : "Buscar por correo..";
      },
      openSaveModal() {
        this.displaySaveModal = true;
      },
      editProduct(data) {
        console.log(data);
      },
      deleteProduct(data) {
        console.log(data);
      }
    },
  };
  </script>
  
  <style scoped lang="scss">
  @import "@/styles/colors";
  
  .user-management {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .content {
    flex: 1;
    padding: 2rem;
    margin-left: 0;
    transition: margin-left 0.3s;
  }
  
  .content.sidebar-open {
    margin-left: 250px; /* Ajusta este valor al ancho de tu sidebar */
  }
  
  .dashboard {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .main-content {
    display: flex;
    flex: 2;
  }
  
  .content {
    flex: 1;
    padding: 1rem;
    transition: margin-left 0.3s;
  }
  
  .content.sidebar-open {
    margin-left: 200px;
  }
  
  .cd-user-info {
    margin-top: 86px;
  }
  
  .ctm-name {
    background-color: $primary-color;
  }
  
  .button-options {
    background: $primary-color;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  .button-options:hover {
    border-radius: 5px;
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(72, 70, 70, 0.3);
    background: $primary-color !important;
    border: none;
    cursor: pointer;
  }
  
  .custom:hover {
    cursor: pointer;
  }
  
  .button-style {
    background-color: $primary-color;
  }
  </style>
  