"use client";

import React, { useRef } from "react";
import { useGeolocated } from "react-geolocated";

interface LocationCardByDateProps {
  inquiry: {
    customerName: string;
    mobileNo: string;
    alternateMobile?: string;
    address: string;
    city: string;
    pincode: string;
    note?: string;
    inquirySubCategories?: any;
  };
}

function LocationCardByDate({ inquiry }: LocationCardByDateProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  const latitude = coords?.latitude;
  const longitude = coords?.longitude;
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  const handleTakePhoto = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Captured photo:", file);
      // You can upload this file or preview it in the UI.
    }
  };

  return (
    <div className="text-sm bg-white dark:bg-gray-700 p-4 rounded shadow space-y-4">
      {/* Inquiry Details */}
      <div className="space-y-3 text-gray-800 dark:text-gray-100">
        <div className="text-xl font-medium bg-purple-100 text-purple-800 p-3 rounded-lg">
          {inquiry.inquirySubCategories?.[0]?.subCategory?.subCategoryName}
        </div>
        <div>
          <strong>Customer:</strong> {inquiry.customerName}
        </div>
        <div>
          <strong>Mobile:</strong> {inquiry.mobileNo}
          {inquiry.alternateMobile && ` , ${inquiry.alternateMobile}`}
        </div>
        <div>
          <strong>Address:</strong> {inquiry.address}, {inquiry.city} -{" "}
          {inquiry.pincode}
        </div>
        {inquiry.note && (
          <div>
            <strong>Note:</strong> {inquiry.note}
          </div>
        )}
      </div>

      {/* Google Map */}
      {!isGeolocationAvailable ? (
        <p>Your browser does not support Geolocation</p>
      ) : !isGeolocationEnabled ? (
        <p>Geolocation is not enabled</p>
      ) : coords ? (
        <>
          <div className="w-full h-64 rounded overflow-hidden">
            <iframe
              title="Current Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={googleMapsUrl}
            />
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open in Google Maps
          </a>
        </>
      ) : (
        <p>Getting the location...</p>
      )}

      {/* Take Photo Button */}
      <div>
        <button
          onClick={handleTakePhoto}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Take Photo
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </div>
    </div>
  );
}

export default LocationCardByDate;
