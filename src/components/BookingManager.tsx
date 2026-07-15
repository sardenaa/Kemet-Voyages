import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Clock, MessageSquare, CheckCircle, Sparkles, Printer } from 'lucide-react';
import { Booking, Excursion } from '../types';
import ReviewSystem from './ReviewSystem';
import ScrollItineraryModal from './ScrollItineraryModal';

const STATUS_CONFIG = {
  'Pending Oracle Approval': {
    colorClass: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    barColor: 'bg-amber-500',
    icon: Clock,
    labelText: '𓀚 Reviewing',
    descText: 'Our team is reviewing your request and will approve it soon.',
  },
  'Confirmed by High Priest': {
    colorClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    barColor: 'bg-emerald-500',
    icon: CheckCircle,
    labelText: '𓋹 Confirmed',
    descText: 'Your spot is officially booked and ready to go!',
  },
  'Completed': {
    colorClass: 'bg-sky-500/10 border-sky-500/30 text-sky-400',
    barColor: 'bg-sky-500',
    icon: Sparkles,
    labelText: '𓁠 Completed',
    descText: 'We hope you had an amazing experience on your adventure!',
  }
};

interface BookingManagerProps {
  bookings: Booking[];
  excursions?: Excursion[];
  onCancelBooking?: (id: string) => void;
}

export default function BookingManager({ bookings, excursions, onCancelBooking }: BookingManagerProps) {
  const [selectedScrollBooking, setSelectedScrollBooking] = useState<Booking | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="ledger-manager-grid">
      
      {/* LEFT COLUMN: Sacred Booking Ledger (Pending Statuses) */}
      <div className="lg:col-span-6 space-y-6" id="bookings-ledger-col">
        <div className="flex items-center gap-2 border-b border-[#d4af37]/20 pb-3">
          <FileText className="text-[#d4af37] w-5 h-5" />
          <h3 className="font-serif text-xl font-bold text-[#e6c280] uppercase tracking-wider">
            Your Booked Expeditions
          </h3>
        </div>

        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12 bg-[#1a1410] border border-[#d4af37]/15 rounded-2xl text-stone-500 italic text-sm">
              𓀞 You haven't booked any trips yet. Browse our tours above to plan your adventure!
            </div>
          ) : (
            <AnimatePresence>
              {bookings.map((booking) => {
                const config = STATUS_CONFIG[booking.status] || STATUS_CONFIG['Pending Oracle Approval'];
                const StatusIcon = config.icon;

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-[#1f1a14] border border-[#d4af37]/30 rounded-xl p-5 space-y-3 shadow-md relative overflow-hidden"
                  >
                    {/* Status Indicator Bar */}
                    <div className={`absolute top-0 right-0 h-1.5 w-1/3 ${config.barColor}`}></div>

                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest block">
                          Booking ID #{booking.id.slice(-6)}
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#e6c280] uppercase mt-0.5">
                          {booking.excursionTitle}
                        </h4>
                      </div>

                      <div className={`flex items-center gap-1.5 border rounded-full px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest ${config.colorClass}`}>
                        <StatusIcon className="w-3 h-3" />
                        {config.labelText}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-stone-400 pt-2 border-t border-stone-800/60 font-sans">
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-mono tracking-wider">Traveler Name:</span>
                        <span className="text-stone-200">{booking.travelerName}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-mono tracking-wider">Travel Date:</span>
                        <span className="text-stone-200">{booking.date}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-mono tracking-wider">Group Size:</span>
                        <span className="text-stone-200">{booking.numberOfGuests} {booking.numberOfGuests === 1 ? 'Person' : 'People'}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px] uppercase font-mono tracking-wider">Total Price:</span>
                        <span className="text-[#d4af37] font-mono font-semibold">${booking.totalCost}</span>
                      </div>
                    </div>

                    {booking.specialRequests && (
                      <div className="bg-[#191410] rounded-lg p-2.5 text-[11px] text-stone-400 italic">
                        <strong className="text-stone-500 not-italic uppercase font-mono block text-[9px] tracking-wider mb-0.5">
                          Special Requests:
                        </strong>
                        "{booking.specialRequests}"
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-1 text-[11px] font-mono flex-wrap">
                      <span className="text-stone-500 italic text-left flex-1 self-center min-w-[120px]">
                        {config.descText}
                      </span>
                      
                      {/* Print Scroll Button for Confirmed/Completed Bookings */}
                      {(booking.status === 'Confirmed by High Priest' || booking.status === 'Completed') && (
                        <button
                          onClick={() => setSelectedScrollBooking(booking)}
                          className="text-[#d4af37] hover:text-[#fbf5e6] px-3 py-1 bg-[#d4af37]/10 hover:bg-[#d4af37]/25 border border-[#d4af37]/35 rounded-md transition-all cursor-pointer flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider"
                        >
                          <Printer className="w-3 h-3" />
                          <span>𓏞 View Itinerary</span>
                        </button>
                      )}

                      {onCancelBooking && booking.status === 'Pending Oracle Approval' && (
                        <button
                          onClick={() => onCancelBooking(booking.id)}
                          className="text-red-400 hover:text-red-300 px-3 py-1 bg-red-500/10 hover:bg-red-500/20 rounded-md transition-all cursor-pointer text-[10px] uppercase font-bold font-mono tracking-wider"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Testimony Board & Review Form */}
      <div className="lg:col-span-6 space-y-6" id="testimony-board-col">
        <div className="flex items-center gap-2 border-b border-[#d4af37]/20 pb-3">
          <MessageSquare className="text-[#d4af37] w-5 h-5" />
          <h3 className="font-serif text-xl font-bold text-[#e6c280] uppercase tracking-wider">
            Traveler Reviews & Testimonials
          </h3>
        </div>

        <ReviewSystem />
      </div>

      {/* Scroll Itinerary Modal Overlay */}
      {selectedScrollBooking && (
        <ScrollItineraryModal
          booking={selectedScrollBooking}
          excursion={excursions?.find((e) => e.id === selectedScrollBooking.excursionId)}
          onClose={() => setSelectedScrollBooking(null)}
        />
      )}

    </div>
  );
}
