/**
 * This file is the template for all other languages
 */

export default {
	global: {
		name: "Faithful Web Application",
		logout: "Log Out",
		login: "Log in via Discord",
		ends_success: "Completed successfully",
		loading: "Loading, please wait…",
		no_results: "No results were found",
		nyi: "Not yet implemented.",
		snackbar_system_theme: {
			sentence: "System theme changed to %s",
			themes: {
				light: "light",
				dark: "dark",
			},
		},
		btn: {
			add: "Add",
			add_download: "Add Download",
			submit: "Submit",
			submit_and_approve: "Submit and approve",
			cancel: "Cancel",
			close: "Close",
			save: "Save",
			edit: "Edit",
			delete: "Delete",
			ok: "OK",
			yes: "Yes",
			deny: "Deny",
			approve: "Approve",
			archive: "Archive",
			load_more: "Load More",
			discard: "Discard",
			confirm: "Confirm",
			publish: "Publish",
		},
		tabs: {
			general: {
				title: "general",
				subtabs: {
					dashboard: "dashboard",
					profile: "profile",
					statistics: "statistics",
					gallery: "gallery",
				},
			},
			addons: {
				title: "add-ons",
				subtabs: {
					submissions: "submissions",
					upload: "upload",
				},
			},
			review: {
				title: "reviews",
				subtabs: {
					addons: "add-ons",
					translations: "translations",
				},
			},
			posts: {
				title: "posts",
				subtabs: {
					list: "list",
					create: "create",
				},
			},
			database: {
				title: "database",
				subtabs: {
					contributions: "contributions",
					users: "users",
					textures: "textures",
					packs: "packs",
					files: "files",
					mods: "mods",
					modpacks: "modpacks",
					settings: "settings",
				},
			},
		},
		months: {
			jan: "Jan",
			january: "January",
			feb: "Feb",
			february: "February",
			mar: "Mar",
			march: "March",
			apr: "Apr",
			april: "April",
			may_: "May", // longer
			may: "May",
			jun: "Jun",
			june: "June",
			jul: "Jul",
			july: "July",
			aug: "Aug",
			august: "August",
			sep: "Sep",
			september: "September",
			oct: "Oct",
			october: "October",
			nov: "Nov",
			november: "November",
			dec: "Dec",
			december: "December",
		},
	},
	database: {
		titles: {
			contributions: "Contributions",
			contributors: "Contributors",
			textures: "Textures",
			users: "Users",
			packs: "Packs",
			add_user: "Add new user",
			add_textures: "Add new textures",
			add_texture: "Add new texture",
			add_pack: "Add new pack",
			change_pack: "Edit pack",
			add_submission: "Add submission information",
			edit_submission: "Edit submission information",
			add_use: "Add new use",
			add_path: "Add new path",
			add_mc_version: "Add new Minecraft version",
			change_path: "Edit path",
			change_use: "Edit use",
			change_texture: "Edit texture",
			change_user: "Edit user",
			change_mc_version: "Modify a Minecraft version",
			confirm_deletion: "Confirm deletion",
		},
		subtitles: {
			add_manually: "Add manually",
			add_new_contribution: "Add a new contribution",
			clone_contribution: "Clone the contribution",
			no_contributor_yet: "No contributor yet",
			pack: "Resource Pack",
			submissions: "Submission information",
			github: "GitHub",
			resource_packs: "Filter by pack",
			channels: "Discord channels",
			user: "User",
			select_user_role: "Filter by role",
			search: "Search",
			texture_result: "Texture results",
			pack_result: "Pack results",
			user_result: "User results",
			contribution_result: "Contribution results",
			import_json_data: "Import JSON data",
			uses: "Uses",
			paths: "Paths",
		},
		labels: {
			copy_json_data: "Copied JSON data to clipboard",
			anonymous: "Anonymous",
			anonymous_explain:
				"If checked, the user's name will be displayed as \"Anonymous\" and their skin won't show up. Can only be changed by managers!",
			mcmeta: "Animated",
			new_mc_version_edition: "New version edition",
			new_mc_version_path: "Clone an existing version as a template",
			new_mc_version_name: "New version name",
			nameless: "Nameless",
			tagless: "No tags added",
			add_textures_success: "Added texture(s) successfully",
			add_version_success: "Added version successfully",
			add_new_user: "Add new user",
			add_new_pack: "Add new pack",
			add_new_texture: "Add new texture",
			add_new_path: "Add new path",
			add_new_use: "Add new use",
			add_edition_use: "Add automatic %edition% use",
			add_texture: "Add new textures",
			add_mc_version: "Add new Minecraft Version",
			ask_deletion: "Do you want to delete %s (%d)?",
			ask_submission_deletion: "Do you want to delete submission information for %s (%d)?",
			close_on_submit: "Close on submit",
			clear_on_save: "Clear on save",
			user_role: "User roles",
			discord_id: "Discord ID",
			pack_id: "Pack ID",
			pack_name: "Pack name",
			pack_tags: "Pack tags",
			pack_resolution: "Pack resolution",
			pack_logo: "Pack logo URL",
			council_enabled: "Enable council",
			contributor_role: "Contributor role ID",
			time_to_results: "Time to results",
			time_to_council: "Time to council",
			channels: {
				submit: "Submission channel",
				council: "Council channel",
				results: "Results channel",
			},
			github_org: "Organization",
			github_repo: "Repository",
			submission_reference: "Reference pack",
			edit_submission: "Edit submission information",
			invalid_url: "This URL is not valid",
			new_submission: "Enable submissions",
			edit_mc_version: "Modify a Minecraft version",
			one_contributor: "Select at least one contributor",
			select_user: "Select user(s)",
			parse_json: "Parse JSON to data",
			search_contributions: "Search contributions",
			search_username: "Search username",
			search_texture: "Search texture name",
			search_pack: "Search packs",
			select_texture_tag: "Filter by tag",
			select_pack_tag: "Filter by tag",
			username: "Username",
			uuid: "Minecraft profile UUID",
			texture_name: "Texture name",
			texture_tags: "Texture tags",
			texture_id: "Texture ID",
			texture_uses: "Texture uses",
			use_name: "Use name",
			use_id: "Use ID",
			use_edition: "Use edition",
			path: "Path",
			path_id: "Path ID",
			versions: "Versions",
			no_path_found: "No paths found for this use.",
			no_use_found: "No uses found for this texture.",
			current_mc_version: "Current MC Version",
			new_mc_version: "New MC Version",
			id_field_errors: {
				one_required: "At least one texture ID or an ID range is required",
				incorrect_value: "Incorrect texture %value% ID or ID range",
			},
			use_singular: "Use",
			use_plural: "Uses",
			path_singular: "Path",
			path_plural: "Paths",
		},
		hints: {
			pack_id_creation: "A Pack ID can either be manually specified or automatically generated.",
			pack_id_editing: "Changing a pack ID can break everything!",
			pack_reference: "Pack to compare against in submission embeds.",
			submission_timings: "Delays are measured in days.",
			github_required: "An edition can be left blank if it's not yet supported.",
			channel_ids: "Enable Developer Mode and right click on a channel to get channel IDs.",
			texture_id: "Changing the texture ID can break everything!",
			use_id: "Changing the use ID can break everything!",
			path_id: "Changing the path ID can break everything!",
			path_prefill: "Enter this first to generate most fields!",
			path: "The path should start from the root directory (ex: assets/…)",
			example_scenario:
				"Changes all instances of a Minecraft version in the database to a different one. (ex. 1.17 → 1.17.1)",
			example_scenario_warn: "Please don't forget to update all GitHub branch names as well!",
		},
		messages: {
			deleting_use_will_delete_paths: "Deleting the use will also delete all its paths.",
		},
	},
	review: {
		titles: {
			addons: "Review add-ons",
			translation: "Review translations",
			pending: "Pending Approval",
			denied: "Denied",
			approved: "Approved",
			archived: "Archived",
		},
		deny_window: {
			title: "Deny add-on",
			label: "Write a reason…",
			rule: "Any reason can be given",
		},
		labels: {
			pending: "There are currently no pending add-ons!",
			denied: "There are currently no denied add-ons!",
			archived: "There are currently no archived add-ons!",
			approved: "There are current no approved add-ons!",
			load_approved: "Load approved add-ons",
		},
		addon: {
			titles: {
				authors: "Author(s)",
				description: "Description",
				links: "Links",
				options: "Options",
			},
			labels: {
				link: "Link",
				optifine: "OptiFine",
				approved_by: "Approved by",
				denied_by: "Denied by",
				reason: "Reason",
			},
		},
	},
	addons: {
		titles: {
			submit: "Submit a new add-on",
			edit: "Edit add-on",
			submissions: "Add-on submissions",
			details: "Details",
		},
		remove: {
			title: "Confirm deletion",
			labels: {
				question: "Do you want to delete %s?",
				warning: "You can't undo this operation.",
			},
		},
		general: {
			loading_addon: "Loading add-on",
			rules: "Make sure to read the add-on rules before submitting",
			title: "General",
			name: {
				label: "Add-on name",
				hint: "A shorter name is preferred.",
				rules: {
					name_required: "A name is required.",
					name_too_big: "Add-on name must be less than %s characters.",
					name_too_small: "Add-on name must be at least %s characters long.",
					name_unavailable: "This name is already taken!",
				},
			},
			description: {
				label: "Add-on description",
				hint: "You can use Markdown formatting to improve your description!",
				rules: {
					description_required: "The description is required.",
					description_too_big: "Description must be less than %s characters.",
					description_too_small: "Description must be at least %s characters long.",
				},
			},
			embed_description: {
				label: "Embed description",
				hint: "Description seen when sharing the add-on on social media",
				rules: {
					too_big: "Embed description must be less than %s characters.",
				},
			},
			slug: {
				label: "Add-on slug",
				hint: "Changing this will break old links!",
			},
			reason: {
				title: "Update reason",
				text: "Please tell us what you updated to make reviewing your add-on easier!",
				required: "An update reason is required",
				bounds: "Update reason must be between %s and %s characters long",
			},
			authors: {
				label: "Select authors for the add-on",
				hint: "Any author can modify the add-on once it is submitted! | If you can't find anybody in the list, contact a Manager or Developer",
			},
		},
		images: {
			title: "Screenshots",
			header: {
				labels: {
					drop: "Drag and drop header image or click to upload",
					normal: "Header image",
					replace: "Replace header image",
				},
				rules: {
					image_size:
						"Image size should be less than %s KB! Use https://compressor.io/ to compress it.",
					image_ratio: "Wrong Ratio: The provided image doesn't have a 16:9 side ratio.",
					image_required: "A header image is required.",
					jpeg: "Image must be a lossy JPEG.",
				},
			},
			carousel: {
				labels: {
					drop: "Drag or click to select additional images",
					normal: "Additional image(s)",
					replace: "Replace additional image(s)",
				},
				rule: "Wrong Ratio: All images with a side ratio other than 16:9 have been removed.",
			},
		},
		options: {
			title: "Options",
			optifine: {
				label: "Requires OptiFine",
			},
			editions: {
				label: "Supported edition(s)",
				rule: "You need to select at least 1 edition.",
			},
			resolutions: {
				label: "Supported resolution(s)",
				rule: "You need to select at least 1 resolution.",
			},
		},
		downloads: {
			title: "Downloads",
			name: {
				placeholder: "CurseForge, GitHub…",
				label: "Name",
				rules: {
					name_required: "A name is required.",
					name_cannot_be_empty: "Name can't be empty.",
				},
			},
			link: {
				placeholder: "https://www.example.com/",
				label: "Link",
				rule: "URL must be valid.",
			},
		},
		status: {
			approved: "Approved",
			denied: "Denied",
			pending: "Pending",
		},
	},
	posts: {
		grid_title: "All posts",
		edit_title: "Edit post",
		new_title: "Create new post",
		status: {
			published: "Published",
			pending: "Pending",
		},
		loading: "Loading post…",
		general: {
			heading: "General",
			title: "Post title",
			permalink: "Permalink",
			permalink_placeholder: "/faithful32x/R1",
			header_img: "Header image",
			header_img_hint: "Note: This must be uploaded separately",
			date: "Post release date",
			date_placeholder: "YYYY-MM-DD",
			description: "Post description",
			description_hint: "You can use HTML markup to improve your description!",
		},
		download: {
			heading: "Downloads",
			add_category: "Add download category",
			add_single_item: "Add single download",
			category: "Download category name",
			name: "Download name",
			link: "Download link",
			link_placeholder: "https://www.example.com/",
		},
		changelog: {
			heading: "Changelog",
		},
	},
	statistics: {
		title: "Contribution Statistics",
		loading: "Loading graph…",
		label: {
			textures: "Textures",
			contributors: "Contributors",
			contributions: "Contributions",
		},
	},
	profile: {
		title: "Profile",
		general: {
			title: "General",
			uuid: {
				label: "Minecraft profile UUID",
				hint: "Your skin will be displayed with add-ons you authored.",
			},
			username: {
				label: "Username",
				hint: "Your username will be displayed on Faithful services for contributions, add-ons, etc.",
			},
		},
		social: {
			title: "Social Links",
			link_label: "Edit link",
			type_label: "Select media type",
			placeholder: "https://www.example.com/",
			add: "Add social media",
		},
		save_changes: "Save changes",
		delete: {
			title: "Delete account",
			btn: "Delete account",
			description: "Are you sure you want to delete your account?",
			warning: "This process is irreversible!",
		},
	},
	files: {
		general: {
			name: {
				label: "File name",
				hint: "Name describes shortly the file",
				rules: {
					name_required: "A name is required.",
					name_too_big: "File name must be less than %s characters.",
					name_too_small: "File name must be at least %s characters long.",
				},
			},
			use: {
				label: "File use",
				hint: "Describes short use",
				rules: {
					name_required: "A value is required.",
					name_too_big: "File use must be less than %s characters.",
					name_too_small: "File use must be at least %s characters long.",
				},
			},
		},
	},
	gallery: {
		stretched_switcher: "Full width view",
		share_link_copied_to_clipboard: "Share link copied to clipboard",
		max_items_per_row: "Max items per row",
		title: "Gallery",
		loading_message: "Loading…",
		error_message: {
			texture_not_done: "This texture is missing!",
			user_anonymous: "Anonymous",
			user_not_found: "Unknown User",
			contribution_not_found: "No contributions found in database!",
		},
		category: {
			search: "Search",
			tag: "Tag",
			mc_version: "Minecraft Version",
			edition: "Edition",
			pack: "Pack",
		},
		sort: {
			name_asc: "Name (A → Z)",
			name_desc: "Name (Z → A)",
			id_asc: "Texture ID (smallest → largest)",
			id_desc: "Texture ID (largest → smallest)",
			contrib_desc: "Recently Contributed",
		},
		tooltip: {
			modded: "Modded Texture",
			mojang: "Mojang Studios",
			ignored: "Ignored Texture",
		},
		all: "All",
		latest: "Latest",
		clear_cache: "Clear Gallery Cache",
		result_stats_singular: "%COUNT% texture found in %SECONDS% seconds",
		result_stats_plural: "%COUNT% textures found in %SECONDS% seconds",
		modal: {
			no_contributions: "No contributions found",
			tabs: {
				information: "information",
				authors: "authors",
			},
			info: {
				texture: "Texture",
				uses: "Uses",
				paths: "Paths",
			},
			data: {
				contribution_id: "Contribution ID",
				date: "Date",
				authors: "Authors",
				id: "ID",
				name: "Name",
				tags: "Tags",
				use_id: "Use ID",
				use_name: "Use name",
				edition: "Edition",
				texture_id: "Texture ID",
				path_id: "Path ID",
				resource_pack_path: "Resource pack path",
				mc_versions: "Minecraft versions",
			},
		},
	},
	settings: {
		title: "Settings",
		label: {
			edit_raw: "Edit raw JSON",
			edit_editor: "Edit with visual editor",
		},
	},
	dashboard: {
		welcome_user: "Welcome %USER%!",
		welcome: "Welcome!",
		totals: {
			authors: "authors",
			contributions: "contributions",
			last_day: "contributions in the last 48 hours",
			last_week: "contributions last week",
			last_month: "contributions last month",
		},
		titles: {
			users: "Users",
			addons: "Add-ons",
			contribution_activity: "Contribution Activity",
			contribution_stats: "Contributions",
			profile: "Profile",
		},
		addons: {
			submissions: "Submissions",
			upload: "Upload",
		},
		users: {
			total: "users",
			total_anonymous: "anonymous",
			total_roles: "roles",
		},
		locale: {
			on: "on",
			less: "Less",
			more: "More",
		},
	},
	missing_page: {
		title: "Are you lost in The End?",
		description: "Unfortunately, the page you requested doesn't exist!",
		main_page:
			"Try checking your spelling or going to the %main page% to find what you were looking for.",
	},
	datepicker: {
		year: "Year",
		month: "Month",
		day: "Day",
	},
};
