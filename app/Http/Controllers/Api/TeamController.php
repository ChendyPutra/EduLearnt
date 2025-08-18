<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TeamMember;

class TeamController extends Controller
{
    public function index()
    {
        $team = TeamMember::all();
        return response()->json($team);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'n' => 'required|string|max:255',
            'r' => 'required|string|max:255',
            'photo' => 'nullable|url'
        ]);

        $member = TeamMember::create([
            'n' => htmlspecialchars($validated['n'], ENT_QUOTES, 'UTF-8'),
            'r' => htmlspecialchars($validated['r'], ENT_QUOTES, 'UTF-8'),
            'photo' => $validated['photo']
        ]);

        return response()->json($member, 201);
    }

    public function update(Request $request, $id)
    {
        $member = TeamMember::findOrFail($id);
        
        $validated = $request->validate([
            'n' => 'required|string|max:255',
            'r' => 'required|string|max:255',
            'photo' => 'nullable|url'
        ]);

        $member->update([
            'n' => htmlspecialchars($validated['n'], ENT_QUOTES, 'UTF-8'),
            'r' => htmlspecialchars($validated['r'], ENT_QUOTES, 'UTF-8'),
            'photo' => $validated['photo']
        ]);

        return response()->json($member);
    }

    public function destroy($id)
    {
        $member = TeamMember::findOrFail($id);
        $member->delete();
        return response()->json(['message' => 'Team member deleted']);
    }
}