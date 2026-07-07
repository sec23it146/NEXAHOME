import { motion } from "framer-motion";
import { Fan, Lightbulb, Lock, RadioTower, ToggleLeft, ToggleRight, Zap } from "lucide-react";
import { isDeviceActive } from "../utils/devices.js";

const icons = {
  "Smart Light": Lightbulb,
  Fan,
  "Door Lock": Lock,
  Sensor: RadioTower
};

const DeviceCard = ({ device, onToggle, readonly = false }) => {
  const Icon = icons[device.category] || RadioTower;
  const active = isDeviceActive(device);

  return (
    <motion.article className={`device-card ${active ? "device-on" : "device-off"}`} whileHover={{ y: -7, scale: 1.015 }}>
      <div className="device-card-head">
        <span className="device-icon"><Icon size={20} /></span>
        <span className={`status-pill ${active ? "on" : "off"}`}>{device.status}</span>
      </div>
      <h3>{device.name}</h3>
      <p>{device.location} - {device.category}</p>
      <div className="device-energy"><Zap size={15} /> {active ? "Live energy: 18W" : "Standby: 0W"}</div>
      {device.category === "Sensor" && <strong className="sensor-value">{device.sensorValue ?? "--"} {device.sensorUnit}</strong>}
      <button type="button" className="icon-text-btn" disabled={readonly} onClick={() => onToggle?.(device._id)} title={readonly ? "Read-only access" : "Toggle device"}>
        {active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
        <span>{readonly ? "Read only" : active ? "ON" : "OFF"}</span>
      </button>
    </motion.article>
  );
};

export default DeviceCard;
