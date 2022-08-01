const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('kruxAPI',{
  async download_ktool (os) {
    await ipcRenderer.invoke(`download:ktool:${os}`)
  },
  async download_firmware (device) {
    await ipcRenderer.invoke(`download:firmware:${device}`)
  },
  async download_kboot (device) {
    await ipcRenderer.invoke(`download:kboot:${device}`)
  },
  async start_detect_device () {
    await ipcRenderer.invoke('usb:detection:start')
  },
  async stop_detect_device () {
    await ipcRenderer.invoke('usb:detection:stop')
  },
  async sdcard_detect () {
    await ipcRenderer.invoke('sdcard:detection:start')
  },
  onLogLevelInfo(callback) {
    ipcRenderer.on('window:log:info', callback)
  },
  onDownloadedKtoolStatus(callback) {
    ipcRenderer.on('download:ktool:status', callback)
  },
  onDownloadedFirmwareStatus(callback) {
    ipcRenderer.on('download:firmware:status', callback)
  },
  onDownloadedKbootStatus(callback) {
    ipcRenderer.on('download:kboot:status', callback)
  },
  onDetectedDeviceFoundUsb(callback) {
    ipcRenderer.on('usb:detection:add', callback)
  },
  onDetectedDeviceRemovedUsb(callback) {
    ipcRenderer.on('usb:detection:remove', callback)
  },
  onDetectedDeviceChangedUsb(callback) {
    ipcRenderer.on('usb:detection:change', callback)
  },
  onStopMonitoringDeviceUsb(callback) {
    ipcRenderer.on('usb:detection:stop', callback)
  }
})
