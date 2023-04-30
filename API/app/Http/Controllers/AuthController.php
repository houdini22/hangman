<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Mail;

class AuthController extends Controller
{
    public function postLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            $user->generateToken();

            $user->last_active = Carbon::now();
            $user->save();

            return response()->json([
                'data' => [
                    'user' => [
                        'name' => $user->name,
                        'email' => $user->email,
                        'token' => $user->token,
                    ]
                ]
            ]);
        }

        return response()->json([
            'message' => 'ERR'
        ], 401);
    }

    public function postLogout(Request $request)
    {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $user->token = null;
        $user->save();

        return response()->json([
            'message' => 'OK'
        ]);
    }
    public function postRegister(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'unique:users', 'max:32'],
            'email' => ['required', 'unique:email'],
            'confirm_email' => ['required'],
            'password' => ['required'],
            'confirm_password' => ['required']
        ]);

        /*Mail::send('', [
            'name' => $request->get('name'),
        ], function ($message) use ($request) {
            $message->to('j', '')->subject('');
            $message->from($request->get('email'));
        });*/

        return response()->json([
            'message' => 'ERR'
        ]);
    }
}
