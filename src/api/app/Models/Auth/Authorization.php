<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User\User;

class Authorization extends Model
{
    use SoftDeletes;

    protected $table = 'authorizations';

    protected $fillable = [
        'user_id',
        'refresh_token',
        'recovery_token',
        'recovery_expires_at'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}