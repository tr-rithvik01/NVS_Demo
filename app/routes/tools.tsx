import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import {
  Bus,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Route,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "Tools | NVS Travel Solutions" },
    {
      name: "description",
      content:
        "Explore practical customer tools from NVS Travel Solutions including a fleet selector, cab fare estimator, school bus planner, corporate shuttle planner, and readiness checklist.",
    },
  ];
};

const toolCards = [
  {
    id: "fleet",
    title: "Fleet Selector",
    description: "Pick the right vehicle category based on passengers, luggage, and trip style.",
    icon: Bus,
  },
  {
    id: "fare",
    title: "Cab Fare Estimator",
    description: "Get a rough ride estimate for city, airport, and outstation-style movement.",
    icon: CircleDollarSign,
  },
  {
    id: "school",
    title: "School Bus Planner",
    description: "Estimate buses and attendants needed from student volume and shift assumptions.",
    icon: Users,
  },
  {
    id: "corporate",
    title: "Corporate Shuttle Planner",
    description: "Model route count, trip cycles, and fleet requirements for employee transport.",
    icon: Route,
  },
  {
    id: "checklist",
    title: "Transport Readiness Checklist",
    description: "Score how prepared your current transport setup is across safety and operations.",
    icon: ClipboardCheck,
  },
];

const readinessChecks = [
  "Verified drivers and ID checks",
  "Live GPS tracking",
  "Control-room monitoring",
  "Emergency contact process",
  "Documented route planning",
  "Vehicle maintenance schedule",
  "Passenger attendance or trip logs",
  "Incident reporting process",
];

