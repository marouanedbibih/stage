<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'cover_image',
    ];

    public function user(){
        return $this->hasMany(User::class);
    }

    public function article(){
        return $this->hasMany(Artcile::class);
    }

}
