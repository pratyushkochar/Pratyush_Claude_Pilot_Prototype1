"use client";

import { Address } from "@/lib/types";

interface BillingFormProps {
  address: Address;
  onChange: (address: Address) => void;
  sameAsShipping: boolean;
  onSameAsShippingChange: (same: boolean) => void;
}

export default function BillingForm({
  address,
  onChange,
  sameAsShipping,
  onSameAsShippingChange,
}: BillingFormProps) {
  const update = (field: keyof Address, value: string) => {
    onChange({ ...address, [field]: value });
  };

  const inputClass =
    "w-full px-3 py-2.5 text-sm focus:outline-none transition-colors";
  const labelClass = "mb-1.5 block text-sm font-medium";

  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#0068ef';
    e.target.style.boxShadow = '0 0 0 1px #0068ef';
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#c0cad5';
    e.target.style.boxShadow = 'none';
  };

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
          2
        </span>
        <h2 className="text-lg font-bold" style={{ color: '#001833' }}>
          Billing Address
        </h2>
      </div>

      <label className="mb-4 flex cursor-pointer items-center gap-2.5 text-sm">
        <input
          type="checkbox"
          checked={sameAsShipping}
          onChange={(e) => onSameAsShippingChange(e.target.checked)}
          className="h-4 w-4 rounded"
          style={{ accentColor: '#0068ef' }}
        />
        <span style={{ color: '#001833' }}>Same as contact information</span>
      </label>

      {!sameAsShipping && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={{ color: '#001833' }}>First Name</label>
            <input type="text" value={address.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} style={{ border: '1px solid #c0cad5', borderRadius: '8px' }} onFocus={inputFocus} onBlur={inputBlur} />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#001833' }}>Last Name</label>
            <input type="text" value={address.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} style={{ border: '1px solid #c0cad5', borderRadius: '8px' }} onFocus={inputFocus} onBlur={inputBlur} />
          </div>
          <div className="col-span-2">
            <label className={labelClass} style={{ color: '#001833' }}>Address Line 1</label>
            <input type="text" value={address.line1} onChange={(e) => update("line1", e.target.value)} className={inputClass} style={{ border: '1px solid #c0cad5', borderRadius: '8px' }} onFocus={inputFocus} onBlur={inputBlur} />
          </div>
          <div className="col-span-2">
            <label className={labelClass} style={{ color: '#001833' }}>Address Line 2</label>
            <input type="text" value={address.line2} onChange={(e) => update("line2", e.target.value)} className={inputClass} style={{ border: '1px solid #c0cad5', borderRadius: '8px' }} onFocus={inputFocus} onBlur={inputBlur} />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#001833' }}>City</label>
            <input type="text" value={address.city} onChange={(e) => update("city", e.target.value)} className={inputClass} style={{ border: '1px solid #c0cad5', borderRadius: '8px' }} onFocus={inputFocus} onBlur={inputBlur} />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#001833' }}>State</label>
            <input type="text" value={address.state} onChange={(e) => update("state", e.target.value)} className={inputClass} style={{ border: '1px solid #c0cad5', borderRadius: '8px' }} onFocus={inputFocus} onBlur={inputBlur} />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#001833' }}>ZIP Code</label>
            <input type="text" value={address.zipcode} onChange={(e) => update("zipcode", e.target.value)} className={inputClass} style={{ border: '1px solid #c0cad5', borderRadius: '8px' }} onFocus={inputFocus} onBlur={inputBlur} />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#001833' }}>Country</label>
            <input type="text" value={address.country} onChange={(e) => update("country", e.target.value)} className={inputClass} style={{ border: '1px solid #c0cad5', borderRadius: '8px' }} onFocus={inputFocus} onBlur={inputBlur} />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#001833' }}>Phone</label>
            <input type="tel" value={address.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} style={{ border: '1px solid #c0cad5', borderRadius: '8px' }} onFocus={inputFocus} onBlur={inputBlur} />
          </div>
          <div>
            <label className={labelClass} style={{ color: '#001833' }}>Email</label>
            <input type="email" value={address.email} onChange={(e) => update("email", e.target.value)} className={inputClass} style={{ border: '1px solid #c0cad5', borderRadius: '8px' }} onFocus={inputFocus} onBlur={inputBlur} />
          </div>
        </div>
      )}
    </div>
  );
}
