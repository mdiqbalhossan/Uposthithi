import { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const [validationErrors, setValidationErrors] = useState({
        email: "",
    });

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

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setData("email", value);
        setValidationErrors({
            ...validationErrors,
            email: validateEmail(value),
        });
    };

    const submit = (e) => {
        e.preventDefault();

        // Validate email before submission
        const emailError = validateEmail(data.email);
        setValidationErrors({
            email: emailError,
        });

        // Only submit if there are no validation errors
        if (!emailError) {
            post(route("password.email"));

            setData("email", "");
            setValidationErrors({
                email: "",
            });
        }
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

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
                            Forgot Password
                        </div>
                        <div className="text-600 mb-4">
                            Forgot your password? No problem. Just let us know
                            your email address and we will email you a password
                            reset link that will allow you to choose a new one.
                        </div>
                    </div>

                    {status && (
                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                            {status}
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

                            <PrimaryButton
                                label="Email Password Reset Link"
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
