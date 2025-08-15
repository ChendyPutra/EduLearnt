<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    public function index()
    {
        // returning dummy list (later replace with Course::paginate() etc)
        $courses = Course::all();
        return response()->json($courses);
    }

    public function show($id)
    {
        $course = Course::find($id);
        if (!$course) return response()->json(['message'=>'Course not found'], 404);
        return response()->json($course);
    }

    public function store(Request $request)
    {
        // simple admin create (validate minimal)
        $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'youtube_id' => 'nullable|string',
            'level' => 'nullable|string',
        ]);

        $course = Course::create($request->only(['title','description','youtube_id','level']));
        return response()->json($course, 201);
    }
}
