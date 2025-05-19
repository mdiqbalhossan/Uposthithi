<?php
namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with('department')->get();

        return Inertia::render('Course/Index', [
            'courses' => $courses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = Department::where('status', 'active')->get();

        return Inertia::render('Course/Create', [
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255|unique:courses',
            'course_code'   => 'required|string|max:50|unique:courses',
            'description'   => 'nullable|string',
            'status'        => 'required|in:active,inactive',
            'department_id' => 'required|exists:departments,id',
            'credit_hours'  => 'required|numeric|min:0',
        ]);

        Course::create($validated);

        return Redirect::route('courses.index')->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $course->load('department');

        return Inertia::render('Course/Show', [
            'course' => $course,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        $departments = Department::where('status', 'active')->get();

        return Inertia::render('Course/Edit', [
            'course'      => $course,
            'departments' => $departments,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255|unique:courses,name,' . $course->id,
            'course_code'   => 'required|string|max:50|unique:courses,course_code,' . $course->id,
            'description'   => 'nullable|string',
            'status'        => 'required|in:active,inactive',
            'department_id' => 'required|exists:departments,id',
            'credit_hours'  => 'required|numeric|min:0',
        ]);

        $course->update($validated);

        return Redirect::route('courses.index')->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return Redirect::route('courses.index')->with('success', 'Course deleted successfully.');
    }
}
