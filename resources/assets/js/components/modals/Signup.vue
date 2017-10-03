<template>
	<Form :form="form">
		<div slot="formFields">
			<div class="form-group">
				<label for="inputName">Name</label>
				<input type="text" class="form-control" id="inputName" placeholder="Enter name" v-model="form.data.name" :class="{'is-invalid':form.isInvalid('name')}" name="name">
				<Alert :message="form.getError('name')" type="error" css="invalid-feedback" :hideable="false" />
			</div>
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
			<div class="form-group">
				<label for="inputPasswordConfirmation">Password Confirmation</label>
				<input type="password" class="form-control" id="inputPasswordConfirmation" placeholder="Repeat the password" v-model="form.data.password_confirmation" :class="{'is-invalid':form.isInvalid('password_confirmation')}" name="password_confirmation">
				<Alert :message="form.getError('password_confirmation')" type="error" css="invalid-feedback" :hideable="false" />
			</div>
			<div class="text-right">
				<button type="button" @click.prevent="$bus.$emit('switchModal','login')" class="btn btn-link">Login</button>
				<button type="submit" class="btn btn-primary" :disabled="form.loading">
					<span v-if="form.loading">Loading...</span>
					<span v-else>Register</span>
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
					name: "",
					email: "",
					password: "",
					password_confirmation: ""
				},
				url: "/register",
				hideOnSuccess: true,
				redirectDelay: 3
			})
		}
	}
}

</script>