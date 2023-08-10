const discordUserStore = Pinia.defineStore('discordUser', {
	state: () => ({
		discordId: undefined,
		discordAvatar: undefined,
		discordBanner: undefined,
		discordName: undefined || '',
	}),

	actions: {
		getInfos: function(accessToken) {
			return fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `Bearer ${accessToken}`
				}
			})
            .then(async (response) => {
				if(response.status === 200) {
					return response.json()
				} else {
					const json = await response.json()
					return Promise.reject(json)
				}
			})
		},

		watchDiscordAuth: function(store, onError) {
			// https://pinia.vuejs.org/core-concepts/state.html#subscribing-to-the-state
			store.$subscribe((mutation) => {
				if(mutation.type === 'patch function') return

				const auth = store.$state

				if(auth.access_token === undefined) {
					this.$reset()
					this.$patch({
						discordId: this.$state.discordId
					})
					return
				}

				return this.getInfos(auth.access_token)
					.then((json) => {
						this.$patch({
							discordId: json.id,
							discordAvatar: json.avatar !== null ? `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}?size=1024` : null,
							discordBanner: json.banner != null ?
								`https://cdn.discordapp.com/banners/${json.id}/${json.banner}?size=1024` :
								'https://database.faithfulpack.net/images/branding/backgrounds/forest.png',
							discordName: `${json.username}${json.discriminator != 0 ? "#" + json.discriminator : ""}`,
						})
						// console.log(this.$state)
						return // void
					})
					.catch((...args) => {
						onError(...args)
					})
			})
		}
	}
})