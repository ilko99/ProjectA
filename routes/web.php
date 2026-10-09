<?php

use Illuminate\Support\Facades\Route;

// Serve the Vue SPA for every non-API route; vue-router handles the rest.
Route::view('/{any?}', 'app')->where('any', '^(?!api(/|$)).*');
