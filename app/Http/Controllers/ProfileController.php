<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JavaScript;
use Auth;

class ProfileController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        JavaScript::put([
            'user' => [
                'id' => Auth::user()->id,
                'name' => Auth::user()->name,
                'email' => Auth::user()->email,
            ]
        ]);
    	return view('profile/index');
    }

    public function store()
    {
    	return view('profile/index');
    }
}
