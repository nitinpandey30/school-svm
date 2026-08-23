import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

import {
  getFees,
  createFee,
  updateFee,
  deleteFee,
} from "../../api/fee.api";

function ManageFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    className: "",
    admissionFee: "",
    tuitionFee: "",
    annualFee: "",
    examFee: "",
    otherCharges: "0",
  });

  const fetchFees = async () => {
    try {
      const response = await getFees();

      setFees(response.fees || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      className: "",
      admissionFee: "",
      tuitionFee: "",
      annualFee: "",
      examFee: "",
      otherCharges: "0",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const feeData = {
        ...formData,
        admissionFee: Number(formData.admissionFee),
        tuitionFee: Number(formData.tuitionFee),
        annualFee: Number(formData.annualFee),
        examFee: Number(formData.examFee),
        otherCharges: Number(formData.otherCharges || 0),
      };

      if (editingId) {
        await updateFee(editingId, feeData);
      } else {
        await createFee(feeData);
      }

      resetForm();
      fetchFees();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (fee) => {
    setEditingId(fee._id);

    setFormData({
      className: fee.className || "",
      admissionFee: fee.admissionFee ?? "",
      tuitionFee: fee.tuitionFee ?? "",
      annualFee: fee.annualFee ?? "",
      examFee: fee.examFee ?? "",
      otherCharges: fee.otherCharges ?? 0,
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this fee structure?"
    );

    if (!confirmed) return;

    try {
      await deleteFee(id);
      fetchFees();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to delete fee structure."
      );
    }
  };

  return (
    <div className="p-6 sm:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Fee Structure
          </h1>

          <p className="text-slate-500 mt-2">
            Manage class-wise school fees.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);

            setFormData({
              className: "",
              admissionFee: "",
              tuitionFee: "",
              annualFee: "",
              examFee: "",
              otherCharges: "0",
            });

            setShowForm(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
        >
          <Plus size={19} />
          Add Fee Structure
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {editingId ? "Edit Fee Structure" : "Add Fee Structure"}
            </h2>

            <button
              onClick={resetForm}
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={21} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Class */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Class
              </label>

              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                required
                disabled={!!editingId}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
              >
                <option value="">Select Class</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>

              {editingId && (
                <p className="text-xs text-slate-400 mt-2">
                  Class cannot be changed while editing.
                </p>
              )}
            </div>

            {/* Fee Fields */}
            <div className="grid sm:grid-cols-2 gap-5">

              <FeeInput
                label="Admission Fee"
                name="admissionFee"
                value={formData.admissionFee}
                onChange={handleChange}
              />

              <FeeInput
                label="Tuition Fee"
                name="tuitionFee"
                value={formData.tuitionFee}
                onChange={handleChange}
              />

              <FeeInput
                label="Annual Fee"
                name="annualFee"
                value={formData.annualFee}
                onChange={handleChange}
              />

              <FeeInput
                label="Exam Fee"
                name="examFee"
                value={formData.examFee}
                onChange={handleChange}
              />

              <FeeInput
                label="Other Charges"
                name="otherCharges"
                value={formData.otherCharges}
                onChange={handleChange}
                required={false}
              />

            </div>

            {/* Buttons */}
            <div className="flex gap-3">

              <button
                type="submit"
                disabled={saving}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Fee"
                    : "Create Fee"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Fee List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">
            Class-wise Fee Structure
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Loading fee structures...
          </div>
        ) : fees.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No fee structures found.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">
                    Class
                  </th>

                  <th className="text-left px-6 py-4 font-semibold text-slate-700">
                    Admission
                  </th>

                  <th className="text-left px-6 py-4 font-semibold text-slate-700">
                    Tuition
                  </th>

                  <th className="text-left px-6 py-4 font-semibold text-slate-700">
                    Annual
                  </th>

                  <th className="text-left px-6 py-4 font-semibold text-slate-700">
                    Exam
                  </th>

                  <th className="text-left px-6 py-4 font-semibold text-slate-700">
                    Other
                  </th>

                  <th className="text-right px-6 py-4 font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">

                {fees.map((fee) => (
                  <tr key={fee._id} className="hover:bg-slate-50">

                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {fee.className}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      ₹{fee.admissionFee}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      ₹{fee.tuitionFee}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      ₹{fee.annualFee}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      ₹{fee.examFee}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      ₹{fee.otherCharges}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() => handleEdit(fee)}
                          className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(fee._id)}
                          className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}

function FeeInput({
  label,
  name,
  value,
  onChange,
  required = true,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min="0"
        required={required}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default ManageFees;