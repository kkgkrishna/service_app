"use client";

import { useState, useEffect } from "react";
import ManageEngineer from "@/components/ManageEngineer";
import DashboardLayout from "@/components/DashboardLayout";
import AddEngineerModal from "@/components/AddEngineer";
import { toast } from "react-hot-toast";
import CustomLoader from "../../../CustomPages/CustomLoader";

export default function EngineersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState<any>(null);
  const [categoriesList, setCategoriesList] = useState<
    { id: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState(false); // ✅ Add loader state

  useEffect(() => {
    fetchEngineers();
    fetchCategories();
  }, []);

  const fetchEngineers = async () => {
    setLoading(true); // ✅ Start loader
    try {
      const res = await fetch("/api/engineers");
      const data = await res.json();
      setEngineers(data);
    } catch {
      toast.error("Failed to fetch engineers");
    } finally {
      setLoading(false); // ✅ Stop loader
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategoriesList(data);
    } catch {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setModalType("add");
    setSelectedEngineer(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (engineer: any) => {
    setModalType("edit");
    setSelectedEngineer(engineer);
    setIsModalOpen(true);
  };

  const handleSaveEngineer = async (form: any) => {
    const isEdit = modalType === "edit";
    const url = isEdit
      ? `/api/engineers/${selectedEngineer.id}`
      : `/api/engineers`;
    const method = isEdit ? "PATCH" : "POST";

    setLoading(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success(isEdit ? "Engineer updated" : "Engineer added");
      setIsModalOpen(false);
      setSelectedEngineer(null);
      await fetchEngineers();
    } catch {
      toast.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* {!loading && <CustomLoader />} ✅ Show loader when loading */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Manage Engineers
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage engineer accounts
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add New Engineer
        </button>
      </div>
      <ManageEngineer
        engineers={engineers}
        onEdit={handleEditClick}
        onDeleteSuccess={fetchEngineers}
      />
      <AddEngineerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEngineer(null);
        }}
        onAdd={handleSaveEngineer}
        type={modalType}
        initialData={selectedEngineer}
        categoriesList={categoriesList}
      />
    </DashboardLayout>
  );
}
