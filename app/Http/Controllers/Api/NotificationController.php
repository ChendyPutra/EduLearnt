<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    // Admin endpoints
    public function index()
    {
        $notifications = Notification::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($notifications);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'required|in:info,success,warning,error',
            'user_id' => 'nullable|exists:users,id',
            'is_global' => 'boolean'
        ]);

        $notification = Notification::create([
            'title' => $validated['title'],
            'message' => $validated['message'],
            'type' => $validated['type'],
            'user_id' => $validated['user_id'],
            'is_global' => $validated['is_global'] ?? false
        ]);

        return response()->json($notification, 201);
    }

    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();
        return response()->json(['message' => 'Notification deleted']);
    }

    // Student endpoints
    public function getUserNotifications(Request $request)
    {
        $user = $request->user();
        $notifications = Notification::forUser($user->id)
                                   ->orderBy('created_at', 'desc')
                                   ->get();

        return response()->json($notifications);
    }

    public function markAsRead(Request $request, $id)
    {
        $user = $request->user();
        $notification = Notification::where('id', $id)
                                  ->where(function($q) use ($user) {
                                      $q->where('user_id', $user->id)
                                        ->orWhere('is_global', true);
                                  })
                                  ->firstOrFail();

        $notification->update(['is_read' => true]);
        return response()->json(['message' => 'Notification marked as read']);
    }

    public function markAllAsRead(Request $request)
    {
        $user = $request->user();
        Notification::forUser($user->id)->update(['is_read' => true]);
        return response()->json(['message' => 'All notifications marked as read']);
    }

    public function getUnreadCount(Request $request)
    {
        $user = $request->user();
        $count = Notification::forUser($user->id)->unread()->count();
        return response()->json(['count' => $count]);
    }
}