const cookies = ('; ' + document.cookie).split('; bg=').pop().split(';').shift()

$('body').css("background-color", cookies);
$('#pulldown').val(cookies).change();

// iterate through localStorage on page load
Object.keys(localStorage).forEach(function (key) {
    // get item by key
    const getItem = JSON.parse(localStorage.getItem(key));

    // color fields that are marked under "done"
    function colorField() {
        if (getItem.done) {
            return `<td style="background-color: green" class="done"><button onclick="done(${key})">done</button></td>`;
        }
        return `<td class="done"><button onclick="done(${key})">done</button></td>`;
    }

    // add row to table
    document.getElementById("list").innerHTML += `
        <tr>
          ${colorField()}
          <td>${getItem.inputValue}</td>
          <td class="delete"><button onclick="del(${key})">delete</button></td>
        </tr>`;
});

// add value to localstorage
function add() {
    // get the value in text field
    const inputValue = $("#task-input").val();

    // define defaults
    const obj = {
        inputValue,
        done: false
    }

    // consider only inputs with character count higher or equal 3
    if (inputValue.length >= 3) {
        // assign item with key and value
        // object needs to be stringified since localstorage value takes only strings
        localStorage.setItem(String(localStorage.length + 1), JSON.stringify(obj))
    } else {
        window.alert("Input at least 3 characters!");
    }
}

// done button
function done(key) {
    // parse the value from localstorage value
    const getItem = JSON.parse(localStorage.getItem(key));

    const obj = {
        inputValue: getItem.inputValue
    }

    obj.done = !getItem.done;

    // set localstorage key and value
    localStorage.setItem(key, JSON.stringify(obj))
}

// delete button
function del(key) {
    if (confirm("Are you sure you want to delete this record?")) {
        // remove item by key passed through "onclick" event
        localStorage.removeItem(key);
    }
}

$(document).ready(function () {
    $("#pulldownLabel").selectmenu();

    $("body").on('change', function () {
        const finder = $('#pulldown').find(":selected").val();

        document.cookie = `bg=${finder}`;

        $('body').css("background-color", finder);
    });

    $('body').hide().fadeIn(1250)
    $('box').hide().fadeIn(2500);
    $('#task-input').hide().slideDown(50);
    $('#add-button').hide().fadeIn(1250);
    $('#list').hide().fadeIn(1250);

});
