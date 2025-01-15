<template>
	<v-form :disabled="disabled" lazy-validation ref="contributionForm">
		<v-row :no-gutters="multiple">
			<v-col cols="12" :sm="multiple ? false : 6">
				<quick-date-picker
					:block="!multiple"
					flat
					:disabled="disabled"
					v-model="content.date"
					:months="months"
					:labels="$root.lang().datepicker"
					style="margin-left: auto; margin-right: auto"
				/>
			</v-col>
			<v-col cols="12" :sm="multiple ? false : 6">
				<div class="font-weight-medium text--secondary my-2">
					{{ $root.lang("database.subtitles.pack") }}
				</div>
				<v-select
					class="mt-0 pt-0 mb-2"
					hide-details
					required
					:items="content.packs"
					item-text="label"
					item-value="value"
					v-model="content.pack"
				/>
				<div class="font-weight-medium text--secondary my-2">
					{{ $root.lang("database.labels.texture_id") }}
				</div>
				<multi-range-input
					v-if="multiple && Array.isArray(content.texture)"
					v-model="content.texture"
					:disabled="disabled"
					:multiple="multiple"
					:labels="$root.lang('database.labels.id_field_errors', true)"
				/>
				<div class="d-flex align-center mb-2" v-else>
					<v-text-field
						required
						dense
						type="number"
						hide-details
						class="mr-2 my-0 pt-0"
						min="0"
						v-model="content.texture"
					/>
					<v-btn icon @click="incrementTextureID">
						<v-icon>mdi-chevron-up</v-icon>
					</v-btn>
					<v-btn icon @click="decrementTextureID">
						<v-icon>mdi-chevron-down</v-icon>
					</v-btn>
				</div>
				<div class="font-weight-medium text--secondary mb-2">
					{{ $root.lang().database.titles.contributors }}
				</div>
				<user-select
					dense
					:users="contributors"
					v-model="content.authors"
					class="my-0"
					:limit="3"
					:placeholder="$root.lang().database.labels.one_contributor"
					:error-messages="
						content.length === 0 ? [$root.lang('database.subtitles.no_contributor_yet')] : []
					"
					@newUsers="(l) => this.$emit('newUser', l) "
				/>
			</v-col>
		</v-row>
	</v-form>
</template>

<script>
import moment from "moment";

import UserSelect from "@components/user-select.vue";
import QuickDatePicker from "@components/quick-date-picker.vue";
import MultiRangeInput from "@components/multi-range-input.vue";

export default {
	name: "contribution-form",
	components: {
		UserSelect,
		QuickDatePicker,
		MultiRangeInput,
	},
	props: {
		contributors: {
			required: true,
			type: Array,
		},
		value: {
			required: true,
		},
		disabled: {
			type: Boolean,
			required: false,
			default: () => false,
		},
		multiple: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			content: this.value,
			months: moment.monthsShort(),
		};
	},
	methods: {
		incrementTextureID() {
			const incremented = Number(this.content.texture) + 1;
			this.content.texture = String(incremented);
		},
		decrementTextureID() {
			const decremented = Number(this.content.texture) - 1;
			// min zero
			this.content.texture = String(Math.max(decremented, 0));
		},
	},
	watch: {
		value: {
			handler(n, o) {
				if (n !== undefined && JSON.stringify(n) !== JSON.stringify(o)) this.content = n;
			},
			immediate: true,
			deep: true,
		},
		content: {
			handler(n) {
				this.$emit("input", n);
			},
			deep: true,
		},
	},
};
</script>
