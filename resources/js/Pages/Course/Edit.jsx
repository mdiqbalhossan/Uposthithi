import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";

export default function Edit({ course, departments }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: course.name || "",
        course_code: course.course_code || "",
        description: course.description || "",
        status: course.status || "active",
        department_id: course.department_id || "",
        credit_hours: course.credit_hours || 3,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("courses.update", { course: course.id }));
    };

    const statusOptions = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ];

    const departmentOptions = departments.map((dept) => ({
        label: dept.name,
        value: dept.id,
    }));

    return (
        <Layout>
            <Head title="Edit Course" />

            <div className="card">
                <div className="flex justify-content-between align-items-center mb-4">
                    <h1 className="text-2xl font-semibold">Edit Course</h1>
                    <Link href={route("courses.index")}>
                        <Button
                            label="Back to Courses"
                            icon="pi pi-arrow-left"
                            outlined
                        />
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="field mb-4">
                        <label htmlFor="name" className="font-bold mb-2 block">
                            Name
                        </label>
                        <InputText
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={classNames({ "p-invalid": errors.name })}
                        />
                        {errors.name && (
                            <small className="p-error">{errors.name}</small>
                        )}
                    </div>

                    <div className="field mb-4">
                        <label
                            htmlFor="course_code"
                            className="font-bold mb-2 block"
                        >
                            Course Code
                        </label>
                        <InputText
                            id="course_code"
                            value={data.course_code}
                            onChange={(e) =>
                                setData("course_code", e.target.value)
                            }
                            className={classNames({
                                "p-invalid": errors.course_code,
                            })}
                        />
                        {errors.course_code && (
                            <small className="p-error">
                                {errors.course_code}
                            </small>
                        )}
                    </div>

                    <div className="field mb-4">
                        <label
                            htmlFor="department_id"
                            className="font-bold mb-2 block"
                        >
                            Department
                        </label>
                        <Dropdown
                            id="department_id"
                            value={data.department_id}
                            onChange={(e) => setData("department_id", e.value)}
                            options={departmentOptions}
                            placeholder="Select a Department"
                            className={classNames({
                                "p-invalid": errors.department_id,
                            })}
                        />
                        {errors.department_id && (
                            <small className="p-error">
                                {errors.department_id}
                            </small>
                        )}
                    </div>

                    <div className="field mb-4">
                        <label
                            htmlFor="credit_hours"
                            className="font-bold mb-2 block"
                        >
                            Credit Hours
                        </label>
                        <InputNumber
                            id="credit_hours"
                            value={data.credit_hours}
                            onValueChange={(e) =>
                                setData("credit_hours", e.value)
                            }
                            mode="decimal"
                            minFractionDigits={1}
                            maxFractionDigits={1}
                            min={0}
                            className={classNames({
                                "p-invalid": errors.credit_hours,
                            })}
                        />
                        {errors.credit_hours && (
                            <small className="p-error">
                                {errors.credit_hours}
                            </small>
                        )}
                    </div>

                    <div className="field mb-4">
                        <label
                            htmlFor="status"
                            className="font-bold mb-2 block"
                        >
                            Status
                        </label>
                        <Dropdown
                            id="status"
                            value={data.status}
                            onChange={(e) => setData("status", e.value)}
                            options={statusOptions}
                            placeholder="Select a Status"
                            className={classNames({
                                "p-invalid": errors.status,
                            })}
                        />
                        {errors.status && (
                            <small className="p-error">{errors.status}</small>
                        )}
                    </div>

                    <div className="field mb-4">
                        <label
                            htmlFor="description"
                            className="font-bold mb-2 block"
                        >
                            Description
                        </label>
                        <InputTextarea
                            id="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            rows={5}
                            className={classNames({
                                "p-invalid": errors.description,
                            })}
                        />
                        {errors.description && (
                            <small className="p-error">
                                {errors.description}
                            </small>
                        )}
                    </div>

                    <div className="flex justify-content-end">
                        <Button
                            type="submit"
                            label="Update Course"
                            icon="pi pi-save"
                            className="w-auto"
                            disabled={processing}
                        />
                    </div>
                </form>
            </div>
        </Layout>
    );
}
