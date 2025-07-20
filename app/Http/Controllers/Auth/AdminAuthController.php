<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function showLoginForm()
    {
        return response()->json(['message' => 'Login Admin Endpoint'], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt($credentials)) {
            $request->session()->regenerate();

            $admin = Auth::guard('admin')->user();

            // Jika request dari frontend (React/Axios/JSON)
            if ($request->expectsJson() || $request->isJson() || $request->header('Accept') === 'application/json') {
                return response()->json([
                    'message' => 'Login berhasil',
                    'role' => $admin->role,
                    'admin' => $admin
                ]);
            }

            // Jika dari browser biasa
            return redirect()->intended('/admin/dashboard');
        }

        // Jika gagal
        if ($request->expectsJson() || $request->isJson()) {
            return response()->json(['message' => 'Email atau password salah'], 401);
        }

        return back()->withErrors(['email' => 'Login gagal']);
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Logout berhasil']);
        }

        return redirect('/admin/login');
    }
}
