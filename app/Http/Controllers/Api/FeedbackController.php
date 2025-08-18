<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedback = Feedback::orderBy('created_at', 'desc')->get();
        return response()->json($feedback);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
            'type' => 'nullable|in:contact,partnership,support'
        ]);

        $feedback = Feedback::create([
            'name' => htmlspecialchars($validated['name'], ENT_QUOTES, 'UTF-8'),
            'email' => htmlspecialchars($validated['email'], ENT_QUOTES, 'UTF-8'),
            'message' => htmlspecialchars($validated['message'], ENT_QUOTES, 'UTF-8'),
            'type' => $validated['type'] ?? 'contact'
        ]);

        return response()->json([
            'message' => 'Feedback submitted successfully',
            'data' => $feedback
        ], 201);
    }

    public function destroy($id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();
        return response()->json(['message' => 'Feedback deleted successfully']);
    }
}