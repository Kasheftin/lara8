<?php

namespace App\Http\Middleware;

use Closure;
use JavaScript;

class SendConfigToJS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        JavaScript::put([
            "config" => [
                "signup_enabled" => config()->get("settings.signup_enabled")
            ]
        ]);
        return $next($request);
    }
}
