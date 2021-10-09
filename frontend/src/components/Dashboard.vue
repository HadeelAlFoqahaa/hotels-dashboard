<template>

    <div class="dashboard">
        <fieldset>
            <legend>Filter</legend>
            <div class="filter flex-container">

                <div class="hotels">
                    <v-select :options="hotels" label="name" placeholder="Select Hotel" @input="hotelSelected" class="hotels-select"/>
                </div>

                <div class="date-from">
                    <label for="start" class="uppercase"> From </label>
                    <input type="date" id="start" @input="fetchReviews" v-model="dateFrom" min="2019-01-01" :max="todayDate">
                </div>

                <div class="date-to">
                    <label for="to" class="uppercase"> To </label>
                    <input type="date" id="to" @input="fetchReviews" v-model="dateTo" min="2019-01-01" :max="todayDate">
                </div>

            </div>
        </fieldset>

        <fieldset class="m-top-20 reviews-list">
            <legend>Reviews</legend>
            <line-chart v-if="loaded" :chartdata="chartdata" :options="chartOptions"/>
        </fieldset>
    </div>

</template>

<script>

    import LineChart from './Chart.vue'

    export default {
        name: 'Dashboard',
        props: {},
        components: {LineChart},
        data() {
            return {
                hotels: [],
                reviews: '',
                selectedHotel: {},
                dateFrom: '2019-01-01',
                dateTo: '',
                datacollection: {},
                loaded: false,
                chartdata: null,
                chartOptions: {}
            }
        },
        created() {
            this.fetchHotels();
            this.dateTo = this.getTodayDate();
            this.handleChartOptions();
        },
        computed: {
            todayDate() {
                return this.getTodayDate()
            },
        },
        methods: {

            handleChartOptions() {
                this.chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: {
                        enabled: true,
                        callbacks: {
                            label: ((tooltipItem, data) => {
                                let currentItem = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                return 'Avg Score: ' + Math.floor(currentItem.avg);
                            }),
                            title: ((tooltipItems, data) => {
                                let tooltipItem = tooltipItems[0];
                                let currentItem = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                return 'Reviews Count: ' + Math.floor(currentItem.count);
                            })
                        }
                    }
                };
            },

            getTodayDate() {

                const today = new Date();
                let day = today.getDate() + '';
                let month = today.getMonth() + 1 + '';

                if (day.length === 1) {
                    day = `0${day}`
                }

                if (month.length === 1) {
                    month = `0${month}`
                }

                return today.getFullYear() + '-' + month + '-' + day;
            },

            hotelSelected(hotel) {
                this.selectedHotel = hotel || {};
                this.fetchReviews();
            },

            fetchHotels() {
                this.$http.get( `hotels/all`).then((response) => {
                    this.hotels = response.data;
                });
            },

            fetchReviews() {

                if (!this.selectedHotel.id || !this.dateFrom || !this.dateTo) return this.chartdata = {};

                this.$http.get(`hotels/reviews/${this.selectedHotel.id}`, {
                    params: {
                        from: this.dateFrom,
                        to: this.dateTo
                    }
                }).then((response) => {

                    this.reviews = response.data.list;

                    let dataset = [];
                    let labels = [];
                    for (let property in this.reviews) {
                        labels.push(property);
                        this.reviews[property]['date-group'].forEach((score) => {
                            dataset.push({
                                x: property,
                                y: score,
                                avg: this.reviews[property]['average-score'],
                                count: this.reviews[property]['review-count']
                            })
                        });
                    }

                    this.chartdata = {
                        labels: labels,
                        datasets: [{
                            label: 'Average Score',
                            borderColor: '#f877b5',
                            data: dataset
                        }],
                    };

                    this.loaded = true;
                });
            }
        }
    }
</script>


<style scoped>

    .hotels {
        max-width: 15em;
    }

    .hotels-select {
        margin-top: 10px;
    }

    .uppercase {
        text-transform: uppercase;
    }

    .flex-container {
        display: flex;
        flex-wrap: nowrap;
    }

    .flex-container > div {
        background-color: #f1f1f1;
        width: 200px;
        margin: 10px;
        line-height: 50px;
        padding: 10px;
    }

    .m-top-20 {
        margin-top: 20px;
    }

    .dashboard {
        width: 50%;
        margin: auto;
    }

    .reviews-list {
        max-width: 50em;
    }
</style>
