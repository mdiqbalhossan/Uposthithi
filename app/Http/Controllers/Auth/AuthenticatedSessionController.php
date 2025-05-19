<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {

        $email         = session('auth.login.email');
        $attempts      = 0;
        $isLocked      = false;
        $remainingTime = 0;

        if ($email) {
            $throttleKey = Str::transliterate(Str::lower($email) . '|' . request()->ip());
            $attempts    = RateLimiter::attempts($throttleKey);
            $isLocked    = RateLimiter::tooManyAttempts($throttleKey, 5);

            if ($isLocked) {
                $remainingTime = RateLimiter::availableIn($throttleKey);
            }
        }

        return Inertia::render('Auth/Login', [
            'attempts'         => $attempts,
            'isLocked'         => $isLocked,
            'remainingTime'    => $remainingTime,
            'canResetPassword' => Route::has('password.request'),
            'status'           => session('status'),
            'showWarning'      => $attempts >= 3 && $attempts < 5,
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {

        // Store email in session for checking attempts
        session(['auth.login.email' => $request->email]);

        // Check if account is locked
        $throttleKey = Str::transliterate(Str::lower($request->email) . '|' . $request->ip());
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            return back()->withErrors([
                'email' => trans('auth.throttle', [
                    'seconds' => RateLimiter::availableIn($throttleKey),
                    'minutes' => ceil(RateLimiter::availableIn($throttleKey) / 60),
                ]),
            ]);
        }

        $request->authenticate();

        $request->session()->regenerate();

        // Clear the stored email after successful authentication
        session()->forget('auth.login.email');

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
