<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'course_code',
        'description',
        'status',
        'department_id',
        'credit_hours',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
