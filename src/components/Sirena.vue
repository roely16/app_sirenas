<template>
    <div>
        <b-card bg-variant="light">
            
            <b-row align-v="center" class="mb-2">
                <b-col cols="12">
                    <b-card-title class="mb-0">
                        <font-awesome-icon size="xs" color="green" icon="circle" />
                            {{ identificador }}
                    </b-card-title>
                </b-col>
                <!-- <b-col cols="11">
                    
                </b-col> -->
            </b-row>
            
           <b-card-sub-title class="mb-2">
               {{ direccion }}
               <br>
               {{ ip }}
            </b-card-sub-title>
            
            <!-- <a href="#" class="card-link" @click="visible_map = !visible_map">Ubicación 
                <font-awesome-icon icon="map-pin" />
            </a> -->

            <b-collapse  id="collapse-1" class="mt-2" v-model="visible_map">
                
               <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true" data-projection="EPSG:4326" style="height: 400px" v-if="visible_map">
                    <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

                    <vl-geoloc @update:position="geolocPosition = $event">
                        <template slot-scope="geoloc">
                        <vl-feature v-if="geoloc.position" id="position-feature">
                            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
                            <vl-style-box>
                            <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                            </vl-style-box>
                        </vl-feature>
                        </template>
                    </vl-geoloc>

                    <vl-layer-tile id="osm">
                        <vl-source-osm></vl-source-osm>
                    </vl-layer-tile>
                </vl-map>
            </b-collapse>

            <b-row class="mt-4">
                <b-col>

                     <b-button variant="primary" @click="encender">
                        <font-awesome-icon icon="play" />
                    </b-button>

                     <b-button class="ml-2" variant="warning" @click="intermitente">
                        <font-awesome-icon icon="exclamation-triangle" />
                    </b-button>

                    <!-- <b-dropdown variant="outline-primary" no-caret class="m-md-2 mr-4">
                        <template v-slot:button-content>
                            <font-awesome-icon icon="play" />
                        </template>
                        <b-dropdown-item @click="encender" >Fija</b-dropdown-item>
                        <b-dropdown-item @click="intermitente" >Intermitente</b-dropdown-item>
                    </b-dropdown> -->
        
                    <b-button class="ml-2" variant="danger" @click="apagar">
                        <font-awesome-icon icon="stop" />
                    </b-button>
                </b-col>
            </b-row>

            <br>
            <a :href="'http://' + ip + ':8888'">Panel de Control</a>

            <template v-slot:footer>
                <b-row align-v="center">
                    <b-col cols="10">
                        <strong :class="text_color" v-if="estado">Estado: 
                            <span class="primary">{{ estado }}</span>
                        </strong>
                    </b-col>
                    <b-col cols="2">
                        <!-- <font-awesome-icon  color="green" icon="circle" /> -->
                        <b-spinner variant="secondary" small type="grow" label="Spinning" v-if="loading"></b-spinner>
                    </b-col>
                </b-row>
                
            </template>
        </b-card>

        <!-- <form  id="form_apagar">
            <input type="submit" name="submit" value="Encender">
        </form> -->

    </div>      
</template>

<style scoped>
    .map {
        height: 400px;
        width: 100%;
    }
</style>

