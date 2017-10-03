<template>
	<div>
		<div class="clearfix mb-3">
			<button class="btn btn-default" @click="add">Add</button>
			<button class="btn btn-default" @click="remove">Remove</button>
		</div>
		<p v-for="i in n" :key="i">{{i}}: {{placeholder}}</p>
	</div>
</template>

<script>

const placeholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae velit metus. Donec dapibus nisi ac ultricies convallis. Sed sit amet rutrum neque. Nulla sed dolor non velit ultricies auctor. Integer dolor nisl, ultricies quis venenatis vitae, eleifend pellentesque massa. Maecenas tempus congue dolor, vitae varius urna cursus vel. Cras in nunc quis quam elementum gravida.";

export default {
	props: {
		cnt: {
			type: Number,
			default() {
				return 10;
			}
		}
	},
	data() {
		console.log("this.cnt",this.cnt);
		return {
			placeholder: placeholder,
			n: this.cnt
		}
	},
	methods: {
		add() {
			this.n++;
		},
		remove() {
			if (this.n>0) {
				this.n--;
			}
			else {
				this.n = 0;
			}
		}
	}
}

</script>