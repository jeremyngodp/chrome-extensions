"use strict";

function setAlarm() {
  const input = document.getElementById("alarmInterval");
  const minutes = parseFloat(input.value);
  chrome.action.setBadgeText({ text: "ON" });
  chrome.alarms.create({ delayInMinutes: minutes });
  chrome.storage.sync.set({ minutes: minutes });
  alert("Alarm set!");
  window.close();
}

function clearAlarm() {
  chrome.action.setBadgeText({ text: "" });
  chrome.alarms.clearAll();
  alert("Alarm cleared!");
  window.close();
}

document.getElementById("setAlarm").addEventListener("click", setAlarm);
document.getElementById("cancelAlarm").addEventListener("click", clearAlarm);

document.addEventListener("DOMContentLoaded", async (event) => {
  const item = await chrome.storage.sync.get(["minutes"]);
  document.getElementById("alarmInterval").value =
    parseFloat(item.minutes) || 0;
});
