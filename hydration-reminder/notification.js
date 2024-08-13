export const getNotification = async (type) => {
  const basicNotification = {
    type: "basic",
    title: "Hydration Reminder",
    iconUrl: "./images/drink-water.gif",
    priority: 0,
  };

  const storage = await chrome.storage.sync.get(["reminderText", "minutes"]);

  const notification = {
    set: {
      message: `You will be reminded to hydrate every ${storage.minutes} minutes!`,
      requireInteraction: false,
    },
    clear: {
      message: "Reminder Turned Off!",
      requireInteraction: false,
    },
    reminder: {
      message: storage.reminderText || "Everyday I'm Guzzlin'!",
      requireInteraction: true,
      buttons: [{ title: "Turn Reminder Off" }],
    },
  };
  const finalNotification = { ...basicNotification, ...notification[type] };
  console.log(finalNotification);
  return finalNotification;
};
