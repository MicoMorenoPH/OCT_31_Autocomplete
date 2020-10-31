var tmpTable = "";
var modalTmpTable = "";

//DYNAMIC SET COMMA IN EVERY KEY PRESS
function commaKeypress(objName, conv) {
    $(document).on('keyup', objName, function (event) {
        // skip for arrow keys
        if (event.which >= 37 && event.which <= 40) return;

        // format number
        $(this).val(function (index, value) {
            return value
                .replace(/\D/g, "")
                //.replace(/[^0-9$.0]/g, "") allow dot
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                ;
        });
    });
     

    //if (conv == 1) {
    //    $(objName).bind(objName, function () {
    //        var c = this.selectionStart,
    //            r = /[^0-9]/gi,
    //            v = $(this).val();
    //        if (r.test(v)) {
    //            $(this).val(v.replace(r, ''));                
    //            c--;
    //        }
    //        this.setSelectionRange(c, c);
    //    });
    //} else {
    //    $(objName).bind(objName, function () {
    //        var c = this.selectionStart,
    //            r = /[^0-9 .]/gi,
    //            v = $(this).val();
    //        if (r.test(v)) {
    //            $(this).val(v.replace(r, ''));
    //            $(this).val(v.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    //            c--;
    //        }
    //        this.setSelectionRange(c, c);
    //    });
    //}
}

function formatNumAllowDot(objName) {
    $(document).on('keyup', objName, function (event) {
        // skip for arrow keys
        if (event.which >= 37 && event.which <= 40) return;

        // format number
        $(this).val(function (index, value) {
            return value
                //.replace(/\D/g, "")
                .replace(/[^0-9$.0]/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                ;
        });
    });
}

//DYNAMIC VALIDATION OF SINGLE QOUTE
function validateSingleQoute(event) {
    var key = window.event ? event.keyCode : event.which;
    if (key == 39) {
        alert("cockroach");
        return false;
    }
}


//GLOBAL FORMAT NUMBER WITH COMMA
function formatComma(param) {
    var sysData = numeral(param).format("0,0");
    return sysData;
}

//GLOBAL 2 NUMBER COMPARISON
function numCompare(encodeNumber,baseNumber) {
    if (encodeNumber > baseNumber) {
        return true;
    } else {
        return false;
    }
}

//DYNAMIC WARNING MESSAGE
function warningMessage(message) {
    modalTmpTable = "";
    $('#md-warning-message').empty();
    modalTmpTable += '<p>' + message + '</p>';
    $('#md-warning-message').append(modalTmpTable);
    $('#modal-warning').modal("show");
}
//DYNAMIC SUCCESS MESSAGE
function successMessage(message,status) {
    tmpTable = "";
    tmpMessage = "";

    $('#md-success-body').empty();
    tmpMessage += '<span>' + message + '</span>'
    $('#md-success-body').append(tmpMessage);
    $('#md-status').val(status);
    $('#modal-success').modal("show");
}
//DYNAMIC ERROR MESSAGE
function dangerMessage(message) {
    tmpTable = "";
    $('#md-danger-message').empty();
    tmpTable += '<p>' + message + '</p>';
    $('#md-danger-message').append(tmpTable);
    $('#modal-danger').modal("show");
}
//DYNAMIC NETWORK MESSAGE
function networkMessage(message) {
    tmpTable = "";
    $('#md-network-message').empty();
    tmpTable += '<p>' + message + '</p>';
    $('#md-network-message').append(tmpTable);
    $('#modal-network').modal("show");
}


//DYNAMIC AJAX
function NAjax(url, jParam, callback) {
    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        data: {
            sysParam: jParam,
        },
        success: function (data) {
            callback(data);
        }
    });
}

