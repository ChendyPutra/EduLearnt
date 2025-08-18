<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
   public function index()
{
    return response()->json(Product::all());
}

public function store(Request $request)
{
    $data = $request->validate([
        'name' => 'required|string',
        'desc' => 'nullable|string',
        'price' => 'nullable|numeric',
        'marketplace_url' => 'nullable|string',
        'image_url' => 'nullable|string',
    ]);
    $product = Product::create($data);
    return response()->json($product, 201);
}

public function update(Request $request, $id)
{
    $product = Product::findOrFail($id);
    $data = $request->validate([
        'name' => 'sometimes|string',
        'desc' => 'sometimes|string',
        'price' => 'sometimes|numeric',
        'marketplace_url' => 'sometimes|string',
        'image_url' => 'sometimes|string',
    ]);
    $product->update($data);
    return response()->json($product);
}

public function destroy($id)
{
    $product = Product::findOrFail($id);
    $product->delete();
    return response()->json(['message' => 'Deleted']);
}
}
