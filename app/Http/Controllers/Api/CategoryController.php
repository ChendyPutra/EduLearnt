<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categories;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Categories::all();
        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);
        
        $category = Categories::create($data);
        return response()->json([
            'success' => true,
            'data' => $category
        ], 201);
    }

    public function show($id)
    {
        $category = Categories::findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    public function update(Request $request, $id)
    {
        $category = Categories::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean'
        ]);
        
        $category->update($data);
        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }

    public function destroy($id)
    {
        $category = Categories::findOrFail($id);
        $category->delete();
        return response()->json([
            'success' => true,
            'message' => 'Category deleted successfully'
        ]);
    }
}