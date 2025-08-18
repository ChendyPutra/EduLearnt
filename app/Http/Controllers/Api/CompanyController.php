<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CompanyProfile;
use App\Models\TeamMember;
use App\Models\Feedback;

class CompanyController extends Controller
{
    // ===== PUBLIC =====
    public function profile()
    {
        $profile = CompanyProfile::first();
        return response()->json($profile);
    }

    public function team()
    {
        $team = TeamMember::all();
        return response()->json($team);
    }

    // ===== ADMIN CRUD =====
    // Profile
    public function updateProfile(Request $request)
    {
        $data = $request->validate([
            'visi' => 'required|string|max:1000',
            'misi' => 'required|string|max:1000',
        ]);
        
        // Sanitize input
        $data['visi'] = htmlspecialchars($data['visi'], ENT_QUOTES, 'UTF-8');
        $data['misi'] = htmlspecialchars($data['misi'], ENT_QUOTES, 'UTF-8');
        
        $profile = CompanyProfile::first();
        if (!$profile) {
            $profile = CompanyProfile::create($data);
        } else {
            $profile->update($data);
        }
        return response()->json($profile);
    }

    // Team
    public function listTeam()
    {
        return response()->json(TeamMember::all());
    }

    public function addTeam(Request $request)
    {
        $data = $request->validate([
            'n' => 'required|string|max:255', // nama
            'r' => 'required|string|max:255', // role/jabatan
            'photo' => 'nullable|url|max:500', // url foto
        ]);
        
        // Sanitize input
        $data['n'] = htmlspecialchars($data['n'], ENT_QUOTES, 'UTF-8');
        $data['r'] = htmlspecialchars($data['r'], ENT_QUOTES, 'UTF-8');
        
        $team = TeamMember::create($data);
        return response()->json($team, 201);
    }

    public function updateTeam(Request $request, $id)
    {
        $data = $request->validate([
            'n' => 'required|string|max:255',
            'r' => 'required|string|max:255',
            'photo' => 'nullable|url|max:500',
        ]);
        
        // Sanitize input
        $data['n'] = htmlspecialchars($data['n'], ENT_QUOTES, 'UTF-8');
        $data['r'] = htmlspecialchars($data['r'], ENT_QUOTES, 'UTF-8');
        
        $team = TeamMember::findOrFail($id);
        $team->update($data);
        return response()->json($team);
    }

    public function deleteTeam($id)
    {
        $team = TeamMember::findOrFail($id);
        $team->delete();
        return response()->json(['message' => 'Deleted']);
    }

    // ===== ADMIN: Permintaan Kemitraan/Kontak =====
    public function listFeedback()
    {
        return response()->json(Feedback::orderBy('created_at', 'desc')->get());
    }

    public function showFeedback($id)
    {
        $feedback = Feedback::findOrFail($id);
        return response()->json($feedback);
    }

    public function deleteFeedback($id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();
        return response()->json(['message' => 'Deleted']);
    }
}