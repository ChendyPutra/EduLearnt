<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Modules;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function index(Request $request)
    {
        $query = Modules::with('course');
        
        // Filter by course if provided
        if ($request->has('course_id')) {
            $query->where('course_id', $request->course_id);
        }
        
        $modules = $query->orderBy('order_index')->get();
        
        return response()->json([
            'success' => true,
            'data' => $modules
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'order_index' => 'required|integer|min:1',
            'video_url' => 'nullable|url',
            'downloadable_materials' => 'nullable|string',
            'estimated_duration' => 'nullable|integer|min:0',
            'is_active' => 'boolean'
        ]);
        
        $module = Modules::create($data);
        $module->load('course');
        
        return response()->json([
            'success' => true,
            'data' => $module
        ], 201);
    }

    public function show($id)
    {
        $module = Modules::with('course')->findOrFail($id);
        return response()->json([
            'success' => true,
            'data' => $module
        ]);
    }

    public function update(Request $request, $id)
    {
        $module = Modules::findOrFail($id);
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'order_index' => 'required|integer|min:1',
            'video_url' => 'nullable|url',
            'downloadable_materials' => 'nullable|string',
            'estimated_duration' => 'nullable|integer|min:0',
            'is_active' => 'boolean'
        ]);
        
        $module->update($data);
        $module->load('course');
        
        return response()->json([
            'success' => true,
            'data' => $module
        ]);
    }

    public function destroy($id)
    {
        $module = Modules::findOrFail($id);
        $module->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Module deleted successfully'
        ]);
    }
    
    public function getCourseModules($courseId)
    {
        $modules = Modules::where('course_id', $courseId)
                         ->where('is_active', true)
                         ->orderBy('order_index')
                         ->get();
        
        return response()->json($modules);
    }
}