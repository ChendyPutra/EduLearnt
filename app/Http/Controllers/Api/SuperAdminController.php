<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;

class SuperAdminController extends Controller
{
     public function index()
    {
        return response()->json(Admin::whereIn('role', ['admin'])->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6',
            'role'=>'required|in:admin'
        ]);
        $data['password'] = bcrypt($data['password']);
        $user = Admin::create($data);
        return response()->json($user, 201);
    }

    public function update(Request $request, $id)
    {
        $user = Admin::findOrFail($id);
        $data = $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users,email,'.$id,
            'role'=>'required|in:admin'
        ]);
        if ($request->password) {
            $data['password'] = bcrypt($request->password);
        }
        $user->update($data);
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = Admin::findOrFail($id);
        $user->delete();
        return response()->json(['message'=>'deleted']);
    }
}
