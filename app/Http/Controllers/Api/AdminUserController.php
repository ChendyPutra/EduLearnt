<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    // List all admins
    public function index()
    {
        $admins = Admin::select('id', 'name', 'email', 'role')->get();
        return response()->json($admins);
    }

    // Create admin
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|string|min:6',
            'role' => 'required|in:admin,super_admin'
        ]);
        
        $data['password'] = Hash::make($data['password']);
        $admin = Admin::create($data);
        
        return response()->json($admin->only(['id', 'name', 'email', 'role']), 201);
    }

    // Update admin
    public function update(Request $request, $id)
    {
        $admin = Admin::findOrFail($id);
        
        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:admins,email,'.$id,
            'password' => 'sometimes|string|min:6',
            'role' => 'sometimes|in:admin,super_admin'
        ]);
        
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        
        $admin->update($data);
        
        return response()->json($admin->only(['id', 'name', 'email', 'role']));
    }

    // Delete admin
    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);
        
        // Prevent deleting super admin
        if ($admin->role === 'super_admin') {
            return response()->json(['message' => 'Cannot delete super admin'], 403);
        }
        
        $admin->delete();
        return response()->json(['message' => 'Admin deleted successfully']);
    }
}