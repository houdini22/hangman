<?php

use Illuminate\Support\Facades\Route;

Route::prefix('api/v1')->group(function () {
    Route::post('auth/login', '\App\Http\Controllers\AuthController@postLogin');
    Route::post('auth/logout', '\App\Http\Controllers\AuthController@postLogout');
    Route::post('auth/register', '\App\Http\Controllers\AuthController@postRegister');
    Route::post('auth/activate_account', '\App\Http\Controllers\AuthController@postActivateAccount');

    Route::get('captcha', '\App\Http\Controllers\CaptchaServiceController@getCaptcha');

    Route::post('hangman/end_game', '\App\Http\Controllers\HangmanController@postEndGame');
    Route::get('hangman/scores', '\App\Http\Controllers\HangmanController@getScores');
});

Route::get('/', function () {
    return view('welcome');
});
