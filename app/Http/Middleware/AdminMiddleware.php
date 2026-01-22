<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is logged in and is an admin
        if (Auth::check() && Auth::user()->role === 'superadmin' || Auth::user()->role === 'admin') {
            return $next($request);
        }

        // If not admin, redirect or abort
        // return redirect('/404')->with('error', 'You do not have admin access.');
        // Or you can use: abort(403);
        return abort(403, 'You do not have admin access.');

    }
}
