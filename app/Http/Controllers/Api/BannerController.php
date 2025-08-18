<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class BannerController extends Controller
{
    public function index()
    {
        try {
            $banners = Banner::orderBy('created_at', 'desc')->get();
            return response()->json($banners);
        } catch (\Exception $e) {
            Log::error('Error fetching banners: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch banners'], 500);
        }
    }

    public function show($id)
    {
        try {
            $banner = Banner::findOrFail($id);
            return response()->json($banner);
        } catch (\Exception $e) {
            Log::error('Error fetching banner: ' . $e->getMessage());
            return response()->json(['error' => 'Banner not found'], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'type' => 'required|in:info,announcement,promotion',
                'is_active' => 'boolean',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date|after:start_date',
                'image_url' => 'nullable|string|url'
            ]);

            // Handle date format conversion from frontend
            $startDate = $validated['start_date'] ? $validated['start_date'] : null;
            $endDate = $validated['end_date'] ? $validated['end_date'] : null;

            // Validate date logic
            if ($startDate && $endDate && $startDate >= $endDate) {
                return response()->json(['error' => 'End date must be after start date'], 422);
            }

            $banner = Banner::create([
                'title' => strip_tags($validated['title']),
                'content' => strip_tags($validated['content']),
                'type' => $validated['type'],
                'is_active' => $validated['is_active'] ?? true,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'image_url' => $validated['image_url'] ?? null
            ]);

            return response()->json($banner, 201);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $e->validator->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating banner: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create banner'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $banner = Banner::findOrFail($id);
            
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'type' => 'required|in:info,announcement,promotion',
                'is_active' => 'boolean',
                'start_date' => 'nullable|date',
                'end_date' => 'nullable|date|after:start_date',
                'image_url' => 'nullable|string|url'
            ]);

            // Handle date format conversion
            $startDate = $validated['start_date'] ? $validated['start_date'] : null;
            $endDate = $validated['end_date'] ? $validated['end_date'] : null;

            // Validate date logic
            if ($startDate && $endDate && $startDate >= $endDate) {
                return response()->json(['error' => 'End date must be after start date'], 422);
            }

            $banner->update([
                'title' => strip_tags($validated['title']),
                'content' => strip_tags($validated['content']),
                'type' => $validated['type'],
                'is_active' => $validated['is_active'] ?? true,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'image_url' => $validated['image_url'] ?? null
            ]);

            return response()->json($banner);

        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'messages' => $e->validator->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error updating banner: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update banner'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $banner = Banner::findOrFail($id);
            $banner->delete();
            return response()->json(['message' => 'Banner deleted successfully']);
        } catch (\Exception $e) {
            Log::error('Error deleting banner: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete banner'], 500);
        }
    }

    public function getActiveBanners()
    {
        try {
            $banners = Banner::where('is_active', true)
                            ->where(function($query) {
                                $query->whereNull('start_date')
                                      ->orWhere('start_date', '<=', now());
                            })
                            ->where(function($query) {
                                $query->whereNull('end_date')
                                      ->orWhere('end_date', '>=', now());
                            })
                            ->orderBy('created_at', 'desc')
                            ->get();

            return response()->json($banners);
        } catch (\Exception $e) {
            Log::error('Error fetching active banners: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch active banners'], 500);
        }
    }
}
