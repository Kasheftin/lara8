<template>
	<form>
		<div class="form-group">
			<label class="control-label col-sm-3">Name</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" v-model="form.name">
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-sm-3">Email</label>
			<div class="col-sm-9">
				<input type="text" class="form-control" v-model="form.email">
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-9 col-sm-offset-3">
				<button class="btn btn-default" type="submit">Save</button>
			</div>
		</div>
	</form>
</template>

<script>

class Form {
	constructor(data) {
		this.originalData = data;
		for (let field in data) {
			this[field] = data[field];
		}
	}
}

export default {
	data() {
		console.log("this",this.$rootData);
		return {
			form: new Form({
				name: this.$rootData.name,
				email: this.$rootData.email
			})
		}
	},
	mounted() {
		console.log('Component mounted.',this.$rootData);
	}
}
</script>
