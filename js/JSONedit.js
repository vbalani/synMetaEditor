'use strict';

var app = angular.module('exampleApp', ['JSONedit']);

function MainViewCtrl($scope, $filter) {

$scope.submit = function() {   
    try {
        var aggobj = [];
        var fields = ""
        fields = $scope.inputString;
      //  $scope.flist = ["accountingdate","division","ponumber","invoicedate","invoiceid","polinenumber","paymentdate","checknbr","voucherlineamt","invoicelinenum","voucherprice","contractnbr","productcode","productdescription","vendornumber","vendorname","vendortype","vendorclass","masterformatcode","masterformatdescr"];

        var fsettings = {
            type_name: "<tname>",
            field_name: "<fname>",
            order_no: "1",
            data_type: "DATE",
            analysis_type: "TBD",
            display_label: "Report Date",
            view_length: "12",
            facet_interval: "TIME",
            facet_properties: "",
            waypoints: [],
            auto_complete: "",
            xlatval: []
        };
        var facetTypes = {
        string : "CATEGORICAL",
        date : "TIME",
        float: "RANGE",
        integer: "RANGE"

    }

        var fname = "";
        var item = [];
        var flist = [];
        var reg = new RegExp('[ \t]{1,}','g');
        flist= fields.split("\n");
        for (var i = 0; i < flist.length; i++) {
            item = flist[i].replace(reg,',').split(',');
            var metaTmp = {}; 
           //  metaTmp = fsettings;
            metaTmp.type_name = $scope.typeName;
            metaTmp.field_name = item[0]; 
            metaTmp.order_no = i+1;
            metaTmp.data_type = item[1];
            metaTmp.display_label = item[0];
            metaTmp.view_length = 12;
            metaTmp.facet_interval = facetTypes[item[1]];
            metaTmp.facet_properties = "NONE";
            if (item[1] == "string") {
                metaTmp.waypoints = [];
                var wp = {
                    type_name : "ff",
                    field_name : "ff"
                };


               wp.type_name = $scope.typeName;
            wp.field_name = item[0];
                metaTmp.waypoints.push(wp);       
            }
            else {
                metaTmp.waypoints = [];                        
            };

            metaTmp.auto_complete = "N"
            metaTmp.xlatval = [];
            aggobj.push(metaTmp);
        };
        
        $scope.jsonData = aggobj;
        $scope.readSuccess = true;
    } 
    catch(e) {
        $scope.readSuccess = false;
    }
};
    
$scope.buildMetaDataBulk = function() {
    var jObject = JSON.parse($filter('json')($scope.jsonData));
     var bulkInsert = "POST <idx_>/sys_fields/_bulk" + "\n" ;
    for (var i = 0; i < jObject.length; i++) {
        bulkInsert = bulkInsert + "{ \"index\" :{} }" + "\n" + JSON.stringify(jObject[i]) + "\n";
    };
    $scope.esMetaDataBulk = bulkInsert;

};
    
/*    $scope.$watch('jsonData', function(json) {
        $scope.jsonString = $filter('json')(json);
    }, true); */
    
    
    $scope.$watch('jsonString', function(json) {
        try {
            $scope.jsonData = JSON.parse(json);
            $scope.wellFormed = true;
        } catch(e) {
            $scope.wellFormed = false;
        }
    }, true);
    $scope.$watch('typeName', function(tname) {
            try {
                $scope.typeName = tname;
                $scope.tnameValid = true;
            } catch(e) {
                $scope.tnameValid = false;
            }
        }, true);
  /*  $scope.$watch('inputString', function(json) {
        try {
            var aggobj = [];
              //  $scope.flist = ["accountingdate","division","ponumber","invoicedate","invoiceid","polinenumber","paymentdate","checknbr","voucherlineamt","invoicelinenum","voucherprice","contractnbr","productcode","productdescription","vendornumber","vendorname","vendortype","vendorclass","masterformatcode","masterformatdescr"];
  
            var fsettings = {
                type_name: "<tname>",
                field_name: "<fname>",
                order_no: "1",
                data_type: "DATE",
                analysis_type: "TBD",
                display_label: "Report Date",
                view_length: "12",
                facet_interval: "TIME",
                facet_properties: "",
                waypoints: [],
                auto_complete: "",
                xlatval: []
            };
            var facetTypes = {
                string : "CATEGORICAL",
                date : "TIME",
                float: "RANGE",
                integer: "RANGE"
                
            }
            
                var fname = "";
                        var item = [];
                        var flist = [];
                    var reg = new RegExp('[ \t]{1,}','g');
                        flist= json.split("\n");
                for (var i = 0; i < flist.length; i++) {
                    
                  
                    item = flist[i].replace(reg,',').split(',');
                    var metaTmp = {}; 
                   //  metaTmp = fsettings;
                    metaTmp.type_name = $scope.typeName;
                    metaTmp.field_name = item[0].value; 
                    metaTmp.order_no = i+1;
                    metaTmp.data_type = item[1].value;
                    metaTmp.display_label = item[0];
                    metaTmp.view_length = 12;
                    metaTmp.facet_interval = facetTypes[item[1]];
                    metaTmp.facet_properties = "NONE";
                    if (item[1] == "string") {
                        metaTmp.waypoints = [];
                        var wp = {
                            type_name : "ff",
                            field_name : "ff"
                        };
                        
                        
                       wp.type_name = $scope.typeName;
                    wp.field_name = item[0];
                        metaTmp.waypoints.push(wp);       
                    }
                    else {
                        metaTmp.waypoints = [];                        
                    };

                    metaTmp.auto_complete = "N"
                    metaTmp.xlatval = [];
                    aggobj.push(metaTmp);
                };


                $scope.jsonData = aggobj;
            $scope.readSuccess = true;
        } catch(e) {
            $scope.readSuccess = false;
        }
    }, true);
    */
}
