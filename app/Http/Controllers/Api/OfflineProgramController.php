<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\OfflineProgram;

class OfflineProgramController extends Controller
{
    public function index()
    {
        return response()->json(OfflineProgram::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'school' => 'required|string',
            'schedule' => 'required|string',
            'city' => 'required|string',
        ]);

        $p = OfflineProgram::create($request->only(['school','schedule','city']));
        return response()->json($p, 201);
    }
}
