<template>
    <DataTable :value="jokes" :pt="{
        table: 'table table-striped',
        header: 'bg-primary',
    }" lazy paginator :totalRecords="totalRecords" :first="page" :rows="limit" @page="onPage($event)"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} jokes" :loading="loading">
        <template #header>
            <div class="d-flex justify-content-between">
                <Dropdown v-model="selectedType" @change="getJokes()" :options="types" optionLabel="name"
                    placeholder="Select type" checkmark :highlightOnSelect="false" class="w-full md:w-14rem" />
                <Dropdown v-model="selectedOrder" @change="getJokes()" :options="orderTypes" optionLabel="name"
                    placeholder="Order" checkmark :highlightOnSelect="false" class="w-full md:w-14rem" />
            </div>
        </template>
        <template #empty> No jokes found. </template>
        <Column field="id" header="ID"> </Column>
        <Column field="type" header="Type"></Column>
        <Column field="setup" header="Setup"></Column>
        <Column field="punchline" header="PunchLine">
            <template #body="{ data }">
                <Button @click="revealJoke(data)" label="Reveal"></Button>
            </template>
        </Column>
    </DataTable>
    <Dialog v-model:visible="visible" maximizable modal header="Punchline" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="punchlineWrapper text-center py-4">
            <h2 class="mb-4">{{ selectedJoke?.punchline }}</h2>
            <img src="../../assets/lol.webp" class="lolIcon" width="240" height="auto" alt="LOL">
        </div>
    </Dialog>
</template>

<script>
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';

export default {
    name: 'ListJokes',
    components: {
        DataTable,
        Column,
        Button,
        Dropdown,
        Dialog
    },
    mounted() {
        this.getTypes();
        this.getJokes();
    },
    data() {
        return {
            jokes: null,
            totalRecords: 0,
            page: 0,
            limit: 10,
            loading: false,
            selectedType: null,
            types: null,
            selectedOrder: null,
            orderTypes: [
                { name: 'ASC', code: 'asc' },
                { name: 'DESC', code: 'asc' }
            ],
            visible: false,
            selectedJoke: null
        }
    },
    methods: {
        getJokes(page = this.page, limit = this.limit) {
            try {
                this.loading = true;

                axios.get(`${process.env.VUE_APP_JOKE_API_URL}jokes?page=${(page + 1)}&limit=${limit}&type=${this.selectedType?.code}&order=${this.selectedOrder?.code}`)
                    .then(res => {
                        this.jokes = res.data.data;
                        this.totalRecords = res.data.total;
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.loading = false;
                    })
            } catch (e) {
                console.log(e);
            }
        },
        getTypes() {
            try {
                axios.get(`${process.env.VUE_APP_JOKE_API_URL}joke_types`)
                    .then(res => {
                        this.types = res.data;
                        this.types.unshift({ name: 'All', code: '' });
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } catch (e) {
                console.log(e);
            }
        },
        onPage(event) {
            this.getJokes(event.page);
        },
        revealJoke(joke) {
            this.selectedJoke = joke;
            this.visible = true;
        }
    }
}
</script>

<style>
body ol,
body ul {
    padding-left: 0rem !important;
}

.punchlineWrapper {
    overflow: hidden;
}

.lolIcon {
    animation: laugh 1s ease-in-out infinite;
}

@keyframes laugh {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(40deg);
    }

    100% {
        transform: rotate(0deg);
    }
}
</style>