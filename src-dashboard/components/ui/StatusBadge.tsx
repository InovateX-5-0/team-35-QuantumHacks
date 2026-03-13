import React from 'react';

type StatusType = 'confirmed' | 'pending' | 'cancelled' | 'available' | 'adopted' | 'medical hold' | 'approved' | 'rejected' | 'processing' | 'shipped' | 'delivered';

interface StatusBadgeProps {
  status: StatusType;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    confirmed: 'bg-green-100 text-green-800',
    approved: 'bg-green-100 text-green-800',
    delivered: 'bg-green-100 text-green-800',
    available: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    rejected: 'bg-red-100 text-red-800',
    'medical hold': 'bg-red-100 text-red-800',
    adopted: 'bg-blue-100 text-blue-800',
    shipped: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};