function ApiAjax(url, jParam, callback) {

    $.ajax({
        url: url,
        type: "post",
        dataType: "json",
        data: JSON.stringify(jParam),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            callback(data);
        }, error: function (xhr, status) {
            if (xhr.status == "404") {
                warningMessage(xhr.responseText);
            } else if (xhr.status == "409") {
                dangerMessage(xhr.responseText);
            } else if (xhr.status == "408") {
                networkMessage(xhr.responseText);
            } else {
                dangerMessage(xhr.status + " - " + xhr.statusText + " - " + xhr.responseText);
            }
        }
    });
}


//PRINT NO LOT NUMBER
function createNewPrintPage(objName, botSeperator, debitnote, enc_dt, page, terms, u_soano, refno,branchName,reqBy,remarks) {
    //$('#printMe').empty();
    tmpTable = "";
    tmpTable += '<span>HI-PRECISION DIAGNOSTICS</span> <br />'
    tmpTable +='<span>Debit Note</span>'
    tmpTable +='<div class="row1print">'
    tmpTable +='<div class="print1">DEBIT THE ACCOUNT OF <i>without lot number</i> </div>'
    tmpTable +='<div class="print2">DATE</div>'
    tmpTable +='<div class="print3">PAGE</div>'
    tmpTable +='<div class="print4">'
    tmpTable +='<div class="print4-child">'
    tmpTable +='<span>SRN: '+ u_soano +'</span>'
    tmpTable +='<span>REQUEST REF: '+ refno +'</span>'
    tmpTable +='<span>TO: ' + branchName +'</span>'
    tmpTable +='<span>REQUEST BY: ' + reqBy +'</span>'
    tmpTable +='<span>REMARKS: ' + remarks +'</span>'
    tmpTable +='</div>'
    tmpTable +='</div>'
    tmpTable +='<div class="print5">'+ enc_dt +'</div>'
    tmpTable +='<div class="print6">'+ page +'</div>'
    tmpTable += '<div class="print7">DEBIT NO.</div>'
    tmpTable +='<div class="print8">TERMS</div>'
    tmpTable +='<div class="print9">'+ debitnote +'</div>'
    tmpTable += '<div class="print10">' + terms +'</div>'
    tmpTable +='</div>'
    tmpTable +='<div style="margin-bottom:5px"></div>'
    tmpTable += '<div class="table-responsive" id="transferPrintTable">'
    tmpTable += '<table class="table table-bordered table-striped">'
    tmpTable += '<tbody id='+ objName +'>'
    tmpTable += '<tr>'
    tmpTable += '<th class="th-M print-th" style="width:5%">#</th>'
    tmpTable += '<th class="th-M print-th" style="width:10%">Item Code</th>'
    tmpTable += '<th class="print-th" style="width:50%">Description</th>'
    tmpTable += '<th class="th-M print-th" style="width:10%">Quantity</th>'
    tmpTable += '<th class="th-M print-th" style="width:10%">UOM</th>'
    tmpTable += '</tr>'
    tmpTable += '</tbody>'
    tmpTable += '</table>'
    tmpTable += '</div>'
    tmpTable += '<div style="margin-bottom:5px"></div>'
    tmpTable += '<div class="row2print">'
    tmpTable += '<div class="print-1">DELIVERED BY</div>'
    tmpTable += '<div class="print-2">DELIVERED DATE</div>'
    tmpTable += '<div class="print-3">RECEIVED THE ABOVE ITEMS IN GOOD CONDITION</div>'
    tmpTable += '<div class="print-4">RECEIVED DATE</div>'
    tmpTable += '<div class="print-5">CHECKED BY</div>'
    tmpTable +='<div class="print-6">TIME DISPATCHED</div>'
    tmpTable += '<div class="print-7">TIME RECEIVED</div>'
    tmpTable +='</div>'
    tmpTable += '<div id='+ botSeperator +' class="bottomSeperator"></div>'
    tmpTable +='<span>.</span>'
    tmpTable += '<div style="margin-bottom:50px"></div>'
    $('#printMe').append(tmpTable);
}
// PRINT WITH LOT NUMBER
function createNewPrintPageWithLotNumber(objName, botSeperator, debitnote, enc_dt, page, terms, u_soano, refno, branchName, reqBy, remarks) {
    //$('#printMe').empty();
    tmpTable = "";
    tmpTable += '<span>HI-PRECISION DIAGNOSTICS</span> <br />'
    tmpTable += '<span>Debit Note</span>'
    tmpTable += '<div class="row1print">'
    tmpTable += '<div class="print1">DEBIT THE ACCOUNT OF</div>'
    tmpTable += '<div class="print2">DATE</div>'
    tmpTable += '<div class="print3">PAGE</div>'
    tmpTable += '<div class="print4">'
    tmpTable += '<div class="print4-child">'
    tmpTable += '<span>SRN: ' + u_soano + '</span>'
    tmpTable += '<span>REQUEST REF: ' + refno + '</span>'
    tmpTable += '<span>TO: ' + branchName + '</span>'
    tmpTable += '<span>REQUEST BY: ' + reqBy + '</span>'
    tmpTable += '<span>REMARKS: ' + remarks + '</span>'
    tmpTable += '</div>'
    tmpTable += '</div>'
    tmpTable += '<div class="print5">'+ enc_dt +'</div>'
    tmpTable += '<div class="print6">'+ page +'</div>'
    tmpTable += '<div class="print7">DEBIT NO.</div>'
    tmpTable += '<div class="print8">TERMS</div>'
    tmpTable += '<div class="print9">'+ debitnote +'</div>'
    tmpTable += '<div class="print10">'+ terms +'</div>'
    tmpTable += '</div>'
    tmpTable += '<div style="margin-bottom:5px"></div>'
    tmpTable += '<div class="table-responsive" id="transferPrintTableWithLot">'
    tmpTable += '<table class="table table-bordered table-striped">'
    tmpTable += '<tbody id=' + objName + '>'
    tmpTable += '<tr>'
    tmpTable += '<th class="th-M print-th" style="width:5%">#</th>'
    tmpTable += '<th class="th-M print-th" style="width:10%">Item Code</th>'
    tmpTable += '<th class="print-th" style="width:50%">Description</th>'
    tmpTable += '<th class="th-M print-th" style="width:10%">Quantity</th>'
    tmpTable += '<th class="th-M print-th" style="width:10%">UOM</th>'
    tmpTable += '</tr>'
    tmpTable += '</tbody>'
    tmpTable += '</table>'
    tmpTable += '</div>'
    tmpTable += '<div style="margin-bottom:5px"></div>'
    tmpTable += '<div class="row2print">'
    tmpTable += '<div class="print-1">DELIVERED BY</div>'
    tmpTable += '<div class="print-2">DELIVERED DATE</div>'
    tmpTable += '<div class="print-3">RECEIVED THE ABOVE ITEMS IN GOOD CONDITION</div>'
    tmpTable += '<div class="print-4">RECEIVED DATE</div>'
    tmpTable += '<div class="print-5">CHECKED BY</div>'
    tmpTable += '<div class="print-6">TIME DISPATCHED</div>'
    tmpTable += '<div class="print-7">TIME RECEIVED</div>'
    tmpTable += '</div>'
    tmpTable += '<div style="margin-bottom:1px"></div>'
    tmpTable +='<div class="row3print">'
    tmpTable += '<div class="print-1a"><b>DO NOT WRITE BELOW THIS LINE, FOR QC OFFICER ONLY</b></div>'
    tmpTable +='<div class="print-2a">'
    tmpTable +='<span><b>TEMPERATURE REQUIREMENT</b></span>'
    tmpTable +='</div>'
    tmpTable +='<div class="print-3a">'
    tmpTable +='<div class="print-3a-child">'
    tmpTable +='<span><b>REMARKS : </b></span><br /><br />'
    tmpTable +='<div class="p-3a-child1">'
    tmpTable +='<input type="checkbox" class="row3printChk" />'
    tmpTable +='<span >PASSED</span>'
    tmpTable +='<input type="checkbox" class="row3printChk" />'
    tmpTable +='<span >FAILED</span>'
    tmpTable +='</div>'
    tmpTable +='<div class="p-3a-child2">'
    tmpTable +='<input type="checkbox" class="row3printChk" />'
    tmpTable +='<span>REFRIGERATED</span>'
    tmpTable +='<input type="checkbox" class="row3printChk" />'
    tmpTable +='<span>ROOM TEMP</span>'
    tmpTable +='<input type="checkbox" class="row3printChk" />'
    tmpTable +='<span>FROZEN</span>'
    tmpTable +='</div>'
    tmpTable +='</div>'
    tmpTable +='</div>'
    tmpTable +='<div class="print-4a">'
    tmpTable +='<div class="print-4a-child">'
    tmpTable +='<span id="ref1">REFRIGERATED :</span>'
    tmpTable +='<span id="ref2">(2°C to 8°C)</span>'
    tmpTable +='<input type="checkbox" id="ref3" class="row3printChk" />'
    tmpTable +='</div>'
    tmpTable +='</div>'
    tmpTable +='<div class="print-5a">'
    tmpTable +='<div class="print-4a-child">'
    tmpTable +='<span id="ref1">ROOM TEMP :</span>'
    tmpTable +='<span id="ref2">(15°C to 25°C)</span>'
    tmpTable +='<input type="checkbox" id="ref3" class="row3printChk" />'
    tmpTable +='</div>'
    tmpTable +='</div>'
    tmpTable +='<div class="print-6a">'
    tmpTable +='<div class="print-4a-child">'
    tmpTable +='<span id="ref1">FROZEN :</span>'
    tmpTable +='<span id="ref2">(-20°C to -70°C)</span>'
    tmpTable +='<input type="checkbox" id="ref3" class="row3printChk" />'
    tmpTable +='</div>'
    tmpTable +='</div>'
    tmpTable +='<div class="print-7a">'
    tmpTable +='<span><b>CORRECTIONS : </b></span>'
    tmpTable +='</div>'
    tmpTable +='</div>'
    tmpTable += '<div id=' + botSeperator + ' class="bottomSeperator"></div>'
    tmpTable += '<span>.</span>'
    tmpTable += '<div style="margin-bottom:50px"></div>'
    $('#printMe').append(tmpTable);
}

