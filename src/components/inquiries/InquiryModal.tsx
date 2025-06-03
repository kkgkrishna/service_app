"use client";

import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { formatDateForInput, stateCityMap, states } from "../../../Utils/Utils";

const inquirySchema = z.object({
  customerName: z.string().min(3, "Name must be at least 3 characters"),
  mobileNo: z
    .string()
    .regex(/^\d{10}$/, "Must be a valid 10-digit mobile number"),
  city: z.string().min(2, "City must be at least 2 characters"),
  service: z.string().min(1, "Please select a service"),
  amount: z.number().min(0, "Amount must be positive"),
  callbackTime: z.string().min(1, "Callback time is required"),
  appointmentTime: z.string().min(1, "Appointment time is required"),
  status: z.enum(["PENDING", "ACTIVE", "RESOLVED", "CLOSED"]),
  userId: z.string(), // add this
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]), // add this
  alternateMobile: z
    .string()
    .regex(/^\d{10}$/, "Must be a valid 10-digit mobile number")
    .optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  landmark: z
    .string()
    .min(2, "Landmark must be at least 2 characters")
    .optional(),
  pincode: z.string().regex(/^\d{6}$/, "Must be a valid 6-digit pincode"),
  state: z.string().min(1, "State is required"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  onSubmit: (data: InquiryFormData) => Promise<void>;
  inquiry?: {
    id: string;
    customerName: string;
    mobileNo: string;
    city: string;
    service: string;
    callbackTime: string;
    appointmentTime: string;
    amount: number;
    status: string;
    userId: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    state: string;
    alternateMobile: string;
    address: string;
    landmark: string;
    pincode: string;
  };
}

