<template>
	<div
		:class="modal ? 'gallery-dialog-texture' : undefined"
		:style="exists ? {} : { background: 'rgba(0,0,0,0.3)' }"
	>
		<!-- send click events back to caller -->
		<gallery-animation
			v-if="exists && hasAnimation"
			class="gallery-texture-image"
			:src="imageURL"
			:mcmeta="animation"
			:isTiled="imageURL.includes('_flow')"
			@click="$emit('click')"
		/>
		<img
			v-if="exists"
			class="gallery-texture-image"
			ref="imageRef"
			:style="{ 
				aspectRatio: 1, 
				opacity: hasAnimation ? 0 : 1 // allow the texture to be copied even if animation is present
			}"
			@error="textureNotFound"
			@click="$emit('click')"
			:src="imageURL"
			lazy-src="https://database.faithfulpack.net/images/bot/loading.gif"
		/>
		<div v-else class="not-done">
			<span style="height: 100%" />
			<!-- no idea why this div is needed but it is -->
			<div>
				<slot />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
/* global settings */
import axios from "axios";

import GalleryAnimation from "./gallery-animation.vue";

// separate component to track state more easily
export default {
	name: "gallery-image", 
	components: {
		GalleryAnimation,
	},
	props: {
		src: {
			type: String,
			required: true,
		},
		textureID: {
			type: String,
			required: true,
		},
		modal: {
			type: Boolean,
			required: false,
			default: false,
		},
		// saves a request on every gallery image to provide it once
		ignoreList: {
			type: Array as () => string[],
			required: false,
			default: () => [],
		},
	},
	data() {
		return {
			exists: true,
			imageURL: this.src,
			imageRef: null as HTMLImageElement | null,
			hasAnimation: false,
			animation: {},
		};
	},
	methods: {
		textureNotFound() {
			if (this.ignoreList.some((el) => this.src.includes(el)))
				// fall back to default if ignored (simulates default behavior)
				this.imageURL = `${this.$root.apiURL}/textures/${this.textureID}/url/default/latest`;
			// if not ignored, texture hasn't been made
			else this.exists = false;
		},
		async fetchAnimation() {
			try {
				const res = await axios.get(`${this.imageURL}.mcmeta`);

				this.hasAnimation = true;
				this.animation = res.data;
			} catch {
				this.hasAnimation = false;
			}
		},
	},
	created() {
		const image = new Image() as HTMLImageElement;
		image.src = this.src;

		image.onload = () => {
			// avoid (almost all) unnecessary requests
			// and make sure the image is square
			if (image.height % image.width === 0 && image.height !== image.width) {
				this.fetchAnimation();
			}
		};
		image.onerror = () => {
			this.textureNotFound();
		};
	},
};
</script>
