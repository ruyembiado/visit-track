<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Visitor extends Model
{
    protected $table = 'visitors';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'purpose',
    ];

    public static function getTotalVisitorsToday()
    {
        return self::whereDate('created_at', now()->toDateString())->count();
    }

    public static function getTotalVisitors()
    {
        return self::count();
    }

    public static function getTotalVisitorsThisMonth()
    {
        return self::whereYear('created_at', now()->year)
            ->whereMonth('created_at', now()->month)
            ->count();
    }

    public static function getTotalVisitorsThisYear()
    {
        return self::whereYear('created_at', now()->year)->count();
    }

    public static function getVisitorsMonthly(): Collection
    {
        $data = self::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
            ->groupBy('month')
            ->pluck('count', 'month');
        $allMonths = collect(range(1, 12))->map(function ($monthNumber) use ($data) {
            return [
                'month' => date('F', mktime(0, 0, 0, $monthNumber, 1)),
                'count' => $data[$monthNumber] ?? 0,
            ];
        });

        return $allMonths;
    }
}
