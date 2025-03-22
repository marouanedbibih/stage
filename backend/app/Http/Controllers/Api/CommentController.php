<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    
    public function addCommentToPost(Request $request, Post $post)
    {
        $data = $request->validate([
            'comment' => 'required|string',
        ]);
    
        $user = auth()->user();
    
        $comment = Comment::create([
            'comment' => $data['comment'],
            'user_id' => $user->id,
            'post_id' => $post->id,
        ]);
    
        return response()->json(['comment' => $comment], 201);
    }



    
}
