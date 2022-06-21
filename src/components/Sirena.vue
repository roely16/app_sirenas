<template>
	<div>
		<b-card bg-variant="light">
			<b-row align-v="center" class="mb-2">
				<b-col cols="12">
					<b-card-title class="mb-0">
						<!-- <font-awesome-icon size="xs" color="green" icon="circle" /> -->
						{{ identificador }}
					</b-card-title>
				</b-col>
			</b-row>

			<b-card-sub-title class="mb-2">
				{{ direccion }}
				<br />
				{{ ip }}
			</b-card-sub-title>

			

			<b-row class="mt-4">
				<b-col>
				<b-button variant="primary" @click="accionar(corredor.ENCENDER, 'Encendiendo...', 'Encendida')">
					<font-awesome-icon icon="play" />
				</b-button>

				<b-button class="ml-2" variant="warning" @click="accionar(corredor.INTERMITENTE, 'Encendiendo (Intermitente)...', 'Encendida (Intermitente)')">
					<font-awesome-icon icon="exclamation-triangle" />
				</b-button>

				<b-button class="ml-2" variant="danger" @click="accionar(corredor.APAGAR, 'Apagando...', 'Apagada')">
					<font-awesome-icon icon="stop" />
				</b-button>
				</b-col>
			</b-row>

			<div v-if="corredor.PANEL_CONTROL" class="mt-2">
				<a :href="'http://' + ip + ':8888'">Panel de Control</a>
			</div>

			<template v-slot:footer>
				<b-row align-v="center">
					<b-col cols="10">
						<strong :class="text_color" v-if="estado">
							Estado:
							<span class="primary">{{ estado }}</span>
						</strong>
					</b-col>
					<b-col cols="2">
						<b-spinner
							variant="secondary"
							small
							type="grow"
							label="Spinning"
							v-if="loading"
						></b-spinner>
					</b-col>
				</b-row>
			</template>
		</b-card>
	</div>
</template>

<style scoped>
    .map {
        height: 400px;
        width: 100%;
    }
</style>

<script>

    import axios from 'axios'

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
            },
            data: Object,
            corredor: Object
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
                text_color: '',
                mounted: false
            }
        },
        methods: {
            encender(){

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
                    method: 'POST',
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

            },
            accionar(accion, mensaje, success){

                this.estado = mensaje
                this.loading = true
                this.text_color = 'text-danger'

                let self = this
                
                if (!this.corredor.BACKEND_ACTIVATION) {
                    
                    const url = 'http://' + this.data.IP + ':' + this.data.PUERTO

                    var details = {
                        'submit': accion,
                    };

                    var formBody = [];

                    for (var property in details) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(details[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                    }
                    
                    formBody = formBody.join("&");

                    fetch(url, {
                        method: 'POST',
                        mode: 'no-cors',
                        body: formBody,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        }
                    })
                    .then(function(response) {
                        return response;
                    })
                    .then(function(myJson) {
                        // eslint-disable-next-line no-console
                        console.log(myJson);

                        self.loading = false
                        self.estado = success
                    })
                    .catch(function(error){
                        // eslint-disable-next-line no-console
                        console.log(error)
                        this.estado = 'Error de conexión'
                        this.text_color = 'text-danger'
                        this.loading = false
                    });

                    return

                }

                axios.post(process.env.VUE_APP_API_URL, {
					name: this.corredor.FUNCION_ACTIVACION,
					param: {
						corredor: this.corredor,
                        sirena: this.data,
                        accion: accion
					}
				}).then((response) => {

                    if (response.data.response.result.status == 100) {
                        
                        this.estado = 'Error de conexión'
                        this.text_color = 'text-danger'
                        this.loading = false

                        return 

                    }

                    self.loading = false
                    self.estado = success

				})

            }
        },
        mounted(){

            this.mounted = true

            this.$root.$on("accionar_sirena", (value) => {
                if (this.mounted) {
                    this.accionar(value.accion, value.mensaje)
                }
            })
            
        },
        beforeDestroy(){

            this.mounted = false


        }
       
    }
</script>