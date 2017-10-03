<!-- Fixed navbar -->
<nav class="navbar navbar-expand-sm navbar-dark fixed-top sticky-top bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">Fixed navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
      <ul class="navbar-nav">
        @if (Auth::guest())
          <li class="nav-item"><a class="nav-link" href="javascript:void(0)" @click.prevent="$bus.$emit('switchModal','login')">{{__('Login')}}</a></li>
          @if (config()->get("settings.signup_enabled"))
            <li class="nav-item"><a class="nav-link" href="javascript:void(0)" @click.prevent="$bus.$emit('switchModal','signup')">{{__('Signup')}}</a></li>
          @endif
        @else
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="navbarProfileMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{Auth::user()->name}}
            </a>
            <div class="dropdown-menu" role="menu" aria-labelledby="navbarProfileMenuLink">
              <a class="dropdown-item" href="{{ route('management') }}">{{__('Control Panel')}}</a>
              <a class="dropdown-item" href="javascript:void(0)">{{__('Settings')}}</a>
              <a class="dropdown-item" href="javascript:void(0)" @click.prevent="$bus.$emit('switchModal','logout')">{{__('Logout')}}</a>
            </div>
          </li>
        @endif
      </ul>
    </div>
  </div>
</nav>
