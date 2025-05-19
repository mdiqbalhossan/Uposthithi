<?php
namespace App\Http\Controllers;

use App\Models\Batch;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $batches = Batch::with('department')->get();

        return Inertia::render('Batch/Index', [
            'batches' => $batches,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = Department::where('status', 'active')->get();

        return Inertia::render('Batch/Create', [
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'description'   => 'nullable|string',
            'status'        => 'required|in:active,inactive',
            'department_id' => 'required|exists:departments,id',
        ]);

        Batch::create($validated);

        return Redirect::route('batches.index')->with('success', 'Batch created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Batch $batch)
    {
        $batch->load('department');

        return Inertia::render('Batch/Show', [
            'batch' => $batch,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Batch $batch)
    {
        $departments = Department::where('status', 'active')->get();

        return Inertia::render('Batch/Edit', [
            'batch'       => $batch,
            'departments' => $departments,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Batch $batch)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'description'   => 'nullable|string',
            'status'        => 'required|in:active,inactive',
            'department_id' => 'required|exists:departments,id',
        ]);

        $batch->update($validated);

        return Redirect::route('batches.index')->with('success', 'Batch updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Batch $batch)
    {
        $batch->delete();

        return Redirect::route('batches.index')->with('success', 'Batch deleted successfully.');
    }
}
