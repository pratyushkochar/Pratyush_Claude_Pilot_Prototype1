"use client";

import { Address } from "@/lib/types";

interface ShippingFormProps {
  address: Address;
  onChange: (address: Address) => void;
}

export default function ShippingForm({ address, onChange }: ShippingFormProps) {
  const update = (field: keyof Address, value: string) => {
    onChange({ ...address, [field]: value });
  };

  const inputClass =
    "w-full px-3 py-2.5 text-sm focus:outline-none transition-colors";
  const labelClass = "mb-1.5 block text-sm font-medium";

  return (
    <div
      className="bg-white p-6"
      style={{ border: '1px solid #e0e5ea', borderRadius: '12px' }}
    >
      {/* Section Header with Step Number */}
      <div className="mb-5 flex items-center gap-3">
        <span
          className="flex h-7 w-7 items-center justify-center text-sm font-bold text-white"
          style={{ backgroundColor: '#0068ef', borderRadius: '50%' }}
        >
          1
        </span>
        <h2 className="text-lg font-bold" style={{ color: '#001833' }}>
          Who&apos;s Checking In?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ color: '#001833' }}>
            First Name
          </label>
          <input
            type="text"
            value={address.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={inputClass}
            style={{ border: '1px solid #c0cad5', borderRadius: '8px' }}
            onFocus={(e) => { e.target.style.borderColor = '#0068ef'; e.target.style.boxShadow = '0 0 0 1px #0068ef'; }}
            onBlur={(e) => { e.target.style.borderColor = '#c0cad5'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <div>
          <label className={labelClass} style={{ color: '#001833' }}>
            Last Name
          </label>
          <input
            type="text"
            value={address.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className={inputClass}
            style={{ border: '1px solid #c0cad5', borderRadius: '8px' }}
            onFocus={(e) => { e.target.style.borderColor = '#0068ef'; e.target.style.boxShadow = '0 0 0 1px #0068ef'; }}
            onBlur={(e) => { e.target.style.borderColor = '#c0cad5'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <div>
          <label className={labelClass} style={{ color: '#001833' }}>
            Email
          </label>
          <input
            type="email"
            value={address.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            style={{ border: '1px solid #c0cad5', borderRadius: '8px' }}
            onFocus={(e) => { e.target.style.borderColor = '#0068ef'; e.target.style.boxShadow = '0 0 0 1px #0068ef'; }}
            onBlur={(e) => { e.target.style.borderColor = '#c0cad5'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <div>
          <label className={labelClass} style={{ color: '#001833' }}>
            Phone
          </label>
          <input
            type="tel"
            value={address.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            style={{ border: '1px solid #c0cad5', borderRadius: '8px' }}
            onFocus={(e) => { e.target.style.borderColor = '#0068ef'; e.target.style.boxShadow = '0 0 0 1px #0068ef'; }}
            onBlur={(e) => { e.target.style.borderColor = '#c0cad5'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>
    </div>
  );
}