//LOG OUT
$(document).on('click', '#logout', function () {
    window.location.href ='/Home/Logout'
});

//SINGLE QOUTE
$(document).on('keypress', ':text', function (e) {
    if (e.which == 39) {
        warningMessage('User(s) are not allowed to input apostrophe character.');
        return false;
    }
});

//ADD SESSION 
$(document).on('mouseover', '#bodyParent', function () {
    $.ajax({
        url: "/nTools/addSession",
        type: "post",
        datatype: "json",
        success: function (data) {
            console.log("testing only");
        }
    });
});

//AUTOCOMPLETE
function autocomplete(inp, arr, nFor) {
    var currentFocus;
    var newIndex;
    var retVal = "";
    inp.addEventListener("input", function (e) { /*execute a function pag nag type ka sa object:*/
        var a, b, i, val = this.value;
        closeAllLists();  /*close any already open lists of autocompleted values*/
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                b.setAttribute("id", "vendorAutoComplete");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].name.substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i].name + "' rValue ='" + arr[i].val + "' id='autoComId' >";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    document.getElementById("txtVendorCode").value = this.getElementsByTagName("input")[0].getAttribute("rValue");
                    if (nFor == "postpo") {
                        $('#cboPoFor').focus();
                    }
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        newIndex = currentFocus;
        if (newIndex != 0) {
            currentFocus = newIndex++;
        }



        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            console.log(currentFocus);
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}