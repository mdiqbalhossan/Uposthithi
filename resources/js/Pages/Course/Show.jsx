import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

export default function Show({ course }) {
    return (
        <Layout>
            <Head title={`Course: ${course.name}`} />

            <div className="card">
                <div className="flex justify-content-between align-items-center mb-4">
                    <h1 className="text-2xl font-semibold">Course Details</h1>
                    <div className="flex gap-2">
                        <Link
                            href={route("courses.edit", { course: course.id })}
                        >
                            <Button label="Edit" icon="pi pi-pencil" outlined />
                        </Link>
                        <Link href={route("courses.index")}>
                            <Button
                                label="Back to Courses"
                                icon="pi pi-arrow-left"
                                outlined
                            />
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="p-3 border-round mb-4 bg-gray-50">
                        <h5 className="mb-2 text-lg font-medium">Name</h5>
                        <p>{course.name}</p>
                    </div>

                    <div className="p-3 border-round mb-4 bg-gray-50">
                        <h5 className="mb-2 text-lg font-medium">
                            Course Code
                        </h5>
                        <p>{course.course_code}</p>
                    </div>

                    <div className="p-3 border-round mb-4 bg-gray-50">
                        <h5 className="mb-2 text-lg font-medium">Department</h5>
                        <p>
                            {course.department ? course.department.name : "-"}
                        </p>
                    </div>

                    <div className="p-3 border-round mb-4 bg-gray-50">
                        <h5 className="mb-2 text-lg font-medium">
                            Credit Hours
                        </h5>
                        <p>{course.credit_hours}</p>
                    </div>

                    <div className="p-3 border-round mb-4 bg-gray-50">
                        <h5 className="mb-2 text-lg font-medium">Status</h5>
                        <Tag
                            value={course.status}
                            severity={
                                course.status === "active"
                                    ? "success"
                                    : "danger"
                            }
                        />
                    </div>

                    <div className="p-3 border-round mb-4 bg-gray-50">
                        <h5 className="mb-2 text-lg font-medium">
                            Description
                        </h5>
                        <p>
                            {course.description || "No description provided."}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
