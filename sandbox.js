
const ul = document.getElementById("tasks");
const textField = document.getElementById("formField");

getData();

const showTasks = (tasks) => {
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = `${task.data().action} ${task.data().time}`;
        ul.appendChild(li);
    });
};

textField.addEventListener('keypress', (e) => {
    e.preventDefault();

    if (e.key === 'Enter') {
        // code for enter
        const data = {
            time: "18:00",
            action: textField.value
        };

        console.log(this.value);

        addData(data);
    }
});

getData = ()=> {
    db.collection('tasks').get()
    .then(
        (snapshot) => {
            showTasks(snapshot.docs);
        })
    .catch(
        err => {
            console.log(err);
        });
};

addData = (obj) => {
    db.collection('tasks').add(obj)
    .then(
        (snapshot) => {
            showTasks(snapshot.docs);
        })
    .catch(
        err => {
            console.log(err);
        });
};

