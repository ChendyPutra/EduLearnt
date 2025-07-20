<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function byCourse($id) {
    return Module::where('course_id', $id)->orderBy('order')->get();
}

public function store(Request $request, $id) {
    return Module::create([
        'course_id' => $id,
        'title' => $request->title,
        'content' => $request->content,
        'video_url' => $request->video_url,
        'order' => $request->order
    ]);
}

public function show($id) {
    return Module::findOrFail($id);
}

public function update(Request $request, $id) {
    $modul = Module::findOrFail($id);
    $modul->update($request->all());
    return $modul;
}

}
