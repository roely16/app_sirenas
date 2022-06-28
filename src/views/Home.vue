<template>
	<div>
		<b-row align-v="center" class="mt-2 mb-2">
			<b-col>
				<h6 class="text-secondary">Corredores</h6>
			</b-col>
		</b-row>
		<b-row align-v="center">
			<b-col class="mb-4">
				<acciones-corredor></acciones-corredor>
			</b-col>
			<b-col class="mb-4" cols="12" md="4" lg="4" sm="6">
				<b-input-group>
					<template #append>
							<b-input-group-text>
								<font-awesome-icon icon="search" />
							</b-input-group-text>
						</template>
					<b-form-input size="lg" placeholder="Buscar..."></b-form-input>
				</b-input-group>
				
			</b-col>
		</b-row>
		<hr class="mt-0">
		<b-row>
			<b-col cols="12">
				<lista-corredores></lista-corredores>
			</b-col>
		</b-row>
	</div>
</template>

<script>

import ListaCorredores from '@/components/ListaCorredores'
import AccionesCorredor from '@/components/AccionesCorredor'

export default {
	name: 'home',
	components: {
		'lista-corredores': ListaCorredores,
		'acciones-corredor': AccionesCorredor
	}
}
</script>
