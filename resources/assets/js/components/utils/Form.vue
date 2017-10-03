<template>
	<div>
		<Alert :message="form.error" type="error" @hide="form.error=undefined" />
		<Alert :message="form.success" type="success" @hide="form.success=undefined" :hideable="false" />
		<transition :css="false" @before-enter="animHeightBeforeEnter" @enter="animHeightEnter" @leave="animHeightLeave">
			<div class="transition-height-container" v-if="form.showForm">
				<form @submit.prevent="form.send.call(form,$event)" @keydown="form.clearError.call(form,$event)">
					<slot name="formFields"></slot>
				</form>
			</div>
		</transition>
		<transition :css="false" @before-enter="animHeightBeforeEnter" @enter="animHeightEnter" @leave="animHeightLeave">
			<div class="transition-height-container" v-if="form.showRedirectTimer">
				<div class="text-center">
					<button class="btn btn-primary" @click="form.redirect.call(form,$event)">
						Redirect in {{form.redirectDelay}} s...
					</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import AnimHeight from "~/utils/AnimHeight";

export default {
	props: ["form"],
	mixins: [AnimHeight],
	beforeDestroy: function() {
		this.form.beforeDestroy();
	}
}

</script>