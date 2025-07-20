<?php

// app/Http/Controllers/Api/CourseController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
   public function index()
{
    return Course::all();
}

public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string',
        'description' => 'nullable|string',
        'level' => 'required',
        'category' => 'nullable',
        'is_active' => 'boolean',
    ]);

    return Course::create($validated);
}

public function show($id)
{
    return Course::findOrFail($id);
}

public function update(Request $request, $id)
{
    $course = Course::findOrFail($id);
    $course->update($request->all());

    return $course;
}

public function destroy($id)
{
    Course::destroy($id);
    return response()->json(['message' => 'Course deleted']);
}



}
