<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Tools\ImageController;
use App\Http\Requests\Section\StoreSectionRequest;
use App\Http\Requests\Section\UpdateSectionRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    protected $imageController;
    public function __construct(ImageController $imageController)
    {
        $this->imageController = $imageController;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $sections = Section::all();

            return response()->json([
                'message' => 'Sections retrieved successfully',
                'sections' => $sections,
            ], 200);
        } catch (\Exception $e) {
            // Handle exceptions if any
            return response()->json([
                'message' => 'Failed to retrieve sections',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function getSectionForForm(){
        try {
            $sections = Section::select('id', 'name')->get();

            return response()->json([
                'message' => 'Sections retrieved successfully',
                'sections' => $sections,
            ], 200);
        } catch (\Exception $e) {
            // Handle exceptions if any
            return response()->json([
                'message' => 'Failed to retrieve sections',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSectionRequest $request)
    {
        $data = $request->validated();
        if (isset($data['cover_image'])) {
            $relativePath = $this->imageController->uploadImage($data['cover_image'], 'images/sections/', '-section');
            $data['cover_image'] = $relativePath;
        }else{
            $data['cover_image'] = "images/sections/cover-default.jpg";
        }
        /** @var \App\Models\Section $section */
        $section = Section::create($data);

        return response([
            'message' => 'Section add sucufuly',
            'section' => $section ,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Section $section)
    {
        return response(['section' => $section]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSectionRequest $request, Section $section)
    {
        $data = $request->validated();
    
        // Check if image was given and save on local file system
        if (isset($data['cover_image'])) {
            // Upload the new image
            $relativePath = $this->imageController->uploadImage($data['cover_image'], 'images/sections/', '-section');
            $data['cover_image'] = $relativePath;
    
            // Remove the old image if it's not the default image
            if ($section->cover_image !== 'image/sections/cover-default.jpg') {
                $this->imageController->removeImage($section->cover_image);
            }
        }else{
            $data['cover_image'] = $section->cover_image;
        }
    
        /** @var \App\Models\Section $section */
        $section->update($data);
    
        return response([
            'message' => 'Section updated successfully',
            'section' => $section,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Section $section)
    {
        if ($section->cover_image !== 'images/sections/cover-default.jpg') {
            $this->imageController->removeImage($section->cover_image);
        }
    
        $section->delete();
    
        return response([
            "message" => "section delete succufuly"
        ], 204);
    }

    public function getSectionsWithResponsables(){
        try {
            // Retrieve sections with their responsible user where user role is 1
            $sections = Section::with(['user' => function ($query) {
                $query->where('role', 1);
            }])->get();
    
            return response()->json([
                'message' => 'Sections retrieved successfully',
                'sections' => $sections,
            ], 200);
        } catch (\Exception $e) {
            // Handle exceptions if any
            return response()->json([
                'message' => 'Failed to retrieve sections',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    
    
    
    
    

}
