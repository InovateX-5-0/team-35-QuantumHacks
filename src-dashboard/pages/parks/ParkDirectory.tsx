import React from 'react';
import { MapPin, Star, MessageSquare, Plus, Search } from 'lucide-react';
import { mockData } from '../../data/mockData';

export function ParkDirectory() {
  const { directory, reviews } = mockData.parks;

  return (
    <div className="space-y-8">
      {/* Park Locations */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Park Directory</h1>
            <p className="text-slate-500">Manage facility locations and status.</p>
          </div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
            <Plus size={20} /> Add Park
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directory.map((park) => (
            <div key={park.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    park.status === 'Open' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {park.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-1">{park.name}</h3>
                <div className="flex items-center gap-1 text-slate-500 text-sm mb-4">
                  <MapPin size={14} />
                  <span>{park.location}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={16} fill="currentColor" />
                    <span>{park.rating}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">{park.type} Area</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Reviews */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">User Reviews</h2>
          <p className="text-slate-500">What pet owners are saying about your facilities.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100">
            {reviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-slate-50/50 transition-colors flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
                  {review.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-bold text-slate-800">{review.user}</h4>
                      <p className="text-xs text-emerald-600 font-medium">{review.park}</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-slate-200"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 italic">"{review.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
