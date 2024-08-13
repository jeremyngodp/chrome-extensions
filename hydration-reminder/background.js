"use strict";
import { getNotification } from "./notification.js";

chrome.alarms.onAlarm.addListener(async () => {
  const storage = await chrome.storage.sync.get(["reminderText", "minutes"]);
  chrome.notifications.create(await getNotification("reminder"));

  chrome.notifications.onButtonClicked.addListener(async (id, index) => {
    if (index === 0) {
      chrome.action.setBadgeText({ text: "" });
      chrome.alarms.clearAll();
      chrome.notifications.create(await getNotification("clear"));
    }
  });

  chrome.notifications.onClosed.addListener(() => {
    chrome.alarms.create({ delayInMinutes: storage.minutes });
  });

  chrome.notifications.onClicked.addListener(() => {
    chrome.alarms.create({ delayInMinutes: storage.minutes });
  });
});
