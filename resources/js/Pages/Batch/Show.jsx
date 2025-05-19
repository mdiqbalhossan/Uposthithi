import { Head, Link } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

export default function Show({ batch }) {
    return (
        <Layout>
            <Head title={`Batch: ${batch.name}`} />

            <div className="card">
                <div className="flex justify-content-between align-items-center mb-4">
                    <h1 className="text-2xl font-semibold">Batch Details</h1>
                    <div className="flex gap-2">
                        <Link href={route("batches.edit", { batch: batch.id })}>
                            <Button label="Edit" icon="pi pi-pencil" outlined />
                        </Link>
                        <Link href={route("batches.index")}>
                            <Button
                                label="Back to Batches"
                                icon="pi pi-arrow-left"
                                outlined
                            />
                        </Link>
                    </div>
                </div>

                <div className="grid">
                    <div className="col-12 md:col-6">
                        <div className="p-3 border-round mb-4 bg-gray-50">
                            <h5 className="mb-2 text-lg font-medium">Name</h5>
                            <p>{batch.name}</p>
                        </div>
                    </div>

                    <div className="col-12 md:col-6">
                        <div className="p-3 border-round mb-4 bg-gray-50">
                            <h5 className="mb-2 text-lg font-medium">
                                Department
                            </h5>
                            <p>
                                {batch.department ? batch.department.name : "-"}
                            </p>
                        </div>
                    </div>

                    <div className="col-12 md:col-6">
                        <div className="p-3 border-round mb-4 bg-gray-50">
                            <h5 className="mb-2 text-lg font-medium">Status</h5>
                            <Tag
                                value={batch.status}
                                severity={
                                    batch.status === "active"
                                        ? "success"
                                        : "danger"
                                }
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="p-3 border-round mb-4 bg-gray-50">
                            <h5 className="mb-2 text-lg font-medium">
                                Description
                            </h5>
                            <p>
                                {batch.description ||
                                    "No description provided."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
