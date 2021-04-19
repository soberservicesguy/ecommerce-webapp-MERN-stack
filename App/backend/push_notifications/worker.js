// this file will be imported in client.js which will fire push notification from client through post request on /subscribe

console.log("Service Worker Loaded...");

// this is content of the push notification
self.addEventListener("push", e => {
  const data = e.data.json(); // this will get the payload we passed
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, { // data.title is from payload (BACKEND) ( Push Test )
    body: "Notified by Traversy Media!", // this is being sent as payload
    icon: "http://image.ibb.co/frYOFd/tmlogo.png" // this is also being sent as payload
  });
});
