<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Auth\Authorization;
use App\Models\Task\Task;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'profile_image',
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

   /* protected function profileImage() : Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Storage::disk('public')->url($value) : null,
        );
    } */

    protected function profileImageUrl() : Attribute
    {
        return Attribute::make(
            get: function () {
                if (isset($this->attributes['profile_image']) && $this->attributes['profile_image']) {
                    return Storage::disk('public')->url($this->attributes['profile_image']);
                }
                return null;
            }
        );
    }

    protected function authorization(): HasOne
    {
        return $this->hasOne(Authorization::class, 'user_id');
    }

    protected function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'user_id');
    }

    public function getJWTIdentifier() { return $this->getKey(); }
    public function getJWTCustomClaims() { return []; }
}
