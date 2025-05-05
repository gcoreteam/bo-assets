function dataMaterial(y) {
  var table5 = $('#mat_datatable').dataTable({
    "processing": true,
    "serverSide": true,
    "destroy": true,
    'serverMethod': 'post',
    "ajax": {
      url: '../server/dt_product_so.php?act=material'
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
        data: 'sell_price'
      },
      {
        data: 'stock'
      },
      {
        data: 'sell_price'
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
          var data_item = "'" + row.id_item + "','" + row.item_code + "','" + row.item_name + "','" + row.sell_price + "','" + y + "'";
          btn += '<button type="button" onclick="setMat(' + data_item + ')" class="btn green btn-outline p-action"  data-dismiss="modal" aria-hidden="true">';
          btn += '<i class="fa fa-arrow-down"></i>';
          btn += '</button>';
          return btn;
        }
      },
      {
        "orderable": true,
        "targets": 3
      }
    ],"lengthMenu": [
      [5, 10, 15, 20, -1],
      [5, 10, 15, 20, "All"] // change per page values here
    ],
    "pageLength": 10,

  });
}
function setMat(id_item,item_code,item_name,sell_price,y) {
    $('#id_item'+y).val(id_item);
    $('#item_code'+y).val(item_code);
    $('#item_name'+y).val(item_name);
    $('#sell_price_mat'+y).val(sell_price);
  }
function calMat(y){
    var sell_price_mat = $('#sell_price_mat'+y).val();
    var qty_mat = $('#qty_mat'+y).val();
    var dics_mat = $('#disc_mat'+y).val();
    var total = qty_mat*sell_price_mat;
    var nominal_disc = parseFloat((dics_mat / 100) * total);
    var total_mat = total - nominal_disc;
    $('#total_mat'+y).val(total_mat);
    calGlobal();
}

function plusMat(x){
var y = parseFloat($('#id_seq_mat').val())+1;
var material = '<tr id="row_material'+y+'">'+
                  '<td><input type="text" name="no_mat'+y+'" id="no_mat'+y+'" class="form-control" value=""></td>'+
                  '<td data-toggle="modal" href="#mat_modal" onclick="dataMaterial('+y+');">'+
                    '<input type="text" name="id_item'+y+'" id="id_item'+y+'" class="form-control" value="" readonly onclick="">'+
                    '<input type="text" name="item_code'+y+'" id="item_code'+y+'" class="form-control" value="" readonly onclick="">'+
                    
                  '</td>'+
                  '<td><input type="text" name="item_name'+y+'" id="item_name'+y+'" class="form-control" value=""></td>'+
                  '<td><input type="text" name="name_product_custom'+y+'" id="name_product_custom'+y+'" class="form-control" value=""></td>'+
                  '<td><input type="text" name="unit_mat'+y+'" id="unit_mat'+y+'" class="form-control" value=""></td>'+
                  '<td><input type="text" name="qty_mat'+y+'" id="qty_mat'+y+'" class="form-control" onBlur="calMat('+y+');" value=""></td>'+
                  '<td><input type="text" name="sell_price_mat'+y+'" id="sell_price_mat'+y+'" class="form-control" onBlur="calMat('+y+');" value=""></td>'+
                  '<td><input type="text" name="disc_mat'+y+'" id="disc_mat'+y+'" class="form-control" onBlur="calMat('+y+');" value="0"></td>'+
                  '<td><input type="text" name="total_mat'+y+'" id="total_mat'+y+'" class="form-control" value=""></td>'+
                  '<td>'+
                    '<button type="button" class="btn btn-danger" style="width: 100%" onclick="removeMat('+y+');"><i class="fa fa-minus"></i></button>'
                  '</td>'+
                '</tr>';
  $('#id_seq_mat').val(y)
  $('#tablePrd').append(material);
}

function removeMat(y){
  $('#row_material'+y).remove();
}