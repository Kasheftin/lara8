<template>
	<Form :form="form">
		<div slot="formFields">
			<div class="text-center">
				<button type="submit" class="btn btn-primary" :disabled="form.loading">
					<span v-if="form.loading">Loading...</span>
					<span v-else>Logout</span>
				</button>
			</div>
		</div>
	</Form>
</template>

<script>
import Form from "~/utils/Form";

export default {
	data() {
		return {
			form: new Form({
				url: "/logout",
				hideOnSuccess: true,
				autoSend: 0,
				redirectDelay: 3
			})
		}
	}
}

</script>