<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdminRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is an admin (role = 1)
        if ($request->user() && $request->user()->role == 1) {
            return $next($request);
        }

        // If not an admin, you can redirect or return an error response
        return redirect('/')->with('error', 'You do not have permission to access this resource.');
    }
}
