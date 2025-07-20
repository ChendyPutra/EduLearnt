<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckAdminRole
{
    public function handle($request, Closure $next, $role = null)
    {
        $user = Auth::guard('admin')->user();

        if (!$user) {
            abort(403, 'Unauthorized.');
        }

        if ($role && $user->role !== $role) {
            abort(403, 'Access denied.');
        }

        return $next($request);
    }
}
