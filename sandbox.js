const ul = document.getElementById("tasks");
const form = document.getElementById("form");
const timeEdit = document.getElementById("formTime");
const activityEdit = document.getElementById("formActivity");
const submitBtn = document.getElementById("submit");

const deleteData = (id) => {
    db.collection('tasks').doc(id).delete()
        .then(
            () => {
                getData();
            })
        .catch(
            err => {
                console.log(err);
            });
};

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
        li.className = "slide-fade";
        li.textContent = `${task.data().action} ${task.data().time}`;
        let btn = document.createElement('button');
        btn.className = "btn btn-danger btn-sm my-2";
        btn.textContent = "delete"
        btn.style.minWidth = "100px";
        btn.setAttribute("data-id", task.id);
        ul.append(li, btn);
    });
    onClickTask();
};

const onClickTask = () => {
    ul.addEventListener("click", ev => {
        if (ev.target.tagName === 'BUTTON') {
            deleteData(ev.target.getAttribute("data-id"));
        }
    });
}

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
