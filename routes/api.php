<?php

use App\Http\Controllers\Api\AuthController;
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


