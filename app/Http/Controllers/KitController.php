<?php

namespace App\Http\Controllers;

use App\Models\Kit;
use Illuminate\Http\JsonResponse;

class KitController extends Controller
{
   public function index()
    {
        return Kit::all();
    }

    public function show($id)
    {
        return Kit::findOrFail($id);
    }

    public function store($request)
    {
        return Kit::create($request->all());
    }

    public function update( $request, $id)
    {
        $kit = Kit::findOrFail($id);
        $kit->update($request->all());
        return $kit;
    }

    public function destroy($id)
    {
        Kit::destroy($id);
        return response()->json(['message' => 'Kit deleted']);
    }
}
