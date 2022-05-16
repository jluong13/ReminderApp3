const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const reminders = JSON.parse(localStorage.getItem("reminders") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Reminder";
    addBtn.innerText = "Add Reminder";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function showReminders() {
    if(!reminders) return;
    document.querySelectorAll(".reminder").forEach(li => li.remove());
    reminders.forEach((reminder, id) => {
        let filterDesc = reminder.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="reminder">
                        <div class="details">
                            <p>${reminder.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${reminder.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateReminder(${id}, '${reminder.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteReminder(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showReminders();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteReminder(reminderId) {
    let confirmDel = confirm("Are you sure you want to delete this reminder?");
    if(!confirmDel) return;
    reminders.splice(reminderId, 1);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    showReminders();
}

function updateReminder(reminderId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = reminderId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Reminder";
    addBtn.innerText = "Update Reminder";
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
    description = descTag.value.trim();

    if(title || description) {
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();

        let reminderInfo = {title, description, date: `${month} ${day}, ${year}`}
        if(!isUpdate) {
            reminders.push(reminderInfo);
        } else {
            isUpdate = false;
            reminders[updateId] = reminderInfo;
        }
        localStorage.setItem("reminders", JSON.stringify(reminders));
        showReminders();
        closeIcon.click();
    }
});