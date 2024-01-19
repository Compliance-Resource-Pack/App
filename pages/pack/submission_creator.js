export default {
  name: "submission-creator",
  template: `
    <v-dialog
      v-model="dialog"
      content-class="colored"
      max-width="800"
    >
      <v-card>
        <v-card-title class="headline" v-text="submissionTitle"></v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="formValid" lazy-validation>
            <v-text-field
              :color="color"
              v-if="!first"
              persistent-hint
              :hint="$root.lang().database.hints.pack_id_editing"
              v-model="formData.id"
              :label="$root.lang().database.labels.pack_id" />
            <v-select
              :color="color"
              :item-color="color"
              required
              :hint="$root.lang().database.hints.pack_reference"
              v-model="formData.reference"
              :items="computePacks"
              item-text="label"
              item-value="value"
              :label="$root.lang().database.labels.submission_reference">
            </v-select>
            <v-container>
              <v-row>
                <v-checkbox :color="color" v-model="formData.council_enabled" :label="$root.lang().database.labels.council_enabled"></v-checkbox>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          @click="disableDialog"
        >
          {{ $root.lang().global.btn.cancel }}
        </v-btn>
        <v-btn
          color="darken-1"
          text
          @click="send"
          :disabled="!formValid"
        >
          {{ $root.lang().global.btn.save }}
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>
  `,
  props: {
    color: {
      type: String,
      required: false,
      default: "primary",
    },
    dialog: {
      type: Boolean,
      required: true,
    },
    disableDialog: {
      type: Function,
      required: true,
    },
    data: {
      type: Object,
      required: false,
    },
    add: {
      type: Boolean,
      required: false,
      default: false,
    },
    first: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      formValid: false,
      formData: {
        id: "",
        reference: "",
        council_enabled: "",
        channels: {
          submit: "",
          council: "",
          results: "",
        },
        time_to_council: 0,
        time_to_results: 0,
        contributor_role: "",
      },
      packs: [],
    };
  },
  methods: {
    send() {
      // all pack info is added in one big request on creation so we beam it back
      if (this.first) {
        this.$emit("submissionFinished", this.formData);
        return this.disableDialog();
      }

      const requestPromise = this.add
        ? axios.post(`${this.$root.apiURL}/submissions`, this.formData, this.$root.apiOptions)
        : axios.put(
            `${this.$root.apiURL}/submissions/${this.formData.id}`,
            this.formData,
            this.$root.apiOptions,
          );

      requestPromise
        .then(() => {
          this.$root.showSnackBar(this.$root.lang().global.ends_success, "success");
          this.disableDialog(true);
        })
        .catch((err) => {
          console.error(err);
          this.$root.showSnackBar(err, "error");
        });
    },
  },
  computed: {
    submissionTitle() {
      return this.add
        ? this.$root.lang().database.titles.add_submission
        : this.$root.lang().database.titles.edit_submission;
    },
    computePacks() {
      return this.packs.map((p) => ({ label: p.name, value: p.id }));
    },
  },
  created() {
    axios.get(`${this.$root.apiURL}/packs/raw`).then((res) => {
      this.packs = Object.values(res.data);
    });
  },
  watch: {
    dialog(newValue) {
      if (newValue === true) {
        Vue.nextTick(() => {
          if (!this.first) {
            for (const [k, v] of Object.entries(this.data)) {
              if (this.formData[k] === undefined) continue;
              this.formData[k] = v;
            }
          } else {
            this.$refs.form.reset();
            if (this.data.id) this.formData.id = this.data.id;
          }
        });
      } else {
        // Fixes bug where click outside changes dialog to false but not dialogOpen to false
        this.disableDialog();
      }
      this.$emit("input", newValue);
    },
  },
};
