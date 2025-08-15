<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin; // <-- UBAH INI dari User menjadi Admin
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    // Login Admin & Super Admin
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // UBAH INI dari User menjadi Admin
        $admin = Admin::where('email', $data['email'])->first();

        if (!$admin || !Hash::check($data['password'], $admin->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if (!in_array($admin->role, ['admin', 'super_admin'])) {
            return response()->json(['message' => 'Unauthorized for admin login'], 403);
        }

        $token = $admin->createToken('api-token', ['admin'])->plainTextToken;

        return response()->json([
            'user' => $admin,
            'token' => $token
        ]);
    }

    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    // Profil Admin
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    // Daftar User (Hanya Super Admin)
    public function getUsers()
    {
        $this->authorize('isSuperAdmin'); // pastikan pakai Gate atau middleware role
        // UBAH INI juga dari User menjadi Admin
        return response()->json(Admin::all());
    }
}