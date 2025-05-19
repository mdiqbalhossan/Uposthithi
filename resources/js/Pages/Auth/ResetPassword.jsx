import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const [validationErrors, setValidationErrors] = useState({
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

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

    const validatePasswordConfirmation = (passwordConfirmation, password) => {
        if (!passwordConfirmation) {
            return "Confirm Password is required";
        }

        if (passwordConfirmation !== password) {
            return "Passwords don't match";
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
            password_confirmation: validatePasswordConfirmation(
                data.password_confirmation,
                value
            ),
        });
    };

    const handlePasswordConfirmationChange = (e) => {
        const value = e.target.value;
        setData("password_confirmation", value);
        setValidationErrors({
            ...validationErrors,
            password_confirmation: validatePasswordConfirmation(
                value,
                data.password
            ),
        });
    };

    const submit = (e) => {
        e.preventDefault();

        // Validate all fields before submission
        const emailError = validateEmail(data.email);
        const passwordError = validatePassword(data.password);
        const passwordConfirmationError = validatePasswordConfirmation(
            data.password_confirmation,
            data.password
        );

        setValidationErrors({
            email: emailError,
            password: passwordError,
            password_confirmation: passwordConfirmationError,
        });

        // Only submit if there are no validation errors
        if (!emailError && !passwordError && !passwordConfirmationError) {
            post(route("password.store"));
        }
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

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
                            Reset Password
                        </div>
                    </div>

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
                                    autoComplete="username"
                                    readOnly={true}
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
                                    placeholder="New password"
                                    className={`w-full ${
                                        validationErrors.password
                                            ? "p-invalid"
                                            : ""
                                    }`}
                                    value={data.password}
                                    onChange={handlePasswordChange}
                                    autoComplete="new-password"
                                />
                                <InputError
                                    message={
                                        errors.password ||
                                        validationErrors.password
                                    }
                                    className=""
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-900 font-medium mb-2"
                                >
                                    Confirm Password
                                </label>
                                <InputText
                                    id="password_confirmation"
                                    type="password"
                                    placeholder="Confirm new password"
                                    className={`w-full ${
                                        validationErrors.password_confirmation
                                            ? "p-invalid"
                                            : ""
                                    }`}
                                    value={data.password_confirmation}
                                    onChange={handlePasswordConfirmationChange}
                                    autoComplete="new-password"
                                />
                                <InputError
                                    message={
                                        errors.password_confirmation ||
                                        validationErrors.password_confirmation
                                    }
                                    className=""
                                />
                            </div>

                            <PrimaryButton
                                label="Reset Password"
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
