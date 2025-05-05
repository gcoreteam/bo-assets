function openModalFg(x) {
    $('#id_seq_active').val(x);
    $('.matfg'+x).remove();
    var set_id_item = $('#id_item_fg'+x).val();
    if(set_id_item != ""){
        $('#id_item_fg'+x).val('');
        $('#item_name_fg'+x).val('');
        $('#id_product_profile'+x).val('');
        $('.trprofile'+x).remove();
        $(".tdrow"+x).attr("rowspan","1");
        $("#btn_fg_modal"+x).removeClass("icon-reload").addClass("icon-grid");        
        return false;
    }
    $('#fg_modal').modal('toggle');

}

var table5 = $('#sample_5').dataTable({
    "processing": true,
    "serverSide": true,
    "destroy": true,
    'serverMethod': 'post',
    "ajax": {
        url: '../server/dt_product_so.php?act=finish_good'
    },
    'columns': [{
            data: 'id_item_rakitan'
        },
        {
            data: 'profile_name'
        },
        {
            data: 'item_code_fg'
        },
        {
            data: 'item_name_fg'
        },
        {
            data: 'merk'
        },
        {
            data: 'sell_price'
        },
    ],
    "columnDefs": [{
            "targets": 1,
            "data": null,
                  "render": function(data, type, row, meta) {
                var btn = '';
                if (row.profile_name != null) {
                    var data_item = "'" + row.id_item_rakitan + "','" + row.profile_name + "','" + row.item_code_fg + "','" + row.item_name_fg + "','" + row.merk + "','" + row.width + "','" + row.height + "','" + row.in_diameter + "','" + row.out_diameter + "','" + row.d1 + "','" + row.xlength + "','" + row.length1 + "','" + row.id_product_profile + "','" + row.sell_price + "','setprf'";
                    btn += '<button type="button" onclick="setFg(' + data_item + ')" class="btn green btn-outline p-action"  data-dismiss="modal" aria-hidden="true">';
                    btn += row.profile_name;
                    btn += '</button>';
                }
                          return btn;
            }
        }, {
            "targets": 2,
            "data": null,
                  "render": function(data, type, row, meta) {
                var btn = '';
                var data_item = "'" + row.id_item_rakitan + "','" + row.profile_name + "','" + row.item_code_fg + "','" + row.item_name_fg + "','" + row.merk + "','" + row.width + "','" + row.height + "','" + row.in_diameter + "','" + row.out_diameter + "','" + row.d1 + "','" + row.xlength + "','" + row.length1 + "','" + row.id_product_profile + "','" + row.sell_price + "','setfg'";
                btn += '<button type="button" onclick="setFg(' + data_item + ')" class="btn green btn-outline p-action"  data-dismiss="modal" aria-hidden="true">';
                btn += row.item_code_fg;
                btn += '</button>';
                return btn;
            }
        }, {
            "targets": 0,
            "data": null,
            "render": function(data, type, row, meta) {
                var num = meta.row + 1;
                return num;
            }
        },
        {
            "orderable": true,
            "targets": 3
        }
    ],

    // setup responsive extension: http://datatables.net/extensions/responsive/
    // responsive: false, //kalo true maka actionnya ke bawah

    "lengthMenu": [
        [5, 10, 15, 20, -1],
        [5, 10, 15, 20, "All"] // change per page values here
    ],
    "pageLength": 10,

});
function setFg(id_item_fg, profile_name, item_code_fg, item_name_fg, merk, width, height, in_diameter, out_diameter, d1, xlength, length1, id_product_profile,sell_price, setType) {
    var x = $('#id_seq_active').val();
    var profile_name = (profile_name == 'null') ? '' : profile_name;
    var item_name_fg = (setType == "setprf") ? profile_name : profile_name + ' ' + item_code_fg + ' ' + item_name_fg + ' ' + merk;
    var id_item_fg = (setType == "setprf") ? '' : id_item_fg;

    $('#id_item_fg' + x).val(id_item_fg);
    $('#id_product_profile' + x).val(id_product_profile);
    $('#item_name_fg' + x).val(item_name_fg);
    $('#sell_price_fg' + x).val(sell_price);
    $('#qty_fg' + x).val(1);
    $('#disc_fg' + x).val(0);
    calFg(x);
    $("#btn_fg_modal" + x).removeClass("icon-grid").addClass("icon-reload");
    if (id_product_profile != 'null') {
        var trprd = '<tr class="trprofile' + x + '">' +
            '<td>ID</td>' +
            '<td>OD</td>' +
            '<td>D1</td>' +
            '<td>L</td>' +
            '<td>L1</td>' +
            '<td>H/S</td>' +
            '</tr>' +
            '<tr class="trprofile' + x + '">' +
            '<td><input type="text" name="in_diameter0" id="in_diameter0" class="form-control" value=""></td>' +
            '<td><input type="text" name="out_diameter0" id="out_diameter0" class="form-control" value=""></td>' +
            '<td><input type="text" name="d10" id="d10" class="form-control" value=""></td>' +
            '<td><input type="text" name="xlength0" id="xlength0" class="form-control" value=""></td>' +
            '<td><input type="text" name="length10" id="length10" class="form-control" value=""></td>' +
            '<td><input type="text" name="height0" id="height0" class="form-control" value=""></td>' +
            '</tr>' +
            '<tr></tr>';
        $(".tdrow" + x).attr("rowspan", "3");
        $('#trprd' + x).after(trprd);
    }
    (in_diameter == 1) ? $('#in_diameter' + x).prop('disabled', false): $('#in_diameter' + x).prop('disabled', true);
    (out_diameter == 1) ? $('#out_diameter' + x).prop('disabled', false): $('#out_diameter' + x).prop('disabled', true);
    (d1 == 1) ? $('#d1' + x).prop('disabled', false): $('#d1' + x).prop('disabled', true);
    (xlength == 1) ? $('#xlength' + x).prop('disabled', false): $('#xlength' + x).prop('disabled', true);
    (length1 == 1) ? $('#length1' + x).prop('disabled', false): $('#length1' + x).prop('disabled', true);
    (height == 1) ? $('#height' + x).prop('dis45abled', false): $('#height' + x).prop('disabled', true);
    $('#in_diameter' + x).focus();

    $('.matfg'+x).remove();
    if(setType == 'setfg'){
        var no = parseFloat($('#id_seq_mat_fg' + x).val()) + 1;
        $.ajax({
            url: "../server/svr_sales_order.php",
            method: 'POST',
            data: {
                act: 'detailMatFg',
                id_item_rakitan:id_item_fg,
            },
            success: function(res) {
                var htmlMat = '';
                for (var i = 0; i < res.detail.length; i++) {
                    htmlMat+= '<tr id="row_mat_fg' + x + '_'+no+'" class="matfg'+x+'">' +
                        '<td>' +
                            '<input type="text" class="form-control" name="no_mat_fg' + x + '_' + no + '" id="no_mat_fg' + x + '_' + no + '" value="">' +
                        '</td>' +
                        '<td>' +
                        '<input type="hidden" class="form-control" name="id_item_mat_fg' + x + '_'+no+'" id="id_item_mat_fg' + x + '_'+no+'" value="'+res.detail[i].id_item+'" readonly>' +
                        '<input type="text" class="form-control" name="item_material_fg' + x + '_'+no+'" id="item_material_fg' + x + '_'+no+'" value="'+res.detail[i].produk+'" readonly>' +
                        '</td>' +
                        '<td width="1%;"  data-toggle="modal" href="#mat_fg_modal" onclick="dataMatFg(' + x + ','+no+');"><button type="button" class="btn btn-primary" style="text-align:right;"><i class="fa fa-file"></i></button></td>' +
                        '<td><input type="text" class="form-control" name="part_number' + x + '_'+no+'" id="part_number' + x + '_'+no+'" value="" readonly></td>' +
                        '<td width="1%;"><button type="button" data-toggle="modal" href="#part_modal" onclick="dataPart(' + x + ','+no+')"  class="btn btn-primary" style="text-align:right;"><i class="fa fa-file"></i></button></td>' +
                        '<td><input type="text" class="form-control" name="length_part' + x + '_'+no+'" id="length_part' + x + '_'+no+'" value="" readonly></td>' +
                        '<td><input type="text" class="form-control" name="used' + x + '_'+no+'" id="used' + x + '_'+no+'" value="" readonly></td>' +
                        '<td><input type="text" class="form-control" name="unit' + x + '_'+no+'" id="unit' + x + '_'+no+'" value="" readonly></td>' +
                        '<td><input type="text" class="form-control" name="qty_mat_fg' + x + '_'+no+'" id="qty_mat_fg' + x + '_'+no+'" value="'+res.detail[i].qty+'" onblur="calPart(' + x + ','+no+');"></td>' +
                        '<td><input type="text" class="form-control" name="price_mat_fg' + x + '_'+no+'" id="price_mat_fg' + x + '_'+no+'" value="'+res.detail[i].sell_price+'" onblur="calPart(' + x + ','+no+');"></td>' +
                        '<td><input type="text" class="form-control" name="total_mat_fg' + x + '_'+no+'" id="total_mat_fg' + x + '_'+no+'" value="'+res.detail[i].total+'" readonly></td>';
                        htmlMat += '<td width="1%;"><div style="display:flex">';
                        htmlMat+='<button type="button" class="btn btn-danger" style="text-align:right;" onclick="removeMatFg(' + x + ',' + no + ')"><i class="fa fa-minus"></i></button>';
                        
                        htmlMat+='<div class="md-checkbox m-t-5" title="check for show in printout">' +
                        '<input type="checkbox" id="show_mat_fg' + x + '_' + no + '" class="md-check" value="" onClick="calGlobal();" >' +
                        '<label for="show_mat_fg' + x + '_' + no + '">' +
                        '<span class="inc"></span>' +
                        '<span class="check"></span>' +
                        '<span class="box"></label>' +
                        '</div>';
                        htmlMat+='</div></td>';
                        '</tr>';
                        no++;
                }

                $('#id_seq_mat_fg' + x).val(no);
                $('#row_' + x).append(htmlMat);
            }
        });
    }

}
function dataMatFg(x, i) {
    var in_diameter = ($('#in_diameter' + x).val() != undefined) ? $('#in_diameter' + x).val() : '';
    var out_diameter = ($('#out_diameter' + x).val() != undefined) ? $('#out_diameter' + x).val() : '';
    var d1 = ($('#d1' + x).val() != undefined) ? $('#d1' + x).val() : '';
    var xlength = ($('#xlength' + x).val() != undefined) ? $('#xlength' + x).val() : '';
    var length1 = ($('#length1' + x).val() != undefined) ? $('#length1' + x).val() : '';
    var height = ($('#height' + x).val() != undefined) ? $('#height' + x).val() : '';
    var table5 = $('#mat_fg_datatable').dataTable({
        "processing": true,
        "serverSide": true,
        "destroy": true,
        'serverMethod': 'post',
        "ajax": {
            url: '../server/dt_product_so.php?act=material&in_diameter=' + in_diameter + '&out_diameter=' + out_diameter
            // url: '../server/dt_product_mat.php?act=material'
        },
        'columns': [{
                data: 'id_item'
            },
            {
                data: 'item_code'
            },
            {
                data: 'item_name'
            },
            {
                data: 'uom'
            },
            {
                data: 'net_price'
            },
            {
                data: 'stock'
            },
            {
                data: 'net_price'
            },
        ],
        "columnDefs": [{
                "targets": 0,
                "data": null,
                "render": function(data, type, row, meta) {
                    var num = meta.row + 1;
                    return num;
                }
            }, {
                "targets": -1,
                "data": null,
                "render": function(data, type, row, meta) {
                    var btn = '';
                    var data_item = "'" + row.id_item + "','" + row.item_code + "','" + row.item_name + "','" + row.net_price + "','" + row.uom + "','" + x + "','" + i + "'";
                    btn += '<button type="button" onclick="setMatFg(' + data_item + ')" class="btn green btn-outline p-action"  data-dismiss="modal" aria-hidden="true">';
                    btn += '<i class="fa fa-arrow-down"></i>';
                    btn += '</button>';
                    return btn;
                }
            },
            {
                "orderable": true,
                "targets": 3
            }
        ],
        // setup responsive extension: http://datatables.net/extensions/responsive/
        // responsive: false, //kalo true maka actionnya ke bawah
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"] // change per page values here
        ],
        "pageLength": 10,

    });
}
function setMatFg(id_item,item_code,item_name,sell_price,unit,x,y){
    $('#id_item_mat_fg'+x+'_'+y).val(id_item);
    $('#item_material_fg'+x+'_'+y).val(item_code+' '+item_name);
    $('#price_mat_fg'+x+'_'+y).val(sell_price);
    $('#unit_mat_fg'+x+'_'+y).val(unit);
}
function dataPart(x, i) {
    var id_item_mat_fg = $('#id_item_mat_fg' + x + '_' + i).val();
    var table = $('#part_datatable').dataTable({
        "processing": true,
        "serverSide": true,
        "destroy": true,
        "ajax": {
            url: 'json_product_part.php?id_item_material=' + id_item_mat_fg
        },
        "columnDefs": [{
                "targets": -1,
                "data": null,
                    "render": function(id, index, data, type, row) {
                    var btn = '';
                    var data_item = "'" + data[0] + "','" + data[1] + "','" + data[2] + "'";

                    var part_number = (data[1] == null)?'':data[1];
                    btn += '&nbsp;<button type="button" onclick="$(\'#part_number' + x + '_' + i + '\').val(\'' + part_number + '\');$(\'#length_part' + x + '_' + i + '\').val(' + data[2] + ');" class="btn green btn-outline p-action"  data-dismiss="modal" aria-hidden="true">';
                    btn += '<i class="fa fa-arrow-down"></i>';
                    btn += '</button>';
                    return btn;
                }
            }, {
                "targets": 0,
                "data": null,
                "render": function(data, type, row, meta) {
                    var num = meta.row + 1;
                    return num;
                }
            },
            {
                "orderable": true,
                "targets": 1
            }
        ],
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"] // change per page values here
        ],
        "pageLength": 10,
    });
}
/////#######CALCULATION#######/////
function calFg(x){
    var qty_fg = ($('#qty_fg'+x).val() == '')?0:$('#qty_fg'+x).val();
    var sell_price_fg = ($('#sell_price_fg'+x).val() == '')?0:$('#sell_price_fg'+x).val();
    var disc_fg = ($('#disc_fg'+x).val() == '')?0:$('#disc_fg'+x).val();
    var total_fg = parseFloat(qty_fg)*parseFloat(sell_price_fg);
    var disc_num = parseFloat((disc_fg / 100) * total_fg);
    $('#total_fg'+x).val(parseFloat(total_fg)-parseFloat(disc_num));

   calGlobal();
}
function calPart(x,i){
    var price_mat_fg = $('#price_mat_fg'+x+'_'+i).val();
    var qty_mat_fg = $('#qty_mat_fg'+x+'_'+i).val();
    var total_mat_fg = qty_mat_fg*price_mat_fg;
    $('#total_mat_fg'+x+'_'+i).val(total_mat_fg);
    calBasePriceFg(x,i);
}
function calBasePriceFg(x,y){
    var id_seq_mat_fg = $('#id_seq_mat_fg'+x).val();
    var total = 0;
    for (var i = 0;  i<= parseFloat(id_seq_mat_fg); i++) {
        let total_mat_fg = ($('#total_mat_fg'+x+'_'+i).val() == undefined || $('#total_mat_fg'+x+'_'+i).val() == '')?0:$('#total_mat_fg'+x+'_'+i).val();
        total+=parseFloat(total_mat_fg);
    }
    $('#base_price_fg'+x).val(total);
}



