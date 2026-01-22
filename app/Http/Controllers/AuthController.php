<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Visitor;

class AuthController extends Controller
{
    public function index()
    {
        $recentVisitors = Visitor::orderBy('created_at', 'desc')->take(10)->get();
        $totalVisitorsToday = Visitor::getTotalVisitorsToday();
        $totalVisitorsThisMonth = Visitor::getTotalVisitorsThisMonth();
        $totalVisitorsThisYear = Visitor::getTotalVisitorsThisYear();
        $visitorsMonthly = Visitor::getVisitorsMonthly();

        return Inertia::render('dashboard', [
            'recentVisitors' => $recentVisitors,
            'totalVisitorsToday' => $totalVisitorsToday,
            'totalVisitorsThisMonth' => $totalVisitorsThisMonth,
            'totalVisitorsThisYear' => $totalVisitorsThisYear,
            'visitorsMonthly' => $visitorsMonthly,
        ]);
    }
}