<script>
    export default {
        props: {
            identificador: String,
            ip: String,
            direccion: String,
            puerto: String,
            encender_sirena: {
                type: Boolean, 
                default: false
            },
            intermitente_sirena: {
                type: Boolean, 
                default: false
            },
            apagar_sirena: {
                type: Boolean, 
                default: false
            }
        },
        data(){
            return{
                zoom: 2,
                center: [0, 0],
                rotation: 0,
                geolocPosition: undefined,
                visible_map: false,
                estado: '',
                loading: false,
                text_color: ''
            }
        },
        methods: {
            encender(){
                
                // this.estado = 'Encendiendo...'
                // this.loading = true
                // this.text_color = 'text-primary'

                // this.axios('http://' + this.ip + ':' + this.puerto + '/?status=encender', {
                //     method: 'GET',
                //     mode: 'no-cors'
                // })
                // .then((response) => {
                //     // eslint-disable-next-line no-console
                //     console.log(response.data)
                //     this.loading = false
                //     this.estado = 'Encendida'
                // })
                // .catch(error => {
                //     // eslint-disable-next-line no-console
                //     console.log(error.response)
                //     this.estado = 'Error de conexión'
                //     this.text_color = 'text-danger'
                //     this.loading = false
                // })

                // var formdata = new FormData()
                // formdata.append("submit", "Encender")

                // const testURL = 'http://' + this.ip + ':' + this.puerto + '/?status=encender';
                // const myInit = {
                //     method: 'GET',
                // };

                // const myRequest = new Request(testURL, myInit);

                // fetch(myRequest).then(function(response) {
                //     // eslint-disable-next-line no-console
                //     console.log(response)
                //     return response;
                // }).then(function(response) {
                //     // eslint-disable-next-line no-console
                //     console.log(response);
                // }).catch(function(e){
                //     // eslint-disable-next-line no-console
                //     console.log(e);
                // });

                this.estado = 'Encendiendo...'
                this.loading = true
                this.text_color = 'text-primary'

                let self = this

                const url = 'http://' + this.ip + ':' + this.puerto + '/?status=Encender'

                // eslint-disable-next-line no-console
                console.log(url)


                var formData = new FormData();
                formData.append("submit", "Encender");

                fetch(url, {
                    method: 'GET',
                    mode: 'no-cors',
                    // body: formData
                })
                .then(function(response) {
                    return response;
                })
                .then(function(myJson) {
                    // eslint-disable-next-line no-console
                    console.log(myJson);
                    self.loading = false
                    self.estado = 'Encendida'
                })
                .catch(function(error){
                    // eslint-disable-next-line no-console
                    console.log(error)
                    self.estado = 'Error de conexión'
                    self.text_color = 'text-danger'
                    self.loading = false
                });

            },
            intermitente(){

                this.estado = 'Encendiendo...'
                this.loading = true
                this.text_color = 'text-warning'

                const url = 'http://' + this.ip + ':' + this.puerto + '/?status=Intermitente'

                // eslint-disable-next-line no-console
                console.log(url)

                let self = this

                fetch(url, {
                    method: 'GET',
                    mode: 'no-cors'
                })
                .then(function(response) {
                    return response;
                })
                .then(function(myJson) {
                    // eslint-disable-next-line no-console
                    console.log(myJson);
                    self.loading = false
                    self.estado = 'Encendida'
                })
                .catch(function(error){
                    // eslint-disable-next-line no-console
                    console.log(error)
                    self.estado = 'Error de conexión'
                    self.text_color = 'text-danger'
                    self.loading = false
                });

                // this.axios.get('http://' + this.ip + ':' + this.puerto)
                // .then((response) => {
                //     // eslint-disable-next-line no-console
                //     console.log(response.data)
                //     this.loading = false
                //     this.estado = 'Encendida'
                // })
                // // eslint-disable-next-line no-console
                // .catch(error => {
                //     // eslint-disable-next-line no-console
                //     console.log(error.response)
                //     this.estado = 'Error de conexión'
                //     this.text_color = 'text-danger'
                //     this.loading = false
                // })

                // var formdata = new FormData()
                // formdata.append("submit", "Intermitente")

                // const testURL = 'http://' + this.ip + ':' + this.puerto + '/?status=Intermitente';
                // const myInit = {
                //     method: 'POST',
                //     mode: 'no-cors',
                //     body: formdata
                // };

                // const myRequest = new Request(testURL, myInit);

                // fetch(myRequest).then(function(response) {
                //     // eslint-disable-next-line no-console
                //     console.log(response)
                //     return response;
                // }).then(function(response) {
                //     // eslint-disable-next-line no-console
                //     console.log(response);
                // }).catch(function(e){
                //     // eslint-disable-next-line no-console
                //     console.log(e);
                // });

            },
            apagar(){

                this.estado = 'Apagando...'
                this.loading = true
                this.text_color = 'text-danger'

                var formData = new FormData();
                formData.append("submit", "Apagar");

                const url = 'http://' + this.ip + ':' + this.puerto + '/?status=Apagar'

                // eslint-disable-next-line no-console
                console.log(url)

                let self = this

                fetch(url, {
                    method: 'GET',
                    mode: 'no-cors',
                    // body: formData
                })
                .then(function(response) {
                    return response;
                })
                .then(function(myJson) {
                    // eslint-disable-next-line no-console
                    console.log(myJson);
                    self.loading = false
                    self.estado = 'Apagada'
                })
                .catch(function(error){
                    // eslint-disable-next-line no-console
                    console.log(error)
                    self.estado = 'Error de conexión'
                    self.text_color = 'text-danger'
                    self.loading = false
                });

                // this.estado = 'Apagando...'
                // this.loading = true
                // this.text_color = 'text-danger'

                // var formData = new FormData()
                // formData.append("submit", "Apagar")

                // this.axios.post('http://' + this.ip + ':' + this.puerto, formData)
                // .then((response) => {
                //     // eslint-disable-next-line no-console
                //     console.log(response.data)
                //     this.loading = false
                //     this.estado = 'Apagada'
                // })
                // // eslint-disable-next-line no-console
                // .catch(error => {
                //     // eslint-disable-next-line no-console
                //     console.log(error.response)
                
                // })

                // var formdata = new FormData()
                // formdata.append("submit", "Apagar")

                // const testURL = 'http://' + this.ip + ':' + this.puerto + '/?status=Apagar';
                // const myInit = {
                //     method: 'POST',
                //     mode: 'no-cors',
                //     body: formdata
                // };

                // const myRequest = new Request(testURL, myInit);

                // fetch(myRequest).then(function(response) {
                //     // eslint-disable-next-line no-console
                //     console.log(response)
                //     return response;
                // }).then(function(response) {
                //     // eslint-disable-next-line no-console
                //     console.log(response);
                // }).catch(function(e){
                //     // eslint-disable-next-line no-console
                //     console.log(e);
                // });

                // var formdata = new FormData();
                // formdata.append("status", "Apagar");

                // var requestOptions = {
                //     credentials: 'include',
                //     method: 'POST',
                //     headers: {'Content-Type': 'application/x-www-form-urlencoded', },
                //     body: formdata,
                //     mode: 'no-cors',
                // };

                // fetch("http://190.121.193.3:8888/?status=Apagar", requestOptions)
                // // eslint-disable-next-line no-console
                // .then(result => console.log('success====:', result))
                // // eslint-disable-next-line no-console
                // .catch(error => console.log('error============:', error));

                // var form = new FormData();
                // form.append("", "");

                // var settings = {
                //     "url": "http://190.121.193.3:8888/?status=Apagar",
                //     "method": "POST",
                //     "timeout": 0,
                //     "processData": false,
                //     "mimeType": "multipart/form-data",
                //     "contentType": false,
                //     "data": form,
                //     crossDomain: true,
                //     dataType: 'jsonp',
                // };

                // eslint-disable-next-line no-undef
                // $.ajax(settings).done(function (response) {
                // // eslint-disable-next-line no-console
                // console.log(response);
                // });

                //eslint-disable-next-line no-undef
                // $.ajax({
                //     type: 'POST',
                //     url: 'http://' + this.ip + ':' + this.puerto + '/?status=Apagar',
                //     data: formdata,
                //     // eslint-disable-next-line no-unused-vars
                //     success: function(jsondata){
                //         // eslint-disable-next-line no-console
                //         console.log(jsondata)
                //     }
                // })

                // eslint-disable-next-line no-undef
                // $.post( 'http://' + this.ip + ':' + this.puerto + '/?status=Apagar', { name: "John", time: "2pm" } );


                // this.axios({
                //     method: 'POST',
                //     url: 'http://190.121.193.3:8888',
                //     headers: {
                //         'Content-Type': 'text/plain'
                //     },
                //     data: {
                //         status: 'Apagar'
                //     }
                // })

                // var formElement = document.getElementById('form_apagar')
                // var request = new XMLHttpRequest();
                // request.open("POST", "http://190.121.193.5:8888")
                // request.send(new FormData(formElement))

            }
        },
        mounted(){

            this.$root.$on("encender_sirena", () => {
				this.encender();
            });

            this.$root.$on("intermitente_sirena", () => {
				this.intermitente();
            });

            this.$root.$on("apagar_sirena", () => {
				this.apagar();
            });
            
        },
       
    }
</script>