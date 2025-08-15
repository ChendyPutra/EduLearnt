<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'=>'required|string',
            'email'=>'required|email',
            'message'=>'required|string',
        ]);

        $f = Feedback::create($data);
        return response()->json(['message'=>'Feedback received','data'=>$f], 201);
    }
}
