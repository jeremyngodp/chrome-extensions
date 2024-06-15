"use strict";

chrome.alarms.onAlarm.addListener(async () => {
  chrome.notifications.create({
    type: "basic",
    title: "Time to Hydrate",
    iconUrl: "./images/icon_128.png",
    message: "Everyday I'm Guzzlin'!",
    buttons: [{ title: "Keep it Flowing." }],
    priority: 0,
    requireInteraction: true,
  });
  const item = await chrome.storage.sync.get(["minutes"]);
  chrome.alarms.create({ delayInMinutes: item.minutes });
});
