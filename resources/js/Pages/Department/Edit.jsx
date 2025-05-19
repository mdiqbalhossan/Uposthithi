import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

export default function Edit({ department }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: department.name || "",
        description: department.description || "",
        status: department.status || "active",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("departments.update", { department: department.id }));
    };

    const statusOptions = [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
    ];

    return (
        <Layout>
            <Head title="Edit Department" />

            <div className="card">
                <div className="flex justify-content-between align-items-center mb-4">
                    <h1 className="text-2xl font-semibold">Edit Department</h1>
                    <Link href={route("departments.index")}>
                        <Button
                            label="Back to Departments"
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

                    <div className="flex justify-content-end">
                        <Button
                            type="submit"
                            label="Update Department"
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
