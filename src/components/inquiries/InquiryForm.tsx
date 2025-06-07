"use client";

import {
  useCreateInquiryMutation,
  useGetAllCategoriesQuery,
  useGetAllSubCategoriesByCategoryIdQuery,
} from "@/store/apiSlice";
import React, { useEffect, useState } from "react";
import { getCitiesByState, states } from "../../../Utils/Utils";
import CustomLoader from "../../../CustomPages/CustomLoader";
import toast from "react-hot-toast";

function InquiryForm({
  isOpen,
  onClose,
  mode,
  refetchInquiries,
}: {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  refetchInquiries: () => void;
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>("");
  const [stateName, setStateName] = useState<any>("");
  const [cities, setCities] = useState<any[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});
  const [inquiryData, setInquiryData] = useState<any>({
    customerName: "",
    mobileNo: "",
    alternateMobile: "",
    email: "",
    inquiryCategories: [],
    inquirySubCategories: [],
    note: "",
    address: "",
    landmark: "",
    state: "",
    city: "",
    pincode: "",
    callbackTime: null,
    appointmentTime: null,
    amount: "599",
    status: "PENDING",
    userId: "663b4d4ef2a0112a0f3d9e92",
    priority: "HIGH",
    remark: "",
    invoiceCustomer: "",
    cancelInquiry: false,
    engineerId: null,
    feedback: "",
    cancelReason: "",
    service: "service",
  });

  const { data: categoriesApiData, isLoading: isLoadingCategories } =
    useGetAllCategoriesQuery();
  const { data: subCategoriesApiData, isLoading: isLoadingSubCategories } =
    useGetAllSubCategoriesByCategoryIdQuery(selectedCategoryId, {
      skip: !selectedCategoryId,
    });

  const [createInquiry, { isLoading: isCreatingInquiry }] =
    useCreateInquiryMutation();

  useEffect(() => {
    console.log("stateName", stateName);
    const cities = getCitiesByState(stateName);
    setCities(cities);
  }, [stateName]);

  const handleSubCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setInquiryData({
      ...inquiryData,
      inquiryCategories: [categoryId],
    });
  };

  const validateForm = () => {
    const errors: any = {};

    if (!inquiryData.customerName.trim())
      errors.customerName = "Customer name is required";
    if (!inquiryData.mobileNo.trim())
      errors.mobileNo = "Mobile number is required";
    if (!inquiryData.alternateMobile.trim())
      errors.alternateMobile = "Alternate mobile number is required";
    if (!inquiryData.email.trim()) errors.email = "Email is required";

    if (!inquiryData.inquiryCategories.length)
      errors.inquiryCategories = "Category is required";
    if (!inquiryData.inquirySubCategories.length)
      errors.inquirySubCategories = "Sub Category is required";
    if (!inquiryData.address.trim()) errors.address = "Address is required";
    if (!inquiryData.state.trim()) errors.state = "State is required";
    if (!inquiryData.city.trim()) errors.city = "City is required";
    if (!inquiryData.pincode.trim()) errors.pincode = "Pincode is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    console.log("inquiryData", inquiryData);

    try {
      const response = await createInquiry(inquiryData);
      console.log("response", response);
      if (response.data) {
        toast.success("Inquiry created successfully");
        onClose();
        refetchInquiries();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {(isLoadingCategories || isLoadingSubCategories || isCreatingInquiry) && (
        <CustomLoader />
      )}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[80vh] overflow-y-auto">
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
                          className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 `}
                          onChange={(e) => {
                            setInquiryData({
                              ...inquiryData,
                              customerName: e.target.value,
                            });
                          }}
                        />
                        {formErrors.customerName && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.customerName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Mobile Number*
                        </label>
                        <input
                          type="tel"
                          className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 `}
                          onChange={(e) => {
                            setInquiryData({
                              ...inquiryData,
                              mobileNo: e.target.value,
                            });
                          }}
                        />
                        {formErrors.mobileNo && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.mobileNo}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Alternate Mobile
                        </label>
                        <input
                          type="tel"
                          className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 `}
                          onChange={(e) => {
                            setInquiryData({
                              ...inquiryData,
                              alternateMobile: e.target.value,
                            });
                          }}
                        />
                        {formErrors.alternateMobile && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.alternateMobile}
                          </p>
                        )}
                      </div>{" "}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Id
                        </label>
                        <input
                          type="tel"
                          className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 `}
                          onChange={(e) => {
                            setInquiryData({
                              ...inquiryData,
                              email: e.target.value,
                            });
                          }}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.email}
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
                          Category*
                        </label>
                        <select
                          className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 `}
                          onChange={(e) => {
                            handleSubCategoryChange(e.target.value);
                          }}
                        >
                          <option value="">Select a category</option>
                          {categoriesApiData?.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {formErrors.inquiryCategories && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.inquiryCategories}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Sub Category*
                        </label>
                        <select
                          className={`w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 `}
                          onChange={(e) => {
                            setInquiryData({
                              ...inquiryData,
                              inquirySubCategories: [e.target.value],
                            });
                          }}
                        >
                          <option value="">Select a sub category</option>
                          {subCategoriesApiData?.subcategories?.map(
                            (subCategory: any) => (
                              <option
                                key={subCategory.id}
                                value={subCategory.id}
                              >
                                {subCategory.subCategoryName}
                              </option>
                            )
                          )}
                        </select>
                        {formErrors.inquirySubCategories && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.inquirySubCategories}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Note
                        </label>
                        <textarea
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                          rows={3}
                          onChange={(e) => {
                            setInquiryData({
                              ...inquiryData,
                              note: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
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
                          onChange={(e) => {
                            setInquiryData({
                              ...inquiryData,
                              address: e.target.value,
                            });
                          }}
                        />
                        {formErrors.address && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.address}
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
                          onChange={(e) => {
                            setInquiryData({
                              ...inquiryData,
                              landmark: e.target.value,
                            });
                          }}
                        />
                        {formErrors.landmark && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.landmark}
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
                          onChange={(e) => {
                            setStateName(e.target.value);
                            setInquiryData({
                              ...inquiryData,
                              state: e.target.value,
                            });
                          }}
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {formErrors.state && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.state}
                          </p>
                        )}
                      </div>

                      {/* City Dropdown with Loader */}
                      <div className="relative">
                        <select
                          className="w-full p-2 border rounded"
                          style={{ maxHeight: "40dvh", overflowY: "auto" }}
                          disabled={loadingCities}
                          onChange={(e) => {
                            setInquiryData({
                              ...inquiryData,
                              city: e.target.value,
                            });
                          }}
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
                        {formErrors.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.city}
                          </p>
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
                          onChange={(e) => {
                            setInquiryData({
                              ...inquiryData,
                              pincode: e.target.value,
                            });
                          }}
                        />
                        {formErrors.pincode && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.pincode}
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
              disabled={isCreatingInquiry}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm 
             
              `}
              onClick={handleSubmit}
            >
              {isCreatingInquiry ? (
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
              disabled={isCreatingInquiry}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InquiryForm;