const InquiryModal: FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  mode,
  onSubmit,
  inquiry,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      customerName: "",
      mobileNo: "",
      city: "",
      service: "",
      amount: 0,
      callbackTime: "",
      appointmentTime: "",
      status: "PENDING",
      userId: "663b4d4ef2a0112a0f3d9e92", // static default
      priority: "HIGH", // static default
    },
  });
  const [formattedCallbackTime, setFormattedCallbackTime] = useState("");
  const [formattedAppointmentTime, setFormattedAppointmentTime] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    if (inquiry) {
      // Format dates for datetime-local input
      console.log("inquiry", inquiry);

      const formattedCallback = formatDateForInput(inquiry.callbackTime);
      const formattedAppointment = formatDateForInput(inquiry.appointmentTime);

      setValue("customerName", inquiry.customerName);
      setValue("mobileNo", inquiry.mobileNo);
      setValue("city", inquiry.city);
      setValue("service", inquiry.service);
      setValue("amount", inquiry.amount);

      setValue(
        "status",
        inquiry.status as "PENDING" | "ACTIVE" | "RESOLVED" | "CLOSED"
      );
      setValue("userId", inquiry.userId || "663b4d4ef2a0112a0f3d9e92");
      setValue("priority", inquiry.priority as "LOW" | "MEDIUM" | "HIGH");
      setValue("state", inquiry.state);

      setFormattedCallbackTime(formattedCallback);
      setFormattedAppointmentTime(formattedAppointment);

      setValue("callbackTime", formattedCallback);
      setValue("appointmentTime", formattedAppointment);
      setValue("alternateMobile", inquiry.alternateMobile || "");
      setValue("address", inquiry.address || "");
      setValue("landmark", inquiry.landmark || "");
      setValue("pincode", inquiry.pincode || "");
      setValue("city", inquiry.city || "");
    }
  }, [inquiry, setValue]);

  useEffect(() => {
    if (inquiry?.state) {
      setCities(stateCityMap[inquiry.state] || []);
    }
  }, [inquiry]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "state" && value.state) {
        setLoadingCities(true);
        setTimeout(() => {
          setCities(value.state ? stateCityMap[value.state] || [] : []);
          setValue("city", ""); // Reset city when state changes
          setLoadingCities(false);
        }, 300);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  const handleFormSubmit = async (data: InquiryFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      // You could add toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[90vh] overflow-y-auto">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    {mode === "add" ? "Add New Inquiry" : "Edit Inquiry"}
                  </h3>
                  <div className="mt-6 grid grid-cols-2 gap-6">
                    {/* Customer Details Section */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg h-full flex flex-col">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Customer Details
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Customer Name*
                          </label>
                          <input
                            type="text"
                            className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 ${
                              errors.customerName ? "border-red-500" : ""
                            }`}
                            {...register("customerName")}
                          />
                          {errors.customerName && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.customerName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Mobile Number*
                          </label>
                          <input
                            type="tel"
                            className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 ${
                              errors.mobileNo ? "border-red-500" : ""
                            }`}
                            {...register("mobileNo")}
                          />
                          {errors.mobileNo && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.mobileNo.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Alternate Mobile
                          </label>
                          <input
                            type="tel"
                            className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 ${
                              errors.alternateMobile ? "border-red-500" : ""
                            }`}
                            {...register("alternateMobile")}
                          />
                          {errors.alternateMobile && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.alternateMobile.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Service Details Section */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg h-full flex flex-col">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Service Details
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Service Type*
                          </label>
                          <select
                            className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 ${
                              errors.service ? "border-red-500" : ""
                            }`}
                            {...register("service")}
                          >
                            <option value="">Select a service</option>
                            <option>
                              Split / Window (Deep Cleaning with Jet Pump)
                            </option>
                            <option>Split / Window (FOAM)</option>
                            <option>General Service</option>
                            <option>AC Repair</option>
                          </select>
                          {errors.service && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.service.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Amount*
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 ${
                              errors.amount ? "border-red-500" : ""
                            }`}
                            {...register("amount", {
                              required: "Please enter a valid amount",
                              valueAsNumber: true,
                              validate: (v) =>
                                !isNaN(v) || "Please enter a valid number",
                            })}
                          />
                          {errors.amount && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.amount.message}
                            </p>
                          )}
                        </div>
                      </div>
                      {/* User ID (hidden or read-only if fixed) */}
                      <input type="hidden" {...register("userId")} />
                      {/* Priority */}
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg h-full flex flex-col">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Priority
                        </h4>
                        <select
                          className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 ${
                            errors.priority ? "border-red-500" : ""
                          }`}
                          {...register("priority")}
                        >
                          <option value="LOW">Low</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="HIGH">High</option>
                        </select>
                        {errors.priority && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.priority.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg h-full flex flex-col">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Schedule
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Callback Time*
                          </label>
                          <input
                            type="datetime-local"
                            defaultValue={formattedCallbackTime}
                            className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 ${
                              errors.callbackTime ? "border-red-500" : ""
                            }`}
                            {...register("callbackTime")}
                          />
                          {errors.callbackTime && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.callbackTime.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Appointment Time*
                          </label>
                          <input
                            type="datetime-local"
                            defaultValue={formattedAppointmentTime}
                            className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 ${
                              errors.appointmentTime ? "border-red-500" : ""
                            }`}
                            {...register("appointmentTime")}
                          />
                          {errors.appointmentTime && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.appointmentTime.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status Section */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg h-full flex flex-col">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Status
                      </h4>
                      <select
                        className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 ${
                          errors.status ? "border-red-500" : ""
                        }`}
                        {...register("status")}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="ACTIVE">Active</option>
                        <option value="RESOLVED">Resolved</option>
                        <option value="CLOSED">Closed</option>
                      </select>
                      {errors.status && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.status.message}
                        </p>
                      )}
                    </div>

                    {/* Address Section */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Address Details
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        {/* Address */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Address*
                          </label>
                          <textarea
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                            rows={3}
                            {...register("address")}
                          />
                          {errors.address && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.address.message}
                            </p>
                          )}
                        </div>

                        {/* Landmark */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Landmark
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                            {...register("landmark")}
                          />
                          {errors.landmark && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.landmark.message}
                            </p>
                          )}
                        </div>

                        {/* State Dropdown */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            State*
                          </label>
                          <select
                            className="w-full p-2 border rounded"
                            {...register("state")}
                          >
                            <option value="">Select State</option>
                            {states.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </select>
                          {errors.state && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.state.message}
                            </p>
                          )}
                        </div>

                        {/* City Dropdown with Loader */}
                        <div className="relative">
                          <select
                            className="w-full p-2 border rounded"
                            style={{ maxHeight: "40dvh", overflowY: "auto" }}
                            {...register("city")}
                            disabled={!watch("state") || loadingCities}
                          >
                            {loadingCities ? (
                              <option>Loading cities...</option>
                            ) : (
                              <>
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                  <option key={city} value={city}>
                                    {city}
                                  </option>
                                ))}
                              </>
                            )}
                          </select>

                          {/* Loading indicator */}
                          {loadingCities && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                            </div>
                          )}
                        </div>

                        {/* Pincode */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Pincode*
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                            {...register("pincode")}
                          />
                          {errors.pincode && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.pincode.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-primary-700"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : mode === "add" ? (
                  "Create Inquiry"
                ) : (
                  "Update Inquiry"
                )}
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
