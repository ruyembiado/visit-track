<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Laravel\Fortify\Features;
use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }

    public function users()
    {
        $users = User::orderBy('created_at', 'desc')->get();

        return Inertia::render('users', [
            'users' => $users,
        ]);
    }

    public function reporting(Request $request)
    {
        $year = $request->year ?? now()->year;
        $month = $request->month ?? now()->month;

        $visitors = Visitor::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('reporting', [
            'visitors' => $visitors,
            'filters' => [
                'year' => $year,
                'month' => $month,
            ],
        ]);
    }

    public function download_report(Request $request)
    {
        $year  = (int) ($request->year ?? now()->year);
        $month = (int) ($request->month ?? now()->month);

        $visitors = Visitor::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->orderBy('created_at', 'asc')
            ->get();

        $monthName = \Carbon\Carbon::createFromDate($year, $month, 1)->format('F');

        $pdf = Pdf::loadView('reports.visitor_pdf', [
            'visitors' => $visitors,
            'year' => $year,
            'month' => $monthName,
        ])
        ->setPaper('A4', 'portrait');

        return $pdf->download("Visitor_Report_{$monthName}_{$year}.pdf");
    }
}
