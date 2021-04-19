// this file runs push notification through the client by making post request on /subscribe
// THIS IS THE SCRIPT WHICH CLIENT NEEDS TO RUN, WHICH CREATES, REGISTERS AND FIRES PUSH NOTIFICATION

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";

// BELOW 2 LINES WILL FIRE PUSH NOTIFCATION ON PAGE LOADS, YOU CAN CALL BELOW TWO LINES WHEN YOU LIKE
// Check if serviceworker is valid in navigator (api of browser), then run send function
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

// this will Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker (HERE CLIENT IS SETTING CONTENT OF PUSH NOTIFCATION)
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", { // worker.js contains the content of push notification
    scope: "/"
  });
  console.log("Service Worker Registered...");

  // Register Push (HERE CLIENT IS REGISTERING FOR ABOVE CREATED PUSH NOTIFICATION CONTENT)
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  // GET CONSOLE LOG OF BELOW FROM ACTUAL USER CLIENT AND STORE IT, THAT HAS AUTHORIZATION TO SEND NOTIFICATIONS IN FUTURE
  console.log(push) // result of this is important to store, it has authorization for future purposes 
  console.log("Push Registered...");

  // Send Push Notification
  console.log("Sending Push...");

  // SENDING PUSH NOTIFICATIONS CREDENTIALS TO SERVER TO STORE IT
  await fetch("/push_notifications/user_notification_details", {
    method: "POST",
    body: push,
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push Credentials Sent");  

  // (SINCE /subscribe IS THE ENDPOINT WHICH SENDS PUSH NOTIFICATION TO CLIENT AS RESPONSE)
  // await fetch("/subscribe", {
  //   method: "POST",
  //   body: JSON.stringify(subscription),
  //   headers: {
  //     "content-type": "application/json"
  //   }
  // });
  // console.log("Push Sent...");

}


function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
