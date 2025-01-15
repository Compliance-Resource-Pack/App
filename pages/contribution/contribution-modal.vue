<template>
	<modal-form
		v-model="modalOpened"
		:title="$root.lang().database.titles.contributions"
		max-width="800"
		@close="closeAndCancel"
		@submit="closeOrAndSubmit"
	>
		<v-row dense v-if="multiple">
			<v-col class="flex-grow-0 flex-shrink-1" :cols="$vuetify.breakpoint.mdAndUp ? false : 12">
				<contribution-form
					:value="activeForm"
					@input="onFormInput"
					:disabled="activeForm === undefined"
					:contributors="contributors"
					:multiple="multiple"
				/>
			</v-col>
			<v-col
				:class="[
					$vuetify.breakpoint.mdAndUp
						? 'flex-grow-0 flex-shrink-1 px-4'
						: 'flex-grow-1 flex-shrink-0 py-4',
				]"
			>
				<v-divider :vertical="$vuetify.breakpoint.mdAndUp" />
			</v-col>
			<v-col
				class="flex-grow-1 flex-shrink-0 d-flex flex-column"
				:cols="$vuetify.breakpoint.mdAndUp ? false : 12"
			>
				<div class="font-weight-medium text--secondary mb-2">
					{{ $root.lang("database.titles.contributions") }}
				</div>
				<v-list
					id="contribution-form-list"
					dense
					flat
					style="min-height: 300px"
					class="pt-0 mb-4 flex-grow-1 flex-shrink-0"
				>
					<div>
						<template v-for="(form, formIndex) in formRecordsList">
							<v-list-item
								:key="`item-${form.formId}`"
								class="pl-0"
								@click.stop.prevent="() => changeOpenedForm(form.formId)"
							>
								<v-list-item-content :class="[openedFormId === form.formId ? 'primary--text' : '']">
									<v-list-item-title>{{ panelLabels[form.formId] }}</v-list-item-title>
									<v-list-item-subtitle class="text-truncate">
										<span v-if="form.authors.length">
											{{ formAuthorNames[form.formId] || '...' }}
										</span>
										<i v-else>{{ $root.lang("database.subtitles.no_contributor_yet") }}</i>
									</v-list-item-subtitle>
									<v-list-item-subtitle v-if="form.texture && form.texture.length">
										<v-chip
											class="mr-1 px-2"
											x-small
											v-for="range in form.texture"
											:key="Array.isArray(range) ? range.join() : String(range)"
										>
											{{ "#" + (Array.isArray(range) ? range.join(" — #") : String(range)) }}
										</v-chip>
									</v-list-item-subtitle>
								</v-list-item-content>

								<v-list-item-action v-if="formIndex > 0">
									<v-icon
										@click.stop.prevent="() => removeForm(form.formId)"
										:color="openedFormId === form.formId ? 'primary' : ''"
									>
										mdi-delete
									</v-icon>
								</v-list-item-action>
							</v-list-item>

							<v-divider :key="`divider-${form.formId}`" v-if="formIndex < formRecordsLength - 1" />
						</template>
					</div>
				</v-list>
				<v-btn
					class="flex-grow-0 flex-shrink-1"
					elevation="0"
					block
					@click.stop.prevent="addNewForm"
				>
					{{
						$root.lang(
							`database.subtitles.${openedFormId ? "clone_contribution" : "add_new_contribution"}`,
						)
					}}
				</v-btn>
			</v-col>
		</v-row>
		<contribution-form
			v-else
			:value="activeForm"
			@input="onFormInput"
			:disabled="activeForm === undefined"
			:contributors="contributors"
			:multiple="multiple"
			@newUser="
				(l) => {
					this.contributors = l;
				}
			"
		/>
	</modal-form>
</template>

<script>
import axios from "axios";
import moment from "moment";

import ModalForm from "@components/modal-form.vue";
import ContributionForm from "./contribution-form.vue";

