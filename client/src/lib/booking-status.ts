export const BOOKING_STATUSES = {
  // Pre-Trip Statuses
  pending: {
    label: "Pending",
    description: "Initial booking submitted, awaiting organizer review",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    dotColor: "bg-yellow-500"
  },
  confirmed: {
    label: "Confirmed", 
    description: "Organizer has confirmed the booking and availability",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    dotColor: "bg-blue-500"
  },
  paid: {
    label: "Paid",
    description: "Payment has been received and processed", 
    color: "bg-green-100 text-green-800 border-green-200",
    dotColor: "bg-green-500"
  },
  documents_pending: {
    label: "Documents Pending",
    description: "Waiting for passport/visa documents from pilgrim",
    color: "bg-orange-100 text-orange-800 border-orange-200", 
    dotColor: "bg-orange-500"
  },
  documents_verified: {
    label: "Documents Verified",
    description: "All required documents have been verified",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dotColor: "bg-emerald-500"
  },
  
  // Trip Management Statuses
  preparing: {
    label: "Preparing",
    description: "Trip is being prepared (visa processing, hotel bookings, etc.)",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    dotColor: "bg-purple-500"
  },
  ready: {
    label: "Ready",
    description: "Everything is prepared, trip is ready to commence",
    color: "bg-cyan-100 text-cyan-800 border-cyan-200",
    dotColor: "bg-cyan-500"
  },
  in_progress: {
    label: "In Progress", 
    description: "Trip is currently happening",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    dotColor: "bg-indigo-500"
  },
  completed: {
    label: "Completed",
    description: "Trip finished successfully",
    color: "bg-green-100 text-green-800 border-green-200",
    dotColor: "bg-green-500"
  },
  
  // Special Statuses
  cancelled_by_pilgrim: {
    label: "Cancelled by Pilgrim",
    description: "Pilgrim cancelled the booking",
    color: "bg-red-100 text-red-800 border-red-200",
    dotColor: "bg-red-500"
  },
  cancelled_by_organizer: {
    label: "Cancelled by Organizer", 
    description: "Organizer cancelled due to insufficient bookings or other reasons",
    color: "bg-red-100 text-red-800 border-red-200",
    dotColor: "bg-red-500"
  },
  refunded: {
    label: "Refunded",
    description: "Booking was cancelled and refund processed",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    dotColor: "bg-gray-500"
  },
  no_show: {
    label: "No Show",
    description: "Pilgrim didn't show up for departure", 
    color: "bg-slate-100 text-slate-800 border-slate-200",
    dotColor: "bg-slate-500"
  }
} as const;

export type BookingStatus = keyof typeof BOOKING_STATUSES;

export const STATUS_CATEGORIES = {
  "Pre-Trip": ["pending", "confirmed", "paid", "documents_pending", "documents_verified"],
  "Trip Management": ["preparing", "ready", "in_progress", "completed"],
  "Cancelled/Issues": ["cancelled_by_pilgrim", "cancelled_by_organizer", "refunded", "no_show"]
} as const;

export function getStatusInfo(status: string) {
  return BOOKING_STATUSES[status as BookingStatus] || {
    label: status,
    description: "Unknown status",
    color: "bg-gray-100 text-gray-800 border-gray-200",
    dotColor: "bg-gray-500"
  };
}