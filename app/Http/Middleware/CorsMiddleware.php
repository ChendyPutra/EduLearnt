<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{public function handle(Request $request, Closure $next)
{
    // Kalau preflight OPTIONS, langsung respon duluan
    if ($request->getMethod() === "OPTIONS") {
        return response()->json('OK', 200)
            ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With')
            ->header('Access-Control-Allow-Credentials', 'true');
    }

    $response = $next($request);

    return $response->header('Access-Control-Allow-Origin', 'http://localhost:5173')
                    ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                    ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With')
                    ->header('Access-Control-Allow-Credentials', 'true');
}

}
