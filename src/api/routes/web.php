<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/health-check', function () {
    return response()->json(['status' => 'online', 'message' => 'Handshake concluído, Kobayashi!']);
});
