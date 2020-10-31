var dtl = [];
var vdtl = {};
var tmp = "";
var tmpTable = "";
var countries1;
var suppliers;

//CALL FUNCTION 
initialLoad();


//FUNCTIONS
function initialLoad() {
    dtl = []; vdtl = {};

    vdtl["CardCode"] = "";
    dtl.push(vdtl);

    ApiAjax("YourServer/api/YourApiController/YourMethodName", dtl, function (data) {

        if (data.length > 0) {
            dtl = [];
            for (key in data) {
                tmp = data[key];
                vdtl = {}
                vdtl["name"] = tmp.CardName;
                vdtl["val"] = tmp.CardCode;
                dtl.push(vdtl);
            }
            $('#overlay').fadeOut();
            
        }

    });    
    countries1 = [{ name: "Del Monte", val: "011" },
        { name: "Davao", val: "023" }, { name: "Denver", val: "023" }]
}


//EVENTS

$(document).on('keydown', '#txtVendorName', function (e) {
    autocomplete(document.getElementById("txtVendorName"), dtl, "postpo");    
    //autocomplete(document.getElementById("txtVendorName"), countries1, "postpo");    
});

$(document).on('keyup', '#txtVendorName', function (e) {
    if (e.which == 8) {
        $('#txtVendorCode').val("");
    }
});

$(document).on('focusout', '#txtVendorName', function (e) {
    if ($('#txtVendorCode').val() == "") {
        $('#txtVendorName').val("");
        $('#txtVendorCode').focus();
    } 
});
