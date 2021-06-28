function setup_select (element_id, type) {
  var dropdown = document.getElementById(element_id);
  dropdown.length = 0;
  
  var defaultOption = document.createElement('option');
  defaultOption.text = 'Select Code';
  
  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;
  
  var url = `file:///resources/app/src/db.json`;
  
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  
  request.onload = function() {
    if (request.status === 200) {
      var data = JSON.parse(request.responseText);
      var option;
      switch (type) {
        case "one_time":
          for (var i = 0; i <data.Data.oneTime.length; i++) {
            option = document.createElement('option');
            option.text = data.Data.oneTime[i].Description;
            option.value = data.Data.oneTime[i].tsv_code;
            dropdown.add(option);
          }
          break;
        case "rep":
          for (var i = 0; i <data.Data.repeatable.length; i++) {
            option = document.createElement('option');
            option.text = data.Data.repeatable[i].Description;
            option.value = data.Data.repeatable[i].tsv_code;
            dropdown.add(option);
          }
          break
        default:
          break;
      }
    }
  };
  request.send();
}


setup_select('rep_charge_1','rep');
setup_select('one_time_charge_1','one_time');


function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


var added_rows_repeatable = 1;
var added_rows_one_time = 1;


function addRentalRow(chargeType) {
  var adder;
  var type;
  var description;
  switch (chargeType) {
    case 'repeatable':
      added_rows_repeatable++;
      adder = added_rows_repeatable;
      type = 'rep';
      description = 'Repeatable';
      break;
    case 'single':
      added_rows_one_time++;
      adder = added_rows_one_time;
      type = 'one_time';
      description = 'One Time';
      break;
    default:
      break;
  }
  var row = document.createElement('tr');
  row.classList.add(type);
  row.id = `${type}_charge_row_${adder}`;

  var code_select = document.createElement('select');
  code_select.classList.add(type,'description');
  code_select.name = `${description} Charge ${adder}`
  code_select.id = `${type}_charge_${adder}`

  var price_entry = document.createElement('input')
  price_entry.placeholder = 'Price'
  price_entry.classList.add(type,'price')

  var cell0 = row.insertCell(0)

  var cell1 = row.insertCell(1)
  cell1.appendChild(code_select)

  var cell2 = row.insertCell(2)
  cell2.appendChild(price_entry)

  insertAfter(row, document.getElementById(`${type}_charge_row_${adder - 1}`))
  setup_select(code_select.id, type)
}


function getLines (type) {
  var getLines = $(`tr.${type}`).map(function () {
    var select = $(this).find('select')
    var input = $(this).find('input')
    return {
      'description': select.children('option:selected').text(),
      'value': select.val(),
      'price': input.val()
    }
  }).get()
  return getLines
}


function createUpload () {
  $('#rental').toggle()

  var items = {'repeatable':getLines('rep'), 'oneTime':getLines('one_time')}
  var job_num = $('#job_num').val()
  var startDate = $('#start_date').val()  
  var duration = $('#duration').val()
  var rentalLength = parseInt($('input[name="rental length"]:checked').val());

  items.repeatable.forEach(element => {
    addLineToUpload(element,job_num,startDate,0,rentalLength,true)
  });
  items.oneTime.forEach(element => {
    addLineToUpload(element,job_num,startDate,0,rentalLength)
  });
  if (duration > 1) {
    for (let month = 1; month < duration; month++) {
      items.repeatable.forEach(element => {
        addLineToUpload(element,job_num,startDate,month,rentalLength,true)
      });
    }
  }
}


function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}


function addLineToUpload (dataObject, jobNumber, startDate, monthTick, rentalLength, repeatable) {
  var row = document.createElement('tr')
  var descriptionWithDuration

  if (repeatable) {
    var date1 = new Date(`${startDate} 00:00`);
    var year = date1.getFullYear();
    var month = date1.getMonth();
    var day = date1.getDate();
    date1.setDate(day + (monthTick * rentalLength))
    var date2 = new Date(year,month,day + ((monthTick + 1) * rentalLength));
    descriptionWithDuration = `
      ${dataObject.description} - 
      ${date1.getFullYear()}/${pad(date1.getMonth() + 1,2)}/${pad(date1.getDate(),2)} - 
      ${date2.getFullYear()}/${pad(date2.getMonth() + 1,2)}/${pad(date2.getDate(),2)}`
  } else descriptionWithDuration = dataObject.description

  row.insertCell(0)
  var addedLineType = row.insertCell(1)
  addedLineType.innerHTML = 'C'
  var plantItem = row.insertCell(2)
  plantItem.innerHTML = 'N'
  var job = row.insertCell(3)
  job.innerHTML = jobNumber
  var code = row.insertCell(4)
  code.innerHTML = dataObject.value
  var description = row.insertCell(5)
  description.innerHTML = descriptionWithDuration
  var wbsCode = row.insertCell(6)
  wbsCode.innerHTML = '0A-00-'
  var quantity = row.insertCell(7)
  quantity.innerHTML = 1
  var un = row.insertCell(8)
  un.innerHTML = 'EA'
  var price = row.insertCell(9)
  price.innerHTML = dataObject.price
  var per = row.insertCell(10)
  per.innerHTML = 'EA'
  row.insertCell(11)
  row.insertCell(12)
  var taxCode = row.insertCell(13)
  taxCode.innerHTML = 'KY'
  row.insertCell(14)
  row.insertCell(15)
  var pol_chgovd = row.insertCell(16)
  pol_chgovd.innerHTML = 'no'
  var tx = row.insertCell(17)
  tx.innerHTML = 'no'
  var pol_taxovr = row.insertCell(18)
  pol_taxovr.innerHTML = 'yes'
  row.insertCell(19)
  row.insertCell(20)
  row.insertCell(21)
  row.insertCell(22)
  row.insertCell(23)
  row.insertCell(24)
  row.insertCell(25)
  row.insertCell(26)
  row.insertCell(27)
  row.insertCell(28)
  row.insertCell(29)
  row.insertCell(30)
  var dueDate = row.insertCell(31)
  dueDate.innerHTML = new Date().toLocaleDateString()
  row.insertCell(32)
  row.insertCell(33)
  row.insertCell(34)
  var costType = row.insertCell(35)
  costType.innerHTML = '400E'
  var costCategory = row.insertCell(36)
  costCategory.innerHTML = 'E'
  var polFactor = row.insertCell(37)
  polFactor.innerHTML = 1
  row.insertCell(38)
  row.insertCell(39)

  document.getElementById('rental-body').appendChild(row)
}