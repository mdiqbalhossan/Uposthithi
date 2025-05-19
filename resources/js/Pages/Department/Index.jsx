import { Head, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout.jsx";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRef, useEffect } from "react";

export default function Index({ departments, flash }) {
    const { delete: destroy } = useForm();
    const toast = useRef(null);

    // Check for flash messages on component mount and updates
    useEffect(() => {
        if (flash && flash.success) {
            showToast("success", "Success", flash.success);
        }
        if (flash && flash.error) {
            showToast("error", "Error", flash.error);
        }
    }, [flash]);

    const confirmDelete = (id) => {
        confirmDialog({
            message: "Are you sure you want to delete this department?",
            header: "Confirm Delete",
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-danger",
            accept: () => handleDelete(id),
            rejectClassName: "p-button-secondary",
            reject: () => {},
        });
    };

    const handleDelete = (id) => {
        destroy(route("departments.destroy", { department: id }), {
            preserveScroll: true,
            onSuccess: () => {
                showToast(
                    "success",
                    "Success",
                    "Department deleted successfully"
                );
            },
            onError: () => {
                showToast("error", "Error", "Failed to delete department");
            },
        });
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <Tag
                value={rowData.status}
                severity={rowData.status === "active" ? "success" : "danger"}
            />
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Link
                    href={route("departments.edit", { department: rowData.id })}
                >
                    <Button
                        icon="pi pi-pencil"
                        rounded
                        outlined
                        className="mr-2"
                    />
                </Link>
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => confirmDelete(rowData.id)}
                />
            </div>
        );
    };

    const indexBodyTemplate = (rowData, options) => {
        return options.rowIndex + 1;
    };

    // Show Toast Message
    const showToast = (severity, summary, detail) => {
        if (toast.current) {
            toast.current.show({
                severity,
                summary,
                detail,
                life: 3000,
            });
        }
    };

    return (
        <Layout>
            <Head title="Departments" />
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="card">
                <div className="flex justify-content-between align-items-center mb-4">
                    <h1 className="text-2xl font-semibold">Departments</h1>
                    <Link href={route("departments.create")}>
                        <Button label="Create Department" icon="pi pi-plus" />
                    </Link>
                </div>

                <DataTable
                    value={departments}
                    stripedRows
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: "50rem" }}
                >
                    <Column
                        field="id"
                        header="ID"
                        body={indexBodyTemplate}
                        sortable
                        style={{ width: "5%" }}
                    ></Column>
                    <Column
                        field="name"
                        header="Name"
                        sortable
                        style={{ width: "30%" }}
                    ></Column>
                    <Column
                        field="description"
                        header="Description"
                        style={{ width: "40%" }}
                    ></Column>
                    <Column
                        field="status"
                        header="Status"
                        body={statusBodyTemplate}
                        sortable
                        style={{ width: "10%" }}
                    ></Column>
                    <Column
                        body={actionBodyTemplate}
                        header="Actions"
                        style={{ width: "15%" }}
                    ></Column>
                </DataTable>
            </div>
        </Layout>
    );
}
