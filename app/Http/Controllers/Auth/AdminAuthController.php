<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    // List admin biasa
    public function index()
    {
        $admins = Admin::where('role', 'admin')->get();
        return response()->json($admins);
    }

    // Tambah admin baru (hanya admin biasa)
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|string|min:6',
        ]);

        Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => 'admin', // hanya boleh buat admin
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Admin berhasil ditambahkan']);
    }

    // Update admin biasa (tidak boleh update superadmin)
    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);

        if ($admin->role === 'superadmin') {
            return response()->json(['message' => 'Tidak boleh mengubah superadmin'], 403);
        }

        $admin->name = $request->name;
        $admin->email = $request->email;
        if ($request->filled('password')) {
            $admin->password = Hash::make($request->password);
        }
        $admin->save();

        return response()->json(['message' => 'Admin berhasil diupdate']);
    }

    // Hapus admin biasa (tidak boleh hapus superadmin)
    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);

        if ($admin->role === 'superadmin') {
            return response()->json(['message' => 'Tidak boleh menghapus superadmin'], 403);
        }

        $admin->delete();

        return response()->json(['message' => 'Admin berhasil dihapus']);
    }

    // Form login (hanya response JSON)
    public function showLoginForm()
    {
        return response()->json(['message' => 'Login Admin Endpoint'], 200);
    }

    // Login admin/superadmin
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt($credentials)) {
            $request->session()->regenerate();
            $admin = Auth::guard('admin')->user();

            return response()->json([
                'message' => 'Login berhasil',
                'role' => $admin->role,
                'admin' => $admin
            ]);
        }

        return response()->json(['message' => 'Email atau password salah'], 401);
    }

    // Logout admin/superadmin
    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout berhasil']);
    }
    public function csrfToken(Request $request)
{
    return response()->json(['csrf_token' => csrf_token()]);
}

}
