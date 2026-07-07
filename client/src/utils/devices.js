export const isDeviceActive = (device) => device?.isActive || ["ON", "LOCKED"].includes(device?.status);

export const getNextDeviceState = (device) => {
  const active = isDeviceActive(device);
  const isLock = device.category === "Door Lock" || ["LOCKED", "UNLOCKED"].includes(device.status);
  const nextActive = !active;

  return {
    ...device,
    isActive: nextActive,
    status: isLock ? (nextActive ? "LOCKED" : "UNLOCKED") : (nextActive ? "ON" : "OFF")
  };
};

export const updateDeviceListOptimistic = (devices = [], id) =>
  devices.map((device) => (device._id === id ? getNextDeviceState(device) : device));
