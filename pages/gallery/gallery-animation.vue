<script lang="ts">
import { defineComponent } from 'vue';

interface AnimationFrame {
	index: number;
	time: number;
}

interface Animation {
	frames?: (number | AnimationFrame)[];
	frametime?: number;
	interpolate?: boolean;
}

export default defineComponent({
	name: 'AnimationCanvas',
	props: {
		src: { type: String, required: true },
		mcmeta: { type: Object as () => { animation?: Animation }, default: () => ({ animation: {} }) },
		isTiled: { type: Boolean, default: false },
	},
	data() {
		return {
			canvasRef: null as HTMLCanvasElement | null,
			image: null as HTMLImageElement | null,
			sprites: [] as AnimationFrame[],
			frames: {} as Record<number, [AnimationFrame, number][]>,
			currentTick: 1,
			tickingRef: null as ReturnType<typeof setInterval> | null,
		};
	},
	methods: {
		loadImage() {
			const img = new Image();
			img.setAttribute('crossorigin', 'anonymous');
			img.src = this.src;

			img.onload = () => {
				this.image = img;
				this.tickingRef = setInterval(() => {}, 1000 / 20);
			};

			img.onerror = () => {
				this.image = null;
				if (this.tickingRef) {
					clearInterval(this.tickingRef);
					this.tickingRef = null;
				}
			};
		},
		calculateFrames() {
			if (!this.image || !this.mcmeta) return;

			const animation = this.mcmeta.animation ?? {};
			const animationFrames: AnimationFrame[] = [];

			if (animation.frames) {
				for (const frame of animation.frames) {
					if (typeof frame === 'object') {
						animationFrames.push({ index: frame.index, time: Math.max(frame.time, 1) });
					} else {
						animationFrames.push({ index: frame, time: animation.frametime ?? 1 });
					}
				}
			} else {
				const framesCount = this.isTiled
					? this.image.height / 2 / (this.image.width / 2)
					: this.image.height / this.image.width;
				for (let fi = 0; fi < framesCount; fi++) {
					animationFrames.push({ index: fi, time: animation.frametime ?? 1 });
				}
			}

			const framesToPlay: Record<number, [AnimationFrame, number][]> = {};
			let ticks = 1;
			animationFrames.forEach((frame, index) => {
				for (let t = 1; t <= frame.time; t++) {
					framesToPlay[ticks] = [[frame, 1]];

					if (animation.interpolate) {
						const nextFrame = animationFrames[index + 1] ?? animationFrames[0];
						framesToPlay[ticks]?.push([nextFrame, t / nextFrame.time]);
					}

					ticks++;
				}
			});

			this.sprites = animationFrames;
			this.frames = framesToPlay;
		},
		updateCanvas() {
			if (Object.keys(this.frames).length === 0) return;

			setTimeout(() => {
				let next = this.currentTick + 1;
				if (this.frames[next] === undefined) next = 1;
				this.currentTick = next;

				this.updateCanvas();
			}, 1000 / 20);
		},
		drawFrame() {
			if (Object.keys(this.frames).length === 0) return;

			const framesToDraw = this.frames[this.currentTick];
			const canvas = this.$refs.canvasRef as HTMLCanvasElement;
			const context = canvas?.getContext('2d');

			if (!canvas || !context || !this.image || !framesToDraw) return;

			canvas.style.width = '100%';
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetWidth;

			const padding = this.isTiled ? this.image.width / 4 : 0;
			const width = this.isTiled ? this.image.width / 2 : this.image.width;

			context.clearRect(0, 0, width, width);
			context.globalAlpha = 1;
			context.imageSmoothingEnabled = false;

			for (const frame of framesToDraw) {
				const [data, alpha] = frame;
				context.globalAlpha = alpha;

				context.drawImage(
					this.image,
					padding,
					padding + (width * data.index) * (this.isTiled ? 2 : 1),
					width,
					width,
					0,
					0,
					canvas.width,
					canvas.width
				);
			}
		},
	},
	watch: {
		src: 'loadImage',
		mcmeta: 'calculateFrames',
		image: 'calculateFrames',
		currentTick: 'drawFrame',
		frames: 'updateCanvas',
	},
	mounted() {
		this.loadImage();
	},
});
</script>

<template>
	<canvas ref="canvasRef"></canvas>
</template>
