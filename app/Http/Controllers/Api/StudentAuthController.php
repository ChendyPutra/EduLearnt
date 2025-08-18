<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class StudentAuthController extends Controller
{
     public function index(Request $request)
    {
        $validated = $request->validate([
            'role' => 'nullable|in:student,teacher,parent'
        ]);
        
        $users = isset($validated['role']) 
            ? User::where('role', $validated['role'])->get() 
            : User::all();
        return response()->json($users);
    }

    // Create user
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:student,teacher,parent',
        ]);
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response()->json($user, 201);
    }

    // Update user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,'.$id,
            'password' => 'sometimes|string|min:6',
            'role' => 'sometimes|in:student,teacher,parent',
        ]);
        if(isset($data['password'])) $data['password'] = bcrypt($data['password']);
        $user->update($data);
        return response()->json($user);
    }

    // Delete user
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Deleted']);
    }
    // Register siswa
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => 'student',
        ]);

        $token = $user->createToken('student-token', ['student'])->plainTextToken;

        return response()->json([
            'user' => $user->only(['id', 'name', 'email', 'role']),
            'token' => $token
        ], 201);
    }

    // Login siswa
    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if ($user->role !== 'student') {
            return response()->json(['message' => 'Unauthorized for student login'], 403);
        }

        $token = $user->createToken('student-token', ['student'])->plainTextToken;

        return response()->json([
            'user' => $user->only(['id', 'name', 'email', 'role']),
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user()->only(['id', 'name', 'email', 'role']));
    }
}
