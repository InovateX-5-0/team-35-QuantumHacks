import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatCard, Card, CardHeader, CardContent, StatusBadge } from '../components/ui';
import { veterinaryAppointments, appointmentVolumeData, appointmentTypeBreakdown, topBreeds } from '../data/mockData';

export const VeterinaryOverview = () => {
  const todayAppointments = veterinaryAppointments.filter(apt => apt.date === '2024-01-15');
  const COLORS = ['#0D9488', '#3B82F6', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Today's Appointments" value={todayAppointments.length} icon="📅" change="+12% from last week" changeType="positive" />
        <StatCard title="New Patients" value="8" icon="🐾" change="+3 this month" changeType="positive" />
        <StatCard title="Revenue (Today)" value="$1,245" icon="💰" change="+8.5% from yesterday" changeType="positive" />
        <StatCard title="Surgeries This Week" value="5" icon="🏥" change="2 pending" changeType="negative" />
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Appointment Volume Chart */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold text-gray-800">Daily Appointment Volume (Last 30 Days)</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="appointments" stroke="#0D9488" strokeWidth={2} name="Appointments" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointment Types Breakdown */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold text-gray-800">Appointment Types Breakdown</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentTypeBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {appointmentTypeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Breeds Chart */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold text-gray-800">Top 5 Most Visited Breeds</h3>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={topBreeds}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="breed" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="#0D9488" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Today's Appointments Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold text-gray-800">Today's Appointments</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Pet Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Owner</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-800">{apt.time}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{apt.petName}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{apt.owner}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 capitalize">{apt.type}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={apt.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
