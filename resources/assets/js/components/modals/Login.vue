<template>
	<Form :form="form">
		<div slot="formFields">
			<div class="form-group">
				<label for="inputEmail">Email address</label>
				<input type="email" class="form-control" id="inputEmail" placeholder="Enter email" v-model="form.data.email" :class="{'is-invalid':form.isInvalid('email')}" name="email">
				<Alert :message="form.getError('email')" type="error" css="invalid-feedback" :hideable="false" />
			</div>
			<div class="form-group">
				<label for="inputPassword">Password</label>
				<input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="form.data.password" :class="{'is-invalid':form.isInvalid('password')}" name="password">
				<Alert :message="form.getError('password')" type="error" css="invalid-feedback" :hideable="false" />
			</div>
			<div class="text-right">
				<button type="button" @click.prevent="$bus.$emit('switchModal','restore')" class="btn btn-link">Restore password</button>
				<button type="button" @click.prevent="$bus.$emit('switchModal','signup')" class="btn btn-link">Signup</button>
				<button type="submit" class="btn btn-primary" :disabled="form.loading">
					<span v-if="form.loading">Loading...</span>
					<span v-else>Login</span>
				</button>
			</div>
		</div>
	</Form>
</template>

<script>
import Form from "~/utils/Form";

export default {
	data: function() {
		return {
			form: new Form({
				data: {
					email: "",
					password: ""
				},
				url: "/login",
				hideOnSuccess: true,
				redirectDelay: 3
			})
		}
	}
}

</script>