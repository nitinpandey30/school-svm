import { useEffect, useState } from "react";
import {
  FileText,
  Upload,
  Trash2,
  Eye,
  Pencil,
  X,
} from "lucide-react";

import {
  getFees,
  createFee,
  updateFee,
  deleteFee,
} from "../../api/fee.api";

function ManageFees() {
  const [fees, setFees] = useState([]);
  const [academicYear, setAcademicYear] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchFees = async () => {
    try {
      const data = await getFees();
      setFees(data.fees || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const resetForm = () => {
    setAcademicYear("");
    setPdfFile(null);
    setEditingId(null);

    const input = document.getElementById("feePdf");

    if (input) {
      input.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!academicYear) {
      alert("Academic year is required");
      return;
    }

    // PDF is required only while creating
    if (!editingId && !pdfFile) {
      alert("Please select a PDF");
      return;
    }

    if (pdfFile) {
      if (pdfFile.type !== "application/pdf") {
        alert("Only PDF files are allowed");
        return;
      }

      if (pdfFile.size > 10 * 1024 * 1024) {
        alert("PDF size must be less than 10 MB");
        return;
      }
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("academicYear", academicYear);

      if (pdfFile) {
        formData.append("pdf", pdfFile);
      }

      if (editingId) {
        await updateFee(editingId, formData);
        alert("Fee structure updated successfully");
      } else {
        await createFee(formData);
        alert("Fee structure uploaded successfully");
      }

      resetForm();
      fetchFees();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (fee) => {
    setEditingId(fee._id);
    setAcademicYear(fee.academicYear);
    setPdfFile(null);

    const input = document.getElementById("feePdf");

    if (input) {
      input.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fee structure?"
    );

    if (!confirmDelete) return;

    try {
      await deleteFee(id);

      alert("Fee structure deleted successfully");

      fetchFees();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to delete fee structure"
      );
    }
  };

 return (
  <div className="p-4 sm:p-6">

    {/* Header */}
    <div className="mb-6 sm:mb-8">
      <p className="text-blue-600 font-semibold text-xs sm:text-sm">
        ADMINISTRATION
      </p>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
        Manage Fee Structure
      </h1>

      <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">
        Upload and manage fee structure PDFs for different academic years.
      </p>
    </div>


    {/* Form */}
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
            {editingId ? <Pencil size={20} /> : <Upload size={20} />}
          </div>

          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              {editingId
                ? "Edit Fee Structure"
                : "Upload Fee Structure"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {editingId
                ? "Update academic year or replace the PDF."
                : "Upload the fee structure PDF for an academic year."}
            </p>
          </div>

        </div>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="p-2 text-slate-400 hover:text-slate-700 self-start sm:self-auto"
            title="Cancel Edit"
          >
            <X size={21} />
          </button>
        )}

      </div>


      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

        {/* Academic Year */}
        <div>

          <label className="block text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
            Academic Year
          </label>

          <input
            type="text"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            placeholder="e.g. 2026-27"
            required
            className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>


        {/* PDF */}
        <div>

          <label className="block text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
            {editingId ? "Replace PDF" : "Fee Structure PDF"}
          </label>

          <input
            id="feePdf"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="w-full border border-slate-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm"
          />

          <p className="text-xs text-slate-400 mt-1.5 sm:mt-2">
            PDF only • Maximum size 10 MB
          </p>

          {editingId && (
            <p className="text-xs text-blue-600 mt-1">
              Leave empty if you only want to change the academic year.
            </p>
          )}

        </div>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition"
          >
            {editingId ? <Pencil size={18} /> : <Upload size={18} />}

            {loading
              ? "Saving..."
              : editingId
                ? "Update Fee Structure"
                : "Upload Fee Structure"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition"
            >
              <X size={18} />
              Cancel
            </button>
          )}

        </div>

      </form>
    </div>


    {/* Existing Fees */}
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

      <div className="p-4 sm:p-6 border-b border-slate-200">

        <h2 className="text-base sm:text-lg font-semibold text-slate-900">
          Uploaded Fee Structures
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage existing fee structure documents.
        </p>

      </div>


      {fees.length === 0 ? (

        <div className="text-center py-12 sm:py-16 px-4">

          <FileText
            size={40}
            className="mx-auto text-slate-300 mb-2 sm:mb-3"
          />

          <p className="text-slate-500 text-sm sm:text-base">
            No fee structures uploaded yet.
          </p>

        </div>

      ) : (

        <div className="divide-y divide-slate-100">

          {fees.map((fee) => (

            <div
              key={fee._id}
              className="p-3 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >

              <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                  <FileText size={20} />
                </div>

                <div className="min-w-0">

                  <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
                    Academic Year {fee.academicYear}
                  </h3>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Uploaded{" "}
                    {new Date(
                      fee.createdAt
                    ).toLocaleDateString("en-IN")}
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">

                {/* View */}
                <a
                  href={fee.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs sm:text-sm font-medium transition"
                >
                  <Eye size={16} />
                  View
                </a>

                {/* Edit */}
                <button
                  onClick={() => handleEdit(fee)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs sm:text-sm font-medium transition"
                >
                  <Pencil size={16} />
                  Edit
                </button>


                {/* Delete */}
                <button
                  onClick={() => handleDelete(fee._id)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs sm:text-sm font-medium transition"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
);
}

export default ManageFees;