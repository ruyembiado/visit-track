<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Visitor;

class VisitorController extends Controller
{
    public function index()
    {
        $visitors = Visitor::orderBy('created_at', 'desc')->get();

        return Inertia::render('visitors', [
            'visitors' => $visitors,
        ]);
    }

    public function create()
    {
        return Inertia::render('visitor_add');
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'purpose' => 'required|string|max:1000',
        ]);

        Visitor::create($validated);

        return redirect()->route('visitors.index')->with('success', 'Visitor added successfully.');
    }

    public function edit($visitor_id)
    {
        $visitor = Visitor::findOrFail($visitor_id);

        return Inertia::render('visitor_edit', [
            'visitor' => $visitor,
        ]);
    }

    public function update(Request $request, $visitor_id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
            'purpose' => 'required|string|max:1000',
        ]);

        $visitor = Visitor::findOrFail($visitor_id);
        $visitor->update($validated);

        return redirect()->route('visitors.index')->with('success', 'Visitor updated successfully.');
    }

    public function destroy($visitor_id)
    {
        $visitor = Visitor::findOrFail($visitor_id);
        $visitor->delete();

        return redirect()->route('visitors.index')->with('success', 'Visitor deleted successfully.');
    }
}
