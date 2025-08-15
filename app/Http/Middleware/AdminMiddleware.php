<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle($request, Closure $next, $role = null)
    {
        if (!Auth::guard('admin')->check()) {
            return redirect()->route('admin.login')->with('error', 'Silakan login sebagai admin');
        }

        if ($role && Auth::guard('admin')->user()->role !== $role) {
            abort(403, 'Anda tidak punya akses');
        }

        return $next($request);
    }
}
