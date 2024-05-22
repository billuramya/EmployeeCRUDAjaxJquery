$(document).ready(function () {
    ShowEmployeeData();
});

function ShowEmployeeData() {
    $.ajax({
        url: '/Ajax/EmployeeList',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.city + '</td>';
                object += '<td>' + item.state + '</td>';
                object += '<td>' + item.salary + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.id + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.id + ')">Delete</a> </td>';
                object += '</tr>';

            });
            $('#table_data').html(object);

        },
        error: function () {
            alert("Data can't retrieved..");
        }

    });
};
//btnCloseEmployee

$('#btnAddEmployee').click(function () { // to display add employee
    clearTextBox();
    $('#EmployeeMadal').modal('show');
    $('#empId').hide();
    $('#AddEmployee').show();
    $('#btnUpdate').hide();
    $('#empHeading').text('Add Employee');

})

$('#btnCloseEmployee').click(function () {
    $('#EmployeeMadal').modal('hide');
})


function AddEmployee() {
    debugger
    var objdata = {
        Name: $('#Name').val(),
        city: $('#City').val(),
        State: $('#State').val(),
        Salary: $('#Salary').val()

    }
    $.ajax({   // ajax mthod accepts an object
        url: '/Ajax/AddEmployee', // this calling the action 
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Saved');
            clearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Saved");
        }
    })

}

function HideModalPopUp() {
    $('#EmployeeMadal').modal('hide');
}

function clearTextBox() { 
    $('#Name').val('');
    $('#City').val('');
    $('#State').val('');
    $('#Salary').val('');
    $('#Id').val('');
}




function Edit(id) {
    $.ajax({
        url: '/Ajax/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {

            $('#EmployeeMadal').modal('show');
            $('#Id').val(response.id);
            $('#Name').val(response.name);
            $('#City').val(response.city);
            $('#State').val(response.state);
            $('#Salary').val(response.salary);
            $('#AddEmployee').hide();
            $('#btnUpdate').show();
            $('#empHeading').text('Update Record');

        },
        error: function () {
            alert('Data Not Found');
        }
    })
}

function UpdateEmployee() { // after clcking update button op popup then it will perform operation
    var objdata = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        city: $('#City').val(),
        State: $('#State').val(),
        Salary: $('#Salary').val()
    }
    $.ajax({
        url: '/Ajax/Update',
        type: 'Post',
        data: objdata,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Saved');
            clearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Saved");
        }
    })

}


function Delete(id) {

    if (confirm('Are you sure,You want to delete this record?')) {
        $.ajax({
            url: '/Ajax/Delete?id=' + id,
            success: function () {
                alert("Record Deleted!");
                ShowEmployeeData();
            },
            error: function () {
                alert("Data can't be deleted");
            }


        })
    }
}