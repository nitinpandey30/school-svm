import { useEffect, useState } from "react";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { getFees } from "../../api/fee.api";

function FeeStructure() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const data = await getFees();

        setFees(data.fees || data.data || data);
      } catch (error) {
        console.error(error);
        setError("Unable to load fee structure");
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500">Loading fee structure...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-14 h-14 mx-auto rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
            <GraduationCap size={28} />
          </div>

          <p className="text-blue-600 font-semibold">
            SCHOOL FEES
          </p>

          <h1 className="text-4xl font-bold text-slate-900 mt-2">
            Fee Structure
          </h1>

          <p className="text-slate-500 mt-4">
            View the annual fee structure for students from Class 6
            to Class 12.
          </p>
        </div>

        {fees.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed">
            <p className="text-slate-500">
              Fee structure is not available right now.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {fees.map((fee) => {
              const total =
                Number(fee.admissionFee) +
                Number(fee.tuitionFee) * 12 +
                Number(fee.annualFee) +
                Number(fee.examFee) +
                Number(fee.otherCharges);

              return (
                <div
                  key={fee._id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition"
                >
                  <div className="bg-blue-700 text-white p-6">
                    <p className="text-blue-200 text-sm">
                      Academic Session 2026-27
                    </p>

                    <h2 className="text-2xl font-bold mt-1">
                      {fee.className}
                    </h2>
                  </div>

                  <div className="p-6 space-y-4">

                    <FeeRow
                      label="Admission Fee"
                      value={fee.admissionFee}
                    />

                    <FeeRow
                      label="Monthly Tuition Fee"
                      value={fee.tuitionFee}
                    />

                    <FeeRow
                      label="Annual Charges"
                      value={fee.annualFee}
                    />

                    <FeeRow
                      label="Examination Fee"
                      value={fee.examFee}
                    />

                    <FeeRow
                      label="Other Charges"
                      value={fee.otherCharges}
                    />

                    <div className="border-t border-slate-200 pt-5 flex justify-between">
                      <span className="font-semibold text-slate-700">
                        Approx. Annual
                      </span>

                      <span className="text-xl font-bold text-blue-700">
                        ₹{total.toLocaleString("en-IN")}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">

          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Fee Includes
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Academic Tuition",
              "Annual School Activities",
              "Examination Charges",
              "Library Facilities",
              "Computer Lab",
              "Co-curricular Activities",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-slate-600"
              >
                <CheckCircle2
                  size={19}
                  className="text-green-600 shrink-0"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

function FeeRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="font-medium text-slate-900 text-sm">
        ₹{Number(value).toLocaleString("en-IN")}
      </span>
    </div>
  );
}

export default FeeStructure;