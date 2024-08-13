"use strict";

import { getNotification } from "./notification.js";

const setAlarm = async () => {
  const input = document.getElementById("alarmInterval");
  const customText = document.getElementById("customText").value;
  const minutes = parseFloat(input.value);
  chrome.action.setBadgeText({ text: "ON" });
  chrome.alarms.create({ delayInMinutes: minutes });
  chrome.storage.sync.set({ minutes: minutes });
  chrome.storage.sync.set({ reminderText: customText });
  chrome.notifications.create(await getNotification("set"));
  window.close();
};

const clearAlarm = async () => {
  chrome.action.setBadgeText({ text: "" });
  chrome.alarms.clearAll();
  chrome.notifications.create(await getNotification("clear"));
  window.close();
};

document.getElementById("setAlarm").addEventListener("click", setAlarm);
document.getElementById("cancelAlarm").addEventListener("click", clearAlarm);
document
  .getElementById("designer-profile")
  .addEventListener("click", goToDesigner);

document.addEventListener("DOMContentLoaded", async (event) => {
  const item = await chrome.storage.sync.get(["minutes", "reminderText"]);
  document.getElementById("alarmInterval").value =
    parseFloat(item.minutes) || 0;
  document.getElementById("customText").value = item.reminderText || "";
});

function goToDesigner() {
  chrome.tabs.create({ url: "https://www.instagram.com/vy.sually/" });
}
