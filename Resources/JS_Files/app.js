window.onload = function(){
    var xhr;
    (function LoadData() 
    {
        // 1- Create XHR
        xhr=new XMLHttpRequest();

        //2- Check Server status, and deal with server return
        xhr.onreadystatechange = statusCheck; 
        
        //3- Send Request
        xhr.open('GET','Resources/Data/JsonData.txt', true);
        xhr.send();
        
    }());
    let SectionNumber = 1;
    function statusCheck() 
    {
        if (xhr.readyState == 4) //4= loaded
        {
            if (xhr.status == 200) //200=OK
            {            
                var jsonStr=xhr.responseText;
                var jsonT =JSON.parse(jsonStr);
                let Links = document.getElementById("Links");
                //console.log(jsonT);
                let len = jsonT.Sections.length;
                for(;SectionNumber<=len;SectionNumber++){
                    let SecLink=`<li class="nav-item"><a class="nav-link" href="#${jsonT.Sections[SectionNumber-1].Section.header}">${jsonT.Sections[SectionNumber-1].Section.header}</a></li>`;
                    Links.innerHTML +=SecLink;
                }
                let SecLink=`<li class="nav-item"><a class="nav-link" href="#Details">Details</a></li>`;
                Links.innerHTML +=SecLink;

                let SectionPlace = document.getElementById("SectionPlace");
                //console.log(jsonT.Sections[0].Section.content);
                for(let i = 0;i<len;i++){
                    if(jsonT.Sections[i].Section.header != "Gallery"){
                    let SectionBody = `<div style="margin: 5px auto;" id="${jsonT.Sections[i].Section.header}" class="col-md-11 col-11 SectionClass bg-dark"><h3>${jsonT.Sections[i].Section.header}</h3><p class="lead">${jsonT.Sections[i].Section.content}</p></div><br/><br/>`;
                    SectionPlace.innerHTML +=SectionBody;
                    }else{
                        let gellary =`<div class="row" id="${jsonT.Sections[i].Section.header}">`;
                        let l = jsonT.Sections[i].Section.content.length;
                        for(let j=0;j<l;j++){
                            let imageSrc = 'Resources/Images/';
                            let img = jsonT.Sections[i].Section.content[j];
                            let sub = img.substring(img.substring(img.lastIndexOf('/')+1));
                            
                            imageSrc +=sub;
                            //console.log(imageSrc);
                            //console.log("sub : "+sub);
                            gellary +=`<div style="margin: 5px auto;"  class="col-11 col-md-4"><a href="#Details"><img onclick="Image_Click('${sub}')" class="img-thumbnail" style="min-height: 250px;max-height: 250px; cursor: pointer;" width="95%" src="${jsonT.Sections[i].Section.content[j]}"/></a></div>`;
                        }
                        gellary +=`</div>`;
                        let SectionBody = `<div style="margin: 5px auto;" class="col-md-11 col-11 gellaryPlace"><h3>${jsonT.Sections[i].Section.header}</h3><p class="lead">${gellary}</p></div><br/><br/>`;
                        SectionPlace.innerHTML +=SectionBody;
                    }
                }
                
            } 
        }
    }

    
}
function Image_Click(imgSrc){
    let SelectedImage = document.getElementById("ClickededImage");
    SelectedImage.setAttribute('src',imgSrc);

}

function addSectionFun(form){
    var newSectionHeader = form.sectionHeader.value;
    let newSections = document.getElementById("newSectionsPlace");
    let SectionBody = `<div style="margin: 5px auto;" id="${form.sectionHeader.value}" class="col-md-11 col-11 SectionClass bg-dark"><h3>${form.sectionHeader.value}</h3><p class="lead">${form.sectionContent.value}</p></div><br/><br/>`;
    newSections.innerHTML +=SectionBody;
}