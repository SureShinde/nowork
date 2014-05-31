		// JavaScript Document
		
		
		function chkaddmsg()
		{
			//alert(document.getElementById('eDate').value);
			document.getElementById('addmsgal').innerHTML =Number(document.getElementById('TotalDays').value);
			document.getElementById('addmsgshow').innerHTML =Number(document.getElementById('remainingSponsor').value)- Number(document.getElementById('TotalDays').value);	
			if(document.getElementById('endDate').value=='')
			{
				jQuery("#add_Msg").fadeOut("slow");
			}
			else if(document.getElementById('eDate').value=='')
			{
				jQuery("#add_Msg").fadeOut("slow");
			}
			else{ jQuery("#add_Msg").fadeIn("slow");}
		}

function isfloat(keyCode)
	{	
	
		if(keyCode == 35)return true;
		if(keyCode == 36)return true;
		if(keyCode == 37)return true;
		if(keyCode == 39) return true; 
		if(keyCode == 46) return true; 
		if(keyCode == 109) return false; 
		if(keyCode == 110) return true; 
		if(keyCode == 189) return false; 
		if(keyCode == 9) return true; 
		if(keyCode == 8) return true;
		if(keyCode == 190) return true;
		if(keyCode > 95 && keyCode < 106) return true; 
		if(keyCode < 48 || keyCode > 57) return false;	
	}


	
	function deleteRow(tableID,trId) {
		var table = document.getElementById(tableID);
		var rowCount = table.rows.length;
		for(var i=0; i<rowCount; i++) {
			var row = table.rows[i];
			if(row.id>trId){
				table.deleteRow(i);
				rowCount--;
				i--;
			}
		}
	}	
	
	function Addrow(tableID,trId,Lable,HTML) {
	
		var table = document.getElementById(tableID);
		var rowCount = table.rows.length;
		for(var i=0; i<rowCount; i++) {
			
			var row = table.rows[i];
			
			if(row.id>trId-1) {
				table.deleteRow(i);
				rowCount--;
				i--;
			}
		}
		
		
		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount);
		row.id = trId;
		
		var cell1 = row.insertCell(0);
		cell1.innerHTML = Lable;
		 
		var cell2 = row.insertCell(1);
		//cell2.align="center";
		cell2.innerHTML = HTML; 
	
	}
	
	function getSubcategoryOrProduct(level){
	
		var id = document.getElementById('category').value;
		if(id!=0){
		
			var HTML = '';
			var Dynefun = '';
			var NewLevel = Number(level)+1;
			
			//alert(id);
			//alert(level);
			
			if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}else{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			
			var siteurl="zebra_functions.php?action=getsuncategory&caregoryid="+id;
			//alert(siteurl);
			xmlhttp.open("GET",siteurl,false);
			xmlhttp.send();
			
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				//alert(xmlhttp.responseText.replace(/<\/?[^>]+(>|$)/g, "").replace(/^\s+|\s+$/g, ''));
				//return Number(xmlhttp.responseText.replace(/<\/?[^>]+(>|$)/g, ""));
				var ARRAY = xmlhttp.responseText.split('##++'); 
				if(ARRAY[0]=='category'){
					
					//Dynefun = 'onChange="getSubcategoryOrProduct(this.value,'+NewLevel+')"';
					//HTML = '<select name="category" style="width:300px;" id="category" '+Dynefun+'>'+ARRAY[1]+'</select>';
					//Addrow('MainTable',NewLevel,'Sub Category&nbsp;:&nbsp;',HTML);
					
					document.getElementById('result').innerHTML = '';
                    document.getElementById('button').style.display='none';
					document.getElementById('arrow').style.display='none';
					//document.getElementById('level'+level).style.display = 'inline'; 
					//document.getElementById('level'+level).innerHTML = '<table width="100%"><tr><td class="main" width="30%">Sub Category&nbsp;:&nbsp;</td><td class="main" width="70%">'+HTML+'</td></tr><tr><td colspan="2">&nbsp;</td></tr><tr><td colspan="2"><table><tr><td id="level'+NewLevel+'" style="display:none;"></td></tr></table></td></tr>';
				}else{
				
					HTML = '<select name="products" style="width:400px;" size="10" id="products">'+ARRAY+'</select>';
					//Addrow('MainTable',NewLevel,'Product&nbsp;:&nbsp;',HTML);
					document.getElementById('result').innerHTML = HTML;
					document.getElementById('products').focus();
                    document.getElementById('button').style.display='inline';
					document.getElementById('arrow').style.display='inline';
					
					//document.getElementById('level'+level).style.display = 'inline'; 
					//document.getElementById('level'+level).innerHTML = '<table width="100%"><tr><td class="main" width="30%">Product&nbsp;:&nbsp;</td><td class="main" width="70%">'+HTML+'</td></tr><tr><td colspan="2">&nbsp;</td></tr></table>';
				}
			}
		}else{
			
			//deleteRow('MainTable',level);
			alert("Please select category first");
			document.getElementById('category').focus();
		}
	}
	
	function BookMarkProduct(){
	
		if(document.getElementById('products')){
			var productId = document.getElementById('products').value;
			if(productId==0){
				alert("Please Select Product First");
				document.getElementById('products').focus();
				return false;
			}else{
				
				if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
				}else{// code for IE6, IE5
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				
				var siteurl="zebra_functions.php?action=bookmark&productid="+productId;
				//alert(siteurl);
				xmlhttp.open("GET",siteurl,false);
				xmlhttp.send();
			
				if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
					var ARRAY = xmlhttp.responseText.split('##++'); 
                    
					//document.getElementById('Message').innerHTML = ARRAY[0];
                    jQuery("#message_parent_section").html("<span class='success'>"+ARRAY[0]+"</span>");
                    jQuery('#main_message_container').show();
                    setTimeout("jQuery('#main_message_container').slideUp('slow')",7000);
                    
					document.getElementById('BookMarked').innerHTML = ARRAY[1];
				
				}
			}
		
		}else{
			
			alert("Please Select Category Or SubCategory till product list appear");
			return false;
			
		}
	}
	
	/*function SaveData(id){
	
		if(document.getElementById('products')){
			var productId = document.getElementById('products').value;
			if(productId==0){
				
				alert("Please Select Product First");
				document.getElementById('products').focus();
				return false;
			
			}else{
				jQuery('#selectProduct').click();
			}
		}else{
			alert("Please Select Category Or SubCategory till product list appear");
			return false;
		}
	}*/
	
	function SaveData(id){
		
		if(document.getElementById('products')){
			var productId = document.getElementById('products').value;
			if(productId==0){
				
				alert("Please Select Product First");
				document.getElementById('products').focus();
				return false;
			
			}else{
				/*alert("here");
				//jQuery('#new_product').submit();
				alert("here");*/
				//document.new_product.submit();
				jQuery('#pageSubmit').click();
				//return true;
			}
		}else{
			alert("Please Select Category Or SubCategory till product list appear");
			return false;
		}
	}
	function RomoveBookMark(id){
	
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
		}else{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		var siteurl="zebra_functions.php?action=removebookmark&productid="+id;
		//alert(siteurl);
		xmlhttp.open("GET",siteurl,false);
		xmlhttp.send();
	
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			
			var ARRAY = xmlhttp.responseText.split('##++'); 
			
            //document.getElementById('Message').innerHTML = ARRAY[0];
            
            jQuery("#message_parent_section").html("<span class='success'>"+ARRAY[0]+"</span>");
            jQuery('#main_message_container').show();
            setTimeout("jQuery('#main_message_container').slideUp('slow')",7000);
            
			document.getElementById('BookMarked').innerHTML = ARRAY[1];
		
		}
	}

	function addTableRow(tableID) {
		
		var className = '';
		var table = document.getElementById(tableID);
		
		document.getElementById('counter').value = Number(document.getElementById('counter').value)+1;
		document.getElementById('MainCounter').value = Number(document.getElementById('MainCounter').value)+1;
		var Newid = document.getElementById('MainCounter').value;
		
		if((document.getElementById('counter').value%2) == 1){
			className = "odd";
		}else{
			className = "";
		}
		
		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount);
		row.id = "counterOffer"+Newid;
		row.className = className;
		//row.id = "counterOffer"+Newid;
		
		var cell1 = row.insertCell(0);
        
        
        cell1.className= "checkbox_td";
        cell1.innerHTML = '<!--<input type="checkbox" name="counterFlag[]" id="counterFlag'+Newid+'" />-->';
		//cell1.innerHTML = '<input type="checkbox" name="counterFlag[]" id="counterFlag'+Newid+'" />&nbsp;&nbsp;Counter if offer is';

		var cell2 = row.insertCell(1);
		//cell2.align="center";
        cell2.className = "font-size-14";
        cell2.innerHTML = "COUNTER if offer is";
		//cell2.innerHTML = '<input type="text" name="minPrice[]" id="minPrice'+Newid+'" value="" size="7" />&nbsp;-&nbsp;<input type="text" name="maxPrice[]" id="maxPrice'+Newid+'" value="" size="7" />';

		var cell3 = row.insertCell(2);
		cell3.align="center";
		
        cell3.innerHTML = '<input class="disinput price" type="text" name="minPrice[]" id="minPrice'+Newid+'" value="" size="7" onchange="OnblurCounterChecking();" onkeydown="return isfloat(event.keyCode)" />&nbsp;-&nbsp;<input class="disinput price" type="text" name="maxPrice[]" id="maxPrice'+Newid+'" value="" size="7" onchange="OnblurCounterChecking();" onkeydown="return isfloat(event.keyCode)" />';
        //cell3.innerHTML = 'with&nbsp;<input type="text" size="2" name="counterQty[]" id="counterQty'+Newid+'" value="" />&nbsp;items';
		
		var cell4 = row.insertCell(3);
        cell4.innerHTML = 'with&nbsp;<input class="disinput text-center" type="text" size="2" name="counterQty[]" id="counterQty'+Newid+'" value="" onchange="OnblurCounterChecking();" onkeydown="return isfloat(event.keyCode)"/>&nbsp;items<button type="button" class="edit delete" onClick="deleteTableRow('+Newid+')"><span><span>Remove</span></span></button>';
		
        //<a href="javascript:void(0)" onClick="deleteTableRow('+Newid+')" ><img src="images/remove.png"></a>
        
		//cell4.innerHTML = '<a href="javascript:void(0)" onClick="deleteTableRow('+Newid+')" ><img src="images/remove.png"></a>';
		
		//dynemicCss(tableID);
		
		var cell5 = row.insertCell(4);
		cell5.className="counter";
		cell5.innerHTML = '<div><span id="counter_img'+Newid+'"></span><span id="counter_err_msg'+Newid+'" class="red"></span></div>';
	
	}
	
	function deleteTableRow(RowId) {
		
		document.getElementById('counter').value = Number(document.getElementById('counter').value)-1;
		
		var table = document.getElementById('Configuration');
		var rowCount = table.rows.length;

		for(var i=0; i<rowCount; i++) {
			var row = table.rows[i];
			if(row.id=='counterOffer'+RowId) {
				table.deleteRow(i);
				rowCount--;
				i--;
			}
		}
		dynemicCss('Configuration');
		//document.getElementById('counter_err_msg').style.display="none";
		//document.getElementById('counter_img').style.display="none";
	}
	
	function dynemicCss(tableID){
		
		var className = '';
		var table = document.getElementById('Configuration');
		var rowCount = table.rows.length;
		
		for(var i=0; i<rowCount; i++) {
			
			if((i%2)==1){
				className = "";
			}else{
				className = "odd";
			}
			var row = table.rows[i];
			row.className = className;
		}
	
	}
	
	
	
	
	
	function deleteRecord(zId){
		if(confirm("Are you sure you want to delete?"))
		{
			window.location="index.php?zebra_id="+zId+"&action=delete";
		}
	}
	
	function checkAction(){
		
		if(document.newsletterfrm.checkall.checked==true){
			document.newsletterfrm.uncheckall.checked=false;
			for(var k=0; k<document.newsletterfrm.elements.length; k++)
			{
				var temp_str=document.newsletterfrm.elements[k].id;
				if(temp_str.indexOf("offerCheck[]")!=-1)
				{
					document.newsletterfrm.elements[k].checked=true;
				}
			}
		}else{
			
			for(var k=0; k<document.newsletterfrm.elements.length; k++)
			{
				var temp_str=document.newsletterfrm.elements[k].id;
				if(temp_str.indexOf("offerCheck[]")!=-1)
				{
					document.newsletterfrm.elements[k].checked=false;
				}
			}
		}
	}
	
	function unCheckAction(){
		
		if(document.newsletterfrm.uncheckall.checked==true){
			
			document.newsletterfrm.checkall.checked=false;
			for(var k=0; k<document.newsletterfrm.elements.length; k++){
				var temp_str=document.newsletterfrm.elements[k].id;
				if(temp_str.indexOf("offerCheck[]")!=-1){
					document.newsletterfrm.elements[k].checked=false;
				}
			}
		}
	}

	function checkPriceFlag(){
		
		//COUNTERR SHOW NUMBER OF COUNTER OFFER 
		var counter = document.zebramanagement.counter.value;
		
		//'sPriceflag' IS SALE PRICE CHECKBOX
		if(document.zebramanagement.sPriceflag.checked==true){
			
			//ADD BUTTON TD
			document.getElementById('addButtonTd').style.display ='none';
			
			for(var k=0; k<document.zebramanagement.elements.length; k++){
				
				var temp_str=document.zebramanagement.elements[k].name;
				//'counterFlag' IS COUNTER OFFER CHECKBOX
				/*if(temp_str.indexOf("counterFlag[]")!=-1){
					//document.zebramanagement.elements[k].checked=false;
					document.zebramanagement.elements[k].disabled="disabled";
				}*/
				
				//'minPrice[]' IS MINPTICE OFFER TEXTBOX
				if(temp_str.indexOf("minPrice[]")!=-1){
					//document.zebramanagement.elements[k].checked=false;
					document.zebramanagement.elements[k].disabled="disabled";
				}
				
				//'maxPrice[]' IS MAXPTICE OFFER TEXTBOX
				if(temp_str.indexOf("maxPrice[]")!=-1){
					//document.zebramanagement.elements[k].checked=false;
					document.zebramanagement.elements[k].disabled="disabled";
				}
				
				//'counterQty[]' IS COUNTERQTY TEXTBOX
				if(temp_str.indexOf("counterQty[]")!=-1){
					//document.zebramanagement.elements[k].checked=false;
					document.zebramanagement.elements[k].disabled="disabled";
				}
			}
			
			//document.zebramanagement.uLimitflag.checked=false;
			//document.zebramanagement.uLimitflag.disabled="disabled";
			document.zebramanagement.uLimit.disabled="disabled";
			document.getElementById('uLimit_img').innerHTML="";
			document.getElementById('uLimit_err_msg').style.display="none";
			
			//document.zebramanagement.lLimitflag.checked=false;
			//document.zebramanagement.lLimitflag.disabled="disabled";
			document.zebramanagement.lLimit.disabled="disabled";
			document.getElementById('lLimit_img').innerHTML="";
			document.getElementById('lLimit_err_msg').style.display="none";
		
		}else{
			
			document.getElementById('addButtonTd').style.display ='inline';
			for(var k=0; k<document.zebramanagement.elements.length; k++){
				
				var temp_str=document.zebramanagement.elements[k].name;
				/*if(temp_str.indexOf("counterFlag[]")!=-1){
					//document.zebramanagement.elements[k].checked=false;
					document.zebramanagement.elements[k].disabled="";
				}*/
				
				if(temp_str.indexOf("minPrice[]")!=-1){
					//document.zebramanagement.elements[k].checked=false;
					document.zebramanagement.elements[k].disabled="";
				}
				
				if(temp_str.indexOf("maxPrice[]")!=-1){
					//document.zebramanagement.elements[k].checked=false;
					document.zebramanagement.elements[k].disabled="";
				}
				
				if(temp_str.indexOf("counterQty[]")!=-1){
					//document.zebramanagement.elements[k].checked=false;
					document.zebramanagement.elements[k].disabled="";
				}
			}
			
			//document.zebramanagement.uLimitflag.checked=false;
			//document.zebramanagement.uLimitflag.disabled="";
			document.zebramanagement.uLimit.disabled="";
			
			//document.zebramanagement.lLimitflag.checked=false;
			//document.zebramanagement.lLimitflag.disabled="";
			document.zebramanagement.lLimit.disabled="";
			
			document.getElementById('sPrice_img').innerHTML="";
			document.getElementById('sPrice_err_msg').style.display="none";
			
		}
	}
	
	
	/*function AcceptDeclineChecking(flag,id){
		
		//jQuery('#lLimit').focus();
		if(flag == "lLimit"){
			
			
			if(jQuery('#uLimit').val()==''){
				alert("Please enter offer accept price.");
				document.zebramanagement.lLimit.value = '';
				document.zebramanagement.uLimit.value = '';
				setTimeout("jQuery('#uLimit').focus()",10);
				//jQuery('#uLimit').focus();
				return false;
			}
		
			if(parseFloat(jQuery('#'+id).val())<0){
				alert("Please enter offer decline price posive numver.");
				document.zebramanagement.lLimit.value = '';
				setTimeout("jQuery('#lLimit').focus()",10);
				return false;
			}		
		
			if(parseFloat(jQuery('#uLimit').val()) <= parseFloat(jQuery('#'+id).val())){
				//alert("Please enter offer decline price less then offer accept price.");
				alert("Please enter a decline price that is less than accept price.");
				document.zebramanagement.lLimit.value = '';
				setTimeout("document.getElementById('lLimit').focus()",10);
				return false;
			}
		}
		
	}*/
	
	function AcceptDeclineChecking(flag,id){
		
		//jQuery('#lLimit').focus();
		if(flag == "lLimit"){
			
			
			if(jQuery('#uLimit').val()==''){
				//alert("Please enter offer accept price value it is compulsary if sale Price not selected.");
				//alert("Please enter offer accept price.");
				document.getElementById('uLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#uLimit_err_msg").html("Please enter offer accept price.");
				jQuery("#uLimit_err_msg").fadeIn("slow");	
				document.zebramanagement.lLimit.value = '';
				document.zebramanagement.uLimit.value = '';
				setTimeout("jQuery('#uLimit').focus()",10);
				//jQuery('#uLimit').focus();
				return false;
			}
			
			if(jQuery('#lLimit').val()==''){
				//alert("Please enter offer decline price posive numver.");
				document.getElementById('lLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#lLimit_err_msg").html("Please enter offer decline price.");
				jQuery("#lLimit_err_msg").fadeIn("slow");	
				document.zebramanagement.lLimit.value = '';
				setTimeout("jQuery('#lLimit').focus()",10);
				return false;
			}	
					
			if(parseFloat(jQuery('#'+id).val())<0){
				//alert("Please enter offer decline price posive numver.");
				document.getElementById('lLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#lLimit_err_msg").html("Please enter offer decline price positive number.");
				jQuery("#lLimit_err_msg").fadeIn("slow");	
				document.zebramanagement.lLimit.value = '';
				setTimeout("jQuery('#lLimit').focus()",10);
				return false;
			}		
		
			if(parseFloat(jQuery('#uLimit').val()) <= parseFloat(jQuery('#'+id).val())){
				//alert("Please enter offer decline price less then offer accept price.");
				//alert("Please enter a decline price that is less than accept price.");
				document.getElementById('lLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#lLimit_err_msg").html("Please enter offer decline price less than offer accept price.");
				jQuery("#lLimit_err_msg").fadeIn("slow");	
				document.zebramanagement.lLimit.value = '';
				setTimeout("document.getElementById('lLimit').focus()",10);
				return false;
			}
			else {
				document.getElementById('lLimit_img').innerHTML="<img src='includes/images/right.png'/>";		
				jQuery("#lLimit_err_msg").hide("Please enter offer decline price less than offer accept price.");
				setTimeout("document.getElementById('lLimit').focus()",10);
				return false;
			}
		}
		
	}
	
	
	// Added by RK : Starts
		/*function validateSalePrice() {
			var currentRetailPrice = Number(jQuery("#bPrice").val());
			var salePrice          = Number(jQuery("#sPrice").val());
			if(salePrice > currentRetailPrice) {
				alert("Please enter sale price less than retail price");
				jQuery("#sPrice").val("");
				setTimeout("document.getElementById('sPrice').focus()",10);
				return false;
			}
		}*/
		
		/*function validateAcceptPrice() {
			var currentRetailPrice = Number(jQuery("#bPrice").val());
			var acceptPrice        = Number(jQuery("#uLimit").val());
			if(acceptPrice > currentRetailPrice) {
				//alert("Please enter a accept price that is less than retail price.");
				alert("Please enter an accept offer price that is less than the retail price.");
				jQuery("#uLimit").val("");
				setTimeout("document.getElementById('uLimit').focus()",10);
				return false;
			}
		}*/
	// Added by RK : Ends
	
	function validateSalePrice() {
			var currentRetailPrice = Number(jQuery("#bPrice").val());
			var salePrice          = Number(jQuery("#sPrice").val());
			
			if(document.getElementById('sPriceflag').checked==true)
			{
				if(salePrice == 0)
				{
					document.getElementById('sPrice_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#sPrice_err_msg").html("Please enter sale price");
					jQuery("#sPrice_err_msg").fadeIn("slow");
					jQuery("#sPrice").val("");
					setTimeout("document.getElementById('sPrice').focus()",10);
					return false;
				}
				else if(salePrice > currentRetailPrice) {
					document.getElementById('sPrice_img').innerHTML="<img src='includes/images/alert.png' />";
					jQuery("#sPrice_err_msg").html("Please enter sale price less than retail price");
					jQuery("#sPrice_err_msg").fadeIn("slow");
					jQuery("#sPrice").val("");
					setTimeout("document.getElementById('sPrice').focus()",10);
					return false;
				}
				else if(salePrice != 0 && salePrice < currentRetailPrice) 
				{
					document.getElementById('sPrice_img').innerHTML="<img src='includes/images/right.png'/>";	
					jQuery("#sPrice_err_msg").hide("Please enter sale price");
				}
			}
			else
			{
					document.getElementById('sPrice_img').innerHTML="";
					document.getElementById('sPrice_err_msg').innerHTML="";
			}
		}
		
		function validateAcceptPrice() {
			var currentRetailPrice = Number(jQuery("#bPrice").val());
			var acceptPrice        = Number(jQuery("#uLimit").val());
			
			if(acceptPrice == 0)
			{
				document.getElementById('uLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#uLimit_err_msg").html("Please enter accept price");
				jQuery("#uLimit_err_msg").fadeIn("slow");
				jQuery("#uLimit").val("");
				setTimeout("document.getElementById('uLimit').focus()",10);
				return false;
			}
			
			else if(acceptPrice > currentRetailPrice) {
				document.getElementById('uLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#uLimit_err_msg").html("Please enter an accept offer price that is less than the retail price");
				jQuery("#uLimit_err_msg").fadeIn("slow");	
				jQuery("#uLimit").val("");
				setTimeout("document.getElementById('uLimit').focus()",10);
				return false;
				//alert("Please enter an accept offer price that is less than the retail price.");
			}
			
			else if(acceptPrice != 0 && acceptPrice < currentRetailPrice) 
			{
				document.getElementById('uLimit_img').innerHTML="<img src='includes/images/right.png'/>";	
				document.getElementById('uLimit_err_msg').style.display="none";
			}
		}
		
	
	/*function OnblurCounterChecking(){
	
		if(document.zebramanagement.uLimit.value==''){
			alert("Please enter offer accept price.");
			document.zebramanagement.uLimit.focus();
			return false;
		}
			
		var minPriceArray = new Array();
		var maxPriceArray = new Array()
		var counterQtyArray = new Array()
		
		var counter = 0;
		for(var k=0; k<document.zebramanagement.elements.length; k++){
			
			var temp_str=document.zebramanagement.elements[k].name;
			if(temp_str.indexOf("minPrice[]")!=-1){
				minPriceArray[counter] = document.zebramanagement.elements[k].id;
			}
			if(temp_str.indexOf("maxPrice[]")!=-1){
				maxPriceArray[counter] = document.zebramanagement.elements[k].id;
			}
			if(temp_str.indexOf("counterQty[]")!=-1){
				counterQtyArray[counter] = document.zebramanagement.elements[k].id;
				counter++;
			}
		}
		if(counter>0){
			if(document.zebramanagement.lLimit.value==''){
				alert("Please enter offer decline price it is compulsary if there is any counter offer.");
				document.zebramanagement.lLimit.focus();
				return false;
			}

			if(Number(document.zebramanagement.lLimit.value) >= Number(document.zebramanagement.uLimit.value)){
				alert("Offer decline price should be less thaen offer accept price.");
				jQuery('#lLimit').focus();
				return false;
			}
		}
		
		for(var index=0; index<document.zebramanagement.counter.value; index++){
			
			var minPrice = document.getElementById(minPriceArray[index]).value;
			var maxPrice = document.getElementById(maxPriceArray[index]).value;
			var counterQty = document.getElementById(counterQtyArray[index]).value;
			
			if(minPrice!=''){
				if(index == 0){
					if(parseFloat(document.zebramanagement.lLimit.value) >= parseFloat(minPrice)){
						
						//alert("Please enter counter offer minimum price greater than offer decline price.");
						alert("Please enter a counter offer minimum price that is greater than the decline offer price.");
						document.getElementById(minPriceArray[index]).value = '';
						setTimeout("document.getElementById('"+minPriceArray[index]+"').focus()",10);
						
						//jQuery('#'+minPriceArray[index]).focus();
						return false;
					}
				}else{
					if(parseFloat(OldmaxPrice) >= parseFloat(minPrice)){
						alert("Please enter a counter offer minimum price greater than the previous counter offer maximum price.");
						//jQuery('#'+minPriceArray[index]).focus();
						document.getElementById(minPriceArray[index]).value = '';
						setTimeout("document.getElementById('"+minPriceArray[index]+"').focus()",10);
						return false;
					}
				}
			}
		
			if(maxPrice!=''){
				
				if((parseFloat(maxPrice)<=parseFloat(minPrice)) || (parseFloat(document.zebramanagement.uLimit.value)<= parseFloat(maxPrice))){
					
					//alert("Counter offer maximum price should be greater than counter offer minmum price and less than offer accept price.");
					alert("Please enter a counter offer maximum price that is greater than the counter offer minimum price, and less than the accept offer price.");
					
					
					document.getElementById(maxPriceArray[index]).value = '';
					setTimeout("document.getElementById('"+maxPriceArray[index]+"').focus()",10);
					//jQuery('#'+maxPriceArray[index]).focus();
					return false;
				
				
				}
			}
		
			var OldminPrice = minPrice;
			var OldmaxPrice = maxPrice;
			var OldcounterQty = counterQty;
		}
	}*/
	
	
	
	function OnblurCounterChecking(){
	
		if(document.zebramanagement.uLimit.value==''){
			//alert("Please enter offer accept price value it is compulsary if sale Price not selected.");
			//alert("Please enter offer accept price.");
			document.getElementById('uLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
			jQuery("#uLimit_err_msg").html("Please enter offer accept price.");
			jQuery("#uLimit_err_msg").fadeIn("slow");	
			//jQuery("#uLimit").val("");
			document.zebramanagement.uLimit.focus();
			return false;
		}
			
		var minPriceArray = new Array();
		var maxPriceArray = new Array();
		var counterQtyArray = new Array();
		//var counter_imgArray = new Array();
		//var counter_err_msgArray = new Array();
		
		var counter = 0;
		for(var k=0; k<document.zebramanagement.elements.length; k++){
			
			var temp_str=document.zebramanagement.elements[k].name;
			
			if(temp_str.indexOf("minPrice[]")!=-1){
				minPriceArray[counter] = document.zebramanagement.elements[k].id;
			}
			if(temp_str.indexOf("maxPrice[]")!=-1){
				maxPriceArray[counter] = document.zebramanagement.elements[k].id;
			}
			if(temp_str.indexOf("counterQty[]")!=-1){
				counterQtyArray[counter] = document.zebramanagement.elements[k].id;
				counter++;
			}
					
		}
		if(counter>0){
			if(document.zebramanagement.lLimit.value==''){
				//alert("Please enter offer decline price it is compulsary if there is any counter offer.");
				document.getElementById('lLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#lLimit_err_msg").html("Please enter offer decline price it is compulsary if there is any counter offer.");
				jQuery("#lLimit_err_msg").fadeIn("slow");	
				document.zebramanagement.lLimit.focus();
				return false;
			}

			if(Number(document.zebramanagement.lLimit.value) >= Number(document.zebramanagement.uLimit.value)){
				//alert("Offer decline price should be less thaen offer accept price.");
				document.getElementById('lLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#lLimit_err_msg").html("Offer decline price should be less than offer accept price.");
				jQuery("#lLimit_err_msg").fadeIn("slow");	
				jQuery('#lLimit').focus();
				return false;
			}
		}
		
		for(var index=0; index<document.zebramanagement.counter.value; index++){
			
			var minPrice = document.getElementById(minPriceArray[index]).value;
			var maxPrice = document.getElementById(maxPriceArray[index]).value;
			var counterQty = document.getElementById(counterQtyArray[index]).value;
			
			
			if(minPrice!=''){
				if(index == 0){
					var min_price = minPriceArray[index];
					var minpr = min_price.split("Price");
					
					if(parseFloat(document.zebramanagement.lLimit.value) >= parseFloat(minPrice)){ 
						
						//alert("Please enter a counter offer minimum price that is greater than the decline offer price.");
						/*if(jQuery("#counter_img").length > 0) {
							document.getElementById('counter_img').innerHTML="<img src='includes/images/alert.png' />";	
						}*/
							document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
							jQuery("#counter_err_msg"+minpr[1]).html("Please enter a counter offer minimum price that is greater than the offer decline price.");
							jQuery("#counter_err_msg"+minpr[1]).fadeIn("slow");	
							document.getElementById(minPriceArray[index]).value = '';
							setTimeout("document.getElementById('"+minPriceArray[index]+"').focus()",10);
							
							//jQuery('#'+minPriceArray[index]).focus();
							return false;
						
					}else if(parseFloat(document.zebramanagement.uLimit.value) <= parseFloat(minPrice)){
						
							document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
							jQuery("#counter_err_msg"+minpr[1]).fadeIn("fast");	
							jQuery("#counter_err_msg"+minpr[1]).html("Please enter a counter offer minimum price that is less than the offer accept price.");
							document.getElementById(minPriceArray[index]).value = '';
							setTimeout("document.getElementById('"+minPriceArray[index]+"').focus()",10);
							
							//jQuery('#'+minPriceArray[index]).focus();
							return false;
						
					}
					else if(parseFloat(document.zebramanagement.lLimit.value) < parseFloat(minPrice)){
						
						document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/right.png' />";
						jQuery("#counter_err_msg"+minpr[1]).hide("Please enter a counter offer minimum price that is greater than the decline offer price.");
						
					}
				}else{
					
					var min_price = minPriceArray[index];
					var minpr = min_price.split("Price");
					
					if(parseFloat(OldmaxPrice) >= parseFloat(minPrice)){ 
						//alert("Please enter a counter offer minimum price greater than the previous counter offer maximum price.");
						//jQuery('#'+minPriceArray[index]).focus();
						
						document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
						jQuery("#counter_err_msg"+minpr[1]).html("Please enter a counter offer minimum price greater than the previous counter offer maximum price.");
						jQuery("#counter_err_msg"+minpr[1]).fadeIn("slow");	
						document.getElementById(minPriceArray[index]).value = '';
						setTimeout("document.getElementById('"+minPriceArray[index]+"').focus()",10);
						return false;
					
					}else if(parseFloat(document.zebramanagement.uLimit.value) <= parseFloat(minPrice)){
						
						document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
						jQuery("#counter_err_msg"+minpr[1]).html("Please enter a counter offer minimum price that is less than the offer accept price.");
						jQuery("#counter_err_msg"+minpr[1]).fadeIn("slow");	
						document.getElementById(minPriceArray[index]).value = '';
						setTimeout("document.getElementById('"+minPriceArray[index]+"').focus()",10);
						return false;
					
					}
					else if(parseFloat(OldmaxPrice) < parseFloat(minPrice))
					{
						
						document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/right.png' />";
						jQuery("#counter_err_msg"+minpr[1]).hide("Please enter a counter offer minimum price greater than the previous counter offer maximum price.");
						//document.getElementById('counter_img'+(index+1)).innerHTML="<img src='includes/images/right.png' />";	
					}
				}
			}
		
			if(maxPrice!=''){
				
				var max_price = maxPriceArray[index];
				var maxpr = max_price.split("Price");
				
				if((parseFloat(maxPrice)<=parseFloat(minPrice)) || (parseFloat(document.zebramanagement.uLimit.value)<= parseFloat(maxPrice))){
					//alert("Please enter a counter offer maximum price that is greater than the counter offer minimum price, and less than the accept offer price.");
					document.getElementById('counter_img'+maxpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#counter_err_msg"+maxpr[1]).html("Please enter a counter offer maximum price that is greater than the counter offer minimum price, and less than the accept offer price.");
					jQuery("#counter_err_msg"+maxpr[1]).fadeIn("slow");	
					document.getElementById(maxPriceArray[index]).value = '';
					setTimeout("document.getElementById('"+maxPriceArray[index]+"').focus()",10);
					//jQuery('#'+maxPriceArray[index]).focus();
					return false;
				}
				else
				{
					document.getElementById('counter_img'+maxpr[1]).innerHTML="<img src='includes/images/right.png' />";
					jQuery("#counter_err_msg"+maxpr[1]).hide("Please enter a counter offer maximum price that is greater than the counter offer minimum price, and less than the accept offer price.");	
					//document.getElementById('counter_img'+(index+1)).innerHTML="";	
				}
			}
		
			var OldminPrice = minPrice;
			var OldmaxPrice = maxPrice;
			var OldcounterQty = counterQty;
		}
	}
	
	function submitZebraManagementForm(){
        
		checkPriceFlag();
		if(document.zebramanagement.sPriceflag.checked==true){
		
			if(document.zebramanagement.sPrice.value==''){
				//alert("Please enter Sale Price value it is compulsary if Sale Price is selected.");
				//alert("Please enter sale price.");
				//document.zebramanagement.sPrice.focus();
				document.getElementById('sPrice_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#sPrice_err_msg").html("Please enter sale price");
				jQuery("#sPrice_err_msg").fadeIn("slow");
				//jQuery("#sPrice").val("");
				//setTimeout("document.getElementById('sPrice').focus()",10);
				document.zebramanagement.sPrice.focus();
				return false;
			}

			//VALIDATION FOR CURRENT DATE DATE ETERED SHOULD BE GREATER THAN CURRENT DATE AND DATE CHECK BOX
			//if(document.zebramanagement.eDateFlag.checked==true){
				
				if(document.zebramanagement.eDate.value==''){
					//alert("Please select expiry date");
					document.getElementById('expire_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#expire_err_msg").html("Please enter expiry date");
					jQuery("#expire_err_msg").fadeIn("slow");
					//jQuery("#eDate").val("");
					document.zebramanagement.eDate.focus();
					return false;
				}else if(document.zebramanagement.eDate.value!=''){
					
					var currentDate = Array();
					var currentTime = new Date()
					var month = currentTime.getMonth() + 1;
					var day = currentTime.getDate();
					var year = currentTime.getFullYear();
					
					var submittedDate = document.zebramanagement.eDate.value.split('-');
					currentDate[0] = year;
					currentDate[1] = month;
					currentDate[2] = day;
					
					if(submittedDate[0]<=currentDate[0]){
						if(submittedDate[1]<=currentDate[1]){
							if(submittedDate[2]<currentDate[2]){
								//alert("Please select expiry date greater than or equal to current date");
								document.getElementById('img').innerHTML="<img src='includes/images/alert.png' />";	
								jQuery("#expire_err_msg").html("Please select expiry date greater than or equal to current date");
								jQuery("#expire_err_msg").fadeIn("slow");
								document.zebramanagement.eDate.focus();
								return false;
							}
													
						}	
					}
				}
			//}
			
			//END VALIDATION FOR CURRENT DATE DATE ETERED SHOULD BE GREATER THAN CURRENT DATE
			
			//VALIDATION FOR UNIT BOX CHECK BOX UNIT IS COMPULSARY IF CHECKBOX IS TICKED
			//if(document.zebramanagement.oUnitFlag.checked==true){
				
				if(document.zebramanagement.oUnit.value==0){
					document.getElementById('oUnit_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#oUnit_err_msg").html("Please select number of units.");
					jQuery("#oUnit_err_msg").fadeIn("slow");
					document.zebramanagement.oUnit.focus();
				
					//alert("Please select number of unit");
					return false;
				}
				else
				{
					document.getElementById('oUnit_img').innerHTML="<img src='includes/images/right.png' style='margin-right:190px;'/>";	
					document.getElementById('oUnit_err_msg').style.display = "none";
				}/*else if(document.zebramanagement.oUnit.value==-1){
					//alert("Please select number of unit");
					if(!confirm("Do you surely want to continue with unlimited quantity ?")){
						document.zebramanagement.oUnit.focus();
						return false;
					}
				}*/
			
				if(document.zebramanagement.oAttempt.value==0){
					document.getElementById('oAttempt_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#oAttempt_err_msg").html("Please select number of attempts.");
					jQuery("#oAttempt_err_msg").fadeIn("slow");
					document.zebramanagement.oAttempt.focus();
					//alert("Please select offer attempt.");
					//document.zebramanagement.oAttempt.focus();
					return false;
				}
				else
				{
					document.getElementById('oAttempt_img').innerHTML="<img src='includes/images/right.png'/>";
					document.getElementById('oAttempt_err_msg').style.display="none";
				}
			
			//}
			//END VALIDATION FOR UNIT BOX CHECK BOX UNIT IS COMPULSARY IF CHECKBOX IS TICKED
			//document.zebramanagement.submit();
			//return true;
		
		}else{
			
			
			
			//if(document.zebramanagement.uLimitflag.checked==true){
				if(document.zebramanagement.uLimit.value==''){
					//alert("Please enter offer accept price value it is compulsary if sale Price not selected.");
					//alert("Please enter offer accept price.");
					document.getElementById('uLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#uLimit_err_msg").html("Please select accept price.");
					jQuery("#uLimit_err_msg").fadeIn("slow");
					document.zebramanagement.uLimit.focus();
					return false;
				}
			
			
				if(jQuery('#lLimit').val()==''){
					//alert("Please enter offer decline price posive numver.");
					document.getElementById('lLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#lLimit_err_msg").html("Please enter offer decline price.");
					jQuery("#lLimit_err_msg").fadeIn("slow");	
					document.zebramanagement.lLimit.value = '';
					setTimeout("jQuery('#lLimit').focus()",10);
					return false;
				}
			
			
			/*}else{
				alert("Please check 'Accept if offer is >' it is compulsary if Sale Price is not selected.");
				document.zebramanagement.uLimitflag.focus();
				return false;
			}*/
		
			
			
			
			var minPriceArray = new Array();
			var maxPriceArray = new Array()
			var counterQtyArray = new Array()
			
			var counter = 0;
			for(var k=0; k<document.zebramanagement.elements.length; k++){
				
				var temp_str=document.zebramanagement.elements[k].name;
				if(temp_str.indexOf("minPrice[]")!=-1){
					minPriceArray[counter] = document.zebramanagement.elements[k].id;
				}
				if(temp_str.indexOf("maxPrice[]")!=-1){
					maxPriceArray[counter] = document.zebramanagement.elements[k].id;
				}
				if(temp_str.indexOf("counterQty[]")!=-1){
					counterQtyArray[counter] = document.zebramanagement.elements[k].id;
					counter++;
				}
			}
			if(counter>0){
				//if(document.zebramanagement.lLimitflag.checked==true){
					if(document.zebramanagement.lLimit.value==''){
						//alert("Please enter offer decline price it is compulsary if there is any counter offer.");
						document.getElementById('lLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
						jQuery("#lLimit_err_msg").html("Please enter offer decline price it is compulsary if there is any counter offer.");
						jQuery("#lLimit_err_msg").fadeIn("slow");
						document.zebramanagement.lLimit.focus();
						return false;
					}
				/*}else{
					alert("Please check 'Decline if offer is less than' it is compulsary if there is any counter offer.");
					document.zebramanagement.lLimitflag.focus();
					return false;
				}*/

				if(Number(document.zebramanagement.lLimit.value) >= Number(document.zebramanagement.uLimit.value)){
					//alert("Offer decline price should be less thaen offer accept price.");
					document.getElementById('lLimit_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#lLimit_err_msg").html("Offer decline price should be less thaen offer accept price");
					jQuery("#lLimit_err_msg").fadeIn("slow");
					document.zebramanagement.lLimit.focus();
					
					return false;
				}
			
			
			
			}
			for(var index=0; index<document.zebramanagement.counter.value; index++){
				
				
				var minPrice = document.getElementById(minPriceArray[index]).value;
				var maxPrice = document.getElementById(maxPriceArray[index]).value;
				var counterQty = document.getElementById(counterQtyArray[index]).value;
				
				if(minPrice!=''){
					if(index == 0){
							
						var min_price = minPriceArray[index];
						var minpr = min_price.split("Price");
						
						if(parseFloat(document.zebramanagement.lLimit.value) >= parseFloat(minPrice)){
							//alert("Please enter a counter offer minimum price that is greater than the decline offer price.");
							document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
							jQuery("#counter_err_msg"+minpr[1]).html("Please enter a counter offer minimum price that is greater than the decline offer price.");
							jQuery("#counter_err_msg"+minpr[1]).fadeIn("slow");
							jQuery('#'+minPriceArray[index]).focus();
							return false;
						}
						else{
							document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/right.png' />";
							jQuery("#counter_err_msg"+minpr[1]).hide("Please enter a counter offer minimum price that is greater than the decline offer price.");
						}
					}else{
						
						var min_price = minPriceArray[index];
						var minpr = min_price.split("Price");
						
						if(parseFloat(OldmaxPrice) >= parseFloat(minPrice)){
							//alert("Please enter a counter offer minimum price greater than the previous counter offer maximum price. ");
							document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
							jQuery("#counter_err_msg"+minpr[1]).html("Please enter a counter offer minimum price greater than the previous counter offer maximum price.");
							jQuery("#counter_err_msg"+minpr[1]).fadeIn("slow");
							jQuery('#'+minPriceArray[index]).focus();
							return false;
						}
						else
						{
							document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/right.png' />";
							jQuery("#counter_err_msg"+minpr[1]).hide("Please enter a counter offer minimum price greater than the previous counter offer maximum price.");
							//document.getElementById('counter_img'+(index+1)).innerHTML="<img src='includes/images/right.png' />";	
						}
					}
				}else if(minPrice=='' && index==0){
					
					var min_price = minPriceArray[index];
					var minpr = min_price.split("Price");
					//alert("Please enter counter offer minimum price.");
					document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#counter_err_msg"+minpr[1]).html("Please enter a counter offer minimum price greater than the previous counter offer maximum price.");
					jQuery("#counter_err_msg"+minpr[1]).fadeIn("slow");
					jQuery('#'+minPriceArray[index]).focus();
					return false;
				}
				else
				{
					var min_price = minPriceArray[index];
					var minpr = min_price.split("Price");
					
					document.getElementById('counter_img'+minpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#counter_err_msg"+minpr[1]).html("Please enter a counter offer minimum price greater than the previous counter offer maximum price.");
					jQuery("#counter_err_msg"+minpr[1]).fadeIn("slow");
					jQuery('#'+minPriceArray[index]).focus();
					return false;
				}
			
				if(maxPrice!=''){
					
					var max_price = maxPriceArray[index];
					var maxpr = max_price.split("Price");
					
					if((parseFloat(maxPrice)<=parseFloat(minPrice)) || (parseFloat(document.zebramanagement.uLimit.value)<= parseFloat(maxPrice))){
						//alert("Please enter a counter offer maximum price that is greater than the counter offer minimum price, and less than the accept offer price.");				
						document.getElementById('counter_img'+maxpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
						jQuery("#counter_err_msg"+maxpr[1]).html("Please enter a counter offer maximum price that is greater than the counter offer minimum price, and less than the accept offer price.");
						jQuery("#counter_err_msg"+maxpr[1]).fadeIn("slow");
						jQuery('#'+maxPriceArray[index]).focus();
						return false;
					}
					else
					{
						document.getElementById('counter_img'+maxpr[1]).innerHTML="<img src='includes/images/right.png' />";
						jQuery("#counter_err_msg"+maxpr[1]).hide("Please enter a counter offer maximum price that is greater than the counter offer minimum price, and less than the accept offer price.");	
						//document.getElementById('counter_img'+(index+1)).innerHTML="";	
					}
				}else if(maxPrice=='' && index==0){
					
					var max_price = maxPriceArray[index];
					var maxpr = max_price.split("Price");
					
					//alert("Please enter counter offer maximum price.");
					document.getElementById('counter_img'+maxpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#counter_err_msg"+maxpr[1]).html("Please enter counter offer maximum price.");
					jQuery("#counter_err_msg"+maxpr[1]).fadeIn("slow");
					jQuery('#'+maxPriceArray[index]).focus();
					return false;
				}else{
					
					var max_price = maxPriceArray[index];
					var maxpr = max_price.split("Price");
					
					//alert("Please enter counter offer maximum price.");
					document.getElementById('counter_img'+maxpr[1]).innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#counter_err_msg"+maxpr[1]).html("Please enter counter offer maximum price.");
					jQuery("#counter_err_msg"+maxpr[1]).fadeIn("slow");
					jQuery('#'+maxPriceArray[index]).focus();
					return false;
				}
			
				if(counterQty!=''){
				}else if(index==0){
					
					var counter_Qty = counterQtyArray[index];
					var countQty = counter_Qty.split("Qty");
					
					//alert("Please enter counter offer QTY.");
					document.getElementById('counter_img'+countQty[1]).innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#counter_err_msg"+countQty[1]).html("Please enter counter offer QTY.");
					jQuery("#counter_err_msg"+countQty[1]).fadeIn("slow");
					jQuery('#'+counterQtyArray[index]).focus();
					return false;
				}
				else
				{
					var counter_Qty = counterQtyArray[index];
					var countQty = counter_Qty.split("Qty");
					//alert("Please enter counter offer QTY.");
					document.getElementById('counter_img'+countQty[1]).innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#counter_err_msg"+countQty[1]).html("Please enter counter offer QTY.");
					jQuery("#counter_err_msg"+countQty[1]).fadeIn("slow");
					jQuery('#'+counterQtyArray[index]).focus();
					return false;	
				}
				
				var OldminPrice = minPrice;
				var OldmaxPrice = maxPrice;
				var OldcounterQty = counterQty;
			}
			
			
			
			
			for(var k=0; k<document.zebramanagement.elements.length; k++){
				
				var temp_str=document.zebramanagement.elements[k].name;
				
				if(temp_str.indexOf("counterFlag[]")!=-1){
					
					if(document.zebramanagement.elements[k].checked==true){
						
						if(document.zebramanagement.elements[k+1].value==''){
							//alert("Please enter minprice value");
							document.getElementById('counter_img'+[k+1]).innerHTML="<img src='includes/images/alert.png' />";	
							jQuery("#counter_err_msg"+[k+1]).html("Please enter minprice value");
							jQuery("#counter_err_msg"+[k+1]).fadeIn("slow");
							document.zebramanagement.elements[k+1].focus();
							return false;
						}
					
						if(document.zebramanagement.elements[k+2].value==''){
							//alert("Please enter maxprice value");
							document.getElementById('counter_img'+[k+2]).innerHTML="<img src='includes/images/alert.png' />";	
							jQuery("#counter_err_msg"+[k+2]).html("Please enter maxprice value");
							jQuery("#counter_err_msg"+[k+2]).fadeIn("slow");
							document.zebramanagement.elements[k+2].focus();
							return false;
						}
					
						if(document.zebramanagement.elements[k+3].value==''){
							//alert("Please enter counter quantity value");
							document.getElementById('counter_img'+[k+3]).innerHTML="<img src='includes/images/alert.png' />";	
							jQuery("#counter_err_msg"+[k+3]).html("Please enter counter quantity value");
							jQuery("#counter_err_msg"+[k+3]).fadeIn("slow");
							document.zebramanagement.elements[k+3].focus();
							return false;
						}
					}
				}
			}
		}
		
		//VALIDATION FOR CURRENT DATE DATE ETERED SHOULD BE GREATER THAN CURRENT DATE AND DATE CHECK BOX
		//if(document.zebramanagement.eDateFlag.checked==true){
			
			if(document.zebramanagement.eDate.value==''){
				//alert("Please select expiry date");
				document.getElementById('expire_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#expire_err_msg").html("Please select expiry date");
				jQuery("#expire_err_msg").fadeIn("slow");
				document.zebramanagement.eDate.focus();
				return false;
			}else{
				
				var currentDate = Array();
				
				var currentTime = new Date()
				var month = currentTime.getMonth() + 1;
				var day = currentTime.getDate();
				var year = currentTime.getFullYear();
				
				var submittedDate = document.zebramanagement.eDate.value.split('-');
				currentDate[0] = year;
				currentDate[1] = month;
				currentDate[2] = day;
				
				if(submittedDate[0]<=currentDate[0]){
					if(submittedDate[1]<=currentDate[1]){
						if(submittedDate[2]<currentDate[2]){
							//alert("Please select expiry date greater than or equal to current date");
							document.getElementById('expire_img').innerHTML="<img src='includes/images/alert.png' />";	
							jQuery("#expire_err_msg").html("Please select expiry date");
							jQuery("#expire_err_msg").fadeIn("slow");
							document.zebramanagement.eDate.focus();
							return false;
						}	
					}	
				}
			}
		//}
		
		//END VALIDATION FOR CURRENT DATE DATE ETERED SHOULD BE GREATER THAN CURRENT DATE
		
		//VALIDATION FOR UNIT BOX CHECK BOX UNIT IS COMPULSARY IF CHECKBOX IS TICKED
		//if(document.zebramanagement.oUnitFlag.checked==true){
			if(document.zebramanagement.oUnit.value==0){
				//alert("Please select number of unit");
				//document.zebramanagement.oUnit.focus();
				//return false;
				document.getElementById('oUnit_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#oUnit_err_msg").html("Please select number of units.");
				jQuery("#oUnit_err_msg").fadeIn("slow");
				document.zebramanagement.oUnit.focus();
				return false;
			}
			else
			{
				document.getElementById('oUnit_img').innerHTML="<img src='includes/images/right.png'/>";	
				document.getElementById('oUnit_err_msg').style.display="none";
			}
		//}
		
		if(document.zebramanagement.oAttempt.value==0){
			document.getElementById('oAttempt_img').innerHTML="<img src='includes/images/alert.png' />";	
			jQuery("#oAttempt_err_msg").html("Please select number of attempts.");
			jQuery("#oAttempt_err_msg").fadeIn("slow");
			document.zebramanagement.oAttempt.focus();
			//alert("Please select offer attempt.");
			//document.zebramanagement.oAttempt.focus();
			return false;
		}
		else
		{
			document.getElementById('oAttempt_img').innerHTML="<img src='includes/images/right.png'/>";
			document.getElementById('oAttempt_err_msg').style.display="none";
		}
		
		//END VALIDATION FOR UNIT BOX CHECK BOX UNIT IS COMPULSARY IF CHECKBOX IS TICKED
        
        //VALIDATION FOR CATEGORY DROPDOWN IT IS COMPULSARY
		if(document.zebramanagement.uploadchoozebra.checked == true)
		{
			if(document.zebramanagement.category.value==0){
				document.getElementById('category_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#category_err_msg").html("Please select category");
				jQuery("#category_err_msg").fadeIn("slow");
				document.zebramanagement.category.focus();
				//alert("Please select category");
				//document.zebramanagement.category.focus();
				return false;
			}
			else
			{
				document.getElementById('category_img').innerHTML="<img src='includes/images/right.png'/>";	
				document.getElementById('category_err_msg').style.display="none";
			}
		
        //END VALIDATION FOR CATEGORY DROPDOWN IT IS COMPULSARY
		
			if(jQuery("#keyword").val() == '') {
				jQuery(".keyword_alert_success").fadeOut("slow");
				jQuery(".keyword_alert_error").fadeIn("slow");
				return false;
			}
			else
			{
				jQuery(".keyword_alert_error").fadeOut("slow");
				jQuery(".keyword_alert_success").fadeIn("slow");
			}
			
			if(document.zebramanagement.description.value == '') {
				document.getElementById('description_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#description_err_msg").html("Please enter Description");
				jQuery("#description_err_msg").fadeIn("slow");
				document.zebramanagement.description.focus();
				return false;
			}
			else
			{
				document.getElementById('description_img').innerHTML="<img src='includes/images/right.png' />";	
				jQuery("#description_err_msg").hide();
			}
			
			if(document.getElementById('action').value == "edit")
			{
				if(document.getElementById('pictureFlag').checked == true) 
				{
					if(document.getElementById('productDefaultThumbImageChk').value == '')
					{
						document.getElementById('productImage_img').innerHTML="<img src='includes/images/alert.png' />";	
						jQuery("#productImage_err_msg").html("Please upload Image");
						jQuery("#productImage_err_msg").fadeIn("slow");
						document.zebramanagement.productImage.focus();
						return false;		
					}
					else 
					{
						document.getElementById('productImage_img').innerHTML="<img src='includes/images/right.png' />";	
						jQuery("#productImage_err_msg").hide("");
					}
				}
				else
				{ 
					if(document.getElementById('productImage').value == '' && document.getElementById('productUploadedThumbImageChk').value == '') 
					{
						document.getElementById('productImage_img').innerHTML="<img src='includes/images/alert.png' />";	
						jQuery("#productImage_err_msg").html("Please upload Image");
						jQuery("#productImage_err_msg").fadeIn("slow");
						document.zebramanagement.productImage.focus();
						return false;
					}
					else 
					{
						document.getElementById('productImage_img').innerHTML="<img src='includes/images/right.png' />";	
						jQuery("#productImage_err_msg").hide("");
					}
				}
				
			} else {
				
				if(document.getElementById('pictureFlag').checked == true) 
				{
					if(document.getElementById('productDefaultThumbImageChk').value == '')
					{
						document.getElementById('productImage_img').innerHTML="<img src='includes/images/alert.png' />";	
						jQuery("#productImage_err_msg").html("Please upload Image");
						jQuery("#productImage_err_msg").fadeIn("slow");
						document.zebramanagement.productImage.focus();
						return false;		
					}
					else 
					{
						document.getElementById('productImage_img').innerHTML="<img src='includes/images/right.png' />";	
						jQuery("#productImage_err_msg").hide("");
					}
				}
				else 
				{
					if(document.zebramanagement.productImage.value == '') 
					{
						document.getElementById('productImage_img').innerHTML="<img src='includes/images/alert.png' />";	
						jQuery("#productImage_err_msg").html("Please upload Image");
						jQuery("#productImage_err_msg").fadeIn("slow");
						document.zebramanagement.productImage.focus();
						return false;
					}
					else 
					{
						document.getElementById('productImage_img').innerHTML="<img src='includes/images/right.png' />";	
						jQuery("#productImage_err_msg").hide("");
					}
				}
			}
		
			if(document.getElementById('startDate').value!='')
			{ 
				if(document.getElementById('endDate').value=='') {
					
					document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#sponsor_end_err_msg").html("Please select Sponsor end date");
					jQuery("#sponsor_end_err_msg").fadeIn("slow");
					document.zebramanagement.endDate.focus();
					return false;
				}
				else if(Date.parse(document.getElementById('endDate').value)>Date.parse(document.getElementById('eDate').value)){
					//alert("Sponsor end date should be less than or equal to expiry date");
					document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#sponsor_end_err_msg").html("Sponsor end date should be less than or equal to expiry date");				
					jQuery("#redmsg1").fadeOut("slow");
					jQuery("#redmsg").fadeOut("slow");
					
					jQuery("#sponsor_end_err_msg").fadeIn("slow");
					document.getElementById('endDate').value = '';
					document.getElementById('endDate').focus();
					return false;
				}
				/*else
				{
					document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
				}*/
			}
		}
		//END VALIDATION FOR SPONSOR END DATE IF SPONSOR START DATE IS ENTERED.
		
		//document.zebramanagement.submit();
		return true;
		//document.forms["zebramanagement"].submit();
		//document.zebramanagement.submit();
	}
	
	//FUNCTION FOR DATE PICKER THIS FUNCTION ALLOWS TODATE TO START FROM FROMDATE ONLY
	function customRange(input) {
	
		var d 		= new Date();
		var year	= d.getFullYear();
		var month 	= d.getMonth();
		var date	= d.getDate();
		
		var mindateCust;
		var maxdateCust;
		var curDate 	= new  Date(year, month, date);
		
		if(input.id=="endDate"){
	
			var dateDiff	= curDate - jQuery("#startDate").datepicker("getDate");  
			maxdateCust 	= null;
			
			if(dateDiff>0){
				minDateCust = jQuery("#startDate").datepicker("getDate");
				if(minDateCust==null)
				{
					//alert("Please select Start date first");
					document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#sponsor_end_err_msg").html("Please select Start date first");
					jQuery("#sponsor_end_err_msg").fadeIn("slow");
					jQuery("#startDate").focus();
					
					return false;
				}
				minDateCust = new Date(minDateCust.getFullYear(),minDateCust.getMonth(),minDateCust.getDate()+Number(0));
				
			}else{
				minDateCust 		= jQuery("#startDate").datepicker("getDate");
				minDateCust	=  new Date(minDateCust.getFullYear(),minDateCust.getMonth(),minDateCust.getDate()+Number(0));
				
			}
			
			//var mindateCust = jQuery("#startDate").datepicker("getDate");
			return {maxDate:maxdateCust,minDate:minDateCust};
		}
		else if(input.id=="startDate"){
			
			minDateCust = curDate;
			var dateDiff	= curDate - jQuery("#endDate").datepicker("getDate");  
			if(dateDiff<0){
				maxdateCust = jQuery("#endDate").datepicker("getDate");
				maxdateCust	=  new Date(maxdateCust.getFullYear(),maxdateCust.getMonth(),maxdateCust.getDate()-Number(1));
				
			}else{
				maxdateCust = null;
			}
			return {maxDate:maxdateCust,minDate:minDateCust};
		}
	
	} 
	//END FUNCTION FOR DATE PICKER THIS FUNCTION ALLOWS TODATE TO START FROM FROMDATE ONLY
	
	// FUNCTION TO START CALENDAR FROM TODAY ONLY
	function customRangeToday(input) {
		
		var d 		= new Date();
		var year	= d.getFullYear();
		var month 	= d.getMonth();
		var date	= d.getDate();
		
		var mindateCust;
		var maxdateCust;
		var curDate 	= new  Date(year, month, date);
		
		if(input.id=="startDate"){
			maxdateCust 	= null;
			minDateCust = curDate;
			return {maxDate:maxdateCust,minDate:minDateCust};
		}
	
	} 
	//END FUNCTION TO START CALENDAR FROM TODAY ONLY
	
	// Function to check enddate greater than startdate or not starts //
	function getDateObject(dateString,dateSeperator){
		//This function return a date object after accepting
		//a date string ans dateseparator as arguments
		var curValue=dateString;
		var sepChar=dateSeperator;
		var curPos=0;
		var cDate,cMonth,cYear;
		
		//extract day portion
		curPos=dateString.indexOf(sepChar);
		cDate=dateString.substring(0,curPos);
		
		//extract month portion
		endPos=dateString.indexOf(sepChar,curPos+1); cMonth=dateString.substring(curPos+1,endPos);
		
		//extract year portion
		curPos=endPos;
		endPos=curPos+5;
		cYear=curValue.substring(curPos+1,endPos);
		
		//Create Date Object
		dtObject=new Date(cYear,cMonth,cDate);
		return dtObject;
	}
	
	// Function to check enddate greater than startdate or not ends //
	
	//FUNCTION THAT GIVE DIFFERENCE IN DAYS BETWEEN TWO DATES
	function days_between(date1, date2) {

		date1 = date1.replace("-", "/").replace("-", "/");
		date2 = date2.replace("-", "/").replace("-", "/");
		
		var firstDate = Date.parse(date1);
		var secondDate= Date.parse(date2);
		
		var msPerDay = 24 * 60 * 60 * 1000;
		var dbd = Math.round((secondDate.valueOf()-firstDate.valueOf())/ msPerDay) + 1;
		
		return dbd;
	}
	// END FUNCTION THAT GIVE DIFFERENCE IN DAYS BETWEEN TWO DATES
	
	/*//FUNCTION THAT GIVE DIFFERENCE IN DAYS BETWEEN TWO DATES
    function days_between(date1, date2) {

        date1 = date1.replace("-", "/").replace("-", "/");
        date2 = date2.replace("-", "/").replace("-", "/");
        
        var firstDate = Date.parse(date1);
        var secondDate= Date.parse(date2);
        
        var msPerDay = 24 * 60 * 60 * 1000;
        var dbd = Math.round((secondDate.valueOf()-firstDate.valueOf())/ msPerDay) + 1;
        
        return dbd;
    }
    // END FUNCTION THAT GIVE DIFFERENCE IN DAYS BETWEEN TWO DATES*/
    
    
    //FUNCTION THAT CHECK DATED FOR BOTH STARTDATE AND ENDDATE  
	function checkDate(){
		
		if(document.getElementById('endDate').value){	
		
			//var startDate = getDateObject(document.getElementById('startDate').value,"-");
			//var endDate   = getDateObject(document.getElementById('endDate').value,"-");
			
			var startDate = document.getElementById('startDate').value;
			var endDate   = document.getElementById('endDate').value;
			
			//alert(days_between(startDate,endDate));
			if(days_between(startDate,endDate) <= 0 ){
				
				//alert("Sponsor end date should be greater than Sponsor start date");
				document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#sponsor_end_err_msg").html("Sponsor end date should be greater than Sponsor start date");
				jQuery("#sponsor_end_err_msg").fadeIn("slow");
				document.getElementById('endDate').value="";
				document.getElementById('sponsorCost').innerHTML = "$&nbsp;0";
				document.getElementById('totalCost').value = 0;
				document.getElementById('endDate').focus();
				jQuery("#add_Msg").fadeOut("fast");
				jQuery("#redmsg").fadeOut("fast");
				jQuery("#redmsg1").fadeOut("fast");
				
				return false;
			
			}else{
				
				
				if(document.getElementById('eDate').value){
					var eDate = document.getElementById('eDate').value;
					//eDate = eDate.split(' ');
					
					if(Date.parse(document.getElementById('endDate').value)>Date.parse(eDate)){
						//alert("Sponsor end date should be less than or equal to expiry date");
						document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";					
						
						jQuery("#sponsor_end_err_msg").html("Sponsor end date should be less than or equal to expiry date");
						
						jQuery("#sponsor_end_err_msg").fadeIn("slow");
						document.getElementById('endDate').value = '';
						document.getElementById('endDate').focus();
						jQuery("#add_Msg").fadeOut("fast");
						jQuery("#redmsg").fadeOut("fast");
						jQuery("#redmsg1").fadeOut("fast");
						return false;
					}
					else {
						
						document.getElementById('sponsor_end_img').innerHTML="";	
						jQuery("#sponsor_end_err_msg").hide("Sponsor end date should be less than or equal to expiry date");	
						
					}
				}else {
					
					//alert("Please select expiry date first");
					document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#sponsor_end_err_msg").html("Please select expiry date first");
					jQuery("#sponsor_end_err_msg").fadeIn("slow");
					
					document.getElementById('endDate').value='';
					
					jQuery("#add_Msg").fadeOut("fast");
					jQuery("#redmsg").fadeOut("fast");
					jQuery("#redmsg1").fadeOut("fast");
					document.getElementById('eDate').focus();
					return false;
				}
				
				
				
				var perdayCost = document.getElementById('perDayCost').value;
				
				startDate = document.getElementById('startDate').value;
				endDate   = document.getElementById('endDate').value;
				if(document.getElementById('remainingSponsor').value < Number(days_between(startDate,endDate))){
					
					//alert("Total remaining sponsor is lower than you selected");
					document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#sponsor_end_err_msg").html("Total remaining sponsor is lower than you selected");
					jQuery("#sponsor_end_err_msg").fadeIn("slow");
					document.getElementById('endDate').value="";
					document.getElementById('sponsorCost').innerHTML = "$&nbsp;0";
					document.getElementById('totalCost').value = 0;
					document.getElementById('TotalDays').value = 0;
					document.getElementById('endDate').focus();
					
					jQuery("#add_Msg").fadeOut("fast");
					jQuery("#redmsg").fadeOut("fast");
					jQuery("#redmsg1").fadeOut("fast");
					return false;
					
				}
				var total = parseFloat(perdayCost)*Number(days_between(startDate,endDate));
				
				
				//CONDITION ADDED BY AK SPONSOR DAYS CAN NOT BE GREATER THAN 45
				if(Number(total)>45){
					//alert("Total remaining sponsor is lower than you selected");
					document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#sponsor_end_err_msg").html("Maximum sponsors should be less than or equal to 45 days.");
					jQuery("#sponsor_end_err_msg").fadeIn("slow");
					document.getElementById('endDate').value="";
					document.getElementById('sponsorCost').innerHTML = "$&nbsp;0";
					document.getElementById('totalCost').value = 0;
					document.getElementById('TotalDays').value = 0;
					document.getElementById('endDate').focus();	
					
					jQuery("#add_Msg").fadeOut("fast");
					jQuery("#redmsg").fadeOut("fast");
					jQuery("#redmsg1").fadeOut("fast");
					

					return false;
				}else{
					document.getElementById('sponsor_end_img').innerHTML="";	
					document.getElementById('sponsor_end_err_msg').style.display="none";	
				}
				//END CODE BY AK
				
				//sponsorCost
				
                document.getElementById('TotalDays').value = Number(days_between(startDate,endDate));
                document.getElementById('sponsorCost').innerHTML = "$&nbsp;"+total;
				document.getElementById('totalCost').value = total;
			}
		}
		
	}	
	//END FUNCTION THAT CHECK DATED FOR BOTH STARTDATE AND ENDDATE 
	
	function checkDateEdit(flag){
		
		var startDate = document.getElementById('startDate').value;
		var endDate   = document.getElementById('endDate').value;
		var d 		= new Date();
		var year	= d.getFullYear();
		var month 	= d.getMonth();
		var date	= d.getDate();
		var curDate = month+1+'/'+date+'/'+year;
		
		if(flag=='endDate'){

			if(Date.parse(startDate) < Date.parse(curDate)){
				
				document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#sponsor_end_err_msg").html("Sponsor start date should be greater than or equal to current date.");
				jQuery("#sponsor_end_err_msg").fadeIn("slow");
				document.getElementById('startDate').value="";
				document.getElementById('endDate').value="";
				setTimeout("document.getElementById('startDate').focus()",10);
				
				jQuery("#add_Msg").fadeOut("fast");
				jQuery("#redmsg").fadeOut("fast");
				jQuery("#redmsg1").fadeOut("fast");
				
				return false;	
			
			}else if(Date.parse(startDate) < Date.parse(curDate)){
				
				document.getElementById('sponsor_end_img').innerHTML="";	
				jQuery("#sponsor_end_err_msg").hide("Sponsor start date should be greater than or equal to current date.");
				jQuery("#sponsor_end_err_msg").fadeIn("slow");
			
			}
			
			if(Date.parse(endDate) < Date.parse(curDate)){
				//alert("Sponsor end date should be greater than current date.");	
				document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#sponsor_end_err_msg").html("Sponsor end date should be greater than or equal to current date.");
				jQuery("#sponsor_end_err_msg").fadeIn("slow");
				document.getElementById('endDate').value="";
				document.getElementById('endDate').focus();
				
				
				jQuery("#add_Msg").fadeOut("fast");
				jQuery("#redmsg").fadeOut("fast");
				jQuery("#redmsg1").fadeOut("fast");
				
				return false;	
			}else if(Date.parse(endDate) < Date.parse(curDate)){
				document.getElementById('sponsor_end_img').innerHTML="";	
				jQuery("#sponsor_end_err_msg").hide("Sponsor end date should be greater than or equal to current date.");
				jQuery("#sponsor_end_err_msg").fadeIn("slow");
			}
			
		}
		
		if(document.getElementById('endDate').value){	
		
			
			if(days_between(startDate,endDate) <= 0 ){
				
				//alert("Sponsor end date should be greater than Sponsor from date");
				document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#sponsor_end_err_msg").html("Sponsor end date should be greater than Sponsor start date");
				jQuery("#sponsor_end_err_msg").fadeIn("slow");
				document.getElementById('endDate').value="";
				document.getElementById('endDate').value="";
				document.getElementById('sponsorCost').innerHTML = "$&nbsp;0";
				document.getElementById('totalCost').value = 0;
				document.getElementById('endDate').focus();
				
				
				jQuery("#add_Msg").fadeOut("fast");
					jQuery("#redmsg").fadeOut("fast");
					jQuery("#redmsg1").fadeOut("fast");
				
				return false;
			
			}else{
				
				if(document.getElementById('eDate').value){
					var eDate = document.getElementById('eDate').value;
					
					eDate = eDate.split(' ');
					
					
					if(Date.parse(document.getElementById('endDate').value)>Date.parse(document.getElementById('eDate').value)){
						//alert("Sponsor end date should be less than or equal to expiry date");
						document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
						jQuery("#sponsor_end_err_msg").html("Sponsor end date should be less than or equal to expiry date");			
						jQuery("#redmsg1").fadeOut("slow");
						jQuery("#redmsg").fadeOut("slow");
						
						jQuery("#sponsor_end_err_msg").fadeIn("slow");
						document.getElementById('endDate').value = '';
						document.getElementById('endDate').focus();
						
						
						jQuery("#add_Msg").fadeOut("fast");
						//jQuery("#redmsg").fadeOut("fast");
						//jQuery("#redmsg1").fadeOut("fast");
						
						return false;
					}
					else if(Date.parse(document.getElementById('endDate').value)<=Date.parse(document.getElementById('eDate').value)){
						jQuery("#sponsor_end_err_msg").hide("Sponsor end date should be less than or equal to expiry date");
						document.getElementById('sponsor_end_img').innerHTML="";	
					}
				}else{
					
					//alert("Please select expiry date first");
					jQuery("#add_Msg").fadeOut("fast");
					jQuery("#redmsg").fadeOut("fast");
					jQuery("#redmsg1").fadeOut("fast");
					
					document.getElementById('expire_err_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#expire_err_msg").html("Please select expiry date first");
					jQuery("#expire_err_msg").fadeIn("slow");
					document.getElementById('eDate').focus();
					return false;
				}
							
				
				var perdayCost = document.getElementById('perDayCost').value;
				
				//startDate = document.getElementById('startDate').value;
				//endDate   = document.getElementById('endDate').value;
				
				var totalDay = Number(document.getElementById('remainingSponsor').value)+Number(document.getElementById('oldSponsorRemaining').value);
				if(totalDay < Number(days_between(startDate,endDate))){
					
					
					document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#sponsor_end_err_msg").html("Total remaining sponsor is lower than you selected");
					jQuery("#sponsor_end_err_msg").fadeIn("slow");
					
					//alert("Total remaining sponsor is lower than you selected");
					document.getElementById('endDate').value="";
					document.getElementById('sponsorCost').innerHTML = "$&nbsp;0";
					document.getElementById('totalCost').value = 0;
					document.getElementById('TotalDays').value = 0;
					document.getElementById('endDate').focus();
					
					
					jQuery("#add_Msg").fadeOut("fast");
					jQuery("#redmsg").fadeOut("fast");
					jQuery("#redmsg1").fadeOut("fast");
					
					return false;
					
				}
				var total = parseFloat(perdayCost)*Number(days_between(startDate,endDate));
				
				//CONDITION ADDED BY AK SPONSOR DAYS CAN NOT BE GREATER THAN 45
				if(Number(total)>45){
					//alert("Total remaining sponsor is lower than you selected");
					document.getElementById('sponsor_end_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#sponsor_end_err_msg").html("Maximum sponsors should be less than or equal to 45 days.");
					jQuery("#sponsor_end_err_msg").fadeIn("slow");
					document.getElementById('endDate').value="";
					document.getElementById('sponsorCost').innerHTML = "$&nbsp;0";
					document.getElementById('totalCost').value = 0;
					document.getElementById('TotalDays').value = 0;
					document.getElementById('endDate').focus();	
					
					
					jQuery("#add_Msg").fadeOut("fast");
					jQuery("#redmsg").fadeOut("fast");
					jQuery("#redmsg1").fadeOut("fast");
					
					return false;
				}else{
					document.getElementById('sponsor_end_img').innerHTML="";	
					document.getElementById('sponsor_end_err_msg').style.display="none";	
				}
				//END CODE BY AK
				
				
				
				//sponsorCost
				
                document.getElementById('TotalDays').value = Number(days_between(startDate,endDate));
                document.getElementById('sponsorCost').innerHTML = "$&nbsp;"+total;
				document.getElementById('totalCost').value = total;
				
				
				
					
					if(Date.parse(startDate) == Date.parse(curDate) && document.getElementById('sponsorStarted').value==1 && document.getElementById('sponsorExpired').value==0){
						
						document.getElementById('balance').value = Number(document.getElementById('oldSponsorRemaining').value)+1;
						if( Number(document.getElementById('balance').value) >= Number(days_between(startDate,endDate)) ){
							//alert(1)
							jQuery("#add_Msg").fadeOut("slow");
							jQuery("#redmsg1").fadeOut("slow");
							jQuery("#redmsg").fadeIn("slow");
							document.getElementById('recentsponcervalueshow').innerHTML = Number(document.getElementById('balance').value) - Number(days_between(startDate,endDate));	
							document.getElementById('remeianval').innerHTML = Number(days_between(startDate,endDate));
						
						}else{
							//alert(2)
							//alert("He11111222");
							jQuery("#add_Msg").fadeOut("slow");
							jQuery("#redmsg").fadeOut("fast");
							jQuery("#redmsg1").fadeIn("slow");
							document.getElementById('recentsponcervalueshow1').innerHTML = Number(days_between(startDate,endDate))-Number(document.getElementById('balance').value);	
							document.getElementById('remeianval1').innerHTML = Number(days_between(startDate,endDate));
						
						}
					
					
					}else if(document.getElementById('sponsorStarted').value==0){
						//alert(3)
						document.getElementById('balance').value = Number(document.getElementById('oldSponsorRemaining').value);
						if(Number(document.getElementById('previousDays').value) >= Number(days_between(startDate,endDate))){
						
							jQuery("#add_Msg").fadeOut("fast");
							jQuery("#redmsg1").fadeOut("fast");
							jQuery("#redmsg").fadeIn("slow");
							
							document.getElementById('recentsponcervalueshow').innerHTML = Number(document.getElementById('previousDays').value) - Number(days_between(startDate,endDate));	
							document.getElementById('remeianval').innerHTML = Number(days_between(startDate,endDate));
						}else{
							
							jQuery("#add_Msg").fadeOut("fast");
							jQuery("#redmsg").fadeOut("fast");
							jQuery("#redmsg1").fadeIn("slow");
							document.getElementById('recentsponcervalueshow1').innerHTML = Number(days_between(startDate,endDate)) - Number(document.getElementById('previousDays').value);	
							document.getElementById('remeianval1').innerHTML = Number(days_between(startDate,endDate));
						}
					
					
					
					
					
					}else if(document.getElementById('sponsorExpired').value==1){
						//alert(4)
						//alert("hello3");
						jQuery("#redmsg").fadeOut("fast");
						jQuery("#redmsg1").fadeOut("fast");
						jQuery("#add_Msg").fadeIn("slow");
						document.getElementById('addmsgshow').innerHTML = Number(document.getElementById('remainingSponsor').value) - Number(days_between(startDate,endDate));	
						document.getElementById('addmsgal').innerHTML = Number(days_between(startDate,endDate));
					
					}else{
						//alert("in last");
						document.getElementById('balance').value = Number(document.getElementById('oldSponsorRemaining').value);
						if( Number(document.getElementById('balance').value) > Number(days_between(startDate,endDate)) ){

							
							//alert(5)
							jQuery("#add_Msg").fadeOut("fast");
							jQuery("#redmsg1").fadeOut("fast");
							jQuery("#redmsg").fadeIn("slow");
							document.getElementById('recentsponcervalueshow').innerHTML = Number(document.getElementById('balance').value) - Number(days_between(startDate,endDate));	
							document.getElementById('remeianval').innerHTML = Number(days_between(startDate,endDate));
						
						}else{
							//alert(6)
							jQuery("#add_Msg").fadeOut("fast");
							jQuery("#redmsg").fadeOut("fast");
							jQuery("#redmsg1").fadeIn("slow");
							document.getElementById('recentsponcervalueshow1').innerHTML = Number(days_between(startDate,endDate)) - Number(document.getElementById('balance').value);	
							document.getElementById('remeianval1').innerHTML = Number(days_between(startDate,endDate));
						}
						
					}
			}
		}
	}
	
	// TO REDIRECT USER ON LOGIN PAGE, ONCE SESSION HAS EXPIRED STARTS
	//redirect_page();
	function redirect_page(){
		
		//alert("hello");
		if(window.XMLHttpRequest){
			// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}else{
			// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		var siteurl="../choozebra.php";
		xmlhttp.open("GET",siteurl,false);
		xmlhttp.send();
		
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			
			if(xmlhttp.responseText!="1"){
				alert("oops, session has expired");
				window.location="../index.php";
			}
		}
		//setTimeout("redirect_page()",60000);
	}
	//CODE TO REDIRECT USER ON LOGIN PAGE, ONCE SESSION HAS EXPIRED ENDS
// search prodcut functionality added by rajat	
function searchproduct(name)
{
		
		jQuery.ajax(
					{
						type:"GET",url: site_path+'choozebra/searchProduct.php?name='+name,
						success: function(html){jQuery("#new_product").html(html);
							if(document.getElementById('refresh').style.visibility='visible')
							{
								document.getElementById('refresh').style.visibility='visible';
							}
						}
						,beforeSend: function(html){}});
	
}
function checkboxchecked()
{
	for(var k=0; k<document.newsletterfrm.elements.length; k++)
	{
		var temp_str=document.newsletterfrm.elements[k].id;
		if(temp_str.indexOf("offerCheck[]")!=-1)
		{
			if(document.newsletterfrm.elements[k].checked==true)
			{
				sendmail();
				return true;
			}
		}
	}
	alert("Please Select atleast one zebra product!!");
	return false;	
}
function sendmail()
{
	var mydata = jQuery("#newsletterfrm").serialize();
	jQuery.ajax(
					{
						type:"post",
						url: site_path+'choozebra/email.php',
						data: mydata,
						success: function(html)
						{
								//jQuery("#send_zebra").html(html);
								jQuery("#mailid").html("Mail sent successfully");
								setTimeout("jQuery.unblockUI()", 3000);
								//jQuery.unblockUI();
						}
						,beforeSend: function(html)
						{
							jQuery.blockUI({ message: '<h2 id="mailid"> Just a moment sending in progress...</h2>' });
						}
					}
				);
}


function oUnit_check() {
		if(document.zebramanagement.oUnit.value==0){
			//alert("Please select number of unit");
			//document.zebramanagement.oUnit.focus();
			//return false;
			document.getElementById('oUnit_img').innerHTML="<img src='includes/images/alert.png' />";	
			jQuery("#oUnit_err_msg").html("Please select number of units.");
			jQuery("#oUnit_err_msg").fadeIn("slow");
			//document.zebramanagement.oUnit.focus();
			//setTimeout("document.getElementById('oUnit').focus()",10);
			return false;
		}
		else
		{
			document.getElementById('oUnit_img').innerHTML="<img src='includes/images/right.png' style='margin-right:190px;'/>";	
			document.getElementById('oUnit_err_msg').style.display="none";
		}
	}
	
	function oAttempt_check() {
		if(document.zebramanagement.oAttempt.value==0){
			document.getElementById('oAttempt_img').innerHTML="<img src='includes/images/alert.png' />";	
			jQuery("#oAttempt_err_msg").html("Please select number of attempts.");
			jQuery("#oAttempt_err_msg").fadeIn("slow");
			//document.zebramanagement.oAttempt.focus();
			//setTimeout("document.getElementById('oAttempt').focus()",10);
			//alert("Please select offer attempt.");
			//document.zebramanagement.oAttempt.focus();
			return false;
		}
		else
		{
			document.getElementById('oAttempt_img').innerHTML="<img src='includes/images/right.png'/>";
			document.getElementById('oAttempt_err_msg').style.display="none";
		}
	}
	
	function category_check() {
		if(document.zebramanagement.uploadchoozebra.checked == true)
		{
			if(document.zebramanagement.category.value==0){
				document.getElementById('category_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#category_err_msg").html("Please select category");
				jQuery("#category_err_msg").fadeIn("slow");
				//document.zebramanagement.category.focus();
				//setTimeout("document.getElementById('category').focus()",10);
				//alert("Please select category");
				//document.zebramanagement.category.focus();
				return false;
			}
			else
			{
				document.getElementById('category_img').innerHTML="<img src='includes/images/right.png'/>";	
				document.getElementById('category_err_msg').style.display="none";
			}
		}
	}
	
	function keyword_alert() {
		/*if(jQuery("#keyword").val() == '') {
			
			document.getElementById('keyword_img').innerHTML="<img src='includes/images/alert.png' />";	
			jQuery("#keyword_err_msg").html("Please enter Keyword");
			jQuery(".keyword_alert").fadeIn("slow");
			jQuery("#keyword_img").fadeIn("slow");
			jQuery("#keyword_err_msg").fadeIn("slow");
			document.zebramanagement.keyword.focus();
			return false;
		}
		else {
			jQuery(".keyword_alert").fadeIn("slow");
			document.getElementById('keyword_img').innerHTML="<img src='includes/images/right.png' />";	
			jQuery("#keyword_err_msg").hide();
		}*/
		if(jQuery("#keyword").val() == '') {
			jQuery(".keyword_alert_success").fadeOut("slow");
			jQuery(".keyword_alert_error").fadeIn("slow");
		}
		else
		{
			jQuery(".keyword_alert_error").fadeOut("slow");
			jQuery(".keyword_alert_success").fadeIn("slow");
		}
		
		
	}
	
	function description_alert() {
		
		if(document.getElementById('description').value == '') { 
			document.getElementById('description_img').innerHTML="<img src='includes/images/alert.png' />";	
			jQuery("#description_err_msg").show();
			jQuery("#description_err_msg").html("Please enter Description");
			jQuery("#description_img").fadeIn("slow");
			document.zebramanagement.description.focus();
			return false;
		}
		else {
			document.getElementById('description_img').innerHTML="<img src='includes/images/right.png' />";	
			jQuery("#description_err_msg").hide();
		}
		
		
	}
	
	function productImage_alert() {
		
		if(document.getElementById('action').value == "edit")
		{
			if(document.getElementById('pictureFlag').checked == true) 
			{
				if(document.getElementById('productDefaultThumbImageChk').value == '')
				{
					document.getElementById('productImage_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#productImage_err_msg").html("Please upload Image");
					jQuery("#productImage_err_msg").fadeIn("slow");
					document.zebramanagement.productImage.focus();
					return false;		
				}
				else 
				{
					document.getElementById('productImage_img').innerHTML="<img src='includes/images/right.png' />";	
					jQuery("#productImage_err_msg").hide("");
				}
			}
			else
			{
				if(document.zebramanagement.productImage.value == '' && document.zebramanagement.productUploadedThumbImageChk.value == '') 
				{
					document.getElementById('productImage_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#productImage_err_msg").html("Please upload Image");
					jQuery("#productImage_err_msg").fadeIn("slow");
					document.zebramanagement.productImage.focus();
					return false;
				}
				else 
				{
					document.getElementById('productImage_img').innerHTML="<img src='includes/images/right.png' />";	
					jQuery("#productImage_err_msg").hide("");
				}
			}
			
		} else {
			
			if(document.getElementById('pictureFlag').checked == true) 
			{
				if(document.getElementById('productDefaultThumbImageChk').value == '')
				{
					document.getElementById('productImage_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#productImage_err_msg").html("Please upload Image");
					jQuery("#productImage_err_msg").fadeIn("slow");
					document.zebramanagement.productImage.focus();
					return false;		
				}
				else 
				{
					document.getElementById('productImage_img').innerHTML="<img src='includes/images/right.png' />";	
					jQuery("#productImage_err_msg").hide("");
				}
			}
			else 
			{
				if(document.zebramanagement.productImage.value == '') 
				{
					document.getElementById('productImage_img').innerHTML="<img src='includes/images/alert.png' />";	
					jQuery("#productImage_err_msg").html("Please upload Image");
					jQuery("#productImage_err_msg").fadeIn("slow");
					document.zebramanagement.productImage.focus();
					return false;
				}
				else 
				{
					document.getElementById('productImage_img').innerHTML="<img src='includes/images/right.png' />";	
					jQuery("#productImage_err_msg").hide("");
				}
			}
		}
	}
	
	function checkKeywordFlag()
	{
		if(document.getElementById('keywordFlag').checked)
		{
			document.getElementById('keyword').disabled="disabled";
			// added by rajat 
			if(document.getElementById('metatags_keywords'))
			{
				var metatags_keywords = document.getElementById('metatags_keywords').value;
				if(metatags_keywords !="")
				{
					document.getElementById('keyword').value = metatags_keywords;
				}
				
			}
			if(jQuery("#keyword").val() == '') {
				jQuery(".keyword_alert_success").fadeOut("slow");
				jQuery(".keyword_alert_error").fadeIn("slow");
				
			}
			else
			{
				jQuery(".keyword_alert_error").fadeOut("slow");
				jQuery(".keyword_alert_success").fadeIn("slow");
			}
			// end
			
		}
		else
		{
			document.getElementById('keyword').disabled="";
			document.getElementById('keyword').value= "";
			jQuery(".keyword_alert_error").fadeOut();
			jQuery(".keyword_alert_success").fadeOut();
			
		}
		
	}
	
	
	function checkDescriptionFlag(){
		
		if(document.getElementById('descriptionFlag').checked){
			//document.getElementById('description').disabled="disabled";
			// added by rajat 
			if(document.getElementById('products_description'))
			{
				var products_description = document.getElementById('products_description').value;
				if(products_description !="")
				{
					document.getElementById('description').value = products_description;
				}
				
			}
			if(document.getElementById('description').value=='') {
				
				document.getElementById('description_img').innerHTML="<img src='includes/images/alert.png' />";	
				jQuery("#description_err_msg").show();
				jQuery("#description_err_msg").html("Please enter Description");
				jQuery("#description_img").fadeIn("slow");
				document.zebramanagement.description.focus();
				return false;	
				
			}
			else
			{
				document.getElementById('description_img').innerHTML="<img src='includes/images/right.png' />";	
				
				jQuery("#description_err_msg").hide();	
			}
			
			/*if(jQuery(".description_alert").length>0 && jQuery(".description_alert").css('display','block'))
			{
				jQuery(".description_alert").fadeOut();
				document.getElementById('description_img').innerHTML="<img src='includes/images/right.png' />";
			}*/
			// end
		}else{
			document.getElementById('description').disabled="";
			document.getElementById('description').value= "";
			document.getElementById('description_img').innerHTML= "";
			document.getElementById('description_err_msg').innerHTML = "";
			
		}
	}

	/*function ckeckPictureFlag(){
		if(document.getElementById('pictureFlag').checked){
			document.getElementById('productImage').disabled="disabled";
			document.getElementById('productThumbImage').style.display="block";
		}else{
			document.getElementById('productImage').disabled="";
			document.getElementById('productThumbImage').style.display="none";
		}
	}*/
	
	function ckeckPictureFlag(){
		
		if(document.getElementById('pictureFlag').checked){
			
			document.getElementById('productImage').disabled="disabled";
			if(document.getElementById('action').value == "edit"){
				document.getElementById('productDefaultThumbImage').style.display="block";
				document.getElementById('productUploadedThumbImage').style.display="none";
			}else{
				document.getElementById('productDefaultThumbImage').style.display="block";
			}
		
		}else{
			
			document.getElementById('productImage').disabled="";
			if(document.getElementById('action').value == "edit"){
				document.getElementById('productDefaultThumbImage').style.display = 'none';
				document.getElementById('productUploadedThumbImage').style.display="block";
				
			}else{
				document.getElementById('productDefaultThumbImage').style.display="none";
			}
			//document.getElementById('productThumbImage').style.display="none";
		}
	}