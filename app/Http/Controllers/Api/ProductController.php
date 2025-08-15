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
        $request->validate([
            'name'=>'required|string',
            'marketplace'=>'required|string',
            'url'=>'required|url',
        ]);

        $p = Product::create($request->only(['name','marketplace','url']));
        return response()->json($p, 201);
    }
}
