import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard.jsx";
import MetricCard from "../components/MetricCard.jsx";
import { DeviceShowcase, FloorMap, SecurityCenter, SmartHomeOverview, WelcomeHero } from "../components/PremiumWidgets.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";
import { isDeviceActive, updateDeviceListOptimistic } from "../utils/devices.js";

const GuestDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ devices: [] });
  const load = () => api.get("/dashboard/homeowner").then(({ data }) => setStats(data));
  useEffect(() => { load(); }, []);

  const toggle = async (id) => {
    const previous = stats;
    const nextDevices = updateDeviceListOptimistic(stats.devices || [], id);
    setStats({
      ...stats,
      devices: nextDevices,
      activeDevices: nextDevices.filter(isDeviceActive).length
    });
    try {
      await api.patch(`/devices/${id}/toggle`);
      load();
    } catch (error) {
      setStats(previous);
    }
  };

  return (
    <div className="page-stack">
      <WelcomeHero user={user} totalDevices={stats.totalDevices || 0} activeDevices={stats.activeDevices || 0} />
      <SmartHomeOverview totalDevices={stats.totalDevices || 0} activeDevices={stats.activeDevices || 0} alerts={stats.alerts || 0} />
      <div className="page-title">
        <h2>Guest Dashboard</h2>
        <p>Limited access to view and control selected devices.</p>
      </div>
      <div className="metrics-grid one">
        <MetricCard label="Visible Devices" value={stats.totalDevices || 0} icon={Eye} tone="blue" />
      </div>
      <section className="device-grid">
        {stats.devices?.map((device) => <DeviceCard key={device._id} device={device} onToggle={toggle} />)}
      </section>
      <DeviceShowcase devices={stats.devices || []} onToggle={toggle} />
      <div className="two-column">
        <FloorMap />
        <SecurityCenter />
      </div>
    </div>
  );
};

export default GuestDashboard;
