//--------------- Device ------------------//
$("#add_device").submit(function(event){
    
})
$("#update_device").submit(function(event){
    event.preventDefault();
    var unindexed_array=$(this).serializeArray(); 
    var data ={}
    $.map(unindexed_array,function(n,i){
        data[n['name']]= n['value']
    })
    console.log(data);
    console.log(unindexed_array);

   
    jQuery.ajax({
        url: `http://localhost:3006/device/api/devices/${data.id}`,
        "method": "PUT",
        "data": data
    }).done(function(response){
        alert("Data Updated Successfully!","success");
    })
})

if(window.location.pathname =="/device/lister-device"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id =$(this).attr("data-id")
        if(confirm("Do you really want to delete this record?")){
            jQuery.ajax({
                url:`http://localhost:3006/device/api/devices/${id}`,
                "method":"DELETE"
            }).done(function(response){
                alert("Data Updataed Successfully!");
                location.reload()
            })
        }
    })
}

//-------- Canal ----------//
$("#add_canal").submit(function(event){
   
})
$("#update_canal").submit(function(event){
    event.preventDefault();
    var unindexed_array=$(this).serializeArray(); 
    var data ={}
    $.map(unindexed_array,function(n,i){
        data[n['name']]= n['value']
    })
    console.log(data);
    console.log(unindexed_array);

   
    jQuery.ajax({
        url: `http://localhost:3006/canal/api/canaux/${data.id}`,
        "method": "PUT",
        "data": data
    }).done(function(response){
        alert("Data Updated Successfully!","success");
    })
})

if(window.location.pathname =="/canal/lister_canal"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id =$(this).attr("data-n")
        if(confirm("Do you really want to delete this record?")){
            jQuery.ajax({
                url:`http://localhost:3006/canal/api/canaux/${id}`,
                "method":"DELETE"
            }).done(function(response){
                alert("Data Updataed Successfully!");
                location.reload()
            })
        }
    })
}
//---------- Group -----------//
$("#add_group").submit(function(event){
   
})
$("#update_group").submit(function(event){
    event.preventDefault();
    var unindexed_array=$(this).serializeArray(); 
    var data ={}
    $.map(unindexed_array,function(n,i){
        data[n['name']]= n['value']
    })
    console.log(data);
    console.log(unindexed_array);

   
    jQuery.ajax({
        url: `http://localhost:3006/group/api/groupes/${data.id}`,
        "method": "PUT",
        "data": data
    }).done(function(response){
        alert("Data Updated Successfully!","success");
    })
})

if(window.location.pathname =="/group/lister_group"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id =$(this).attr("data-nd")
        if(confirm("Do you really want to delete this record?")){
            jQuery.ajax({
                url:`http://localhost:3006/group/api/groupes/${id}`,
                "method":"DELETE"
            }).done(function(response){
                alert("Data Updataed Successfully!");
                location.reload()
            })
        }
    })
}
//------User -------//
$("#update_user").submit(function(event){
    event.preventDefault();
    var unindexed_array=$(this).serializeArray(); 
    var data ={}
    $.map(unindexed_array,function(n,i){
        data[n['name']]= n['value']
    })
    console.log(data);
    console.log(unindexed_array);

   
    jQuery.ajax({
        url: `http://localhost:3006/user/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }).done(function(response){
        alert("Data Updated Successfully!","success");
    })
})

if(window.location.pathname =="/user/lister_user"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id =$(this).attr("data-nd")
        if(confirm("Do you really want to delete this record?")){
            jQuery.ajax({
                url:`http://localhost:3006/user/api/users/${id}`,
                "method":"DELETE"
            }).done(function(response){
                alert("Data Updataed Successfully!");
                location.reload()
            })
        }
    })
}
//------Stream-------//
if(window.location.pathname =="/stream/lister-stream"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id =$(this).attr("data-d")
        if(confirm("Do you really want to delete this record?")){
            jQuery.ajax({
                url:`http://localhost:3006/stream/api/streams/${id}`,
                "method":"DELETE"
            }).done(function(response){
                alert("Data Updataed Successfully!");
                location.reload()
            })
        }
    })
}