<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VisitorController;
use App\Http\Controllers\ReportController;

// Public Routes
Route::get('/', [AdminController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Auth Controller Routes
    Route::get('dashboard', [AuthController::class, 'index'])->name('dashboard');

    //Admin Controller Routes
    Route::get('users', [AdminController::class, 'users'])->name('users.index');
    Route::get('reporting', [AdminController::class, 'reporting'])->name('reporting.index');
    Route::get('reporting/download', [AdminController::class, 'download_report'])->name('reporting.download');

    // Visitor Controller Routes
    Route::get('visitors', [VisitorController::class, 'index'])->name('visitors.index');
    Route::get('add-visitor', [VisitorController::class, 'create'])->name('visitors.create');
    Route::post('add-visitor', [VisitorController::class, 'store'])->name('visitors.store');
    Route::get('edit-visitor/{visitor_id}', [VisitorController::class, 'edit'])->name('visitors.edit');
    Route::put('update-visitor/{visitor_id}', [VisitorController::class, 'update'])->name('visitors.update');
    Route::delete('delete-visitor/{visitor_id}', [VisitorController::class, 'destroy'])->name('visitors.destroy');

});

require __DIR__ . '/settings.php';
