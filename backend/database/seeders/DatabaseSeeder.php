<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
<<<<<<< HEAD
        \App\Models\Section::factory(10)->create();
        \App\Models\User::factory(100)->create();
=======
        \App\Models\User::factory(100)->create();
        \App\Models\Post::factory(500)->create();
        \App\Models\Like::factory(5000)->create();
        \App\Models\Comment::factory(2000)->create();



>>>>>>> back

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