const fleetCatalog = [
  {
    category: "Hatchback",
    models: ["Maruti Suzuki WagonR", "Maruti Suzuki Swift", "Hyundai Grand i10 Nios", "Tata Tiago"],
    seats: "1-3",
    luggage: "1-2 bags",
    goodFor: "Short city rides and low-luggage movement",
  },
  {
    category: "Sedan",
    models: ["Maruti Suzuki Dzire", "Honda Amaze", "Hyundai Aura", "Honda City"],
    seats: "2-4",
    luggage: "2-3 bags",
    goodFor: "Airport transfers, executive movement, and city meetings",
  },
  {
    category: "SUV",
    models: ["Toyota Innova Crysta", "Mahindra XUV700", "Tata Safari", "Toyota Fortuner"],
    seats: "4-6",
    luggage: "3-5 bags",
    goodFor: "Family travel, premium trips, and senior leadership movement",
  },
  {
    category: "MPV",
    models: ["Kia Carens", "Maruti Suzuki Ertiga", "Toyota Rumion", "Toyota Innova Hycross"],
    seats: "5-7",
    luggage: "3-5 bags",
    goodFor: "Airport groups, mixed passenger travel, and comfort-led trips",
  },
  {
    category: "Traveller",
    models: ["Force Traveller 12 Seater", "Force Urbania", "Tempo Traveller 17 Seater", "Tempo Traveller 26 Seater"],
    seats: "8-26",
    luggage: "High luggage capacity",
    goodFor: "Events, corporate groups, and outstation team movement",
  },
  {
    category: "Luxury",
    models: ["Mercedes-Benz E-Class", "BMW 5 Series", "Toyota Vellfire", "Audi A6"],
    seats: "2-5",
    luggage: "2-4 bags",
    goodFor: "VIP hosting, luxury airport pickups, and premium client travel",
  },
];

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState("fleet");

  const [fleetPassengers, setFleetPassengers] = useState(4);
  const [fleetLuggage, setFleetLuggage] = useState(2);
  const [fleetStyle, setFleetStyle] = useState("standard");
  const [fleetRoadType, setFleetRoadType] = useState("city");

  const [fareDistance, setFareDistance] = useState(18);
  const [fareType, setFareType] = useState("city");
  const [fareRoundTrip, setFareRoundTrip] = useState(false);
  const [fareHours, setFareHours] = useState(3);
  const [fareVehicleClass, setFareVehicleClass] = useState("sedan");
  const [fareIncludeToll, setFareIncludeToll] = useState(false);

  const [students, setStudents] = useState(720);
  const [seatsPerBus, setSeatsPerBus] = useState(40);
  const [attendantsPerBus, setAttendantsPerBus] = useState(1);
  const [studentShiftFactor, setStudentShiftFactor] = useState(1);
  const [routeSpread, setRouteSpread] = useState("medium");

  const [employees, setEmployees] = useState(360);
  const [employeesPerVehicle, setEmployeesPerVehicle] = useState(12);
  const [tripCycles, setTripCycles] = useState(3);
  const [pickupClusters, setPickupClusters] = useState(8);
  const [shiftWindows, setShiftWindows] = useState(2);

  const [readinessState, setReadinessState] = useState<Record<string, boolean>>(
    Object.fromEntries(readinessChecks.map((item, index) => [item, index < 3]))
  );

  const fleetRecommendation = useMemo(() => {
    if (fleetStyle === "premium") {
      return fleetPassengers <= 4 ? fleetCatalog[5] : fleetCatalog[2];
    }
    if (fleetPassengers <= 3 && fleetLuggage <= 2 && fleetRoadType === "city") {
      return fleetCatalog[0];
    }
    if (fleetPassengers <= 4 && fleetLuggage <= 3 && fleetStyle !== "group") {
      return fleetCatalog[1];
    }
    if (fleetPassengers <= 7 && fleetStyle !== "group") {
      return fleetRoadType === "highway" ? fleetCatalog[2] : fleetCatalog[3];
    }
    return fleetCatalog[4];
  }, [fleetLuggage, fleetPassengers, fleetRoadType, fleetStyle]);

  const fareEstimate = useMemo(() => {
    const baseRates: Record<string, number> = {
      city: 22,
      airport: 28,
      outstation: 34,
    };
    const classMultiplier: Record<string, number> = {
      hatchback: 1,
      sedan: 1.2,
      suv: 1.6,
      luxury: 2.6,
    };
    const minimums: Record<string, number> = {
      city: 450,
      airport: 900,
      outstation: 1800,
    };
    const dutyCharge = fareHours > 4 ? (fareHours - 4) * 180 : 0;
    const tollCharge = fareIncludeToll ? fareDistance * 2.5 : 0;
    const estimated =
      Math.max(minimums[fareType], fareDistance * baseRates[fareType]) * classMultiplier[fareVehicleClass] +
      dutyCharge +
      tollCharge;
    return Math.round(fareRoundTrip ? estimated * 1.8 : estimated);
  }, [fareDistance, fareHours, fareIncludeToll, fareRoundTrip, fareType, fareVehicleClass]);

  const adjustedStudents = Math.ceil(students / studentShiftFactor);
  const routeSpreadMultiplier = routeSpread === "tight" ? 1 : routeSpread === "medium" ? 1.15 : 1.35;
  const busesNeeded = Math.ceil((adjustedStudents / seatsPerBus) * routeSpreadMultiplier);
  const attendantsNeeded = busesNeeded * attendantsPerBus;
  const routeBands = Math.ceil(busesNeeded / 4);

  const corporateVehiclesNeeded = Math.ceil(employees / Math.max(1, employeesPerVehicle * tripCycles));
  const corporateTrips = Math.ceil(employees / employeesPerVehicle) * shiftWindows;
  const dispatchComplexity = corporateVehiclesNeeded + Math.ceil(pickupClusters / 2) + shiftWindows;

  const readinessScore = useMemo(() => {
    const total = readinessChecks.length;
    const completed = readinessChecks.filter((item) => readinessState[item]).length;
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  }, [readinessState]);
  const readinessRecommendation =
    readinessScore.percentage >= 80
      ? "Your setup looks mature, but audit reporting and live escalation processes should still be reviewed regularly."
      : readinessScore.percentage >= 50
        ? "Your setup has a functional base, but visibility and control systems likely need strengthening."
        : "There are clear operational gaps. Focus first on driver verification, live tracking, incident logging, and vehicle maintenance routines.";

  return (
    <article className="bg-[linear-gradient(180deg,#f5faf8_0%,#eef7f4_40%,#f8fafc_100%)] pb-24 pt-28">
      <div className="container-wide">
        <header className="overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,#062c30_0%,#0f766e_55%,#0f172a_100%)] px-8 py-10 text-white shadow-2xl lg:px-12 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan-200">Customer Tools</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-tight lg:text-6xl">
            Five practical tools that help customers plan transport before they even speak to the team.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78">
            These are lightweight planning utilities for schools, companies, and individual riders. They are not final commercial quotes, but they help frame scale, budget, and fit.
          </p>
        </header>

        <section className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {toolCards.map((tool) => (
            <button
              key={tool.id}
              type="button"
              onClick={() => setActiveTool(tool.id)}
              className={cn(
                "rounded-[2rem] border p-5 text-left transition",
                activeTool === tool.id
                  ? "border-primary bg-white shadow-lg"
                  : "border-slate-200 bg-white/75 hover:border-primary/40 hover:bg-white"
              )}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <tool.icon size={22} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900">{tool.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{tool.description}</p>
            </button>
          ))}
        </section>

        <section className="mt-10 rounded-[3rem] border border-slate-200 bg-white p-6 shadow-lg lg:p-8">
          {activeTool === "fleet" ? (
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Fleet Selector</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Find the right vehicle class.</h2>
                <div className="mt-8 grid gap-5">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Passengers</span>
                    <input type="range" min="1" max="20" value={fleetPassengers} onChange={(e) => setFleetPassengers(Number(e.target.value))} className="w-full" />
                    <p className="mt-2 text-sm font-medium text-slate-700">{fleetPassengers} passengers</p>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Luggage Units</span>
                    <input type="range" min="0" max="10" value={fleetLuggage} onChange={(e) => setFleetLuggage(Number(e.target.value))} className="w-full" />
                    <p className="mt-2 text-sm font-medium text-slate-700">{fleetLuggage} luggage units</p>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Trip Style</span>
                    <select value={fleetStyle} onChange={(e) => setFleetStyle(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                      <option value="standard">Standard city travel</option>
                      <option value="premium">Premium or executive travel</option>
                      <option value="group">Group movement</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Road Type</span>
                    <select value={fleetRoadType} onChange={(e) => setFleetRoadType(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                      <option value="city">Mostly city roads</option>
                      <option value="highway">Highway or airport corridor</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="space-y-4">
              <div className="rounded-[2.25rem] bg-slate-950 p-8 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">Recommended Category</p>
                <p className="mt-4 text-4xl font-bold">{fleetRecommendation.category}</p>
                <p className="mt-4 text-base leading-relaxed text-white/75">
                  This recommendation balances passenger volume, luggage load, and service style. Final allocation may still vary by route length, availability, and premium requirements.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Seat Range</p>
                    <p className="mt-2 text-lg font-bold">{fleetRecommendation.seats}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">Luggage</p>
                    <p className="mt-2 text-lg font-bold">{fleetRecommendation.luggage}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[2.25rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Popular Models In This Category</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {fleetRecommendation.models.map((model) => (
                    <span key={model} className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm">
                      {model}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{fleetRecommendation.goodFor}</p>
              </div>
              </div>
            </div>
          ) : null}

          {activeTool === "fare" ? (
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Cab Fare Estimator</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Get a rough trip estimate.</h2>
                <div className="mt-8 grid gap-5">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Trip Type</span>
                    <select value={fareType} onChange={(e) => setFareType(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                      <option value="city">City ride</option>
                      <option value="airport">Airport transfer</option>
                      <option value="outstation">Outstation movement</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Distance</span>
                    <input type="range" min="5" max="250" value={fareDistance} onChange={(e) => setFareDistance(Number(e.target.value))} className="w-full" />
                    <p className="mt-2 text-sm font-medium text-slate-700">{fareDistance} km</p>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Vehicle Category</span>
                    <select value={fareVehicleClass} onChange={(e) => setFareVehicleClass(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                      <option value="hatchback">Hatchback</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV / MPV</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Estimated Duty Hours</span>
                    <input type="range" min="1" max="12" value={fareHours} onChange={(e) => setFareHours(Number(e.target.value))} className="w-full" />
                    <p className="mt-2 text-sm font-medium text-slate-700">{fareHours} hours</p>
                  </label>
                  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                    <input type="checkbox" checked={fareRoundTrip} onChange={(e) => setFareRoundTrip(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                    Round trip
                  </label>
                  <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                    <input type="checkbox" checked={fareIncludeToll} onChange={(e) => setFareIncludeToll(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                    Include tolls and parking buffer
                  </label>
                </div>
              </div>
              <div className="space-y-4">
              <div className="rounded-[2.25rem] bg-primary/5 p-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Estimated Range</p>
                <p className="mt-4 text-5xl font-bold text-slate-900">Rs. {fareEstimate.toLocaleString("en-IN")}</p>
                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  This is a planning estimate only. Actual fares depend on vehicle type, duty hours, tolls, waiting time, and availability.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Distance Band</p>
                  <p className="mt-2 text-xl font-bold text-slate-900">{fareDistance} km</p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Vehicle</p>
                  <p className="mt-2 text-xl font-bold capitalize text-slate-900">{fareVehicleClass}</p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Duty Hours</p>
                  <p className="mt-2 text-xl font-bold text-slate-900">{fareHours}h</p>
                </div>
              </div>
              </div>
            </div>
          ) : null}

          {activeTool === "school" ? (
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">School Bus Planner</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Estimate buses and attendants.</h2>
                <div className="mt-8 grid gap-5">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Students</span>
                    <input type="number" value={students} onChange={(e) => setStudents(Number(e.target.value) || 0)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Seats Per Bus</span>
                    <input type="number" value={seatsPerBus} onChange={(e) => setSeatsPerBus(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Attendants Per Bus</span>
                    <input type="number" value={attendantsPerBus} onChange={(e) => setAttendantsPerBus(Math.max(0, Number(e.target.value) || 0))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Shift Factor</span>
                    <select value={studentShiftFactor} onChange={(e) => setStudentShiftFactor(Number(e.target.value))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                      <option value={1}>Single trip window</option>
                      <option value={2}>Two trip waves</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Route Spread</span>
                    <select value={routeSpread} onChange={(e) => setRouteSpread(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
                      <option value="tight">Compact catchment</option>
                      <option value="medium">Mixed spread</option>
                      <option value="wide">Wide geography</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Buses Needed</p>
                  <p className="mt-3 text-5xl font-bold">{busesNeeded}</p>
                </div>
                <div className="rounded-[2rem] bg-primary/5 p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Attendants Needed</p>
                  <p className="mt-3 text-5xl font-bold text-slate-900">{attendantsNeeded}</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Effective Student Load</p>
                  <p className="mt-3 text-4xl font-bold text-slate-900">{adjustedStudents}</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Route Bands</p>
                  <p className="mt-3 text-4xl font-bold text-slate-900">{routeBands}</p>
                </div>
                <div className="sm:col-span-2 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm leading-relaxed text-slate-700">
                    This is a simple capacity planner. Final deployment depends on route clustering, timing overlap, student distribution, and safety policy.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {activeTool === "corporate" ? (
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Corporate Shuttle Planner</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Model fleet and trip cycles.</h2>
                <div className="mt-8 grid gap-5">
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Employees</span>
                    <input type="number" value={employees} onChange={(e) => setEmployees(Number(e.target.value) || 0)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Employees Per Vehicle</span>
                    <input type="number" value={employeesPerVehicle} onChange={(e) => setEmployeesPerVehicle(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Trip Cycles Per Shift Window</span>
                    <input type="number" value={tripCycles} onChange={(e) => setTripCycles(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Pickup Clusters</span>
                    <input type="number" value={pickupClusters} onChange={(e) => setPickupClusters(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Shift Windows</span>
                    <input type="number" value={shiftWindows} onChange={(e) => setShiftWindows(Math.max(1, Number(e.target.value) || 1))} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900" />
                  </label>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Vehicles Needed</p>
                  <p className="mt-3 text-5xl font-bold">{corporateVehiclesNeeded}</p>
                </div>
                <div className="rounded-[2rem] bg-primary/5 p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Trip Cycles</p>
                  <p className="mt-3 text-5xl font-bold text-slate-900">{corporateTrips}</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Pickup Clusters</p>
                  <p className="mt-3 text-4xl font-bold text-slate-900">{pickupClusters}</p>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Dispatch Complexity</p>
                  <p className="mt-3 text-4xl font-bold text-slate-900">{dispatchComplexity}</p>
                </div>
                <div className="sm:col-span-2 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm leading-relaxed text-slate-700">
                    This helps estimate the difference between one-wave deployment and multi-cycle shuttle planning. Real programs also depend on geography, shift overlap, and SLA requirements.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {activeTool === "checklist" ? (
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">Transport Readiness Checklist</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Score your current setup.</h2>
                <div className="mt-8 grid gap-3">
                  {readinessChecks.map((item) => (
                    <label key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={readinessState[item]}
                        onChange={(e) => setReadinessState((current) => ({ ...current, [item]: e.target.checked }))}
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
              <div className="rounded-[2.25rem] bg-slate-950 p-8 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Readiness Score</p>
                <p className="mt-4 text-6xl font-bold">{readinessScore.percentage}%</p>
                <p className="mt-3 text-sm font-medium text-white/70">
                  {readinessScore.completed} of {readinessScore.total} controls in place
                </p>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-cyan-300" style={{ width: `${readinessScore.percentage}%` }} />
                </div>
                <div className="mt-8 rounded-[1.5rem] bg-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <Clock3 size={18} className="text-cyan-200" />
                    <p className="text-sm leading-relaxed text-white/78">
                      {readinessRecommendation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section className="mt-12 rounded-[3rem] bg-slate-900 px-8 py-10 text-white shadow-2xl lg:px-12 lg:py-14">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/70">Next Step</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-bold tracking-tight lg:text-5xl">
            Use the tools for planning. Then use the NVS team for the final operating model.
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-100">
              Talk to NVS
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10">
              Explore Services <Calculator size={16} />
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
