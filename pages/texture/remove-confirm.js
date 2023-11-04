/* global axios, TwinBcrypt */

export default {
	name: "remove-confirm",
	template: `
  <v-dialog
      v-model="confirm"
      content-class="colored"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline">Confirm deletion</v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation>
            <p>Do you want to delete this {{ type }}?</p>
            <v-alert v-if="type == 'use'" type="warning" class="px-2" outlined dense>
              {{ $root.lang('database.messages.deleting_use_will_delete_paths') }}
            </v-alert>
            <blockquote v-if="type == 'use'">
              <v-btn
                text
                @click="getPaths(data.id)"
              >
                See affected paths
              </v-btn>

              <br>

              <v-list-item
                v-for="(path, index) in data.paths"
                :key="index"
              >
                <v-list-item-title>
                  {{ path.name }}
                  <v-list-item-subtitle v-text="'#' + path.id + ' — ' + path.versions.join(', ')"></v-list-item-subtitle>
                </v-list-item-title>
              </v-list-item>
            </blockquote>
            <ul v-else>
              <template v-for="(key, index) in Object.keys(data).sort()">
                <li v-if="typeof data[key] === 'string' || Array.isArray(data[key])" :key="index">
                  {{ key }} : {{ Array.isArray(data[key]) ? JSON.stringify(data[key]) : data[key] }}
                </li>
              </template>
            </ul>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="darken-1"
            text
            @click="disableDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error darken-1"
            @click="deleteData"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  `,
	props: {
		confirm: {
			type: Boolean,
			required: true,
		},
		data: {
			type: Object,
			required: true,
		},
		disableDialog: {
			type: Function,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		onSubmit: {
			type: Function,
			default: function () {
				return Promise.resolve();
			},
		},
	},
	data() {
		return {
			formData: {},
			deletePaths: true,
			paths: {},
		};
	},
	methods: {
		getPaths: function (useID) {
			axios
				.get(`${this.$root.apiURL}/uses/${useID}/paths`, this.$root.apiOptions)
				.then((res) => {
					const temp = res.data;
					this.data.paths = {};

					for (let i = 0; i < temp.length; i++) {
						this.data.paths[temp[i].id] = temp[i];
					}

					this.$forceUpdate();
				})
				.catch(function (err) {
					console.error(err);
				});
		},
		deleteData: function () {
			if (this.type === "use") {
				const useId = this.data.id;
				axios
					.delete(`${this.$root.apiURL}/uses/${useId}`, this.$root.apiOptions)
					.then(() => {
						this.$root.showSnackBar(this.$root.lang().global.ends_success, "success");
						this.disableDialog(true);
					})
					.catch((err) => {
						console.error(err);
						this.$root.showSnackBar(err, "error");
						this.disableDialog(true);
					});
				return;
			} else if (this.type === "path") {
				let pathId = this.data.id;
				axios
					.delete(`${this.$root.apiURL}/paths/${pathId}`, this.$root.apiOptions)
					.then(() => {
						this.$root.showSnackBar(this.$root.lang().global.ends_success, "success");
						this.disableDialog(true);
					})
					.catch((err) => {
						console.error(err);
						this.$root.showSnackBar(err, "error");
						this.disableDialog(true);
					});
			} else if (this.type === "texture") {
				this.onSubmit(this.data)
					.then(() => {
						this.disableDialog(true);
					})
					.catch((err) => {
						console.error(err);
						this.$root.showSnackBar(err, "error");
					});
			}
		},
	},
};
