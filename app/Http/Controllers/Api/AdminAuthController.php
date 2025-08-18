<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    public function index()
    {
        $admins = Admin::where('role', 'admin')->get();
        return response()->json($admins);
    }

    // Create admin (hanya super_admin)
    public function store(Request $request)
    {
        // $this->authorize('isSuperAdmin'); // Buat policy jika perlu
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:admins',
            'password' => 'required|string|min:6',
        ]);
        $data['role'] = 'admin';
        $data['password'] = bcrypt($data['password']);
        $admin = Admin::create($data);
        return response()->json($admin, 201);
    }

    // Update admin
    public function update(Request $request, $id)
    {
        $admin = Admin::where('role', 'admin')->findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:admins,email,'.$id,
            'password' => 'sometimes|string|min:6',
        ]);
        if(isset($data['password'])) $data['password'] = bcrypt($data['password']);
        $admin->update($data);
        return response()->json($admin);
    }

    // Delete admin
    public function destroy($id)
    {
        $admin = Admin::where('role', 'admin')->findOrFail($id);
        $admin->delete();
        return response()->json(['message' => 'Deleted']);
    }

    // Login Admin & Super Admin
    public function login(Request $request)
    {
        try {
            $data = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        }

        $admin = Admin::where('email', $data['email'])->first();

        if (!$admin) {
            return response()->json([
                'message' => 'Email tidak ditemukan'
            ], 422);
        }

        if (!Hash::check($data['password'], $admin->password)) {
            return response()->json([
                'message' => 'Password salah'
            ], 422);
        }

        if (!in_array($admin->role, ['admin', 'super_admin'])) {
            return response()->json([
                'message' => 'Akun ini tidak memiliki akses admin'
            ], 403);
        }

        $token = $admin->createToken('api-token', ['admin'])->plainTextToken;

        // Hindari mengirim password hash ke frontend
        $userData = $admin->only(['id', 'name', 'email', 'role']);

        return response()->json([
            'user' => $userData,
            'token' => $token
        ]);
    }

    // Logout
    public function logout(Request $request)
    {
        if ($request->user() && $request->user()->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();
        }
        return response()->json(['message' => 'Logged out']);
    }

    // Profil Admin
    public function me(Request $request)
    {
        // Hindari mengirim password hash ke frontend
        return response()->json($request->user()->only(['id', 'name', 'email', 'role']));
    }

    // Daftar User (Hanya Super Admin)
    public function getUsers(Request $request)
    {
        // Gunakan middleware pada route, atau pastikan Gate sudah diatur
        if ($request->user()->role !== 'super_admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        // Hindari mengirim password hash ke frontend
        $admins = Admin::select('id', 'name', 'email', 'role')->get();
        return response()->json($admins);
    }
}
