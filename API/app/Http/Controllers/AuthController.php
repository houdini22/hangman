<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Mail;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function postLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if (!$user->is_active) {
                return response()->json([
                    'message' => 'Your account is not active.'
                ], 401);
            }

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
            'message' => 'Email or password is incorrect.'
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
            'name' => ['required', 'unique:users', 'max:32', 'alpha_dash'],
            'email' => ['required', 'unique:users', 'confirmed', 'email'],
            'email_confirmation' => ['required'],
            'password' => ['required', Password::min(8)
                ->letters()
                ->numbers()
                ->symbols()
                ->mixedCase(), 'confirmed'],
            'password_confirmation' => ['required'],
        ]);

        /*if (!captcha_check($request->get('captcha'))) {
            return response()->json([
                'message' => 'The given data was invalid.',
                'errors' => [
                    'captcha' => ['Captcha is invalid.']
                ]
            ], 422);
        }*/

        $user = new User($validatedData);
        $user->generateActivationToken();
        $user->password = bcrypt($validatedData['password']);
        $user->save();

        try {
            Mail::send('auth_register_activation_email', [
                'activation_token' => $user->activation_token,
                'name' => $user->name,
            ], function ($message) use ($request, $user) {
                $message->to($user->email, $user->name)->subject('Activate your account.');
                $message->from('michal@hangman');
            });
        } catch (\Swift_TransportException $exception) {
            return response()->json([
                'message' => 'Error sending email. ' . $exception->getMessage(),
                'errors' => []
            ], 500);
        }

        return response()->json([
            'message' => 'OK'
        ]);
    }

    public function postActivateAccount(Request $request)
    {
        $user = User::where('activation_token', '=', $request->get('token'))->first();

        if (!$user) {
            return response()->json([
                'message' => 'Cannot find token.'
            ], 404);
        }

        $user->activation_token = NULL;
        $user->is_active = 1;
        $user->save();

        return response()->json([
            'message' => 'Your account was activated.'
        ]);
    }
}
