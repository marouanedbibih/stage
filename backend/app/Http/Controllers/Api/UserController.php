<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Tools\ImageController;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;


class UserController extends Controller
{
    protected $imageController;
    public function __construct(ImageController $imageController)
    {
        $this->imageController = $imageController;
    }

    public function index()
    {
        $users = DB::table('users')
            // ->leftJoin('sections', 'users.section_id', '=', 'sections.id')
            ->select(
                'users.id',
                'users.name',
                'users.email',
                'users.image',
                'users.role',
                'users.created_at',
            )
            ->orderBy('users.created_at', 'desc')
            ->paginate(7);

        return UserResource::collection($users);
    }
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        if (isset($data['image'])) {
            $relativePath = $this->imageController->uploadImage($data['image'], 'images/users/', '-user');
            $data['image'] = $relativePath;

        } else {
            $data['image'] = "images/users/default-profile.png";
        }
        /** @var \App\Models\User $user */
        $user = User::create($data);
        return response([
            'message' => 'User add sucufuly',
            'user' => new UserResource($user),
        ]);
    }

    public function show(User $user)
    {
        // Eager load the 'section' relationship to avoid N+1 queries
        // $user = User::with('section')->find($user->id);

        // if (!$user) {
        //     return response()->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        // }

        // $userInfo = [
        //     'id' => $user->id,
        //     'name' => $user->name,
        //     'email' => $user->email,
        //     'role' => $user->role,
        //     'image' => $user->image,
        //     'created_at' => $user->created_at,
        //     'section_id' => $user->section_id,
        //     'section_name' => $user->section->name,
        // ];

        return response()->json(['user' => new UserResource($user)], Response::HTTP_OK);
    }
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        // Check if image was given and save on local file system
        if (isset($data['image'])) {
            // Upload the new image
            $relativePath = $this->imageController->uploadImage($data['image'], 'images/users/', '-user');
            $data['image'] = $relativePath;


            // Remove the old image if it's not the default image
            if ($user->image !== 'image/users/default-profile.png') {
                $this->imageController->removeImage($user->image);
            }

        } else {
            $data['image'] = $user->image;
        }

        /** @var \App\Models\User $user */
        $user->update($data);

        return response([
            'message' => 'User updated successfully',
            'user' => new UserResource($user),
        ]);
    }

    public function destroy(User $user)
    {
        if ($user->image !== 'images/users/default-profile.png') {
            $this->imageController->removeImage($user->image);
        }


        $user->delete();

        return response([
            "message" => "user delete succufuly"
        ], 204);
    }


    public function getPostsUser(User $user)
    {
        $posts = $user->post()->withCount('comment', 'like')->with('user')->orderBy('created_at', 'desc')->get();

        $transformedPosts = $posts->map(function ($post) {
            return [
                'post' => $post,
            ];
        });

        return response(['posts' => $transformedPosts], Response::HTTP_OK);
    }
}
