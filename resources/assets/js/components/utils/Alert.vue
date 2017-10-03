<template>
	<transition :css="false" @before-enter="animHeightBeforeEnter" @enter="animHeightEnter" @leave="animHeightLeave">
		<div class="transition-height-container" v-if="throttled.message">
			<div :class="computedCss" role="alert">
				<button type="button" class="close" v-if="throttled.hideable" @click="hide">
					<span aria-hidden="true">&times;</span>
				</button>
				<template v-if="throttledMessageIsArray">
					<span v-if="throttled.message.length==1">{{throttled.message[0]}}</span>
					<ul v-if="throttled.message.length>1">
						<li v-for="m in throttled.message">{{m}}</li>
					</ul>
				</template>
				<template v-else>
					<span>{{throttled.message}}</span>
				</template>
			</div>
		</div>
	</transition>
</template>

<script>

import AnimHeight from "~/utils/AnimHeight";

export default {
	props: {
		type: String,
		css: {
			type: String,
			default: "alert"
		},
		message: {
			type: [String,Array]
		},
		hideable: {
			type: Boolean,
			default: true
		},
		duration: {
			type: Number,
			default: 300
		}
	},
	mixins: [AnimHeight],
	data: function() {
		return {
			protected: {
				message: undefined
			},
			throttled: {
				type: undefined,
				css: undefined,
				message: undefined,
				hideable: undefined
			}
		}
	},
	computed: {
		computedCss: function() {
			const out = [];
			out.push(this.throttled.css);
			if (this.throttled.css=="alert") {
				if (this.throttled.type=="error") out.push("alert-danger");
				else out.push("alert-"+this.throttled.type);
			}
			return out;
		},
		throttledMessageIsArray: function() {
			return _.isArray(this.throttled.message);
		}
	},
	methods: {
		hide: function() {
			this.protected.message = undefined;
			this.$emit("hide");
		}
	},
	created: function() {
		this.watchers = [];
		_.each(this.throttled,(v,key) => {
			if (this.protected.hasOwnProperty(key)) {
				this.watchers.push(this.$watch(key,(data) => {
					this.protected[key] = data;
				},{immediate:true}));
			}
			this.watchers.push(this.$watch((this.protected.hasOwnProperty(key)?"protected.":"")+key,_.throttle((data) => {
				this.throttled[key] = data;
			},this.duration),{immediate:true}));
		});
	},
	beforeDestroy: function() {
		(this.watchers||[]).forEach(unwatch => unwatch());
		this.watchers = [];
	}
}

</script>

<style scoped>
.invalid-feedback {
	display: block;
}
</style>