import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, MapPin, Calendar, Clock, DollarSign, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';

export const TempoBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { vehicles, currentUser, bookTempo } = useStore();

  // Selected vehicle state
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || '');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [distance, setDistance] = useState(10); // Default 10km
  const [isBooked, setIsBooked] = useState(false);
  const [err, setErr] = useState('');

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

  const calculateCost = () => {
    if (!selectedVehicle) return 0;
    return selectedVehicle.basePrice + (selectedVehicle.pricePerKm * distance);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setErr('Please log in to confirm your booking.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (!pickup || !drop || !date || !time) {
      setErr('Please fill in all details.');
      return;
    }

    bookTempo({
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      pickupAddress: pickup,
      dropAddress: drop,
      date,
      time,
      distanceKm: distance,
      totalCost: calculateCost()
    });

    setIsBooked(true);
    setErr('');
    setTimeout(() => {
      navigate('/customer/dashboard');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      <div className="flex flex-col gap-3 mb-10 text-center max-w-2xl mx-auto">
        <Badge variant="purple" className="self-center">Logistics Portal</Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white font-display">
          Book Premium Shifting Logistics
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Select your cargo size, input coordinates, and schedule deliveries with instant fare estimates.
        </p>
      </div>

      {isBooked ? (
        <Card className="max-w-lg mx-auto p-8 text-center flex flex-col items-center gap-4 py-16 animate-in zoom-in-95">
          <div className="h-16 w-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-500/20 shadow-md">
            <Truck className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white font-display">Booking Requested!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            Your logistics request is logged. An administrator will review details and dispatch a driver shortly.
          </p>
          <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Auto-redirecting to dashboard...
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Vehicle Selection */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display">
              1. Choose Shifting Vehicle
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicles.map((veh) => (
                <Card 
                  key={veh.id}
                  hoverable
                  onClick={() => setSelectedVehicleId(veh.id)}
                  className={`cursor-pointer overflow-hidden transition-all duration-300 border-2 ${
                    selectedVehicleId === veh.id 
                      ? 'border-accentIndigo ring-2 ring-accentIndigo/20 dark:border-accentTeal dark:ring-accentTeal/20' 
                      : 'border-slate-200/50 dark:border-darkBorder/40'
                  }`}
                >
                  <div className="h-44 relative overflow-hidden bg-slate-100 dark:bg-darkCard">
                    <img 
                      src={veh.image} 
                      alt={veh.name} 
                      className="w-full h-full object-cover"
                    />
                    {!veh.available && (
                      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white font-bold text-xs">
                        Currently Unavailable
                      </div>
                    )}
                  </div>
                  <Card.Content className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-xs font-bold text-accentIndigo dark:text-accentTeal">{veh.type}</span>
                      <Badge variant={veh.available ? 'success' : 'danger'}>
                        {veh.available ? 'Ready' : 'Busy'}
                      </Badge>
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{veh.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{veh.description}</p>
                    <div className="h-px bg-slate-100 dark:bg-darkBorder/40 my-2" />
                    <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                      <span>Capacity: <span className="text-slate-700 dark:text-slate-200">{veh.capacity}</span></span>
                      <span>Rate: <span className="text-slate-700 dark:text-slate-200">₹{veh.pricePerKm}/km</span></span>
                    </div>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Booking Form & Fare Breakdown */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white font-display">
              2. Route & Schedule Details
            </h3>

            <Card className="p-6 flex flex-col gap-5 border border-white/5 relative">
              <form onSubmit={handleBooking} className="flex flex-col gap-4">
                <Input
                  label="Pickup Landmark / Address"
                  placeholder="Enter starting point address"
                  leftIcon={<MapPin className="h-4 w-4" />}
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  required
                />
                <Input
                  label="Delivery Destination Address"
                  placeholder="Enter ending point address"
                  leftIcon={<MapPin className="h-4 w-4" />}
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  required
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Booking Date"
                    type="date"
                    leftIcon={<Calendar className="h-4 w-4" />}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                  <Input
                    label="Booking Time"
                    type="time"
                    leftIcon={<Clock className="h-4 w-4" />}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>

                {/* Distance Slider */}
                <div className="flex flex-col gap-2 text-left mt-2">
                  <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <span>Est. Distance</span>
                    <span className="text-accentTeal font-bold">{distance} Kilometers</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="1"
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    className="w-full accent-accentTeal h-1.5 bg-slate-200 dark:bg-darkBorder rounded-lg cursor-pointer"
                  />
                </div>

                {/* Fare Summary */}
                <div className="bg-slate-100/50 dark:bg-darkBg/50 border border-slate-200/50 dark:border-darkBorder/40 rounded-xl p-4 flex flex-col gap-2 mt-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Fare breakdown</h4>
                  <div className="flex justify-between items-center text-xs">
                    <span>Base Freight Charge:</span>
                    <span className="font-semibold">₹{selectedVehicle.basePrice}.00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Shifting Mileage ({distance} km):</span>
                    <span className="font-semibold">₹{selectedVehicle.pricePerKm * distance}.00</span>
                  </div>
                  <div className="h-px bg-slate-200 dark:bg-darkBorder/45 my-1" />
                  <div className="flex justify-between items-center font-bold text-sm">
                    <span className="text-slate-800 dark:text-white">Estimated Total Fare:</span>
                    <span className="text-lg text-accentTeal">₹{calculateCost()}.00</span>
                  </div>
                </div>

                {err && (
                  <span className="text-xs text-red-500 font-bold text-center">{err}</span>
                )}

                <Button variant="primary" type="submit" className="w-full mt-2" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Confirm & Book Shifting
                </Button>
              </form>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