export default {
	name: "contribution-modal",
	components: {
		ModalForm,
		ContributionForm,
	},
	props: {
		contributors: {
			required: true,
			type: Array,
		},
		onCancel: {
			required: false,
			type: Function,
			default() {},
		},
		onSubmit: {
			required: false,
			type: Function,
			default() {},
		},
		multiple: {
			required: false,
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			modalOpened: false,
			closeOnSubmit: true,
			formRecords: {},
			formAuthorNames: {},
			packsList: [],
			openedFormId: undefined,
		};
	},
	computed: {
		activeForm() {
			if (this.openedFormId === undefined) return undefined;

			const formObj = this.formRecords[this.openedFormId];
			if (formObj === undefined) return undefined;

			const res = JSON.parse(JSON.stringify(formObj));
			return res;
		},
		formRecordsList() {
			return Object.values(this.formRecords);
		},
		formRecordsLength() {
			return this.formRecordsList.length;
		},
		formRecordsAuthors() {
			return Object.entries(this.formRecords).map(([formID, form]) => ([ formID, form.authors ]));
		},
		panelLabels() {
			const acc = {};
			for (const formID of Object.keys(this.formRecords)) {
				const form = this.formRecords[formID];
				acc[formID] = `${this.formatPack(form.pack)} • ${moment(new Date(form.date)).format("ll")}`;
			}
			return acc;
		}
	},
	watch: {
		formRecordsAuthors: {
			handler(formEntriesAuthorIds) {
				Promise.all(formEntriesAuthorIds.map(async ([formID, formAuthorsIDs]) => [
						formID, await this.contributorsFromIds(formAuthorsIDs)
				])).then((allAuthorNames) => {
					this.formAuthorNames = allAuthorNames.reduce((acc, [formID, formAuthorNames]) => {
						acc[formID] = formAuthorNames;
						return acc;
					}, {});
				})
			},
			deep: true
		}
	},
	methods: {
		addNewForm() {
			// create new form
			let form;

			// match last opened form
			if (this.openedFormId !== undefined) {
				// make a copy
				const newFormId = this.getNewFormId();
				form = JSON.parse(JSON.stringify(this.formRecords[this.openedFormId]));
				form.formId = newFormId;
			} else {
				form = this.defaultValue(this.packsList);
			}

			// add form
			let newFormId = form.formId;
			this.$set(this.formRecords, newFormId, form);

			// make the opened form our created form
			this.openedFormId = newFormId;
		},
		formatPack(packId) {
			return this.packsList.find((v) => v.value === packId)?.label || packId;
		},
		open(inputDataObj, inputPacksList, closeOnSubmit = true) {
			this.packsList = inputPacksList;
			this.modalOpened = true;
			this.openedFormId = undefined;

			let createdFormObj;
			if (inputDataObj !== undefined) {
				createdFormObj = Object.assign({}, this.defaultValue(inputPacksList), inputDataObj);
			} else {
				// get one empty form
				createdFormObj = this.defaultValue(inputPacksList);
			}

			this.$set(this, "formRecords", {
				[createdFormObj.formId]: createdFormObj,
			});
			this.openedFormId = createdFormObj.formId;
			this.closeOnSubmit = !!closeOnSubmit;
		},
		async contributorsFromIds(authorIds) {
			if (!authorIds || authorIds.length === 0) return "";

			const total = authorIds.length;

			const alreadyAuthors = this.contributors.filter((c) => authorIds.includes(c.id));
			const alreadyAuthorsIds = alreadyAuthors.map(c => c.id);
			const notAlreadyAuthorsIds = authorIds.filter((id) => !alreadyAuthorsIds.includes(id));
			const searchIDsparam = notAlreadyAuthorsIds.join(',')
			const notAlreadyAuthorsFound = (!searchIDsparam) ? [] :
				await axios.get(`${this.$root.apiURL}/users/${searchIDsparam}`)
					.then((res) => res.data)
					.then((data) => Array.isArray(data) ? data : [data]);

			const allAuthorsFound = Array.from(new Set([...alreadyAuthors, ...notAlreadyAuthorsFound]));
			const anonymousTotal = allAuthorsFound.filter(a => !a.username).length;
			const notAnonymous = allAuthorsFound.filter(a => !!a.username);
			const notAnonymousNames = notAnonymous.map(user => user.username);
			let allNames = notAnonymousNames;

			if (anonymousTotal > 0) {
				const anonymousStr = `${anonymousTotal} ${this.$root.lang("database.labels.anonymous")}`;
				allNames.splice(0, 0, anonymousStr); // insert first anonymous
			}

			allNames = Array.from(new Set(allNames));
			return `[${total}]: ${allNames.join(", ")}`;
		},
		changeOpenedForm(formId) {
			if (this.openedFormId === formId) this.openedFormId = undefined;
			else this.openedFormId = formId;
		},
		close() {
			this.modalOpened = false;
		},
		closeAndCancel() {
			this.close();
			this.onCancel();
		},
		async closeOrAndSubmit() {
			const resultDataList = Object.values(this.formRecords).map((f) => {
				delete f.formId;
				return f;
			});

			const dataPurified = JSON.parse(
				JSON.stringify(this.multiple ? resultDataList : resultDataList[0]),
			);

			const wentWell = await this.onSubmit(dataPurified);

			if (!wentWell) return; // do not close some data may be incorrect or one contribution failed to be sent

			if (this.closeOnSubmit) this.modalOpened = false;
		},
		defaultValue(packList) {
			return {
				date: new Date(new Date().setHours(0, 0, 0, 0)),
				packs: packList,
				pack: packList ? packList[0].value : null,
				texture: this.multiple ? [] : 0,
				authors: [],
				formId: this.getNewFormId(),
			};
		},
		getNewFormId() {
			return crypto.randomUUID();
		},
		onFormInput(form) {
			// stop undefined object
			if (typeof form !== "object") return;
			// stop non-form objects
			if (!("formId" in form)) return;

			form = JSON.parse(JSON.stringify(form));

			// stop fake forms
			const formId = form.formId;
			if (!this.formRecords[formId]) return;

			// now affect
			this.$set(this.formRecords, formId, form);
		},
		removeForm(formId) {
			// do not continue if not found
			if (!this.formRecords[formId]) return;

			const formIdList = Object.keys(this.formRecords);

			// do not delete if only one
			if (formIdList.length === 1) return;

			// decide who will be the next form
			const formIndex = formIdList.indexOf(formId);
			const nextFormIndex = (formIndex + 1) % formIdList.length;
			const nextFormId = formIdList[nextFormIndex];
			this.openedFormId = nextFormId;

			const newFormRecords = Object.assign({}, this.formRecords); // clean
			delete newFormRecords[formId]; // delete
			this.$set(this, "formRecords", newFormRecords); // affect
		},
	},
};
</script>
