<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('posts',PostController::class);
    Route::post('/like/{post}/posts', [LikeController::class, 'likePost']);
    Route::post('/unlike/{post}/posts', [LikeController::class, 'unlikePost']);
    Route::post('/is-like/{post}/posts', [LikeController::class, 'isPostLikedByUser']);

    Route::post('/comment/{post}/posts', [CommentController::class, 'addCommentToPost']);




});

Route::apiResource('/users',UserController::class);
Route::apiResource('/sections',SectionController::class);
Route::get('/getSectionForForm',[SectionController::class,'getSectionForForm']);
Route::get('/users/search', [UserController::class, 'searchUsers']);
Route::post('/signup',[AuthController::class,'signup']);
Route::post('/login',[AuthController::class,'login']);

Route::get('/getSectionsWithResponsables',[SectionController::class,'getSectionsWithResponsables']);
Route::get('/getSectionsForMenu',[SectionController::class,'getSectionsForMenu']);
Route::get('/sections/{section}/responsables', [SectionController::class, 'getResponsablesForSection']);

Route::get('/users/{user}/posts', [UserController::class, 'getPostsUser']);

Route::get('/posts/{post}/likes', [PostController::class, 'getLikesNumberOfPost']);
Route::get('/posts/{post}/nbrComments', [PostController::class, 'getCommentNumberOfPost']);

Route::get('/posts/{post}/comments', [PostController::class, 'getCommentsWithUsers']);