function plusProduct() {
    var x = parseFloat($('#id_seq').val()) + 1;
    var htmlProduct = '<tr style="border-top: 3px solid #395292a1;"  id="trprd'+x+'">'+
                      '<td class="tdrow'+x+'">'+
                        '<input type="text" name="no_fg'+x+'" id="no_fg'+x+'" class="form-control" value="">'+
                        '<input type="hidden" name="id_item_fg'+x+'" id="id_item_fg'+x+'" class="form-control" value="">'+
                        '<input type="hidden" name="id_product_profile'+x+'" id="id_product_profile'+x+'" class="form-control" value="">'+
                        '<input type="hidden" name="id_quotation_fg'+x+'" id="id_quotation_fg'+x+'" class="form-control" value="">'+
                        '<input type="hidden" name="id_quotation_detail_fg'+x+'" id="id_quotation_detail_fg'+x+'" class="form-control" value="">'+
                      '</td>'+
                      '<td class="tdrow'+x+'"><input type="text" name="item_name_fg'+x+'" id="item_name_fg'+x+'" class="form-control" value=""></td>'+
                      '<td class="tdrow'+x+'" onclick="openModalFg('+x+');" width="1'+x+'px;">'+
                        '<button type="button" class="btn btn-primary" style="text-align:right;">'+
                            '<i id="btn_fg_modal'+x+'" class="icon-grid"></i>'+
                        '</button>'+
                      '</td>'+
                      '<td colspan="6"><input type="text" name="customer_description'+x+'" id="customer_description'+x+'" class="form-control" value=""></td>'+
                      '<td class="tdrow'+x+'"><input type="text" name="unit_fg'+x+'" id="unit_fg'+x+'" class="form-control" value=""></td>'+
                      '<td class="tdrow'+x+'"><input type="text" name="qty_fg'+x+'" id="qty_fg'+x+'" class="form-control" value="" onblur="calFg('+x+');"></td>'+
                      '<td class="tdrow'+x+'"><input type="text" name="base_price_fg'+x+'" id="base_price_fg'+x+'" class="form-control" value="" readonly=""></td>'+
                      '<td class="tdrow'+x+'"><input type="text" name="sell_price_fg'+x+'" id="sell_price_fg'+x+'" class="form-control" value="" onblur="calFg('+x+');"></td>'+
                      '<td class="tdrow'+x+'"><input type="text" name="disc_fg'+x+'" id="disc_fg'+x+'" class="form-control" value="" onblur="calFg('+x+');"></td>'+
                      '<td class="tdrow'+x+'"><input type="text" name="total_fg'+x+'" id="total_fg'+x+'" class="form-control" value="" readonly=""></td>'+
                      '<td class="tdrow'+x+'">'+
                        '<button type="button" class="btn btn-danger" style="width: 100%" onclick="removeProduct('+x+')"><i class="fa fa-trash"></i></button>'+
                      '</td>'+
                    '</tr>'+
                    // '<tr class="trprd'+x+'">'+
                    '<tr>'+
                      '<td></td>'+
                      '<td colspan="13">'+
                        '<table class="table table-bordered table-striped" width="100%">'+
                          '<thead>'+
                            '<tr>'+
                              '<th colspan="9">Material</th> '+
                            '</tr>'+
                            '<tr>'+
                              '<th width="15%" colspan="2">Name</th>'+
                              '<th width="15%" colspan="2">Item Number</th>'+
                              '<th width="10%">Stok / (L)</th>'+
                              '<th width="10%">Used</th>'+
                              '<th width="10%">Unit</th>'+
                              '<th width="7%">Qty</th>'+
                              '<th width="10%">Price</th>'+
                              '<th width="10%">Total</th>'+
                              '<th width="5%"><input type="text" name="id_seq_mat_fg'+x+'" id="id_seq_mat_fg'+x+'" class="form-control" value="'+x+'"></th>'+
                            '</tr>'+
                          '</thead>'+
                          '<tbody id="row_'+x+'">'+
                        '<tr id="row_mat_fg'+x+'_0">'+
                              '<td>'+
                                '<input type="hidden" class="form-control" name="id_item_mat_fg'+x+'_0" id="id_item_mat_fg'+x+'_0" value="" readonly>'+
                                '<input type="text" class="form-control" name="item_material_fg'+x+'_0" id="item_material_fg'+x+'_0" value="" readonly>'+
                                '</td>'+
                              '<td width="1%;"  data-toggle="modal" href="#mat_fg_modal" onclick="dataMatFg('+x+',0);"><button type="button" class="btn btn-primary" style="text-align:right;"><i class="fa fa-file"></i></button></td>'+
                              '<td><input type="text" class="form-control" name="part_number'+x+'_0" id="part_number'+x+'_0" value="" readonly></td>'+
                              '<td width="1%;"><button type="button" data-toggle="modal" href="#part_modal" onclick="dataPart('+x+',0)"  class="btn btn-primary" style="text-align:right;"><i class="fa fa-file"></i></button></td>'+
                              '<td><input type="text" class="form-control" name="length_part'+x+'_0" id="length_part'+x+'_0" value="" readonly></td>'+
                              '<td><input type="text" class="form-control" name="used'+x+'_0" id="used'+x+'_0" value="" readonly></td>'+
                              '<td><input type="text" class="form-control" name="unit'+x+'_0" id="unit'+x+'_0" value="" readonly></td>'+
                              '<td><input type="text" class="form-control" name="qty_mat_fg'+x+'_0" id="qty_mat_fg'+x+'_0" value="" onblur="calPart('+x+',0);"></td>'+
                              '<td><input type="text" class="form-control" name="price_mat_fg'+x+'_0" id="price_mat_fg'+x+'_0" value="" onblur="calPart('+x+',0);"></td>'+
                              '<td><input type="text" class="form-control" name="total_mat_fg'+x+'_0" id="total_mat_fg'+x+'_0" value="" readonly></td>'+
                            '<td width="1%;"><button type="button" class="btn btn-primary" style="text-align:right;" onclick="plusMatFg('+x+')"><i class="fa fa-plus"></i></button></td>'+
                        '</tr>'
                    
                      '</tbody>'+
                    '</table>'+
                  '</td>'+
                  '<td></td>'+
                '</tr>';
    $('#tableProduct').append(htmlProduct);
    $('#id_seq').val(x);
}
function removeProduct(x){
    $('#trprd'+x).remove();
}
function plusMatFg(x) {
    var i = parseFloat($('#id_seq_mat_fg' + x).val()) + 1;
    var htmlMat = '<tr id="row_mat_fg' + x + '_'+i+'">' +
        '<td>' +
            '<input type="text" class="form-control" name="no_mat_fg' + x + '_' + i + '" id="no_mat_fg' + x + '_' + i + '" value="">' +
        '</td>' +
        '<td>' +
        '<input type="hidden" class="form-control" name="id_item_mat_fg' + x + '_'+i+'" id="id_item_mat_fg' + x + '_'+i+'" value="" readonly>' +
        '<input type="text" class="form-control" name="item_material_fg' + x + '_'+i+'" id="item_material_fg' + x + '_'+i+'" value="" readonly>' +
        '</td>' +
        '<td width="1%;"  data-toggle="modal" href="#mat_fg_modal" onclick="dataMatFg(' + x + ','+i+');"><button type="button" class="btn btn-primary" style="text-align:right;"><i class="fa fa-file"></i></button></td>' +
        '<td><input type="text" class="form-control" name="part_number' + x + '_'+i+'" id="part_number' + x + '_'+i+'" value="" readonly></td>' +
        '<td width="1%;"><button type="button" data-toggle="modal" href="#part_modal" onclick="dataPart(' + x + ','+i+')"  class="btn btn-primary" style="text-align:right;"><i class="fa fa-file"></i></button></td>' +
        '<td><input type="text" class="form-control" name="length_part' + x + '_'+i+'" id="length_part' + x + '_'+i+'" value="" readonly></td>' +
        '<td><input type="text" class="form-control" name="used' + x + '_'+i+'" id="used' + x + '_'+i+'" value="" readonly></td>' +
        '<td><input type="text" class="form-control" name="unit' + x + '_'+i+'" id="unit' + x + '_'+i+'" value="" ></td>' +
        '<td><input type="text" class="form-control" name="qty_mat_fg' + x + '_'+i+'" id="qty_mat_fg' + x + '_'+i+'" value="" onblur="calPart(' + x + ','+i+');"></td>' +
        '<td><input type="text" class="form-control" name="price_mat_fg' + x + '_'+i+'" id="price_mat_fg' + x + '_'+i+'" value="" onblur="calPart(' + x + ','+i+');"></td>' +
        '<td><input type="text" class="form-control" name="total_mat_fg' + x + '_'+i+'" id="total_mat_fg' + x + '_'+i+'" value="" readonly></td>' +
        '<td width="1%;"><div style="display:flex">';
        htmlMat+='<button type="button" class="btn btn-danger" style="text-align:right;" onclick="removeMatFg('+x+','+i+')"><i class="fa fa-minus"></i></button>';
        htmlMat+='<div class="md-checkbox m-t-5" title="check for show in printout">' +
                '<input type="checkbox" id="show_mat_fg' + x + '_' + i + '" class="md-check" value="" onClick="calGlobal();">' +
                '<label for="show_mat_fg' + x + '_' + i + '">' +
                '<span class="inc"></span>' +
                '<span class="check"></span>' +
                '<span class="box"></label>' +
                '</div>';
        htmlMat+='</td>'+
        '</tr>';
    $('#id_seq_mat_fg' + x).val(i)
    $('#row_' + x).append(htmlMat);
}
function removeMatFg(x,i) {
    $('#row_mat_fg'+x+'_'+i).remove();
    calGlobal();
}