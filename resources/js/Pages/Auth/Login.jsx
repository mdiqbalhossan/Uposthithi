import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";

export default function Login({
    status,
    canResetPassword,
    attempts,
    isLocked,
    remainingTime,
    showWarning,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [remainingTimeDisplay, setRemainingTimeDisplay] = useState("");

    const [validationErrors, setValidationErrors] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    // Update countdown timer if account is locked
    useEffect(() => {
        if (!isLocked || remainingTime <= 0) return;

        const timer = setInterval(() => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            setRemainingTimeDisplay(
                `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
            );

            if (remainingTime <= 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [isLocked, remainingTime]);

    const validateEmail = (email) => {
        if (!email) {
            return "Email is required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }

        return "";
    };

    const validatePassword = (password) => {
        if (!password) {
            return "Password is required";
        }

        if (password.length < 8) {
            return "Password must be at least 8 characters";
        }

        return "";
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setData("email", value);
        setValidationErrors({
            ...validationErrors,
            email: validateEmail(value),
        });
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setData("password", value);
        setValidationErrors({
            ...validationErrors,
            password: validatePassword(value),
        });
    };

    const submit = (e) => {
        e.preventDefault();

        // Validate all fields before submission
        const emailError = validateEmail(data.email);
        const passwordError = validatePassword(data.password);

        setValidationErrors({
            email: emailError,
            password: passwordError,
        });

        // Only submit if there are no validation errors
        if (!emailError && !passwordError) {
            post(route("login"));
        }
    };

    function setChecked(checked) {
        return undefined;
    }

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex align-items-center justify-content-center flex-column">
                <img
                    src="/images/logo/-dark.svg"
                    alt="hyper"
                    height={50}
                    className="mb-3"
                />
                <div className="surface-card p-6 sm:p-4 shadow-2 border-round w-full lg:w-4">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">
                            Welcome to the Software
                        </div>
                    </div>
                    {status && (
                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                            {status}
                        </div>
                    )}
                    {isLocked && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            <p className="font-bold">Account Locked</p>
                            <p>
                                Too many failed login attempts. Please try again
                                in{" "}
                                {remainingTimeDisplay ||
                                    `${Math.ceil(remainingTime / 60)} minutes`}
                                .
                            </p>
                        </div>
                    )}

                    {!isLocked && showWarning && (
                        <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                            <p className="font-bold">Warning</p>
                            <p>
                                You have made {attempts} failed login attempts.
                                Your account will be locked after 5 failed
                                attempts.
                            </p>
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div>
                            <div className="mb-3">
                                <label
                                    htmlFor="email"
                                    className="block text-900 font-medium mb-2"
                                >
                                    Email
                                </label>
                                <InputText
                                    id="email"
                                    type="text"
                                    placeholder="Email address"
                                    className={`w-full ${
                                        validationErrors.email
                                            ? "p-invalid"
                                            : ""
                                    }`}
                                    value={data.email}
                                    onChange={handleEmailChange}
                                />
                                <InputError
                                    message={
                                        errors.email || validationErrors.email
                                    }
                                    className=""
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="block text-900 font-medium mb-2"
                                >
                                    Password
                                </label>
                                <InputText
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className={`w-full ${
                                        validationErrors.password
                                            ? "p-invalid"
                                            : ""
                                    }`}
                                    value={data.password}
                                    onChange={handlePasswordChange}
                                />
                                <InputError
                                    message={
                                        errors.password ||
                                        validationErrors.password
                                    }
                                    className=""
                                />
                            </div>

                            <div className="flex align-items-center justify-content-between mb-6">
                                <div className="flex align-items-center">
                                    <Checkbox
                                        inputId="rememberme-login"
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                        checked={data.remember}
                                        className="mr-2"
                                    />
                                    <label htmlFor="rememberme-login">
                                        Remember me
                                    </label>
                                </div>

                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton
                                label="Sign In"
                                className="w-full"
                                disabled={processing}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
