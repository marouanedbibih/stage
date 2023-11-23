<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Tools\ImageController;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    protected $imageController;
    public function __construct(ImageController $imageController)
    {
        $this->imageController = $imageController;
    }
    public function getAllPostsWithUser()
    {
        // Get all posts with user information, comments, and likes
        $posts = Post::with('user')
            ->withCount('comment', 'like') // Add counts for comments and likes
            ->orderByDesc('created_at')
            ->paginate(5);

        // Return the posts with user information, comment count, and like count in the response
        return response()->json(['posts' => $posts], 200);
    }

    public function store(StorePostRequest $request)
    {
        // Validate the request
        $data = $request->validated();

        // Check if the user is authenticated
        $user = auth()->user();

        if (!$user) {
            // If the user is not authenticated, you might want to return an error response or handle it accordingly.
            return response(['error' => 'User not authenticated'], 401);
        }

        if (isset($data['file'])) {
            $relativePath = $this->imageController->uploadImage($data['file'], 'posts/', '-post');
            $data['url_media'] = $relativePath;
            unset($data['file']); // Remove the 'file' key as it's no longer needed
        }

        $post = Post::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'url_media' => $data['url_media'], // Use the updated key
            'user_id' => $user->id
        ]);

        return response(['post' => $post], 200);
    }
    public function update(UpdatePostRequest $request, Post $post)
    {
        $data = $request->validated();
        $user = auth()->user();

        if (!$user) {
            // If the user is not authenticated, you might want to return an error response or handle it accordingly.
            return response(['error' => 'User not authenticated'], 401);
        }

        if (isset($data['file'])) {
            $relativePath = $this->imageController->uploadImage($data['file'], 'posts/', '-post');
            $data['url_media'] = $relativePath;
            unset($data['file']);
            $this->imageController->removeImage($post->url_media);
        } else {
            $data['url_media'] = $post->url_media;
        }

        /** @var \App\Models\Post $post */
        $post->update($data);

        return response([
            'message' => 'Post updated successfully',
            'post' => $post,
        ]);
    }
    public function show(Post $post)
    {
        $user = $post->user; // Retrieve user information associated with the post
        $likesCount = $post->like()->count(); // Count the number of likes for the post
        $commentsCount = $post->comment()->count(); // Count the number of comments for the post
    
        $data = [
            'post' => $post,
            'likes_count' => $likesCount,
            'comments_count' => $commentsCount,
            'user' => $user,

        ];
    
        return response(['data' => $data]);
    }
    

    public function destroy(Post $post)
    {

        $this->imageController->removeImage($post->url_media);

        $post->delete();

        return response([
            "message" => "Post delete succufuly"
        ], 204);
    }

    public function getLikesNumberOfPost(Post $post)
    {
        if (!$post) {
            // If the post is not found, return an error response
            return response()->json(['error' => 'Post not found'], 404);
        }

        // Get the number of likes for the post
        $numberOfLikes = $post->like()->count();

        // Return the number of likes in the response
        return response()->json(['likes' => $numberOfLikes], 200);
    }

    public function getCommentNumberOfPost(Post $post)
    {
        if (!$post) {
            // If the post is not found, return an error response
            return response()->json(['error' => 'Post not found'], 404);
        }

        // Get the number of likes for the post
        $numberOfComments = $post->comment()->count();

        // Return the number of likes in the response
        return response()->json(['nbrComments' => $numberOfComments], 200);
    }

    public function getCommentsWithUsers(Post $post)
    {
        if (!$post) {
            // If the post is not found, return an error response
            return response()->json(['error' => 'Post not found'], 404);
        }

        // Get all comments for the post with user information in descending order
        $comments = $post->comment()->with('user')->orderBy('created_at', 'desc')->get();

        // Return the comments with user information in the response
        return response()->json(['comments' => $comments], 200);
    }
}
