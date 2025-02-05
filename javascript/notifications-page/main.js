const numUnread = document.getElementById("num-unread");
const markRead = document.getElementById("mark-read");
const unreadNotifications = document.querySelectorAll(".unread");

markRead.addEventListener("click", () => {
  numUnread.textContent = "0";
  unreadNotifications.forEach((elm) => {
    elm.classList.remove("unread");
  });
});