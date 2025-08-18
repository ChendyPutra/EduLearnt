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
        $data = $request->validate([
            'school' => 'required|string',
            'schedule' => 'nullable|string',
            'city' => 'nullable|string',
        ]);

        $program = OfflineProgram::create($data);
        return response()->json($program, 201);
    }

    public function update(Request $request, $id)
    {
        $program = OfflineProgram::findOrFail($id);
        $data = $request->validate([
            'school' => 'sometimes|string',
            'schedule' => 'sometimes|string',
            'city' => 'sometimes|string',
        ]);
        
        $program->update($data);
        return response()->json($program);
    }

    public function destroy($id)
    {
        $program = OfflineProgram::findOrFail($id);
        $program->delete();
        return response()->json(['message' => 'Program deleted successfully']);
    }
}
