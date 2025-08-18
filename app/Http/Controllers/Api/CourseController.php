<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Http\Requests\CourseRequest;

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

    public function store(CourseRequest $request)
    {
        $course = Course::create($request->validated());
        return response()->json($course, 201);
    }

    public function update(CourseRequest $request, $id)
    {
        $course = Course::findOrFail($id);
        $course->update($request->validated());
        return response()->json($course);
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
        return response()->json(['message' => 'Course deleted successfully']);
    }
}
