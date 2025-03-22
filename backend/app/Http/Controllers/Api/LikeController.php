<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LikeController extends Controller
{
    public function likePost(Post $post)
    {
        // Get the authenticated user
        $user = Auth::user();

        // Check if the user has already liked the post
        $existingLike = Like::where('user_id', $user->id)
                            ->where('post_id', $post->id)
                            ->first();

        if ($existingLike) {
            // If the user has already liked the post, you can handle this case (e.g., return an error response)
            return response()->json(['error' => 'You have already liked this post.'], 400);
        }

        // Create a new like
        $like = Like::create([
            'like' => true, // You can set the like value as needed
            'user_id' => $user->id,
            'post_id' => $post->id,
        ]);

        // Optionally, you may want to update the number of likes in the Post model

        return response()->json(['like' => $like], 201); // You can adjust the HTTP status code as needed
    }

    public function unlikePost(Post $post)
    {
        // Get the authenticated user
        $user = Auth::user();

        // Check if the user has already liked the post
        $existingLike = Like::where('user_id', $user->id)
                            ->where('post_id', $post->id)
                            ->first();

        if (!$existingLike) {
            // If the user has not liked the post, you can handle this case (e.g., return an error response)
            return response()->json(['error' => 'You have not liked this post.'], 400);
        }

        // Delete the existing like
        $existingLike->delete();

        // Optionally, you may want to update the number of likes in the Post model

        return response()->json(['message' => 'Like removed successfully.'], 200); // You can adjust the HTTP status code and message as needed
    }

    public function isPostLikedByUser(Post $post)
    {
        // Get the authenticated user
        $user = Auth::user();

        // Check if the user has already liked the post
        $existingLike = Like::where('user_id', $user->id)
                            ->where('post_id', $post->id)
                            ->first();

        // Return true if liked, false otherwise
        return response()->json(['liked' => $existingLike ? true : false], 200);
    }
}
