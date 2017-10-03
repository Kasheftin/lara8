<footer class="footer">
	<div class="container">
		<div class="row">
			<div class="col text-muted text-center">
				&copy; Something
			</div>
			@if (Auth::guest())
				<div class="col-auto text-right">
					<a href="javascript:void(0)" @click.prevent="$bus.$emit('switchModal','login')">{{__('Login')}}</a>
					@if (config()->get("settings.signup_enabled"))
						<a href="javascript:void(0)" @click.prevent="$bus.$emit('switchModal','signup')">{{__('Signup')}}</a>
					@endif
				</div>
			@endif
		</div>
	</div>
</footer>