const ul = document.getElementById("tasks");
const form = document.getElementById("form");
const timeEdit = document.getElementById("formTime");
const activityEdit = document.getElementById("formActivity");
const submitBtn = document.getElementById("submit");

const getData = () => {
    db.collection('tasks').get()
        .then(
            (snapshot) => {
                console.log("getData", true);
                showTasks(snapshot.docs);
            })
        .catch(
            err => {
                console.log(err);
            });
};

const addData = (obj) => {
    db.collection('tasks').add(obj)
        .then(() => {
            getData();
        })
        .catch(
            err => {
                console.log(err);
            });
};

const showTasks = (tasks) => {
    if (ul.childNodes.length > 0) {
        ul.innerHTML = '';
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = `${task.data().action} ${task.data().time}`;
        ul.appendChild(li);
    });
};

let eventList = ["keypress", "click"];

for (e of eventList) {
    form.addEventListener(e, listener);
}

function listener(e) {

    function isNotEmpty(...args) {
        let conditions = [];
        for (let i = 0; i < args.length; i++) {
            if (args[i].value.length > 0) {
                args[i].value = "";
                conditions[i] = true;
            }
        }
        return conditions.length === args.length;
    }

    let data = null;
    switch (e.target.id) {
        case timeEdit.id:
        case activityEdit.id:
            if (e.type === "keypress" && e.key === 'Enter') {
                if (isNotEmpty(timeEdit, activityEdit)) {
                    data = {
                        time: timeEdit.value,
                        action: activityEdit.value
                    };
                }
            }
            break;
        case submitBtn.id:
            if (e.type === "click") {
                e.preventDefault();
                if (isNotEmpty(timeEdit, activityEdit)) {
                    data = {
                        time: timeEdit.value,
                        action: activityEdit.value
                    };
                }
            }
            break;
    }
    if (data != null) {
        addData(data);
    }
}

getData();
